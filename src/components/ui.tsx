import { Icon } from '../icons';
import { IMPORTANCE_LABEL, STATUS_LABEL, type SubtaskStats, type Task, type TaskStatus } from '../types';
import { useProjects, useTasks, useUI } from '../state';

export function StatusDot({ status }: { status: TaskStatus }) {
  return <span className={`status-dot d-${status.toLowerCase()}`} />;
}

/** Priority label ("High", "Critical"…); 0 reads as a quiet "Not important". */
export function ImportanceChip({ value }: { value: number }) {
  return (
    <span className={`chip chip--imp-${value}`} title="Importance">
      {value > 0 && <Icon name="flag" />}
      {IMPORTANCE_LABEL[value] ?? IMPORTANCE_LABEL[0]}
    </span>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`status-badge s-${status.toLowerCase()}`}>
      <span className="status-dot" />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Forward-only status control matching the backend's toggle endpoint. */
export function AdvanceButton({ task, small }: { task: Task; small?: boolean }) {
  const { toggle, subtaskStats } = useTasks();
  const sm = small ? ' btn--sm' : '';
  const stats = subtaskStats.get(task.id);
  const openSubtasks = stats ? stats.total - stats.completed : 0;

  if (task.status === 'COMPLETED') {
    return (
      <span className="done-pill">
        <Icon name="check" />
        Completed
      </span>
    );
  }
  // The backend rejects status changes for expired tasks.
  if (task.status === 'EXPIRED') {
    return (
      <span className="done-pill done-pill--expired">
        <Icon name="clock" />
        Expired
      </span>
    );
  }
  if (task.status === 'TODO') {
    if (task.isBlocked) {
      return (
        <button className={`btn btn--ghost${sm}`} disabled title="Complete prerequisites first">
          <Icon name="lock" />
          Blocked
        </button>
      );
    }
    return (
      <button className={`btn btn--primary${sm}`} onClick={(e) => { e.stopPropagation(); void toggle(task.id); }}>
        <Icon name="play" />
        {small ? 'Start' : 'Start task'}
      </button>
    );
  }
  // A parent finishes on its own the moment its last subtask is done — the
  // backend rejects completing it by hand, so don't offer the action at all.
  if (openSubtasks > 0) {
    return (
      <button
        className={`btn btn--ghost${sm}`}
        disabled
        title={`Completes automatically once all subtasks are done — ${openSubtasks} left`}
      >
        <Icon name="subtasks" />
        {openSubtasks} subtask{openSubtasks === 1 ? '' : 's'} left
      </button>
    );
  }
  return (
    <button className={`btn btn--success${sm}`} onClick={(e) => { e.stopPropagation(); void toggle(task.id); }}>
      <Icon name="check" />
      {small ? 'Complete' : 'Mark complete'}
    </button>
  );
}

/**
 * Subtask progress. A titled block rather than a stray bar: on a card this is
 * the only sign that work is hidden underneath, so it has to read as its own
 * thing. `bare` drops the title where a section header already says "Subtasks".
 */
export function SubtaskProgress({ stats, bare }: { stats: SubtaskStats; bare?: boolean }) {
  const pct = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
  const complete = stats.completed === stats.total;
  return (
    <div
      className={`subprog ${complete ? 'is-complete' : ''} ${bare ? 'subprog--bare' : ''}`}
      title={`${stats.completed} of ${stats.total} subtasks completed`}
    >
      <div className="subprog__head">
        {!bare && (
          <span className="subprog__title">
            <Icon name="subtasks" />
            Subtasks
          </span>
        )}
        <span className="subprog__count">
          {stats.completed}<span className="subprog__of">/{stats.total}</span>
          {complete && <Icon name="check" />}
        </span>
      </div>
      <span className="subprog__track">
        <span className="subprog__fill" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="placeholder">
      <div className="spinner" />
      <p className="placeholder__text">Loading tasks…</p>
    </div>
  );
}

export function EmptyState() {
  const { openCreate } = useUI();
  return (
    <div className="placeholder">
      <h3 className="placeholder__title">No tasks yet</h3>
      <p className="placeholder__text">Create your first task. You can link tasks together later so one waits for another.</p>
      <button className="btn btn--primary" onClick={() => openCreate()}><Icon name="plus" />New task</button>
    </div>
  );
}

export function NoProjects() {
  const { openCreateProject } = useUI();
  return (
    <div className="placeholder placeholder--page">
      <h3 className="placeholder__title">Welcome!</h3>
      <p className="placeholder__text">Tasks are grouped into projects. Create your first project to get started.</p>
      <button className="btn btn--primary" onClick={openCreateProject}><Icon name="plus" />New project</button>
    </div>
  );
}

export function ProjectsError() {
  const { reload } = useProjects();
  return (
    <div className="placeholder placeholder--page">
      <div className="placeholder__art placeholder__art--warn"><Icon name="alert" size={36} /></div>
      <h3 className="placeholder__title">Couldn’t load your projects</h3>
      <p className="placeholder__text">
        The server didn’t respond. Make sure the backend is running, then try again.
      </p>
      <button className="btn btn--primary" onClick={() => void reload()}><Icon name="refresh" />Retry</button>
    </div>
  );
}

export function ConnectionError() {
  const { reload } = useTasks();
  return (
    <div className="placeholder">
      <div className="placeholder__art placeholder__art--warn"><Icon name="alert" size={36} /></div>
      <h3 className="placeholder__title">Couldn’t load tasks</h3>
      <p className="placeholder__text">The server didn’t respond. Check that the backend is running, then try again.</p>
      <button className="btn btn--primary" onClick={() => void reload()}><Icon name="refresh" />Retry</button>
    </div>
  );
}
