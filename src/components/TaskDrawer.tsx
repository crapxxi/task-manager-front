import { useEffect, useState, type ReactNode } from 'react';
import { Icon } from '../icons';
import { api } from '../api';
import { useTasks, useUI } from '../state';
import { COMPLEXITY_LABEL, type DependencyType, type Task } from '../types';
import { AdvanceButton, ImportanceChip, StatusBadge, StatusDot } from './ui';

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
  const { clearSelection, openEdit, confirm, focusBranch, setView } = useUI();
  const { prerequisitesOf, dependentsOf, remove, unbind } = useTasks();
  const prerequisites = prerequisitesOf(task.id);
  const dependents = dependentsOf(task.id);

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

      <div className="drawer__badges">
        <StatusBadge status={task.status} />
        {task.isBlocked && <span className="chip chip--blocked"><Icon name="lock" />Blocked</span>}
        <span className="chip"><Icon name="clock" />{task.durationHours}h</span>
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

      <EffortWidget task={task} />

      <GroupSection task={task} />

      <DepSection
        title="Prerequisites"
        subtitle="Must be completed before this task"
        rows={prerequisites}
        onRemove={(p) => void unbind(task.id, p.id)}
        footer={<AddPrerequisite task={task} />}
      />
      <DepSection
        title="Unlocks"
        subtitle="Tasks waiting on this one"
        rows={dependents}
        onRemove={(d) => void unbind(d.id, task.id)}
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
  | { kind: 'ok'; hours: number }
  | { kind: 'error'; message: string };

function EffortWidget({ task }: { task: Task }) {
  const [state, setState] = useState<EffortState>({ kind: 'idle' });

  async function calc() {
    setState({ kind: 'loading' });
    try {
      setState({ kind: 'ok', hours: await api.calcDuration(task.id) });
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
            {state.kind === 'ok' && <EffortResult hours={state.hours} />}
          </div>
        </div>
        <button className="btn btn--ghost btn--sm" onClick={calc}><Icon name="sum" />Calculate</button>
      </div>
    </div>
  );
}

function EffortResult({ hours }: { hours: number }) {
  const days = hours / 8;
  return (
    <>
      <b>{hours}h</b>
      {hours >= 8 && <span className="muted"> · ~{days.toFixed(days < 10 ? 1 : 0)} workdays</span>}
      <div className="muted small">This task plus everything it unlocks.</div>
    </>
  );
}

function DepSection({ title, subtitle, rows, onRemove, footer }: {
  title: string;
  subtitle: string;
  rows: Task[];
  onRemove: (task: Task) => void;
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
          {rows.map((t) => (
            <div key={t.id} className="deprow" onClick={() => select(t.id)}>
              <StatusDot status={t.status} />
              <span className="deprow__title">{t.title}</span>
              {t.isBlocked && <span className="chip chip--blocked chip--xs">blocked</span>}
              <span className="muted deprow__h">{t.durationHours}h</span>
              <button
                className="iconbtn iconbtn--sm"
                title="Remove dependency"
                onClick={(e) => { e.stopPropagation(); onRemove(t); }}
              >
                <Icon name="unlink" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="muted small">None</div>
      )}
      {footer}
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
  const { tasks, prerequisitesOf, descendants, bind } = useTasks();
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
  // An expired task can never be completed, so requiring it would block this
  // task forever; it can still be attached as a non-blocking optional link.
  const candidates = tasks.filter((c) =>
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
                  <span className="muted">{c.durationHours}h</span>
                </button>
              ))
            ) : (
              <div className="picker__empty muted">
                {candidates.length ? 'No matches.' : 'No eligible tasks available.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
