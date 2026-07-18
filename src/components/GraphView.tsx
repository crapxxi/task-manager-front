import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as RPointerEvent,
  type RefObject,
} from 'react';
import { Icon } from '../icons';
import { api } from '../api';
import { useAuth, useProjects, useTasks, useUI } from '../state';
import {
  computeCollapse,
  computeLayout,
  edgePath,
  groupColor,
  NODE_H,
  NODE_W,
  type LayoutLink,
  type LayoutNode,
  type XY,
} from '../lib/graph';
import {
  IMPORTANCE_LABEL,
  STATUS_LABEL,
  type DependencyType,
  type GraphArchive,
  type GraphEdge,
  type GraphNode,
  type Task,
  type TaskGraph,
  type TaskGroup,
} from '../types';
import { ConnectionError, EmptyState, LoadingState, StatusDot } from './ui';

interface Transform { tx: number; ty: number; k: number }

type Drag =
  | { type: 'pan'; sx: number; sy: number; otx: number; oty: number; moved: boolean }
  | { type: 'node'; id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean }
  | { type: 'connect'; sourceId: number }
  | { type: 'chip'; id: number; sx: number; sy: number; moved: boolean }
  | { type: 'branch'; id: number; sx: number; sy: number; moved: boolean }
  | { type: 'edge'; id: number; sx: number; sy: number; moved: boolean };

interface ConnectState {
  sourceId: number;
  /** Cursor position in graph coordinates (for the ghost edge). */
  gx: number;
  gy: number;
  targetId: number | null;
}

type Popover =
  | { kind: 'create'; sourceId: number; targetId: number; x: number; y: number }
  | { kind: 'edge'; edgeId: number; x: number; y: number };

/** Synthetic node for a folded group. Lives at id = -groupId so it never
    collides with task ids in the shared positions map. */
interface GroupNode { id: number; gid: number; title: string; count: number }

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

/* Manually dragged node positions persist per user+project, so an
   arranged graph comes back exactly as it was left. */
function readPositions(key: string): Map<number, XY> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Map();
    return new Map(JSON.parse(raw) as [number, XY][]);
  } catch {
    return new Map();
  }
}
function writePositions(key: string, positions: Map<number, XY>) {
  try {
    localStorage.setItem(key, JSON.stringify([...positions.entries()]));
  } catch { /* storage unavailable — layout just recomputes next time */ }
}

function readIdSet(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch {
    return new Set();
  }
}
function writeIdSet(key: string, ids: Set<number>) {
  try {
    if (ids.size) localStorage.setItem(key, JSON.stringify([...ids]));
    else localStorage.removeItem(key);
  } catch { /* storage unavailable — fold state just resets next time */ }
}

/** Straight-ish bezier from a node's edge toward a free point (the cursor). */
function ghostPath(a: XY, x: number, y: number): string {
  const dx = x - a.x;
  const dy = y - a.y;
  const horizontal = Math.abs(dx) > Math.abs(dy);
  const x1 = horizontal ? a.x + (dx >= 0 ? 1 : -1) * (NODE_W / 2) : a.x;
  const y1 = horizontal ? a.y : a.y + (dy >= 0 ? 1 : -1) * (NODE_H / 2);
  const mx = (x1 + x) / 2;
  const my = (y1 + y) / 2;
  return horizontal
    ? `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y}, ${x} ${y}`
    : `M ${x1} ${y1} C ${x1} ${my}, ${x} ${my}, ${x} ${y}`;
}

export function GraphView() {
  const {
    status, tasks, byId, edges, groups, descendants, strictDescendants, influenceById,
    bind, unbind, changeBindType, createGroup, renameGroup, removeGroup, assignToGroup, groupTasks,
    archives, archivesTotal, loadMoreArchives, archiveBranch, restoreArchive, fetchArchiveGraph,
  } = useTasks();
  const { selectedId, select, branchRoot, focusBranch, form, projectForm, confirmRequest, confirm } = useUI();
  const { username } = useAuth();
  const { currentId } = useProjects();
  const posKeyBase = `tm.graph.pos.${username ?? 'anon'}.${currentId ?? 0}`;
  const collapseKey = `tm.graph.fold.${username ?? 'anon'}.${currentId ?? 0}`;
  const gfoldKey = `tm.graph.gfold.${username ?? 'anon'}.${currentId ?? 0}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [full, setFull] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<number>>(() => readIdSet(collapseKey));
  const [foldedGroups, setFoldedGroups] = useState<Set<number>>(() => readIdSet(gfoldKey));
  const [connect, setConnect] = useState<ConnectState | null>(null);
  const [popover, setPopover] = useState<Popover | null>(null);
  const [panel, setPanel] = useState(false);
  // Archive history: side panel with past archives, a bottom bar that names the
  // branch being archived, and a read-only viewer for one archive's graph.
  const [histPanel, setHistPanel] = useState(false);
  const [archiveBar, setArchiveBar] = useState(false);
  const [viewerArchive, setViewerArchive] = useState<GraphArchive | null>(null);
  // Multi-select mode: taps pick tasks instead of opening the panel, then the
  // action bar turns the picked set into a group in one go.
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState<Set<number>>(new Set());
  // Influence overlay: tints nodes by how much they unlock and, on hover/select,
  // lights up the downstream cone a task drives.
  const [influenceMode, setInfluenceMode] = useState(false);

  /* Branch focus: when a root task is chosen, the board narrows down to that
     task plus everything it unlocks. Cleared on project switch and when the
     root task disappears. */
  const branchSet = useMemo(() => {
    if (branchRoot == null || !byId.has(branchRoot)) return null;
    const set = new Set(descendants(branchRoot));
    set.add(branchRoot);
    return set;
  }, [branchRoot, byId, descendants]);
  /* Branch focus keeps its own layout store — rearranging inside a branch must
     not bleed into the full graph's saved positions (or vice versa). */
  const posKey = branchSet != null ? `${posKeyBase}.b${branchRoot}` : posKeyBase;
  const scopedTasks = useMemo(() => (branchSet ? tasks.filter((t) => branchSet.has(t.id)) : tasks), [tasks, branchSet]);
  const scopedEdges = useMemo(
    () => (branchSet ? edges.filter((e) => branchSet.has(e.sourceId) && branchSet.has(e.targetId)) : edges),
    [edges, branchSet],
  );
  const prevProject = useRef(currentId);
  useEffect(() => {
    if (prevProject.current !== currentId) {
      prevProject.current = currentId;
      focusBranch(null);
      setSelectMode(false);
      setPicked(new Set());
      setHistPanel(false);
      setArchiveBar(false);
      setViewerArchive(null);
    }
  }, [currentId, focusBranch]);
  useEffect(() => {
    if (branchRoot != null && status === 'ready' && !byId.has(branchRoot)) focusBranch(null);
  }, [branchRoot, status, byId, focusBranch]);
  // Valid drop targets for the current connect gesture (computed once at start).
  const validTargets = useRef<Set<number>>(new Set());
  // Live drop target, mirrored outside React state: pointerup can fire before
  // the render from the last pointermove, so it must not read `connect`.
  const liveTarget = useRef<number | null>(null);

  /* Fold state follows the project: reload when the storage keys change,
     prune entries for deleted tasks/groups, persist edits. The owner ref
     mirrors the posOwner guard below — on a project switch the key flips a
     render before the state does, and persisting in that window would write
     the old project's data under the new key. */
  const foldOwner = useRef(collapseKey);
  useEffect(() => {
    if (foldOwner.current !== collapseKey) {
      foldOwner.current = collapseKey;
      setCollapsed(readIdSet(collapseKey));
      setFoldedGroups(readIdSet(gfoldKey));
    }
  }, [collapseKey, gfoldKey]);
  useEffect(() => {
    if (status !== 'ready' || tasks.length === 0) return;
    const alive = new Set(tasks.map((t) => t.id));
    setCollapsed((prev) => {
      const pruned = new Set([...prev].filter((id) => alive.has(id)));
      return pruned.size === prev.size ? prev : pruned;
    });
    const aliveGroups = new Set(groups.map((g) => g.id));
    setFoldedGroups((prev) => {
      const pruned = new Set([...prev].filter((id) => aliveGroups.has(id)));
      return pruned.size === prev.size ? prev : pruned;
    });
  }, [status, tasks, groups]);
  useEffect(() => {
    if (foldOwner.current === collapseKey) writeIdSet(collapseKey, collapsed);
  }, [collapseKey, collapsed]);
  useEffect(() => {
    if (foldOwner.current === collapseKey) writeIdSet(gfoldKey, foldedGroups);
  }, [collapseKey, gfoldKey, foldedGroups]);

  /* ------------------------------------------------------------
     Visibility: folded groups swallow their members into a synthetic
     super-node; branch collapse folds subtrees under a task.
     rep maps hidden task id → the node (task id or -groupId) shown for it.
     ------------------------------------------------------------ */
  const memberOfFolded = useMemo(() => {
    const m = new Map<number, number>();
    if (!foldedGroups.size) return m;
    for (const t of scopedTasks) if (t.groupId != null && foldedGroups.has(t.groupId)) m.set(t.id, -t.groupId);
    return m;
  }, [scopedTasks, foldedGroups]);

  const branchRep = useMemo(() => {
    const remaining = scopedTasks.filter((t) => !memberOfFolded.has(t.id)).map((t) => t.id);
    return computeCollapse(remaining, scopedEdges, collapsed);
  }, [scopedTasks, memberOfFolded, scopedEdges, collapsed]);

  const rep = useMemo(() => {
    const m = new Map(branchRep);
    for (const [id, r] of memberOfFolded) m.set(id, r);
    return m;
  }, [branchRep, memberOfFolded]);

  const visibleTasks = useMemo(() => scopedTasks.filter((t) => !rep.has(t.id)), [scopedTasks, rep]);

  const groupNodes = useMemo<GroupNode[]>(() => {
    const counts = new Map<number, number>();
    for (const r of memberOfFolded.values()) counts.set(-r, (counts.get(-r) ?? 0) + 1);
    return groups
      .filter((g) => foldedGroups.has(g.id) && (counts.get(g.id) ?? 0) > 0)
      .map((g) => ({ id: -g.id, gid: g.id, title: g.title, count: counts.get(g.id)! }));
  }, [groups, foldedGroups, memberOfFolded]);

  /** How many tasks each branch-collapsed node hides (for its +N badge). */
  const hiddenCounts = useMemo(() => {
    const m = new Map<number, number>();
    for (const r of branchRep.values()) m.set(r, (m.get(r) ?? 0) + 1);
    return m;
  }, [branchRep]);

  const childCounts = useMemo(() => {
    const ids = new Set(scopedTasks.map((t) => t.id));
    const m = new Map<number, number>();
    for (const e of scopedEdges) {
      if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
      m.set(e.sourceId, (m.get(e.sourceId) ?? 0) + 1);
    }
    return m;
  }, [scopedTasks, scopedEdges]);

  /* Edges to draw: endpoints hidden by a fold are re-routed to their
     super-node, so bundles crossing the fold stay visible as one faint link. */
  const drawnEdges = useMemo(() => {
    const seen = new Set<string>();
    const list: { edge: GraphEdge; from: number; to: number; agg: boolean }[] = [];
    for (const e of scopedEdges) {
      const from = rep.get(e.sourceId) ?? e.sourceId;
      const to = rep.get(e.targetId) ?? e.targetId;
      if (from === to) continue;
      const agg = from !== e.sourceId || to !== e.targetId;
      const key = agg ? `a${from}>${to}` : `e${e.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ edge: e, from, to, agg });
    }
    return list;
  }, [scopedEdges, rep]);

  /* The layout engine sees tasks and group super-nodes uniformly. */
  const layoutNodes = useMemo<LayoutNode[]>(
    () => [
      ...visibleTasks.map((t) => ({ id: t.id, title: t.title })),
      ...groupNodes.map((g) => ({ id: g.id, title: g.title })),
    ],
    [visibleTasks, groupNodes],
  );
  const layoutLinks = useMemo<LayoutLink[]>(
    () => drawnEdges.map(({ from, to }) => ({ sourceId: from, targetId: to })),
    [drawnEdges],
  );

  // The storage key is part of the signature: entering/leaving branch focus
  // must re-read the right store even when the visible node set is identical.
  const sig = useMemo(
    () => posKey + '|' + layoutNodes.map((n) => n.id).sort((a, b) => a - b).join(','),
    [posKey, layoutNodes],
  );
  const [positions, setPositions] = useState<Map<number, XY>>(() => new Map());
  // Which storage key the current `positions` belong to. On a project switch
  // posKey changes immediately while positions/tasks still hold the previous
  // project's data until the reload lands — without this guard the debounced
  // persist below would overwrite (and prune) the new project's saved layout.
  const posOwner = useRef('');
  const [tf, setTf] = useState<Transform>({ tx: 0, ty: 0, k: 1 });
  const [panning, setPanning] = useState(false);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const laidSig = useRef('');
  const needFit = useRef(false);
  const drag = useRef<Drag | null>(null);
  // Active touch points + pinch gesture state (for two-finger zoom on phones).
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ startDist: number; startK: number; gx: number; gy: number } | null>(null);

  // (Re)compute layout only when the set of nodes changes — keeps manual drags.
  // Saved positions overlay the fresh layout, so the arrangement survives reloads.
  useEffect(() => {
    if (sig !== laidSig.current) {
      laidSig.current = sig;
      const layout = computeLayout(layoutNodes, layoutLinks);
      // A branch starts from the full graph's arrangement; its own saved
      // positions (from earlier branch sessions) win over that.
      if (posKey !== posKeyBase) {
        for (const [id, p] of readPositions(posKeyBase)) if (layout.has(id)) layout.set(id, p);
      }
      for (const [id, p] of readPositions(posKey)) if (layout.has(id)) layout.set(id, p);
      setPositions(layout);
      posOwner.current = posKey;
      needFit.current = true;
    }
  }, [sig, layoutNodes, layoutLinks, posKey, posKeyBase]);

  // Persist the arrangement (debounced — drags update positions every frame).
  // Merged over what's already saved, so positions of hidden tasks survive;
  // entries for deleted tasks/groups get pruned.
  useEffect(() => {
    if (!positions.size || posOwner.current !== posKey) return;
    const t = window.setTimeout(() => {
      const merged = readPositions(posKey);
      for (const [id, p] of positions) merged.set(id, p);
      const alive = new Set<number>(tasks.map((t2) => t2.id));
      for (const g of groups) alive.add(-g.id);
      for (const id of [...merged.keys()]) if (!alive.has(id)) merged.delete(id);
      writePositions(posKey, merged);
    }, 400);
    return () => window.clearTimeout(t);
  }, [positions, posKey, tasks, groups]);

  // Branch layout stores die with their root task. The posOwner guard keeps a
  // project-switch window (stale tasks, fresh key) from touching the new
  // project's stores.
  useEffect(() => {
    if (status !== 'ready' || posOwner.current !== posKeyBase) return;
    const prefix = `${posKeyBase}.b`;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix) && !byId.has(Number(k.slice(prefix.length)))) {
        localStorage.removeItem(k);
      }
    }
  }, [status, byId, posKeyBase]);

  const fitToView = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const W = r.width || 800;
    const H = r.height || 520;
    const pts = [...positions.values()];
    if (!pts.length) { setTf({ tx: 0, ty: 0, k: 1 }); return; }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      minX = Math.min(minX, p.x - NODE_W / 2);
      maxX = Math.max(maxX, p.x + NODE_W / 2);
      minY = Math.min(minY, p.y - NODE_H / 2);
      maxY = Math.max(maxY, p.y + NODE_H / 2);
    }
    const pad = 56;
    const k = Math.max(0.25, Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY), 1.5));
    setTf({ k, tx: W / 2 - ((minX + maxX) / 2) * k, ty: H / 2 - ((minY + maxY) / 2) * k });
  }, [positions]);

  // Center the main view on a world-space point — used by the minimap to jump around.
  const centerOn = useCallback((wx: number, wy: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setTf((t) => ({ ...t, tx: (r.width || 800) / 2 - wx * t.k, ty: (r.height || 520) / 2 - wy * t.k }));
  }, []);

  useLayoutEffect(() => {
    if (needFit.current && positions.size) { needFit.current = false; fitToView(); }
  }, [positions, fitToView]);

  // Refit when entering/leaving fullscreen — the canvas size changes underneath.
  const prevFull = useRef(full);
  useLayoutEffect(() => {
    if (prevFull.current !== full) { prevFull.current = full; fitToView(); }
  }, [full, fitToView]);

  const zoom = useCallback((px: number, py: number, factor: number) => {
    setTf((t) => {
      const k = Math.max(0.25, Math.min(2.6, t.k * factor));
      const gx = (px - t.tx) / t.k;
      const gy = (py - t.ty) / t.k;
      return { k, tx: px - gx * k, ty: py - gy * k };
    });
  }, []);

  // Native non-passive wheel listener so preventDefault works.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = svg.getBoundingClientRect();
      zoom(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [zoom]);

  /* Escape: close the groups panel / dismiss the popover / cancel a link-drag /
     leave select mode / drop the branch filter / leave fullscreen — in that
     order, and (for the latter three) only when no drawer or modal is open —
     those close first via the app-level handler. Runs in the capture phase so
     the app handler can't race it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (viewerArchive) { setViewerArchive(null); e.stopImmediatePropagation(); return; }
      if (archiveBar) { setArchiveBar(false); e.stopImmediatePropagation(); return; }
      if (histPanel) { setHistPanel(false); e.stopImmediatePropagation(); return; }
      if (panel) { setPanel(false); e.stopImmediatePropagation(); return; }
      if (popover) { setPopover(null); e.stopImmediatePropagation(); return; }
      if (connect) {
        setConnect(null);
        drag.current = null;
        e.stopImmediatePropagation();
        return;
      }
      if (selectedId != null || form || projectForm || confirmRequest) return;
      if (selectMode) { exitSelect(); e.stopImmediatePropagation(); return; }
      if (branchRoot != null) { focusBranch(null); e.stopImmediatePropagation(); return; }
      if (full) setFull(false);
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  });

  // Picked tasks must stay real and on the board (deletes, folds, branch swaps).
  useEffect(() => {
    setPicked((prev) => {
      if (!prev.size) return prev;
      const alive = new Set(visibleTasks.map((t) => t.id));
      const pruned = new Set([...prev].filter((id) => alive.has(id)));
      return pruned.size === prev.size ? prev : pruned;
    });
  }, [visibleTasks]);

  const togglePick = useCallback((id: number) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const exitSelect = useCallback(() => {
    setSelectMode(false);
    setPicked(new Set());
  }, []);

  /** Which nodes may become the dependent of `sourceId` (drop targets). */
  const computeValidTargets = useCallback((sourceId: number) => {
    // Ancestors of the source (reverse reachability): linking to any of them
    // would close a cycle. The backend re-validates; this is instant feedback.
    const parents = new Map<number, number[]>();
    for (const e of edges) {
      const arr = parents.get(e.targetId);
      if (arr) arr.push(e.sourceId);
      else parents.set(e.targetId, [e.sourceId]);
    }
    const blocked = new Set<number>([sourceId]);
    const stack = [sourceId];
    while (stack.length) {
      const u = stack.pop()!;
      for (const p of parents.get(u) ?? []) if (!blocked.has(p)) { blocked.add(p); stack.push(p); }
    }
    for (const e of edges) if (e.sourceId === sourceId) blocked.add(e.targetId); // already linked
    const valid = new Set<number>();
    for (const t of visibleTasks) {
      if (t.status === 'TODO' && !blocked.has(t.id)) valid.add(t.id);
    }
    return valid;
  }, [edges, visibleTasks]);

  const toGraph = useCallback((clientX: number, clientY: number): XY => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: (clientX - r.left - tf.tx) / tf.k, y: (clientY - r.top - tf.ty) / tf.k };
  }, [tf]);

  const openPopoverAt = useCallback((clientX: number, clientY: number, make: (x: number, y: number) => Popover) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.min(Math.max(clientX - r.left, 8), r.width - 200);
    const y = Math.min(Math.max(clientY - r.top, 8), r.height - 96);
    setPopover(make(x, y));
  }, []);

  function onPointerDown(e: RPointerEvent<SVGSVGElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (popover) setPopover(null);
    if (panel) setPanel(false);
    if (histPanel) setHistPanel(false);

    // Second finger down → begin pinch-zoom; abandon any single-pointer gesture.
    if (pointers.current.size === 2) {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const [a, b] = [...pointers.current.values()];
      const mx = (a.x + b.x) / 2 - r.left;
      const my = (a.y + b.y) / 2 - r.top;
      pinch.current = {
        startDist: Math.hypot(a.x - b.x, a.y - b.y),
        startK: tf.k,
        gx: (mx - tf.tx) / tf.k,
        gy: (my - tf.ty) / tf.k,
      };
      drag.current = null;
      setConnect(null);
      setPanning(false);
      return;
    }
    if (pointers.current.size > 2) return;

    const el = e.target as Element;
    const handle = el.closest('[data-handle]');
    if (handle) {
      const sourceId = Number(handle.getAttribute('data-handle'));
      validTargets.current = computeValidTargets(sourceId);
      liveTarget.current = null;
      const g = toGraph(e.clientX, e.clientY);
      drag.current = { type: 'connect', sourceId };
      setConnect({ sourceId, gx: g.x, gy: g.y, targetId: null });
      return;
    }
    const chip = el.closest('[data-collapse]');
    if (chip) {
      drag.current = { type: 'chip', id: Number(chip.getAttribute('data-collapse')), sx: e.clientX, sy: e.clientY, moved: false };
      return;
    }
    const branchEl = el.closest('[data-branch]');
    if (branchEl) {
      drag.current = { type: 'branch', id: Number(branchEl.getAttribute('data-branch')), sx: e.clientX, sy: e.clientY, moved: false };
      return;
    }
    const node = el.closest('[data-node]');
    if (node) {
      const id = Number(node.getAttribute('data-node'));
      const p = positions.get(id);
      if (!p) return;
      drag.current = { type: 'node', id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, moved: false };
      return;
    }
    const edgeEl = el.closest('[data-edge]');
    if (edgeEl) {
      drag.current = { type: 'edge', id: Number(edgeEl.getAttribute('data-edge')), sx: e.clientX, sy: e.clientY, moved: false };
      return;
    }
    drag.current = { type: 'pan', sx: e.clientX, sy: e.clientY, otx: tf.tx, oty: tf.ty, moved: false };
    setPanning(true);
  }

  function onPointerMove(e: RPointerEvent<SVGSVGElement>) {
    if (pointers.current.has(e.pointerId)) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // Pinch: keep the graph point grabbed between the fingers under the live midpoint.
    if (pinch.current && pointers.current.size >= 2) {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2 - r.left;
      const my = (a.y + b.y) / 2 - r.top;
      const { startDist, startK, gx, gy } = pinch.current;
      const k = Math.max(0.25, Math.min(2.6, (startK * dist) / startDist));
      setTf({ k, tx: mx - gx * k, ty: my - gy * k });
      return;
    }

    const d = drag.current;
    if (!d) return;

    if (d.type === 'connect') {
      // Pointer capture pins e.target to the svg — hit-test manually.
      const under = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-node]');
      const overId = under ? Number(under.getAttribute('data-node')) : null;
      const targetId = overId != null && validTargets.current.has(overId) ? overId : null;
      liveTarget.current = targetId;
      const g = toGraph(e.clientX, e.clientY);
      setConnect({ sourceId: d.sourceId, gx: g.x, gy: g.y, targetId });
      return;
    }

    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    // A finger jitters by several px during a "tap"; a 3px slop (fine for a mouse)
    // reads most taps as drags and swallows the node selection. Give touch/pen a
    // larger slop so a tap still opens the task panel on mobile.
    const slop = e.pointerType === 'mouse' ? 3 : 12;
    if (Math.abs(dx) + Math.abs(dy) > slop) d.moved = true;
    if (d.type === 'pan') {
      setTf((t) => ({ ...t, tx: d.otx + dx, ty: d.oty + dy }));
    } else if (d.type === 'node') {
      setPositions((prev) => {
        const next = new Map(prev);
        next.set(d.id, { x: d.ox + dx / tf.k, y: d.oy + dy / tf.k });
        return next;
      });
    }
  }

  function onPointerUp(e: RPointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;

    const d = drag.current;
    if (d) {
      if (d.type === 'node' && !d.moved) {
        // Tapping a group super-node expands it; a task tap picks it in select
        // mode and opens its panel otherwise.
        if (d.id < 0) unfoldGroup(-d.id);
        else if (selectMode) togglePick(d.id);
        else select(d.id);
      } else if (d.type === 'chip' && !d.moved) toggleCollapse(d.id);
      // Tap the ◎ on a node: focus its branch; tapping the current root exits.
      else if (d.type === 'branch' && !d.moved) focusBranch(branchRoot === d.id ? null : d.id);
      else if (d.type === 'edge' && !d.moved) {
        openPopoverAt(e.clientX, e.clientY, (x, y) => ({ kind: 'edge', edgeId: d.id, x, y }));
      } else if (d.type === 'connect') {
        const targetId = liveTarget.current;
        if (targetId != null) {
          openPopoverAt(e.clientX, e.clientY, (x, y) => ({
            kind: 'create', sourceId: d.sourceId, targetId, x, y,
          }));
        }
        liveTarget.current = null;
        setConnect(null);
      }
    }
    drag.current = null;
    setPanning(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  function onPointerCancel(e: RPointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (drag.current?.type === 'connect') setConnect(null);
    drag.current = null;
    setPanning(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  const toggleCollapse = useCallback((id: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const foldGroup = useCallback((gid: number) => {
    setFoldedGroups((prev) => new Set(prev).add(gid));
  }, []);
  const unfoldGroup = useCallback((gid: number) => {
    setFoldedGroups((prev) => {
      const next = new Set(prev);
      next.delete(gid);
      return next;
    });
  }, []);

  async function createLink(sourceId: number, targetId: number, type: DependencyType) {
    setPopover(null);
    await bind(targetId, sourceId, type);
  }
  async function removeLink(edge: GraphEdge) {
    setPopover(null);
    await unbind(edge.targetId, edge.sourceId);
  }
  async function switchLinkType(edge: GraphEdge) {
    setPopover(null);
    const next: DependencyType = edge.type === 'OPTIONAL_LINK' ? 'STRICT_PREREQUISITE' : 'OPTIONAL_LINK';
    await changeBindType(edge.targetId, edge.sourceId, next);
  }

  // Hovering a node previews its connections; a click-selection holds them when
  // not hovering. A selection hidden inside a fold is ignored — otherwise it
  // would dim the whole graph around a node that isn't drawn. While a
  // link-drag is live, dimming switches to "valid targets" instead.
  const visibleIds = useMemo(() => new Set(visibleTasks.map((t) => t.id)), [visibleTasks]);
  const focusId = connect ? null : hoverId ?? (selectedId != null && visibleIds.has(selectedId) ? selectedId : null);

  const neighbors = useMemo(() => {
    const set = new Set<number>();
    if (focusId != null) {
      for (const e of scopedEdges) {
        if (e.sourceId === focusId) set.add(e.targetId);
        if (e.targetId === focusId) set.add(e.sourceId);
      }
    }
    return set;
  }, [scopedEdges, focusId]);

  // Influence overlay: normalize the heat by the busiest visible node, and (when
  // a node is focused) resolve the downstream cone it drives so we can light it up.
  const maxInfluence = useMemo(
    () => visibleTasks.reduce((m, t) => Math.max(m, influenceById.get(t.id) ?? 0), 0),
    [visibleTasks, influenceById],
  );

  // Colour every drawn node for the minimap dots: status tint for tasks, the
  // group's own hue for folded super-nodes.
  const nodeColor = useMemo(() => {
    const statusVar: Record<string, string> = {
      TODO: 'var(--todo)', IN_PROGRESS: 'var(--progress)',
      COMPLETED: 'var(--done)', EXPIRED: 'var(--expired)',
    };
    const m = new Map<number, string>();
    for (const t of visibleTasks) m.set(t.id, t.isBlocked ? 'var(--blocked)' : statusVar[t.status] ?? 'var(--todo)');
    for (const g of groupNodes) m.set(g.id, groupColor(g.gid));
    return m;
  }, [visibleTasks, groupNodes]);
  const influenceCone = useMemo(
    () => (influenceMode && focusId != null ? strictDescendants(focusId) : null),
    [influenceMode, focusId, strictDescendants],
  );
  const coneWithRoot = useMemo(
    () => (influenceCone != null && focusId != null ? new Set([focusId, ...influenceCone]) : null),
    [influenceCone, focusId],
  );
  // The cone borrows the root's accent: green depth behind finished work, rust ahead of open work.
  const coneColor = coneWithRoot != null && focusId != null
    ? (byId.get(focusId)?.status === 'COMPLETED' ? 'var(--inf-done)' : 'var(--inf-open)')
    : null;

  const overlay =
    status === 'loading' ? <LoadingState /> :
    status === 'error' ? <ConnectionError /> :
    tasks.length === 0 ? <EmptyState /> : null;

  const connectSource = connect ? positions.get(connect.sourceId) : null;
  const popEdge = popover?.kind === 'edge' ? edges.find((e) => e.id === popover.edgeId) : null;
  const popSourceExpired = popover?.kind === 'create' && byId.get(popover.sourceId)?.status === 'EXPIRED';
  const collapsedCount = branchRep.size;
  // A branch can be archived only when every task in it is completed — the
  // backend enforces the same rule, this just keeps the button honest.
  const branchAllCompleted = branchSet != null && scopedTasks.length > 0 &&
    scopedTasks.every((t) => t.status === 'COMPLETED');

  return (
    <section className={`view graph ${full ? 'graph--full' : ''}`}>
      <div className="graph-toolbar">
        <div className="legend">
          <LegendSwatch color="var(--todo)" label="To do" />
          <LegendSwatch color="var(--progress)" label="In progress" />
          <LegendSwatch color="var(--done)" label="Completed" />
          <LegendSwatch color="var(--blocked)" label="Blocked" />
          {tasks.some((t) => t.status === 'EXPIRED') && <LegendSwatch color="var(--expired)" label="Expired" />}
          <span className="legend__item"><span className="legend__line" />Required</span>
          <span className="legend__item"><span className="legend__line legend__line--dash" />Optional</span>
        </div>
        <div className="gbtns">
          {branchSet && (
            <button
              className="btn btn--sm gbranch"
              title="Branch focus is on — click to show the whole project (Esc)"
              onClick={() => focusBranch(null)}
            >
              <Icon name="target" />
              {truncate(byId.get(branchRoot!)?.title ?? '', 18)} · {scopedTasks.length}
              <Icon name="x" />
            </button>
          )}
          {branchSet && (
            <button
              className="btn btn--sm"
              disabled={!branchAllCompleted}
              title={branchAllCompleted
                ? 'Move this completed branch into the archive'
                : 'Only a fully completed branch can be archived'}
              onClick={() => {
                exitSelect();
                setPanel(false);
                setHistPanel(false);
                setArchiveBar(true);
              }}
            >
              <Icon name="archive" />
              <span className="gbtn__label">Archive</span>
            </button>
          )}
          {collapsedCount > 0 && (
            <button
              className="btn btn--ghost btn--sm"
              title="Expand all collapsed branches"
              onClick={() => setCollapsed(new Set())}
            >
              {collapsedCount} hidden<span className="gbtn__label"> — expand</span>
            </button>
          )}
          <button
            className={`btn btn--ghost btn--sm ${influenceMode ? 'is-active' : ''}`}
            title="Influence overlay — shade tasks by how much they unlock; hover one to light up its downstream cone"
            aria-pressed={influenceMode}
            onClick={() => setInfluenceMode((v) => !v)}
          >
            <Icon name="influence" />
            <span className="gbtn__label">Influence</span>
          </button>
          <button
            className={`btn btn--ghost btn--sm ${selectMode ? 'is-active' : ''}`}
            title="Pick several tasks, then group them in one go"
            aria-pressed={selectMode}
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
          >
            <Icon name="check" />
            <span className="gbtn__label">Select</span>
          </button>
          <button
            className={`btn btn--ghost btn--sm ${panel ? 'is-active' : ''}`}
            title="Task groups"
            aria-expanded={panel}
            onClick={() => { setPanel((p) => !p); setHistPanel(false); }}
          >
            <Icon name="folder" />
            <span className="gbtn__label">Groups{groups.length > 0 ? ` (${groups.length})` : ''}</span>
          </button>
          <button
            className={`btn btn--ghost btn--sm ${histPanel ? 'is-active' : ''}`}
            title="Archived branches — the graph's history"
            aria-expanded={histPanel}
            onClick={() => { setHistPanel((h) => !h); setPanel(false); }}
          >
            <Icon name="archive" />
            <span className="gbtn__label">History{archivesTotal > 0 ? ` (${archivesTotal})` : ''}</span>
          </button>
          <button className="iconbtn" title="Fit to view" onClick={fitToView}><Icon name="fit" /></button>
          <button
            className="iconbtn"
            title="Re-arrange"
            onClick={() => { setPositions(computeLayout(layoutNodes, layoutLinks)); needFit.current = true; }}
          >
            <Icon name="refresh" />
          </button>
          <button
            className="iconbtn"
            title={full ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
            aria-pressed={full}
            onClick={() => setFull((f) => !f)}
          >
            <Icon name={full ? 'minimize' : 'maximize'} />
          </button>
        </div>
      </div>

      <div className="graph-canvas" ref={canvasRef}>
        <svg
          ref={svgRef}
          className={`graph-svg ${panning ? 'is-panning' : ''} ${connect ? 'is-linking' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
            </marker>
          </defs>
          <g transform={`translate(${tf.tx},${tf.ty}) scale(${tf.k})`}>
            <g className="edges">
              {drawnEdges.map(({ edge, from, to, agg }) => {
                const a = positions.get(from);
                const b = positions.get(to);
                if (!a || !b) return null;
                const d = edgePath(a, b);
                if (agg) {
                  return (
                    <path key={`a${from}>${to}`} className="edge edge--agg" d={d} markerEnd="url(#arrow)">
                      <title>Links into a folded node</title>
                    </path>
                  );
                }
                const inCone = coneWithRoot != null
                  && edge.type === 'STRICT_PREREQUISITE'
                  && coneWithRoot.has(edge.sourceId) && coneWithRoot.has(edge.targetId);
                const active = coneWithRoot != null
                  ? inCone
                  : focusId != null && (edge.sourceId === focusId || edge.targetId === focusId);
                const dim = coneWithRoot != null ? !inCone : ((focusId != null && !active) || !!connect);
                return (
                  <g key={edge.id}>
                    <path
                      className={`edge edge--${edge.type === 'OPTIONAL_LINK' ? 'optional' : 'strict'} ${active ? 'is-active' : ''} ${inCone ? 'edge--influence' : ''} ${dim ? 'is-dim' : ''}`}
                      style={inCone && coneColor ? { stroke: coneColor } : undefined}
                      d={d}
                      markerEnd="url(#arrow)"
                    />
                    {/* Fat invisible twin so the link is tappable. */}
                    <path className="edge-hit" data-edge={edge.id} d={d} />
                  </g>
                );
              })}
              {connect && connectSource && (
                <path
                  className={`edge edge--ghost ${connect.targetId != null ? 'is-valid' : ''}`}
                  d={connect.targetId != null && positions.get(connect.targetId)
                    ? edgePath(connectSource, positions.get(connect.targetId)!)
                    : ghostPath(connectSource, connect.gx, connect.gy)}
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
            <g className="nodes">
              {visibleTasks.map((t) => {
                const p = positions.get(t.id);
                if (!p) return null;
                const isSource = connect?.sourceId === t.id;
                const isTarget = connect?.targetId === t.id;
                const linkable = connect ? validTargets.current.has(t.id) : false;
                const selected = focusId === t.id || isSource;
                const inCone = coneWithRoot != null && coneWithRoot.has(t.id);
                const dim = connect
                  ? !isSource && !linkable
                  : coneWithRoot != null
                    ? !inCone
                    : focusId != null && focusId !== t.id && !neighbors.has(t.id);
                const influence = influenceById.get(t.id) ?? 0;
                return (
                  <TaskNode
                    key={t.id}
                    task={t}
                    p={p}
                    selected={selected}
                    dim={dim}
                    highlight={isTarget}
                    // A collapse that hides nothing (children reachable from
                    // elsewhere) renders as expanded — no misleading "+0".
                    isCollapsed={collapsed.has(t.id) && (hiddenCounts.get(t.id) ?? 0) > 0}
                    hiddenCount={hiddenCounts.get(t.id) ?? 0}
                    childCount={childCounts.get(t.id) ?? 0}
                    selectable={selectMode}
                    picked={picked.has(t.id)}
                    isBranchRoot={branchRoot === t.id}
                    influenceMode={influenceMode}
                    influence={influence}
                    heat={maxInfluence > 0 ? influence / maxInfluence : 0}
                    coneRoot={influenceCone != null && focusId === t.id}
                    onHover={setHoverId}
                  />
                );
              })}
              {groupNodes.map((g) => {
                const p = positions.get(g.id);
                if (!p) return null;
                return <GroupSuperNode key={g.id} node={g} p={p} dim={!!connect} />;
              })}
            </g>
          </g>
        </svg>

        {popover?.kind === 'create' && (
          <div className="gpop" style={{ left: popover.x, top: popover.y }}>
            <div className="gpop__title">
              {truncate(byId.get(popover.sourceId)?.title ?? '', 18)} → {truncate(byId.get(popover.targetId)?.title ?? '', 18)}
            </div>
            <div className="gpop__row">
              <button
                className="btn btn--sm"
                disabled={popSourceExpired}
                title={popSourceExpired ? 'An expired task can never complete — use an optional link' : 'Must be done first — blocks the task'}
                onClick={() => void createLink(popover.sourceId, popover.targetId, 'STRICT_PREREQUISITE')}
              >
                <Icon name="lock" />Required
              </button>
              <button
                className="btn btn--ghost btn--sm"
                title="Related, but does not block"
                onClick={() => void createLink(popover.sourceId, popover.targetId, 'OPTIONAL_LINK')}
              >
                <Icon name="link" />Optional
              </button>
            </div>
          </div>
        )}
        {popover?.kind === 'edge' && popEdge && (
          <div className="gpop" style={{ left: popover.x, top: popover.y }}>
            <div className="gpop__title">
              {popEdge.type === 'OPTIONAL_LINK' ? 'Optional link' : 'Required prerequisite'}
              {': '}
              {truncate(byId.get(popEdge.sourceId)?.title ?? '', 16)} → {truncate(byId.get(popEdge.targetId)?.title ?? '', 16)}
            </div>
            <div className="gpop__row">
              <button
                className="btn btn--ghost btn--sm"
                title={popEdge.type === 'OPTIONAL_LINK' ? 'Make it block the dependent task' : 'Keep the link but stop blocking'}
                onClick={() => void switchLinkType(popEdge)}
              >
                <Icon name={popEdge.type === 'OPTIONAL_LINK' ? 'lock' : 'link'} />
                {popEdge.type === 'OPTIONAL_LINK' ? 'Make required' : 'Make optional'}
              </button>
              <button className="btn btn--ghost btn--sm btn--danger" onClick={() => void removeLink(popEdge)}>
                <Icon name="unlink" />Remove
              </button>
            </div>
          </div>
        )}

        {panel && (
          <GroupsPanel
            projectId={currentId}
            folded={foldedGroups}
            onFold={foldGroup}
            onUnfold={unfoldGroup}
            onCreate={createGroup}
            onRename={renameGroup}
            onDelete={async (g) => {
              const ok = await confirm({
                title: 'Delete group',
                message: `Delete “${g.title}”? Its tasks stay — they just leave the group.`,
                confirmLabel: 'Delete',
              });
              if (ok) await removeGroup(g.id);
            }}
            onClose={() => setPanel(false)}
          />
        )}

        {selectMode && (
          <SelectBar
            count={picked.size}
            groups={groups}
            busyDisabled={picked.size === 0}
            onAssign={async (gid) => {
              if (await assignToGroup(gid, [...picked])) exitSelect();
            }}
            onCreate={async (title) => {
              if (await groupTasks(title, [...picked])) exitSelect();
            }}
            onDone={exitSelect}
          />
        )}

        {histPanel && (
          <HistoryPanel
            archives={archives}
            total={archivesTotal}
            onLoadMore={loadMoreArchives}
            onView={(a) => setViewerArchive(a)}
            onRestore={async (a) => {
              const ok = await confirm({
                title: 'Restore branch',
                message: `Return “${a.title}” to the active graph? Its tasks become part of the project again.`,
                confirmLabel: 'Restore',
              });
              if (ok) await restoreArchive(a.id);
            }}
            onClose={() => setHistPanel(false)}
          />
        )}

        {archiveBar && branchSet && branchRoot != null && (
          <ArchiveBar
            count={scopedTasks.length}
            onArchive={async (title) => {
              if (await archiveBranch(branchRoot, title)) setArchiveBar(false);
            }}
            onCancel={() => setArchiveBar(false)}
          />
        )}

        {!overlay && positions.size > 1 && (
          <Minimap positions={positions} colorById={nodeColor} tf={tf} svgRef={svgRef} onCenter={centerOn} />
        )}

        {overlay && <div className="graph-overlay">{overlay}</div>}
      </div>

      {viewerArchive && (
        <ArchiveViewer
          archive={viewerArchive}
          fetchGraph={fetchArchiveGraph}
          onClose={() => setViewerArchive(null)}
        />
      )}
      <div className="graph-help muted small" aria-hidden="true">
        Drag from a node’s ○ to another task to add a dependency · tap a line to edit it · ⊖ folds a branch
      </div>
    </section>
  );
}

/** One slim row: pick an existing group to assign right away, or flip into a
    "name the new group" input. Kept tiny so it doesn't wall off the graph. */
function SelectBar({ count, groups, busyDisabled, onAssign, onCreate, onDone }: {
  count: number;
  groups: { id: number; title: string }[];
  busyDisabled: boolean;
  onAssign: (groupId: number) => Promise<void>;
  onCreate: (title: string) => Promise<void>;
  onDone: () => void;
}) {
  const [creating, setCreating] = useState(groups.length === 0);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const disabled = busyDisabled || busy;

  async function create() {
    if (disabled || !title.trim()) return;
    setBusy(true);
    await onCreate(title.trim());
    setBusy(false);
  }

  return (
    <div className="gselbar">
      <span className="gselbar__count">{count} picked</span>
      {!creating ? (
        <select
          className="input input--sm gselbar__pick"
          value=""
          disabled={disabled}
          title={busyDisabled ? 'Tap tasks on the graph first' : 'Put the picked tasks into a group'}
          onChange={async (e) => {
            const v = e.target.value;
            if (v === 'new') { setCreating(true); return; }
            if (v === '') return;
            setBusy(true);
            await onAssign(Number(v));
            setBusy(false);
          }}
        >
          <option value="" disabled>Group…</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
          <option value="new">＋ New group…</option>
        </select>
      ) : (
        <>
          <input
            className="input input--sm gselbar__pick"
            autoFocus
            placeholder="Group name…"
            maxLength={255}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              e.preventDefault();
              void create();
            }}
          />
          <button className="btn btn--sm" disabled={disabled || !title.trim()} onClick={() => void create()}>
            Create
          </button>
          {groups.length > 0 && (
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => { setCreating(false); setTitle(''); }}
            >
              Cancel
            </button>
          )}
        </>
      )}
      <button className="iconbtn" title="Done" onClick={onDone}><Icon name="x" /></button>
    </div>
  );
}

function TaskNode({ task, p, selected, dim, highlight, isCollapsed, hiddenCount, childCount, selectable, picked, isBranchRoot, influenceMode, influence, heat, coneRoot, onHover }: {
  task: Task; p: XY; selected: boolean; dim: boolean; highlight: boolean;
  isCollapsed: boolean; hiddenCount: number; childCount: number;
  selectable: boolean; picked: boolean; isBranchRoot: boolean;
  influenceMode: boolean; influence: number; heat: number; coneRoot: boolean;
  onHover: (id: number | null) => void;
}) {
  const badge = isCollapsed ? `+${hiddenCount}` : '−';
  const badgeW = isCollapsed ? Math.max(26, 12 + 7 * badge.length) : 18;
  // Influence badge width grows with the digit count so it never clips.
  const infW = 24 + 7 * String(influence).length;
  return (
    <g
      className={[
        'gnode',
        `gnode--${task.status.toLowerCase()}`,
        task.isBlocked ? 'gnode--blocked' : '',
        selected ? 'is-selected' : '',
        dim ? 'is-dim' : '',
        highlight ? 'is-target' : '',
        isCollapsed ? 'gnode--super' : '',
        picked ? 'is-picked' : '',
        coneRoot ? 'gnode--cone-root' : '',
        // Influence accent colour: green depth for finished work, rust for open.
        influenceMode && influence > 0
          ? (task.status === 'COMPLETED' ? 'gnode--inf-done' : 'gnode--inf-open')
          : '',
        influenceMode && influence > 0 && heat >= 0.65 ? 'gnode--hot' : '',
      ].join(' ')}
      data-node={task.id}
      transform={`translate(${p.x},${p.y})`}
      // Mouse only: on touch a tap fires a synthetic mouseenter with no matching
      // mouseleave, leaving the graph dimmed around the last node. Touch focus
      // comes from selectedId instead, which clears when the panel closes.
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover(task.id); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onHover(null); }}
    >
      <title>{`${task.title} — ${STATUS_LABEL[task.status]}${influenceMode ? ` · unlocks ${influence} task${influence === 1 ? '' : 's'}` : ''}${isCollapsed ? ` (+${hiddenCount} hidden)` : ''}`}</title>
      {isCollapsed && <rect className="gnode__stack" x={-NODE_W / 2 + 5} y={-NODE_H / 2 + 5} width={NODE_W} height={NODE_H} rx={12} />}
      <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} />
      {/* Influence depth: a whisper of tint plus a gauge along the bottom edge —
          the fuller (and warmer/greener) the strip, the more this task drives. */}
      {influenceMode && influence > 0 && (
        <>
          <rect
            className="gnode__heat"
            x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12}
            style={{ opacity: 0.05 + 0.14 * heat }}
          />
          <rect className="gnode__heat-track" x={-NODE_W / 2 + 14} y={NODE_H / 2 - 8} width={NODE_W - 28} height={3} rx={1.5} />
          <rect
            className="gnode__heat-fill"
            x={-NODE_W / 2 + 14} y={NODE_H / 2 - 8}
            width={Math.max(6, (NODE_W - 28) * heat)} height={3} rx={1.5}
          />
        </>
      )}
      {task.groupId != null && (
        <rect className="gnode__gstrip" x={-NODE_W / 2} y={-NODE_H / 2 + 10} width={4} height={NODE_H - 20} rx={2} fill={groupColor(task.groupId)} />
      )}
      <circle className="gnode__dot" cx={-NODE_W / 2 + 20} cy={-10} r={4} />
      <text className="gnode__title" x={-NODE_W / 2 + 32} y={-6}>{truncate(task.title, 20)}</text>
      <text className="gnode__sub" x={-NODE_W / 2 + 32} y={16}>
        {task.durationHours}h ·{' '}
        <tspan className={`gnode__imp--${task.importance}`}>{IMPORTANCE_LABEL[task.importance]}</tspan>
        {task.isBlocked && <tspan> · Blocked</tspan>}
      </text>

      {/* Influence badge: a bolt + how many tasks this one drives. */}
      {influenceMode && influence > 0 && (
        <g className="gnode__inf" transform={`translate(${NODE_W / 2 - infW / 2 - 8}, ${NODE_H / 2 - 14})`}>
          <rect className="gnode__inf-bg" x={-infW / 2} y={-8.5} width={infW} height={17} rx={8.5} />
          <path
            className="gnode__inf-bolt"
            transform={`translate(${-infW / 2 + 9}, 0)`}
            d="M0.9 -4.6 L-2.7 0.5 H-0.7 L-1 4.6 L2.8 -0.7 H0.7 Z"
          />
          <text className="gnode__inf-label" x={3.5} y={0.5}>{influence}</text>
        </g>
      )}

      {/* Pick indicator (select mode): a checkbox in the node's corner. */}
      {selectable && (
        <g className="gnode__pickmark">
          <circle className="gnode__pick-ring" cx={NODE_W / 2 - 14} cy={-NODE_H / 2 + 14} r={9} />
          {picked && (
            <path
              className="gnode__pick-check"
              d={`M ${NODE_W / 2 - 18} ${-NODE_H / 2 + 14} l 3 3.5 l 5.5 -7`}
            />
          )}
        </g>
      )}

      {/* Branch focus: tap the ◎ to narrow the board to this task and
          everything it unlocks; tapping the active root exits. Hidden in
          select mode — its corner belongs to the pick checkbox there. */}
      {!selectable && (childCount > 0 || isBranchRoot) && (
        <g className={`gnode__branch ${isBranchRoot ? 'is-root' : ''}`} data-branch={task.id}>
          <circle className="gnode__branch-hit" cx={NODE_W / 2 - 20} cy={-NODE_H / 2} r={14} />
          <circle className="gnode__branch-bg" cx={NODE_W / 2 - 20} cy={-NODE_H / 2} r={9} />
          <circle className="gnode__branch-ring" cx={NODE_W / 2 - 20} cy={-NODE_H / 2} r={4.5} />
          <circle className="gnode__branch-core" cx={NODE_W / 2 - 20} cy={-NODE_H / 2} r={1.6} />
          <title>{isBranchRoot ? 'Exit branch focus' : 'Focus this branch'}</title>
        </g>
      )}

      {/* Link handle: drag it onto another task to create a dependency.
          Hidden in select mode — taps there are for picking. */}
      {!selectable && (
        <g className="gnode__handle" data-handle={task.id}>
          <circle className="gnode__handle-hit" cx={NODE_W / 2} cy={0} r={16} />
          <circle className="gnode__handle-dot" cx={NODE_W / 2} cy={0} r={6} />
        </g>
      )}

      {/* Collapse chip: folds/unfolds the branch below this task. */}
      {(childCount > 0 || isCollapsed) && (
        <g className="gnode__fold" data-collapse={task.id}>
          {/* Oversized invisible hit area — the pill alone is too small for a finger. */}
          <rect
            className="gnode__fold-hit"
            x={-badgeW / 2 - 8}
            y={NODE_H / 2 - 14}
            width={badgeW + 16}
            height={30}
          />
          <rect
            className="gnode__fold-bg"
            x={-badgeW / 2}
            y={NODE_H / 2 - 9}
            width={badgeW}
            height={18}
            rx={9}
          />
          <text className="gnode__fold-label" x={0} y={NODE_H / 2 + 4}>{badge}</text>
          <title>{isCollapsed ? `Expand branch (+${hiddenCount} tasks)` : 'Collapse this branch'}</title>
        </g>
      )}
    </g>
  );
}

/** A folded group drawn as one named super-node. Tap to expand. */
function GroupSuperNode({ node, p, dim }: { node: GroupNode; p: XY; dim: boolean }) {
  return (
    <g
      className={`gnode gnode--group ${dim ? 'is-dim' : ''}`}
      data-node={node.id}
      transform={`translate(${p.x},${p.y})`}
    >
      <title>{`${node.title} — ${node.count} tasks (tap to expand)`}</title>
      <rect className="gnode__stack" x={-NODE_W / 2 + 5} y={-NODE_H / 2 + 5} width={NODE_W} height={NODE_H} rx={12} />
      <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} style={{ stroke: groupColor(node.gid) }} />
      <rect className="gnode__gstrip" x={-NODE_W / 2} y={-NODE_H / 2 + 10} width={4} height={NODE_H - 20} rx={2} fill={groupColor(node.gid)} />
      <text className="gnode__title" x={-NODE_W / 2 + 18} y={-6}>{truncate(node.title, 22)}</text>
      <text className="gnode__sub" x={-NODE_W / 2 + 18} y={16}>{node.count} task{node.count === 1 ? '' : 's'} · tap to expand</text>
    </g>
  );
}

/** Server page size for the group management list; backend caps size at 100. */
const GROUP_PAGE_SIZE = 20;

function GroupsPanel({ projectId, folded, onFold, onUnfold, onCreate, onRename, onDelete, onClose }: {
  projectId: number | null;
  folded: Set<number>;
  onFold: (gid: number) => void;
  onUnfold: (gid: number) => void;
  onCreate: (title: string) => Promise<unknown>;
  onRename: (gid: number, title: string) => Promise<boolean>;
  onDelete: (g: TaskGroup) => Promise<unknown>;
  onClose: () => void;
}) {
  const [newTitle, setNewTitle] = useState('');
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  /* The management list is server-paged and searchable. Unlike the graph's
     active set, it also shows groups whose tasks were all archived — that's
     the place to spot and clean them up. */
  const [q, setQ] = useState('');
  const [items, setItems] = useState<TaskGroup[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  // Mutations (create/rename/delete) bump this to refetch the current search.
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (projectId == null) return;
    let cancelled = false;
    // Debounce typing; fetch instantly when the search is cleared or on refresh.
    const timer = window.setTimeout(() => {
      api.getGroups(projectId, 0, GROUP_PAGE_SIZE, q.trim() || undefined)
        .then((res) => {
          if (cancelled) return;
          setItems(res.items);
          setTotal(res.total);
        })
        .catch(() => {
          if (cancelled) return;
          setItems([]);
          setTotal(0);
        });
    }, q.trim() ? 250 : 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [projectId, q, refresh]);

  const refetch = () => setRefresh((n) => n + 1);

  async function loadMore() {
    if (projectId == null || loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = Math.floor(items.length / GROUP_PAGE_SIZE);
      const res = await api.getGroups(projectId, nextPage, GROUP_PAGE_SIZE, q.trim() || undefined);
      setItems((prev) => {
        const seen = new Set(prev.map((g) => g.id));
        return [...prev, ...res.items.filter((g) => !seen.has(g.id))];
      });
      setTotal(res.total);
    } catch {
      // Non-fatal: the list simply keeps what it has.
    }
    setLoadingMore(false);
  }

  async function submitNew(e: FormEvent) {
    e.preventDefault();
    const t = newTitle.trim();
    if (!t || busy) return;
    setBusy(true);
    if (await onCreate(t)) setNewTitle('');
    setBusy(false);
    refetch();
  }

  async function submitRename(gid: number) {
    const t = draft.trim();
    setRenamingId(null);
    if (t && !busy) {
      setBusy(true);
      await onRename(gid, t);
      setBusy(false);
      refetch();
    }
  }

  return (
    <div className="gpanel">
      <div className="gpanel__head">
        <span className="gpanel__title"><Icon name="folder" /> Groups{total > 0 ? ` (${total})` : ''}</span>
        <button className="iconbtn iconbtn--sm" title="Close" onClick={onClose}><Icon name="x" /></button>
      </div>
      <input
        className="input input--sm gpanel__search"
        placeholder="Search groups…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="gpanel__list">
        {items.length === 0 && (
          <div className="muted small gpanel__empty">
            {q.trim()
              ? 'No groups match the search.'
              : 'No groups yet. Create one and pick it in a task’s panel — then fold the whole group into a single node here.'}
          </div>
        )}
        {items.map((g) => {
          const count = g.activeTaskCount ?? 0;
          const isFolded = folded.has(g.id);
          return (
            <div key={g.id} className="gpanel__row">
              <span className="gpanel__dot" style={{ background: groupColor(g.id) }} />
              {renamingId === g.id ? (
                <input
                  className="input input--sm gpanel__rename"
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={() => void submitRename(g.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); void submitRename(g.id); }
                    if (e.key === 'Escape') { e.stopPropagation(); setRenamingId(null); }
                  }}
                />
              ) : (
                <span className="gpanel__name" title={g.title}>
                  {g.title} <span className="muted">· {count}</span>
                </span>
              )}
              <button
                className={`btn btn--ghost btn--sm ${isFolded ? 'is-active' : ''}`}
                disabled={count === 0}
                title={count === 0 ? 'No active tasks in this group' : isFolded ? 'Expand back into tasks' : 'Fold into one node'}
                onClick={() => (isFolded ? onUnfold(g.id) : onFold(g.id))}
              >
                {isFolded ? 'Unfold' : 'Fold'}
              </button>
              <button
                className="iconbtn iconbtn--sm"
                title="Rename"
                onClick={() => { setRenamingId(g.id); setDraft(g.title); }}
              >
                <Icon name="edit" />
              </button>
              <button
                className="iconbtn iconbtn--sm iconbtn--danger"
                title="Delete group"
                onClick={() => void Promise.resolve(onDelete(g)).then(refetch)}
              >
                <Icon name="trash" />
              </button>
            </div>
          );
        })}
        {items.length < total && (
          <button className="btn btn--ghost btn--sm gpanel__more" disabled={loadingMore} onClick={() => void loadMore()}>
            {loadingMore ? 'Loading…' : `Load more (${items.length} of ${total})`}
          </button>
        )}
      </div>
      <form className="gpanel__new" onSubmit={submitNew}>
        <input
          className="input input--sm"
          placeholder="New group…"
          maxLength={255}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="btn btn--sm" type="submit" disabled={!newTitle.trim() || busy}>
          <Icon name="plus" />Add
        </button>
      </form>
    </div>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="legend__item">
      <span className="legend__swatch" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ============================================================
   Minimap — bird's-eye overview + draggable viewport
   ============================================================ */
const MINIMAP_W = 176;
const MINIMAP_H = 118;
const MINIMAP_PAD = 10;

function Minimap({ positions, colorById, tf, svgRef, onCenter }: {
  positions: Map<number, XY>;
  colorById: Map<number, string>;
  tf: Transform;
  svgRef: RefObject<SVGSVGElement>;
  onCenter: (wx: number, wy: number) => void;
}) {
  const dragging = useRef(false);

  // World bounds of all drawn nodes, then a uniform fit into the minimap box.
  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of positions.values()) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    }
    if (!Number.isFinite(minX)) return null;
    const worldW = Math.max(maxX - minX, NODE_W);
    const worldH = Math.max(maxY - minY, NODE_H);
    const s = Math.min((MINIMAP_W - MINIMAP_PAD * 2) / worldW, (MINIMAP_H - MINIMAP_PAD * 2) / worldH);
    const ox = (MINIMAP_W - worldW * s) / 2 - minX * s;
    const oy = (MINIMAP_H - worldH * s) / 2 - minY * s;
    return { s, ox, oy };
  }, [positions]);

  if (!bounds) return null;
  const { s, ox, oy } = bounds;
  const toMini = (x: number, y: number) => ({ x: ox + x * s, y: oy + y * s });

  // The rectangle of graph currently on screen, mapped into the minimap.
  const r = svgRef.current?.getBoundingClientRect();
  const W = r?.width || 800;
  const H = r?.height || 520;
  const view = {
    x: ox + (-tf.tx / tf.k) * s,
    y: oy + (-tf.ty / tf.k) * s,
    w: (W / tf.k) * s,
    h: (H / tf.k) * s,
  };

  const navigate = (e: RPointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - box.left;
    const my = e.clientY - box.top;
    onCenter((mx - ox) / s, (my - oy) / s);
  };

  return (
    <svg
      className="minimap"
      width={MINIMAP_W}
      height={MINIMAP_H}
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); navigate(e); }}
      onPointerMove={(e) => { if (dragging.current) navigate(e); }}
      onPointerUp={(e) => { dragging.current = false; try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ } }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      <rect className="minimap__bg" x={0} y={0} width={MINIMAP_W} height={MINIMAP_H} rx={8} />
      {[...positions].map(([id, p]) => {
        const m = toMini(p.x, p.y);
        return <circle key={id} cx={m.x} cy={m.y} r={id < 0 ? 3.4 : 2.6} fill={colorById.get(id) ?? 'var(--todo)'} />;
      })}
      <rect
        className="minimap__view"
        x={view.x} y={view.y} width={view.w} height={view.h}
        // Clamp the visual so a zoomed-out viewport doesn't spill past the frame.
        style={{ clipPath: `inset(0 round 3px)` }}
      />
    </svg>
  );
}

/* ============================================================
   Archive history — completed branches moved off the active graph
   ============================================================ */

const formatArchiveDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

function HistoryPanel({ archives, total, onLoadMore, onView, onRestore, onClose }: {
  archives: GraphArchive[];
  total: number;
  onLoadMore: () => Promise<void>;
  onView: (a: GraphArchive) => void;
  onRestore: (a: GraphArchive) => void;
  onClose: () => void;
}) {
  const [loadingMore, setLoadingMore] = useState(false);

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  }

  return (
    <div className="gpanel">
      <div className="gpanel__head">
        <span className="gpanel__title"><Icon name="archive" /> History</span>
        <button className="iconbtn iconbtn--sm" title="Close" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="gpanel__list">
        {archives.length === 0 && (
          <div className="muted small gpanel__empty">
            No archived branches yet. Focus a fully completed branch and hit
            “Archive” — it moves off the board but stays here.
          </div>
        )}
        {archives.map((a) => (
          <div key={a.id} className="gpanel__row">
            <span className="gpanel__name" title={a.title}>
              {a.title}{' '}
              <span className="muted">
                · {formatArchiveDate(a.archivedAt)} · {a.taskCount} task{a.taskCount === 1 ? '' : 's'}
              </span>
            </span>
            <button className="btn btn--ghost btn--sm" title="Open a read-only view of this branch" onClick={() => onView(a)}>
              View
            </button>
            <button className="btn btn--ghost btn--sm" title="Return the branch to the active graph" onClick={() => onRestore(a)}>
              Restore
            </button>
          </div>
        ))}
        {archives.length < total && (
          <button className="btn btn--ghost btn--sm gpanel__more" disabled={loadingMore} onClick={() => void loadMore()}>
            {loadingMore ? 'Loading…' : `Load more (${archives.length} of ${total})`}
          </button>
        )}
      </div>
    </div>
  );
}

function ArchiveBar({ count, onArchive, onCancel }: {
  count: number;
  onArchive: (title: string | null) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setBusy(true);
    await onArchive(title.trim() || null);
    setBusy(false);
  }

  return (
    <div className="gselbar">
      <span className="gselbar__count"><Icon name="archive" /> {count} task{count === 1 ? '' : 's'}</span>
      <span className="gselbar__pair">
        <input
          className="input input--sm"
          placeholder="Archive name (optional)…"
          maxLength={255}
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || busy) return;
            e.preventDefault();
            void submit();
          }}
        />
        <button className="btn btn--sm" disabled={busy} onClick={() => void submit()}>
          <Icon name="archive" />Archive
        </button>
      </span>
      <button className="iconbtn" title="Cancel" onClick={onCancel}><Icon name="x" /></button>
    </div>
  );
}

type ViewerState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; graph: TaskGraph };

/** Visible window of the archive graph, in graph coordinates. */
interface ViewerBox { x: number; y: number; w: number; h: number }

/** Read-only look at one archive's graph, laid out like the live board. */
function ArchiveViewer({ archive, fetchGraph, onClose }: {
  archive: GraphArchive;
  fetchGraph: (archiveId: number) => Promise<TaskGraph>;
  onClose: () => void;
}) {
  const [state, setState] = useState<ViewerState>({ kind: 'loading' });

  useEffect(() => {
    let alive = true;
    setState({ kind: 'loading' });
    fetchGraph(archive.id)
      .then((graph) => { if (alive) setState({ kind: 'ok', graph }); })
      .catch((err) => { if (alive) setState({ kind: 'error', message: (err as Error).message }); });
    return () => { alive = false; };
  }, [archive.id, fetchGraph]);

  const [picked, setPicked] = useState<GraphNode | null>(null);
  /* Pan/zoom works on the viewBox itself: `vb` is the visible window in graph
     coordinates, null = the fitted view. */
  const [vb, setVb] = useState<ViewerBox | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointers = useRef(new Map<number, XY>());
  const pinch = useRef<{ startDist: number; startBox: ViewerBox } | null>(null);
  const drag = useRef<{ sx: number; sy: number; start: ViewerBox; moved: boolean } | null>(null);

  useEffect(() => { setVb(null); setPicked(null); }, [archive.id]);

  const layout = useMemo(
    () => state.kind === 'ok'
      ? computeLayout(state.graph.nodes.map((n) => ({ id: n.id, title: n.title })), state.graph.edges)
      : null,
    [state],
  );

  const base = useMemo<ViewerBox | null>(() => {
    if (!layout || layout.size === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of layout.values()) {
      minX = Math.min(minX, p.x - NODE_W / 2);
      maxX = Math.max(maxX, p.x + NODE_W / 2);
      minY = Math.min(minY, p.y - NODE_H / 2);
      maxY = Math.max(maxY, p.y + NODE_H / 2);
    }
    const pad = 32;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
  }, [layout]);

  const box = vb ?? base;

  const applyZoom = useCallback((b: ViewerBox, factor: number): ViewerBox => {
    if (!base) return b;
    const w = Math.min(Math.max(b.w / factor, base.w / 8), base.w * 3);
    const h = b.h * (w / b.w);
    return { x: b.x + (b.w - w) / 2, y: b.y + (b.h - h) / 2, w, h };
  }, [base]);

  const zoomBy = useCallback((factor: number) => {
    setVb((prev) => {
      const b = prev ?? base;
      return b ? applyZoom(b, factor) : prev;
    });
  }, [base, applyZoom]);

  // Wheel zoom needs a non-passive listener to keep the page from scrolling.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.2 : 1 / 1.2);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [zoomBy, state.kind]);

  /** Graph units per screen pixel for the current view ("meet" scaling). */
  function unitsPerPx(b: ViewerBox) {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r || !r.width || !r.height) return 1;
    return Math.max(b.w / r.width, b.h / r.height);
  }

  function onPointerDown(e: RPointerEvent<SVGSVGElement>) {
    if (!box) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { startDist: Math.hypot(a.x - b.x, a.y - b.y) || 1, startBox: box };
      drag.current = null;
      return;
    }
    drag.current = { sx: e.clientX, sy: e.clientY, start: box, moved: false };
  }

  function onPointerMove(e: RPointerEvent<SVGSVGElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pinch.current && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist > 0) setVb(applyZoom(pinch.current.startBox, dist / pinch.current.startDist));
      return;
    }

    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    // Same tap slop as the main graph: fingers jitter, mice don't.
    const slop = e.pointerType === 'mouse' ? 3 : 12;
    if (Math.abs(dx) + Math.abs(dy) > slop) d.moved = true;
    if (!d.moved) return;
    const upp = unitsPerPx(d.start);
    setVb({ ...d.start, x: d.start.x - dx * upp, y: d.start.y - dy * upp });
  }

  function onPointerUp(e: RPointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;

    const d = drag.current;
    if (d && !d.moved && state.kind === 'ok') {
      // Pointer capture pins e.target to the svg — hit-test manually.
      const el = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-anode]');
      const id = el ? Number(el.getAttribute('data-anode')) : null;
      setPicked(id != null ? state.graph.nodes.find((n) => n.id === id) ?? null : null);
    }
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  function onPointerCancel(e: RPointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal--graph" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2 className="modal__title">{archive.title}</h2>
          <button className="iconbtn" title="Close" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal__body">
          <div className="muted small archview__meta">
            Archived {formatArchiveDate(archive.archivedAt)}
            {state.kind === 'ok' && ` · ${state.graph.nodes.length} task${state.graph.nodes.length === 1 ? '' : 's'}`}
          </div>
          <div className="archview__canvas">
            {state.kind === 'loading' && <div className="archview__center muted">Loading…</div>}
            {state.kind === 'error' && <div className="archview__center danger">{state.message}</div>}
            {state.kind === 'ok' && layout && box && (
              <svg
                ref={svgRef}
                className="archview__svg"
                viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
                preserveAspectRatio="xMidYMid meet"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
              >
                <defs>
                  <marker id="arrow-arch" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
                  </marker>
                </defs>
                <g className="edges">
                  {state.graph.edges.map((e) => {
                    const a = layout.get(e.sourceId);
                    const b = layout.get(e.targetId);
                    if (!a || !b) return null;
                    return (
                      <path
                        key={e.id}
                        className={`edge edge--${e.type === 'OPTIONAL_LINK' ? 'optional' : 'strict'}`}
                        d={edgePath(a, b)}
                        markerEnd="url(#arrow-arch)"
                      />
                    );
                  })}
                </g>
                <g className="nodes">
                  {state.graph.nodes.map((n) => {
                    const p = layout.get(n.id);
                    if (!p) return null;
                    return (
                      <g
                        key={n.id}
                        data-anode={n.id}
                        className={`gnode gnode--${n.status.toLowerCase()} ${picked?.id === n.id ? 'is-selected' : ''}`}
                        transform={`translate(${p.x},${p.y})`}
                      >
                        <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} />
                        <circle className="gnode__dot" cx={-NODE_W / 2 + 20} cy={-10} r={4} />
                        <text className="gnode__title" x={-NODE_W / 2 + 32} y={-6}>{truncate(n.title, 20)}</text>
                        <text className="gnode__sub" x={-NODE_W / 2 + 32} y={16}>
                          {n.durationHours}h · {STATUS_LABEL[n.status]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}
            {state.kind === 'ok' && (
              <div className="archview__tools">
                <button className="iconbtn" title="Zoom in" onClick={() => zoomBy(1.25)}><Icon name="zoomin" /></button>
                <button className="iconbtn" title="Zoom out" onClick={() => zoomBy(1 / 1.25)}><Icon name="zoomout" /></button>
                <button className="iconbtn" title="Fit to view" onClick={() => setVb(null)}><Icon name="fit" /></button>
              </div>
            )}
            {picked && (
              <div className="archview__info">
                <StatusDot status={picked.status} />
                <div className="archview__info-text">
                  <div className="archview__info-title">{picked.title}</div>
                  <div className="muted small">{picked.durationHours}h · {STATUS_LABEL[picked.status]}</div>
                </div>
                <button className="iconbtn" title="Close" onClick={() => setPicked(null)}><Icon name="x" /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
