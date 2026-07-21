import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { Icon } from '../icons';
import { useProjects, useTasks, useUI } from '../state';
import { STATUS_LABEL, type Task } from '../types';
import { groupColor } from '../lib/graph';
import { DAY_MINUTES, formatDuration } from '../lib/duration';
import { StatusDot } from './ui';

/* Timeline geometry: the axis is working minutes from "now", 8h = 1 day. */
const MIN_W = 13 / 60;
const ROW_H = 40;
const HEADER_H = 40;

interface Bar {
  task: Task;
  /** Working minutes from now, derived from the critical-path schedule. */
  start: number;
  end: number;
  color: string;
}

type Row =
  | { kind: 'group'; id: number; title: string; color: string; start: number; end: number; count: number }
  | { kind: 'task'; bar: Bar };

type RoadState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; finishById: Map<number, number> };

/**
 * Roadmap: Jira-style timeline of the remaining work. There are no calendar
 * dates on the backend, so bars sit on the dependency schedule instead — each
 * TODO task at its earliest critical-path slot, in-progress work at "now".
 */
export function RoadmapView() {
  const { currentId } = useProjects();
  const { tasks, groups, edges } = useTasks();
  const { select, selectedId } = useUI();
  const [state, setState] = useState<RoadState>({ kind: 'loading' });
  // Bar under the cursor: its dependency links light up, the rest stay faint.
  const [hoverId, setHoverId] = useState<number | null>(null);

  // Refetch when anything that moves the schedule changes.
  const tasksSig = useMemo(
    () => tasks.map((t) => `${t.id}:${t.status}:${t.durationMinutes}`).join(',') + '|' + edges.length,
    [tasks, edges],
  );

  const load = useCallback(async () => {
    if (currentId == null) return;
    setState({ kind: 'loading' });
    try {
      const withTime = await api.getTasksWithTime(currentId);
      setState({ kind: 'ready', finishById: new Map(withTime.map((t) => [t.id, t.calculatedTime])) });
    } catch (err) {
      setState({ kind: 'error', message: (err as Error).message });
    }
  }, [currentId]);

  useEffect(() => { void load(); }, [load, tasksSig]);

  /* ------------------------------------------------------------ schedule */
  const bars = useMemo(() => {
    if (state.kind !== 'ready') return new Map<number, Bar>();
    const m = new Map<number, Bar>();
    for (const t of tasks) {
      if (t.status === 'COMPLETED' || t.status === 'EXPIRED') continue;
      const color = t.groupId != null ? groupColor(t.groupId) : 'var(--primary)';
      if (t.status === 'IN_PROGRESS') {
        m.set(t.id, { task: t, start: 0, end: t.durationMinutes, color });
      } else {
        const end = state.finishById.get(t.id) ?? t.durationMinutes;
        m.set(t.id, { task: t, start: Math.max(0, end - t.durationMinutes), end, color });
      }
    }
    return m;
  }, [state, tasks]);

  const rows = useMemo<Row[]>(() => {
    const list: Row[] = [];
    const used = new Set<number>();

    const groupRows: { row: Extract<Row, { kind: 'group' }>; bars: Bar[] }[] = [];
    for (const g of groups) {
      const members = [...bars.values()].filter((b) => b.task.groupId === g.id);
      if (!members.length) continue;
      members.sort((a, b) => a.start - b.start || a.end - b.end);
      groupRows.push({
        row: {
          kind: 'group',
          id: g.id,
          title: g.title,
          color: groupColor(g.id),
          start: Math.min(...members.map((b) => b.start)),
          end: Math.max(...members.map((b) => b.end)),
          count: members.length,
        },
        bars: members,
      });
      for (const b of members) used.add(b.task.id);
    }
    groupRows.sort((a, b) => a.row.start - b.row.start || a.row.end - b.row.end);

    const loose = [...bars.values()]
      .filter((b) => !used.has(b.task.id))
      .sort((a, b) => a.start - b.start || a.end - b.end);

    for (const { row, bars: members } of groupRows) {
      list.push(row);
      for (const b of members) list.push({ kind: 'task', bar: b });
    }
    if (loose.length && groupRows.length) {
      list.push({
        kind: 'group', id: -1, title: 'Ungrouped', color: 'var(--todo)',
        start: Math.min(...loose.map((b) => b.start)),
        end: Math.max(...loose.map((b) => b.end)),
        count: loose.length,
      });
    }
    for (const b of loose) list.push({ kind: 'task', bar: b });
    return list;
  }, [bars, groups]);

  const totalMinutes = useMemo(
    () => [...bars.values()].reduce((m, b) => Math.max(m, b.end), 0),
    [bars],
  );
  const days = Math.max(3, Math.ceil(totalMinutes / DAY_MINUTES));
  const tlW = days * DAY_MINUTES * MIN_W;

  /** y-center of a task's row inside the timeline body (for connector arrows). */
  const rowCenter = useMemo(() => {
    const m = new Map<number, number>();
    rows.forEach((r, i) => { if (r.kind === 'task') m.set(r.bar.task.id, i * ROW_H + ROW_H / 2); });
    return m;
  }, [rows]);

  const connectors = useMemo(() => {
    const list: { id: number; d: string; sourceId: number; targetId: number }[] = [];
    for (const e of edges) {
      if (e.type !== 'STRICT_PREREQUISITE') continue;
      const src = bars.get(e.sourceId);
      const tgt = bars.get(e.targetId);
      const y1 = rowCenter.get(e.sourceId);
      const y2 = rowCenter.get(e.targetId);
      if (!src || !tgt || y1 == null || y2 == null) continue;
      const x1 = src.end * MIN_W;
      const x2 = tgt.start * MIN_W;
      const bend = Math.max(18, Math.min(40, Math.abs(x2 - x1) / 2));
      list.push({
        id: e.id,
        d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2 - 3} ${y2}`,
        sourceId: e.sourceId,
        targetId: e.targetId,
      });
    }
    return list;
  }, [edges, bars, rowCenter]);
  // Links related to the hovered (or selected) task come to the front.
  const linkFocus = hoverId ?? selectedId;

  /* ------------------------------------------------------------ render */
  if (state.kind === 'loading') {
    return (
      <section className="view roadmap">
        <div className="placeholder"><div className="spinner" /><p className="placeholder__text">Laying out the roadmap…</p></div>
      </section>
    );
  }
  if (state.kind === 'error') {
    return (
      <section className="view roadmap">
        <div className="placeholder">
          <div className="placeholder__art placeholder__art--warn"><Icon name="alert" size={36} /></div>
          <h3 className="placeholder__title">Couldn’t build the roadmap</h3>
          <p className="placeholder__text">{state.message}</p>
          <button className="btn btn--primary" onClick={() => void load()}><Icon name="refresh" />Retry</button>
        </div>
      </section>
    );
  }
  if (rows.length === 0) {
    return (
      <section className="view roadmap">
        <div className="placeholder">
          <h3 className="placeholder__title">Nothing to schedule</h3>
          <p className="placeholder__text">Every task is completed — or there are no tasks yet. New “To do” work will appear here on the dependency timeline.</p>
        </div>
      </section>
    );
  }

  const bodyH = rows.length * ROW_H;

  return (
    <section className="view roadmap">
      <div className="roadmap__summary">
        <span className="plan__total">
          Remaining: <b>{formatDuration(totalMinutes)}</b>
          {totalMinutes >= DAY_MINUTES && <span className="muted"> · ~{(totalMinutes / DAY_MINUTES).toFixed(totalMinutes / DAY_MINUTES < 10 ? 1 : 0)} workdays</span>}
        </span>
        <span className="muted small">
          Bars follow the dependency schedule: each task at its earliest slot on the critical path, 8h = 1 day. Arrows are strict prerequisites.
        </span>
      </div>

      <div className="roadmap__body">
        <div className="roadmap__canvas">
        {/* Left: the task list, grouped like epics. */}
        <div className="roadmap__list">
          <div className="roadmap__list-head">Tasks</div>
          {rows.map((r) =>
            r.kind === 'group' ? (
              <div key={`g${r.id}`} className="roadmap__lrow roadmap__lrow--group" style={{ height: ROW_H }}>
                <span className="gpanel__dot" style={{ background: r.color }} />
                <span className="roadmap__lname" title={r.title}>{r.title}</span>
                <span className="muted small">{r.count}</span>
              </div>
            ) : (
              <button
                key={r.bar.task.id}
                className={`roadmap__lrow roadmap__lrow--task ${selectedId === r.bar.task.id ? 'is-active' : ''}`}
                style={{ height: ROW_H }}
                onClick={() => select(r.bar.task.id)}
                title={`${r.bar.task.title} — ${STATUS_LABEL[r.bar.task.status]}`}
              >
                <StatusDot status={r.bar.task.status} />
                <span className="roadmap__lname">{r.bar.task.title}</span>
                {r.bar.task.isBlocked && <span className="chip chip--blocked chip--xs">blocked</span>}
                <span className="muted small roadmap__lh">{formatDuration(r.bar.task.durationMinutes)}</span>
              </button>
            ),
          )}
        </div>

        {/* Right: the timeline. */}
        <div className="roadmap__tl" style={{ width: tlW }}>
            <div className="roadmap__days" style={{ height: HEADER_H }}>
              {Array.from({ length: days }, (_, d) => (
                <div key={d} className="roadmap__day" style={{ width: DAY_MINUTES * MIN_W }}>
                  <span>Day {d + 1}</span>
                  <span className="muted">+{formatDuration((d + 1) * DAY_MINUTES)}</span>
                </div>
              ))}
            </div>

            <div className="roadmap__grid" style={{ height: bodyH }}>
              {Array.from({ length: days - 1 }, (_, d) => (
                <div key={d} className="roadmap__grid-line" style={{ left: (d + 1) * DAY_MINUTES * MIN_W }} />
              ))}
              {rows.map((r, i) =>
                r.kind === 'group' ? (
                  <div
                    key={`band${r.id}`}
                    className="roadmap__grouprow"
                    style={{ top: i * ROW_H, height: ROW_H }}
                  />
                ) : null,
              )}
              {/* Dependency links live BEHIND the bars — quiet by default, the
                  hovered/selected task's own links come forward. */}
              <svg className="roadmap__links" width={tlW} height={bodyH} aria-hidden="true">
                <defs>
                  <marker id="road-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--edge)" />
                  </marker>
                  <marker id="road-arrow-hot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--primary)" />
                  </marker>
                </defs>
                {connectors.map((c) => {
                  const hot = linkFocus != null && (c.sourceId === linkFocus || c.targetId === linkFocus);
                  return (
                    <path
                      key={c.id}
                      className={hot ? 'is-hot' : ''}
                      d={c.d}
                      markerEnd={`url(#${hot ? 'road-arrow-hot' : 'road-arrow'})`}
                    />
                  );
                })}
              </svg>

              {rows.map((r, i) =>
                r.kind === 'group' ? null : (
                  <button
                    key={r.bar.task.id}
                    className={`roadbar ${r.bar.task.status === 'IN_PROGRESS' ? 'roadbar--progress' : ''} ${selectedId === r.bar.task.id ? 'is-active' : ''}`}
                    style={{
                      top: i * ROW_H + 6,
                      left: r.bar.start * MIN_W,
                      width: Math.max((r.bar.end - r.bar.start) * MIN_W, 26),
                      background: r.bar.color,
                    }}
                    onClick={() => select(r.bar.task.id)}
                    onMouseEnter={() => setHoverId(r.bar.task.id)}
                    onMouseLeave={() => setHoverId(null)}
                    title={`${r.bar.task.title} · ${r.bar.start}–${r.bar.end}h`}
                  >
                    <span className="roadbar__label">{r.bar.task.title}</span>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
