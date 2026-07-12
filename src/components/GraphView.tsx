import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as RPointerEvent,
} from 'react';
import { Icon } from '../icons';
import { useAuth, useProjects, useTasks, useUI } from '../state';
import { computeLayout, edgePath, NODE_H, NODE_W, type XY } from '../lib/graph';
import { IMPORTANCE_LABEL, STATUS_LABEL, type Task } from '../types';
import { ConnectionError, EmptyState, LoadingState } from './ui';

interface Transform { tx: number; ty: number; k: number }

/** In "Recent" mode only this many newest tasks are drawn — big graphs stay readable. */
const RECENT_LIMIT = 12;
type GraphMode = 'recent' | 'all';

type Drag =
  | { type: 'pan'; sx: number; sy: number; otx: number; oty: number; moved: boolean }
  | { type: 'node'; id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean };

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

export function GraphView() {
  const { status, tasks, edges } = useTasks();
  const { selectedId, select } = useUI();
  const { username } = useAuth();
  const { currentId } = useProjects();
  const posKey = `tm.graph.pos.${username ?? 'anon'}.${currentId ?? 0}`;
  const svgRef = useRef<SVGSVGElement>(null);

  const [mode, setMode] = useState<GraphMode>(() =>
    localStorage.getItem('tm.graph.mode') === 'all' ? 'all' : 'recent');
  const pickMode = (m: GraphMode) => { setMode(m); localStorage.setItem('tm.graph.mode', m); };

  // "Recent" trims the graph to the newest tasks (ids grow with creation order).
  const windowed = mode === 'recent' && tasks.length > RECENT_LIMIT;
  const visibleTasks = useMemo(
    () => (windowed ? [...tasks].sort((a, b) => b.id - a.id).slice(0, RECENT_LIMIT) : tasks),
    [tasks, windowed],
  );
  const hiddenCount = tasks.length - visibleTasks.length;

  const sig = useMemo(() => visibleTasks.map((t) => t.id).sort((a, b) => a - b).join(','), [visibleTasks]);
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
      const layout = computeLayout(visibleTasks, edges);
      for (const [id, p] of readPositions(posKey)) if (layout.has(id)) layout.set(id, p);
      setPositions(layout);
      posOwner.current = posKey;
      needFit.current = true;
    }
  }, [sig, visibleTasks, edges, posKey]);

  // Persist the arrangement (debounced — drags update positions every frame).
  // Merged over what's already saved, so positions of tasks hidden by the
  // "Recent" window survive; entries for deleted tasks get pruned.
  useEffect(() => {
    if (!positions.size || posOwner.current !== posKey) return;
    const t = window.setTimeout(() => {
      const merged = readPositions(posKey);
      for (const [id, p] of positions) merged.set(id, p);
      const alive = new Set(tasks.map((t2) => t2.id));
      for (const id of [...merged.keys()]) if (!alive.has(id)) merged.delete(id);
      writePositions(posKey, merged);
    }, 400);
    return () => window.clearTimeout(t);
  }, [positions, posKey, tasks]);

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

  function onPointerDown(e: RPointerEvent<SVGSVGElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Second finger down → begin pinch-zoom; abandon any single-pointer drag.
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
      setPanning(false);
      return;
    }
    if (pointers.current.size > 2) return;

    const node = (e.target as Element).closest('[data-node]');
    if (node) {
      const id = Number(node.getAttribute('data-node'));
      const p = positions.get(id);
      if (!p) return;
      drag.current = { type: 'node', id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, moved: false };
    } else {
      drag.current = { type: 'pan', sx: e.clientX, sy: e.clientY, otx: tf.tx, oty: tf.ty, moved: false };
      setPanning(true);
    }
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
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    // A finger jitters by several px during a "tap"; a 3px slop (fine for a mouse)
    // reads most taps as drags and swallows the node selection. Give touch/pen a
    // larger slop so a tap still opens the task panel on mobile.
    const slop = e.pointerType === 'mouse' ? 3 : 12;
    if (Math.abs(dx) + Math.abs(dy) > slop) d.moved = true;
    if (d.type === 'pan') {
      setTf((t) => ({ ...t, tx: d.otx + dx, ty: d.oty + dy }));
    } else {
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
    if (d && d.type === 'node' && !d.moved) select(d.id);
    drag.current = null;
    setPanning(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  // Hovering a node previews its connections; a click-selection holds them when
  // not hovering. A selection hidden by the "Recent" window is ignored —
  // otherwise it would dim the whole graph around a node that isn't drawn.
  const visibleIds = useMemo(() => new Set(visibleTasks.map((t) => t.id)), [visibleTasks]);
  const focusId = hoverId ?? (selectedId != null && visibleIds.has(selectedId) ? selectedId : null);

  const neighbors = useMemo(() => {
    const set = new Set<number>();
    if (focusId != null) {
      for (const e of edges) {
        if (e.sourceId === focusId) set.add(e.targetId);
        if (e.targetId === focusId) set.add(e.sourceId);
      }
    }
    return set;
  }, [edges, focusId]);

  const overlay =
    status === 'loading' ? <LoadingState /> :
    status === 'error' ? <ConnectionError /> :
    tasks.length === 0 ? <EmptyState /> : null;

  return (
    <section className="view graph">
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
          {tasks.length > RECENT_LIMIT && (
            <>
              {windowed && <span className="graph-hint">{hiddenCount} older hidden</span>}
              <div className="seg seg--sm" role="tablist" aria-label="Graph scope">
                <button
                  role="tab"
                  aria-selected={mode === 'recent'}
                  className={`seg__btn ${mode === 'recent' ? 'is-active' : ''}`}
                  title={`Only the ${RECENT_LIMIT} newest tasks`}
                  onClick={() => pickMode('recent')}
                >
                  Recent
                </button>
                <button
                  role="tab"
                  aria-selected={mode === 'all'}
                  className={`seg__btn ${mode === 'all' ? 'is-active' : ''}`}
                  title="The whole graph"
                  onClick={() => pickMode('all')}
                >
                  All
                </button>
              </div>
            </>
          )}
          <button className="iconbtn" title="Fit to view" onClick={fitToView}><Icon name="fit" /></button>
          <button
            className="iconbtn"
            title="Re-arrange"
            onClick={() => { setPositions(computeLayout(visibleTasks, edges)); needFit.current = true; }}
          >
            <Icon name="refresh" />
          </button>
        </div>
      </div>

      <div className="graph-canvas">
        <svg
          ref={svgRef}
          className={`graph-svg ${panning ? 'is-panning' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
            </marker>
          </defs>
          <g transform={`translate(${tf.tx},${tf.ty}) scale(${tf.k})`}>
            <g className="edges">
              {edges.map((e) => {
                const a = positions.get(e.sourceId);
                const b = positions.get(e.targetId);
                if (!a || !b) return null;
                const active = focusId != null && (e.sourceId === focusId || e.targetId === focusId);
                const dim = focusId != null && !active;
                return (
                  <path
                    key={e.id}
                    className={`edge edge--${e.type === 'OPTIONAL_LINK' ? 'optional' : 'strict'} ${active ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}
                    d={edgePath(a, b)}
                    markerEnd="url(#arrow)"
                  />
                );
              })}
            </g>
            <g className="nodes">
              {visibleTasks.map((t) => {
                const p = positions.get(t.id);
                if (!p) return null;
                const selected = focusId === t.id;
                const dim = focusId != null && !selected && !neighbors.has(t.id);
                return <GraphNode key={t.id} task={t} p={p} selected={selected} dim={dim} onHover={setHoverId} />;
              })}
            </g>
          </g>
        </svg>
        {overlay && <div className="graph-overlay">{overlay}</div>}
      </div>
    </section>
  );
}

function GraphNode({ task, p, selected, dim, onHover }: {
  task: Task; p: XY; selected: boolean; dim: boolean; onHover: (id: number | null) => void;
}) {
  return (
    <g
      className={`gnode gnode--${task.status.toLowerCase()} ${task.isBlocked ? 'gnode--blocked' : ''} ${selected ? 'is-selected' : ''} ${dim ? 'is-dim' : ''}`}
      data-node={task.id}
      transform={`translate(${p.x},${p.y})`}
      // Mouse only: on touch a tap fires a synthetic mouseenter with no matching
      // mouseleave, leaving the graph dimmed around the last node. Touch focus
      // comes from selectedId instead, which clears when the panel closes.
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover(task.id); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onHover(null); }}
    >
      <title>{`${task.title} — ${STATUS_LABEL[task.status]}`}</title>
      <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} />
      <circle className="gnode__dot" cx={-NODE_W / 2 + 20} cy={-10} r={4} />
      <text className="gnode__title" x={-NODE_W / 2 + 32} y={-6}>{truncate(task.title, 20)}</text>
      <text className="gnode__sub" x={-NODE_W / 2 + 32} y={16}>
        {task.durationHours}h ·{' '}
        <tspan className={`gnode__imp--${task.importance}`}>{IMPORTANCE_LABEL[task.importance]}</tspan>
        {task.isBlocked && <tspan> · Blocked</tspan>}
      </text>
    </g>
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
