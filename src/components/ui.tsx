import { Icon } from '../icons';
import { STATUS_LABEL, type Task, type TaskStatus } from '../types';
import { useProjects, useTasks, useUI } from '../state';

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
      <button className={`btn btn--primary${sm}`} onClick={(e) => { e.stopPropagation(); void toggle(task.id); }}>
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
      <button className="btn btn--primary" onClick={openCreate}><Icon name="plus" />New task</button>
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
