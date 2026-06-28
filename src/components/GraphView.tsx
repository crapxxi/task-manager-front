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
import { useTasks, useUI } from '../state';
import { computeLayout, edgePath, NODE_H, NODE_W, type XY } from '../lib/graph';
import { STATUS_LABEL, type Task } from '../types';
import { ConnectionError, EmptyState, LoadingState } from './ui';

interface Transform { tx: number; ty: number; k: number }

type Drag =
  | { type: 'pan'; sx: number; sy: number; otx: number; oty: number; moved: boolean }
  | { type: 'node'; id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean };

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

export function GraphView() {
  const { status, tasks, edges } = useTasks();
  const { selectedId, select } = useUI();
  const svgRef = useRef<SVGSVGElement>(null);

  const sig = useMemo(() => tasks.map((t) => t.id).sort((a, b) => a - b).join(','), [tasks]);
  const [positions, setPositions] = useState<Map<number, XY>>(() => new Map());
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
  useEffect(() => {
    if (sig !== laidSig.current) {
      laidSig.current = sig;
      setPositions(computeLayout(tasks, edges));
      needFit.current = true;
    }
  }, [sig, tasks, edges]);

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

  const zoomButton = (factor: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    zoom(r.width / 2, r.height / 2, factor);
  };

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
    // larger slop so a tap still opens the task drawer on mobile.
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

  // Hovering a node previews its connections; a click-selection holds them when not hovering.
  const focusId = hoverId ?? selectedId;

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
          <span className="legend__item"><span className="legend__line" />Prerequisite</span>
          <span className="legend__item"><span className="legend__line legend__line--dash" />Optional</span>
        </div>
        <div className="gbtns">
          <button className="iconbtn" title="Zoom out" onClick={() => zoomButton(1 / 1.2)}><Icon name="zoomout" /></button>
          <button className="iconbtn" title="Zoom in" onClick={() => zoomButton(1.2)}><Icon name="zoomin" /></button>
          <button className="iconbtn" title="Fit to view" onClick={fitToView}><Icon name="fit" /></button>
          <button
            className="iconbtn"
            title="Re-arrange"
            onClick={() => { setPositions(computeLayout(tasks, edges)); needFit.current = true; }}
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
              {tasks.map((t) => {
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
      onMouseEnter={() => onHover(task.id)}
      onMouseLeave={() => onHover(null)}
    >
      <title>{task.title}</title>
      <rect className="gnode__box" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={14} />
      <rect className="gnode__bar" x={-NODE_W / 2 + 1.5} y={-NODE_H / 2 + 8} width={5} height={NODE_H - 16} rx={2.5} />
      <text className="gnode__title" x={-NODE_W / 2 + 18} y={-3}>{truncate(task.title, 21)}</text>
      <text className="gnode__sub" x={-NODE_W / 2 + 18} y={16}>
        {task.durationHours}h · {task.isBlocked ? 'Blocked' : STATUS_LABEL[task.status]}
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
