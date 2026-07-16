import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as RPointerEvent,
} from 'react';
import { Icon } from '../icons';
import { useAuth, useProjects, useTasks, useUI } from '../state';
import {
  computeCollapse,
  computeLayout,
  edgePath,
  NODE_H,
  NODE_W,
  type LayoutLink,
  type LayoutNode,
  type XY,
} from '../lib/graph';
import { IMPORTANCE_LABEL, STATUS_LABEL, type DependencyType, type GraphEdge, type Task } from '../types';
import { ConnectionError, EmptyState, LoadingState } from './ui';

interface Transform { tx: number; ty: number; k: number }

type Drag =
  | { type: 'pan'; sx: number; sy: number; otx: number; oty: number; moved: boolean }
  | { type: 'node'; id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean }
  | { type: 'connect'; sourceId: number }
  | { type: 'chip'; id: number; sx: number; sy: number; moved: boolean }
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

const GROUP_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#e11d48'];
const groupColor = (gid: number) => GROUP_COLORS[Math.abs(gid) % GROUP_COLORS.length];

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
    status, tasks, byId, edges, groups, descendants,
    bind, unbind, changeBindType, createGroup, renameGroup, removeGroup, assignToGroup, groupTasks,
  } = useTasks();
  const { selectedId, select, branchRoot, focusBranch, form, projectForm, confirmRequest, confirm } = useUI();
  const { username } = useAuth();
  const { currentId } = useProjects();
  const posKey = `tm.graph.pos.${username ?? 'anon'}.${currentId ?? 0}`;
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
  // Multi-select mode: taps pick tasks instead of opening the panel, then the
  // action bar turns the picked set into a group in one go.
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState<Set<number>>(new Set());

  /* Branch focus: when a root task is chosen, the board narrows down to that
     task plus everything it unlocks. Cleared on project switch and when the
     root task disappears. */
  const branchSet = useMemo(() => {
    if (branchRoot == null || !byId.has(branchRoot)) return null;
    const set = new Set(descendants(branchRoot));
    set.add(branchRoot);
    return set;
  }, [branchRoot, byId, descendants]);
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

  /** Group member counts for the management panel (independent of folding). */
  const memberCounts = useMemo(() => {
    const m = new Map<number, number>();
    for (const t of tasks) if (t.groupId != null) m.set(t.groupId, (m.get(t.groupId) ?? 0) + 1);
    return m;
  }, [tasks]);

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

  const sig = useMemo(() => layoutNodes.map((n) => n.id).sort((a, b) => a - b).join(','), [layoutNodes]);
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
      for (const [id, p] of readPositions(posKey)) if (layout.has(id)) layout.set(id, p);
      setPositions(layout);
      posOwner.current = posKey;
      needFit.current = true;
    }
  }, [sig, layoutNodes, layoutLinks, posKey]);

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

  const overlay =
    status === 'loading' ? <LoadingState /> :
    status === 'error' ? <ConnectionError /> :
    tasks.length === 0 ? <EmptyState /> : null;

  const connectSource = connect ? positions.get(connect.sourceId) : null;
  const popEdge = popover?.kind === 'edge' ? edges.find((e) => e.id === popover.edgeId) : null;
  const popSourceExpired = popover?.kind === 'create' && byId.get(popover.sourceId)?.status === 'EXPIRED';
  const collapsedCount = branchRep.size;

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
          {collapsedCount > 0 && (
            <button
              className="btn btn--ghost btn--sm"
              title="Expand all collapsed branches"
              onClick={() => setCollapsed(new Set())}
            >
              {collapsedCount} hidden — expand
            </button>
          )}
          <button
            className={`btn btn--ghost btn--sm ${selectMode ? 'is-active' : ''}`}
            title="Pick several tasks, then group them in one go"
            aria-pressed={selectMode}
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
          >
            <Icon name="check" />
            Select
          </button>
          <button
            className={`btn btn--ghost btn--sm ${panel ? 'is-active' : ''}`}
            title="Task groups"
            aria-expanded={panel}
            onClick={() => setPanel((p) => !p)}
          >
            <Icon name="folder" />
            Groups{groups.length > 0 ? ` (${groups.length})` : ''}
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
                const active = focusId != null && (edge.sourceId === focusId || edge.targetId === focusId);
                const dim = (focusId != null && !active) || !!connect;
                return (
                  <g key={edge.id}>
                    <path
                      className={`edge edge--${edge.type === 'OPTIONAL_LINK' ? 'optional' : 'strict'} ${active ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}
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
                const dim = connect
                  ? !isSource && !linkable
                  : focusId != null && focusId !== t.id && !neighbors.has(t.id);
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
            groups={groups}
            memberCounts={memberCounts}
            folded={foldedGroups}
            onFold={foldGroup}
            onUnfold={unfoldGroup}
            onCreate={createGroup}
            onRename={renameGroup}
            onDelete={async (g) => {
              const ok = await confirm({
                title: 'Delete group',
                message: `Delete “${g.title}”? Its ${memberCounts.get(g.id) ?? 0} tasks stay — they just leave the group.`,
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

        {overlay && <div className="graph-overlay">{overlay}</div>}
      </div>
      <div className="graph-help muted small" aria-hidden="true">
        Drag from a node’s ○ to another task to add a dependency · tap a line to edit it · ⊖ folds a branch
      </div>
    </section>
  );
}

function SelectBar({ count, groups, busyDisabled, onAssign, onCreate, onDone }: {
  count: number;
  groups: { id: number; title: string }[];
  busyDisabled: boolean;
  onAssign: (groupId: number) => Promise<void>;
  onCreate: (title: string) => Promise<void>;
  onDone: () => void;
}) {
  const [groupId, setGroupId] = useState<'' | number>('');
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const disabled = busyDisabled || busy;

  return (
    <div className="gselbar">
      <span className="gselbar__count">{count} picked</span>
      {groups.length > 0 && (
        <span className="gselbar__pair">
          <select
            className="input input--sm"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value === '' ? '' : Number(e.target.value))}
          >
            <option value="">Existing group…</option>
            {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
          </select>
          <button
            className="btn btn--sm"
            disabled={disabled || groupId === ''}
            onClick={async () => {
              if (groupId === '') return;
              setBusy(true);
              await onAssign(groupId);
              setBusy(false);
            }}
          >
            Add
          </button>
        </span>
      )}
      <span className="gselbar__pair">
        <input
          className="input input--sm"
          placeholder="New group from picked…"
          maxLength={255}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || !title.trim() || disabled) return;
            e.preventDefault();
            setBusy(true);
            void onCreate(title.trim()).finally(() => setBusy(false));
          }}
        />
        <button
          className="btn btn--sm"
          disabled={disabled || !title.trim()}
          onClick={async () => {
            setBusy(true);
            await onCreate(title.trim());
            setBusy(false);
          }}
        >
          <Icon name="plus" />Create
        </button>
      </span>
      <button className="iconbtn" title="Done" onClick={onDone}><Icon name="x" /></button>
    </div>
  );
}

function TaskNode({ task, p, selected, dim, highlight, isCollapsed, hiddenCount, childCount, selectable, picked, onHover }: {
  task: Task; p: XY; selected: boolean; dim: boolean; highlight: boolean;
  isCollapsed: boolean; hiddenCount: number; childCount: number;
  selectable: boolean; picked: boolean;
  onHover: (id: number | null) => void;
}) {
  const badge = isCollapsed ? `+${hiddenCount}` : '−';
  const badgeW = isCollapsed ? Math.max(26, 12 + 7 * badge.length) : 18;
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
      ].join(' ')}
      data-node={task.id}
      transform={`translate(${p.x},${p.y})`}
      // Mouse only: on touch a tap fires a synthetic mouseenter with no matching
      // mouseleave, leaving the graph dimmed around the last node. Touch focus
      // comes from selectedId instead, which clears when the panel closes.
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover(task.id); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onHover(null); }}
    >
      <title>{`${task.title} — ${STATUS_LABEL[task.status]}${isCollapsed ? ` (+${hiddenCount} hidden)` : ''}`}</title>
      {isCollapsed && <rect className="gnode__stack" x={-NODE_W / 2 + 5} y={-NODE_H / 2 + 5} width={NODE_W} height={NODE_H} rx={12} />}
      <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} />
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

function GroupsPanel({ groups, memberCounts, folded, onFold, onUnfold, onCreate, onRename, onDelete, onClose }: {
  groups: { id: number; title: string }[];
  memberCounts: Map<number, number>;
  folded: Set<number>;
  onFold: (gid: number) => void;
  onUnfold: (gid: number) => void;
  onCreate: (title: string) => Promise<unknown>;
  onRename: (gid: number, title: string) => Promise<boolean>;
  onDelete: (g: { id: number; title: string }) => void;
  onClose: () => void;
}) {
  const [newTitle, setNewTitle] = useState('');
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  async function submitNew(e: FormEvent) {
    e.preventDefault();
    const t = newTitle.trim();
    if (!t || busy) return;
    setBusy(true);
    if (await onCreate(t)) setNewTitle('');
    setBusy(false);
  }

  async function submitRename(gid: number) {
    const t = draft.trim();
    setRenamingId(null);
    if (t && !busy) {
      setBusy(true);
      await onRename(gid, t);
      setBusy(false);
    }
  }

  return (
    <div className="gpanel">
      <div className="gpanel__head">
        <span className="gpanel__title"><Icon name="folder" /> Groups</span>
        <button className="iconbtn iconbtn--sm" title="Close" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="gpanel__list">
        {groups.length === 0 && (
          <div className="muted small gpanel__empty">
            No groups yet. Create one and pick it in a task’s panel — then fold the
            whole group into a single node here.
          </div>
        )}
        {groups.map((g) => {
          const count = memberCounts.get(g.id) ?? 0;
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
                title={count === 0 ? 'No tasks in this group yet' : isFolded ? 'Expand back into tasks' : 'Fold into one node'}
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
              <button className="iconbtn iconbtn--sm iconbtn--danger" title="Delete group" onClick={() => onDelete(g)}>
                <Icon name="trash" />
              </button>
            </div>
          );
        })}
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
