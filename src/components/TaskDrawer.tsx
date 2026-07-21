import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Icon } from '../icons';
import { api } from '../api';
import { useTasks, useUI } from '../state';
import { COMPLEXITY_LABEL, type DependencyType, type GraphEdge, type Task } from '../types';
import { AdvanceButton, ImportanceChip, StatusBadge, StatusDot, SubtaskProgress } from './ui';
import { DAY_MINUTES, formatDuration } from '../lib/duration';

export function TaskDrawer() {
  const { selectedId, clearSelection } = useUI();
  const { byId } = useTasks();
  const task = selectedId != null ? byId.get(selectedId) : undefined;

  // If the selected task vanished (deleted elsewhere), close the drawer.
  useEffect(() => {
    if (selectedId != null && !byId.has(selectedId)) clearSelection();
  }, [selectedId, byId, clearSelection]);

  if (!task) return null;

  return (
    <>
      {/* Close on pointerdown, not click: a touch tap that opens this drawer also
          emits a compatibility mouse click a moment later, which would land on the
          freshly mounted full-screen scrim and instantly close it. Pointerdown
          ignores that synthesized click while still closing on a real tap outside. */}
      <div className="scrim" onPointerDown={clearSelection} />
      {/* key resets local state (effort, picker) when switching tasks */}
      <DrawerBody key={task.id} task={task} />
    </>
  );
}

function DrawerBody({ task }: { task: Task }) {
  const { clearSelection, openEdit, confirm, focusBranch, setView, select } = useUI();
  const { prerequisitesOf, dependentsOf, remove, unbind, edges, byId } = useTasks();
  const prerequisites = prerequisitesOf(task.id);
  const dependents = dependentsOf(task.id);
  const parent = task.parentId != null ? byId.get(task.parentId) : undefined;

  // Which prerequisites are actually keeping this task closed right now:
  // strict links whose source isn't completed yet.
  const blockingIds = useMemo(() => new Set(
    edges
      .filter((e) => e.targetId === task.id && e.type === 'STRICT_PREREQUISITE'
        && byId.get(e.sourceId)?.status !== 'COMPLETED')
      .map((e) => e.sourceId),
  ), [edges, byId, task.id]);
  // Which dependents this task opens the moment it completes — ones whose only
  // unfinished strict prerequisite is this task.
  const opensNextIds = useMemo(() => new Set(
    edges
      .filter((e) => e.sourceId === task.id && e.type === 'STRICT_PREREQUISITE')
      .map((e) => e.targetId)
      .filter((depId) => !edges.some((e) =>
        e.targetId === depId && e.type === 'STRICT_PREREQUISITE' && e.sourceId !== task.id
        && (byId.get(e.sourceId)?.status ?? 'COMPLETED') !== 'COMPLETED')),
  ), [edges, byId, task.id]);

  async function onDelete() {
    const ok = await confirm({
      title: 'Delete task',
      message: `Delete “${task.title}”? Its dependency links will be removed. This can’t be undone.`,
      confirmLabel: 'Delete',
    });
    if (!ok) return;
    if (await remove(task.id)) clearSelection();
  }

  return (
    <aside className="drawer">
      <div className="drawer__head">
        <div className="drawer__heading">
          <StatusDot status={task.status} />
          <h2 className="drawer__title">{task.title}</h2>
        </div>
        <button className="iconbtn" title="Close" onClick={clearSelection}><Icon name="x" /></button>
      </div>

      {parent && (
        <button className="drawer__parent" onClick={() => select(parent.id)} title="Open the parent task">
          <Icon name="parent" />
          <span className="drawer__parent-label">Subtask of</span>
          <span className="drawer__parent-title">{parent.title}</span>
        </button>
      )}

      <div className="drawer__badges">
        <StatusBadge status={task.status} />
        {task.isBlocked && <span className="chip chip--blocked"><Icon name="lock" />Blocked</span>}
        <span className="chip"><Icon name="clock" />{formatDuration(task.durationMinutes)}</span>
        <span className={`chip chip--cx-${task.complexity.toLowerCase()}`}>{COMPLEXITY_LABEL[task.complexity]}</span>
        <ImportanceChip value={task.importance} />
        <span className="chip chip--muted">#{task.id}</span>
      </div>

      <div className="drawer__section">
        <div className="drawer__label">Description</div>
        <p className={`drawer__desc ${task.description ? '' : 'muted'}`}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className="drawer__actions">
        <AdvanceButton task={task} />
        <button className="btn btn--ghost" onClick={() => openEdit(task)}><Icon name="edit" />Edit</button>
        <button
          className="btn btn--ghost"
          title="Show only this task and everything it unlocks on the graph"
          onClick={() => { focusBranch(task.id); setView('graph'); clearSelection(); }}
        >
          <Icon name="target" />Branch
        </button>
        <button className="btn btn--ghost btn--danger" onClick={onDelete}><Icon name="trash" />Delete</button>
      </div>

      {/* Directly under the actions: decomposition is the first thing you want
          on a parent, and burying it below effort/group made it easy to miss. */}
      <SubtaskSection task={task} />

      <EffortWidget task={task} />

      <GroupSection task={task} />

      <DepSection
        title="Prerequisites"
        subtitle="Must be completed before this task"
        rows={prerequisites}
        onRemove={(p) => void unbind(task.id, p.id)}
        chipFor={(p) => (blockingIds.has(p.id) ? { label: 'blocks this', kind: 'wait' } : null)}
        footer={<AddPrerequisite task={task} />}
      />
      <DepSection
        title="Unlocks"
        subtitle="Tasks waiting on this one"
        rows={dependents}
        onRemove={(d) => void unbind(d.id, task.id)}
        chipFor={(d) => (opensNextIds.has(d.id)
          ? { label: task.status === 'COMPLETED' ? 'opened by this' : 'opens next', kind: 'open' }
          : null)}
      />

      <div className="drawer__section">
        <div className="drawer__label">History</div>
        <dl className="times">
          <dt>Created</dt>
          <dd>{formatDateTime(task.createdAt) ?? '—'}</dd>
          <dt>Updated</dt>
          <dd>{formatDateTime(task.updatedAt) ?? '—'}</dd>
          {task.completedAt && (
            <>
              <dt>Completed</dt>
              <dd>{formatDateTime(task.completedAt)}</dd>
            </>
          )}
        </dl>
      </div>
    </aside>
  );
}

/** Backend sends UTC instants ("2026-07-15T12:34:56Z") — rendered in the viewer's local time. */
function formatDateTime(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

type EffortState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; minutes: number }
  | { kind: 'error'; message: string };

function EffortWidget({ task }: { task: Task }) {
  const [state, setState] = useState<EffortState>({ kind: 'idle' });

  async function calc() {
    setState({ kind: 'loading' });
    try {
      setState({ kind: 'ok', minutes: await api.calcDuration(task.id) });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }

  return (
    <div className="drawer__section">
      <div className="effort__row">
        <div>
          <div className="drawer__label">Subtree effort</div>
          <div className={`effort__val ${state.kind === 'ok' ? '' : 'muted'}`}>
            {state.kind === 'idle' && 'Not calculated yet'}
            {state.kind === 'loading' && 'Calculating…'}
            {state.kind === 'error' && <span className="danger">{state.message}</span>}
            {state.kind === 'ok' && <EffortResult minutes={state.minutes} />}
          </div>
        </div>
        <button className="btn btn--ghost btn--sm" onClick={calc}><Icon name="sum" />Calculate</button>
      </div>
    </div>
  );
}

function EffortResult({ minutes }: { minutes: number }) {
  const days = minutes / DAY_MINUTES;
  return (
    <>
      <b>{formatDuration(minutes)}</b>
      {minutes >= DAY_MINUTES && <span className="muted"> · ~{days.toFixed(days < 10 ? 1 : 0)} workdays</span>}
      <div className="muted small">This task plus everything it unlocks.</div>
    </>
  );
}

function DepSection({ title, subtitle, rows, onRemove, chipFor, footer }: {
  title: string;
  subtitle: string;
  rows: Task[];
  onRemove: (task: Task) => void;
  /** Optional relation marker per row: which side opens/closes what. */
  chipFor?: (task: Task) => { label: string; kind: 'wait' | 'open' } | null;
  footer?: ReactNode;
}) {
  const { select } = useUI();
  return (
    <div className="drawer__section">
      <div className="drawer__label">
        {title}
        <span className="drawer__sublabel">{subtitle}</span>
      </div>
      {rows.length > 0 ? (
        <div className="deplist">
          {rows.map((t) => {
            const rel = chipFor?.(t) ?? null;
            return (
            <div key={t.id} className="deprow" onClick={() => select(t.id)}>
              <StatusDot status={t.status} />
              <span className="deprow__title">{t.title}</span>
              {rel && <span className={`chip chip--xs chip--rel-${rel.kind}`}>{rel.label}</span>}
              {t.isBlocked && <span className="chip chip--blocked chip--xs">blocked</span>}
              <span className="muted deprow__h">{formatDuration(t.durationMinutes)}</span>
              <button
                className="iconbtn iconbtn--sm"
                title="Remove dependency"
                onClick={(e) => { e.stopPropagation(); onRemove(t); }}
              >
                <Icon name="unlink" />
              </button>
            </div>
            );
          })}
        </div>
      ) : (
        <div className="muted small">None</div>
      )}
      {footer && <div className="drawer__action">{footer}</div>}
    </div>
  );
}

/**
 * Sorts subtasks into an order they can actually be worked in: anything a
 * sibling waits on comes first. Ties keep creation order, and a cycle (which
 * the backend rejects, but be safe) leaves the remainder in creation order
 * rather than dropping rows.
 */
function orderByDependency(subtasks: Task[], edges: GraphEdge[]): Task[] {
  const ids = new Set(subtasks.map((s) => s.id));
  const blockedBy = new Map<number, number>();
  const unlocks = new Map<number, number[]>();
  for (const s of subtasks) blockedBy.set(s.id, 0);
  for (const e of edges) {
    if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
    blockedBy.set(e.targetId, (blockedBy.get(e.targetId) ?? 0) + 1);
    const arr = unlocks.get(e.sourceId);
    if (arr) arr.push(e.targetId);
    else unlocks.set(e.sourceId, [e.targetId]);
  }

  const ready = subtasks.filter((s) => blockedBy.get(s.id) === 0);
  const sorted: Task[] = [];
  const placed = new Set<number>();
  while (ready.length) {
    const next = ready.shift()!;
    if (placed.has(next.id)) continue;
    sorted.push(next);
    placed.add(next.id);
    for (const id of unlocks.get(next.id) ?? []) {
      blockedBy.set(id, (blockedBy.get(id) ?? 1) - 1);
      const t = subtasks.find((s) => s.id === id);
      if (t && blockedBy.get(id) === 0) ready.push(t);
    }
  }
  return [...sorted, ...subtasks.filter((s) => !placed.has(s.id))];
}

/**
 * Decomposition panel. Nesting is one level deep, so a task that already has a
 * parent never shows this. The parent finishes on its own once the last subtask
 * is done, which is why there's no "complete parent" affordance here.
 */
function SubtaskSection({ task }: { task: Task }) {
  const { subtasksOf, subtaskStats, setTaskParent, edges, byId } = useTasks();
  const { select, openCreate, confirm } = useUI();
  const stats = subtaskStats.get(task.id);
  const subtasks = useMemo(
    () => orderByDependency(subtasksOf(task.id), edges),
    [subtasksOf, task.id, edges],
  );

  // Subtasks may depend on each other, and those links are invisible unless
  // they're spelled out here — the parent panel is where you look at the set
  // as a whole. Each row names the siblings it's still waiting on.
  const waitingOn = useMemo(() => {
    const sibling = new Set(subtasks.map((s) => s.id));
    const map = new Map<number, Task[]>();
    for (const s of subtasks) {
      const blockers = edges
        .filter((e) => e.targetId === s.id && sibling.has(e.sourceId))
        .map((e) => byId.get(e.sourceId))
        .filter((p): p is Task => !!p && p.status !== 'COMPLETED');
      if (blockers.length) map.set(s.id, blockers);
    }
    return map;
  }, [subtasks, edges, byId]);

  if (task.parentId != null) return null;

  async function detach(sub: Task) {
    const ok = await confirm({
      title: 'Move out of parent',
      message: `“${sub.title}” becomes a top-level task again. Links it has with the other subtasks are kept.`,
      confirmLabel: 'Move out',
    });
    if (ok) void setTaskParent(sub.id, null);
  }

  return (
    <div className="drawer__section">
      <div className="drawer__label">
        Subtasks
        <span className="drawer__sublabel">This task completes once they all do</span>
      </div>
      {stats && <SubtaskProgress stats={stats} bare />}
      {subtasks.length > 0 ? (
        <div className="sublist">
          {subtasks.map((s) => {
            const blockers = waitingOn.get(s.id);
            return (
              <div key={s.id} className="subrow" onClick={() => select(s.id)}>
                <div className="subrow__main">
                  <StatusDot status={s.status} />
                  <span className="subrow__title">{s.title}</span>
                  {s.isBlocked && <span className="chip chip--blocked chip--xs">blocked</span>}
                  <span className="muted subrow__h">{formatDuration(s.durationMinutes)}</span>
                  <button
                    className="iconbtn iconbtn--sm"
                    title="Move out of this task"
                    onClick={(e) => { e.stopPropagation(); void detach(s); }}
                  >
                    <Icon name="unlink" />
                  </button>
                </div>
                {blockers && (
                  <div className="subrow__wait" title={`Waiting for: ${blockers.map((b) => b.title).join(', ')}`}>
                    <Icon name="lock" />
                    <span className="subrow__wait-text">after {blockers.map((b) => b.title).join(', ')}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="muted small">None — break this task down if it’s too big to do in one go.</div>
      )}
      {task.status !== 'COMPLETED' && (
        <div className="drawer__action">
          <button className="btn btn--ghost btn--sm" onClick={() => openCreate(task.id)}>
            <Icon name="plus" />
            Add subtask
          </button>
        </div>
      )}
      {/* Only worth saying while there's nothing to see — once links exist the
          "after …" rows explain themselves. */}
      {subtasks.length > 1 && waitingOn.size === 0 && (
        <div className="hint">
          <Icon name="info" />
          Subtasks can wait on each other — open one and add a prerequisite.
        </div>
      )}
    </div>
  );
}

/** Quick group picker — groups are managed on the graph's Groups panel. */
function GroupSection({ task }: { task: Task }) {
  const { groups, setTaskGroup } = useTasks();
  const [busy, setBusy] = useState(false);
  if (groups.length === 0 && task.groupId == null) return null;

  return (
    <div className="drawer__section">
      <div className="drawer__label">Group</div>
      <select
        className="input input--sm"
        disabled={busy}
        value={task.groupId ?? ''}
        onChange={async (e) => {
          const next = e.target.value === '' ? null : Number(e.target.value);
          setBusy(true);
          await setTaskGroup(task.id, next);
          setBusy(false);
        }}
      >
        <option value="">No group</option>
        {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
      </select>
    </div>
  );
}

function AddPrerequisite({ task }: { task: Task }) {
  const { tasks, subtasksOf, prerequisitesOf, descendants, bind } = useTasks();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [type, setType] = useState<DependencyType>('STRICT_PREREQUISITE');

  if (task.status !== 'TODO') {
    return (
      <div className="hint">
        <Icon name="info" />
        Only tasks in “To do” can take on new prerequisites.
      </div>
    );
  }

  const existing = new Set(prerequisitesOf(task.id).map((p) => p.id));
  const wouldCycle = descendants(task.id); // adding any of these as a parent makes a loop
  // Links may only join tasks at the same level: two top-level tasks, or two
  // subtasks of the same parent. The backend rejects subtask↔outside and
  // subtask↔its own parent, so those never reach the picker.
  const pool = task.parentId != null ? subtasksOf(task.parentId) : tasks;
  // An expired task can never be completed, so requiring it would block this
  // task forever; it can still be attached as a non-blocking optional link.
  const candidates = pool.filter((c) =>
    c.id !== task.id && !existing.has(c.id) && !wouldCycle.has(c.id) &&
    (type === 'OPTIONAL_LINK' || c.status !== 'EXPIRED'));
  const q = query.trim().toLowerCase();
  const shown = candidates.filter((c) => !q || c.title.toLowerCase().includes(q));

  return (
    <div>
      <button className="btn btn--ghost btn--sm" onClick={() => setOpen((o) => !o)}>
        <Icon name="plus" />
        Add prerequisite
      </button>
      {open && (
        <div className="picker">
          <div className="picker__types">
            <button
              type="button"
              className={`picker__type ${type === 'STRICT_PREREQUISITE' ? 'is-active' : ''}`}
              onClick={() => setType('STRICT_PREREQUISITE')}
              title="Must be done first — blocks this task"
            >
              <Icon name="lock" />
              Required
            </button>
            <button
              type="button"
              className={`picker__type ${type === 'OPTIONAL_LINK' ? 'is-active' : ''}`}
              onClick={() => setType('OPTIONAL_LINK')}
              title="Related, but does not block this task"
            >
              <Icon name="link" />
              Optional
            </button>
          </div>
          <input
            className="input input--sm"
            type="search"
            autoFocus
            placeholder={type === 'OPTIONAL_LINK' ? 'Find a task to link…' : 'Find a task to require…'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="picker__list">
            {shown.length > 0 ? (
              shown.map((c) => (
                <button
                  key={c.id}
                  className="picker__item"
                  onClick={async () => {
                    if (await bind(task.id, c.id, type)) { setOpen(false); setQuery(''); }
                  }}
                >
                  <StatusDot status={c.status} />
                  <span className="picker__title">{c.title}</span>
                  <span className="muted">{formatDuration(c.durationMinutes)}</span>
                </button>
              ))
            ) : (
              <div className="picker__empty muted">
                {candidates.length ? 'No matches.'
                  : task.parentId != null ? 'A subtask can only wait on its siblings.'
                  : 'No eligible tasks available.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
