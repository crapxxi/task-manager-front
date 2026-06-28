import { Icon } from '../icons';
import { STATUS_LABEL, type Task, type TaskStatus } from '../types';
import { useTasks, useUI } from '../state';

export function StatusDot({ status }: { status: TaskStatus }) {
  return <span className={`status-dot d-${status.toLowerCase()}`} />;
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
  const { toggle } = useTasks();
  const sm = small ? ' btn--sm' : '';

  if (task.status === 'COMPLETED') {
    return (
      <span className="done-pill">
        <Icon name="check" />
        Completed
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
      <button className={`btn btn--accent${sm}`} onClick={(e) => { e.stopPropagation(); void toggle(task.id); }}>
        <Icon name="play" />
        {small ? 'Start' : 'Start task'}
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

export function LoadingState() {
  return (
    <div className="placeholder">
      <div className="spinner" />
      <p className="placeholder__text">Loading your tasks…</p>
    </div>
  );
}

export function EmptyState() {
  const { openCreate } = useUI();
  return (
    <div className="placeholder">
      <div className="placeholder__art"><Icon name="layout" size={44} /></div>
      <h3 className="placeholder__title">No tasks yet</h3>
      <p className="placeholder__text">Create your first task, then connect prerequisites to build a dependency graph.</p>
      <button className="btn btn--accent" onClick={openCreate}><Icon name="plus" />Create a task</button>
    </div>
  );
}

export function ConnectionError() {
  const { reload } = useTasks();
  return (
    <div className="placeholder">
      <div className="placeholder__art placeholder__art--warn"><Icon name="alert" size={40} /></div>
      <h3 className="placeholder__title">Can’t reach the API</h3>
      <p className="placeholder__text">
        No response from the backend. Start the Spring Boot app on :8080 — the dev server proxies <code>/api</code> to it.
      </p>
      <button className="btn btn--accent" onClick={() => void reload()}><Icon name="refresh" />Retry</button>
    </div>
  );
}
