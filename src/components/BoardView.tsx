import { Icon } from '../icons';
import { useTasks, useUI } from '../state';
import { COMPLEXITY_LABEL, STATUS_ORDER, type Task, type TaskStatus } from '../types';
import { AdvanceButton, ConnectionError, EmptyState, LoadingState, StatusBadge } from './ui';

const COLUMN_LABEL: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export function BoardView() {
  const { status, tasks } = useTasks();
  const { search } = useUI();

  if (status === 'loading') return <section className="view board"><LoadingState /></section>;
  if (status === 'error') return <section className="view board"><ConnectionError /></section>;
  if (tasks.length === 0) return <section className="view board"><EmptyState /></section>;

  const q = search.trim().toLowerCase();
  const filtered = tasks.filter(
    (t) => !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
  );

  return (
    <section className="view board">
      {STATUS_ORDER.map((col) => {
        // Within a column, blocked tasks sink below the actionable ones.
        const items = filtered
          .filter((t) => t.status === col)
          .sort((a, b) => Number(a.isBlocked) - Number(b.isBlocked));
        return (
          <div key={col} className={`column column--${col.toLowerCase()}`}>
            <div className="column__head">
              <span className="column__dot" />
              <h2 className="column__title">{COLUMN_LABEL[col]}</h2>
              <span className="column__count">{items.length}</span>
            </div>
            <div className="column__body">
              {items.length > 0 ? (
                items.map((t) => <TaskCard key={t.id} task={t} />)
              ) : (
                <div className="col-empty">{q ? 'No matches' : 'Nothing here yet'}</div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function TaskCard({ task }: { task: Task }) {
  const { prerequisitesOf, dependentsOf } = useTasks();
  const { selectedId, select } = useUI();
  const pre = prerequisitesOf(task.id).length;
  const dep = dependentsOf(task.id).length;

  return (
    <article
      className={`card ${task.isBlocked ? 'card--blocked' : ''} ${selectedId === task.id ? 'card--active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => select(task.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(task.id); } }}
    >
      <div className="card__top">
        <StatusBadge status={task.status} />
        {task.isBlocked && (
          <span className="chip chip--blocked" title="Waiting on unfinished prerequisites">
            <Icon name="lock" />
            Blocked
          </span>
        )}
      </div>
      <h3 className="card__title">{task.title}</h3>
      {task.description && <p className="card__desc">{task.description}</p>}
      <div className="card__meta">
        <span className="meta" title="Estimated effort"><Icon name="clock" />{task.durationHours}h</span>
        <span className={`meta meta--cx-${task.complexity.toLowerCase()}`} title="Complexity">{COMPLEXITY_LABEL[task.complexity]}</span>
        {pre > 0 && <span className="meta" title="Prerequisites"><Icon name="link" />{pre}</span>}
        {dep > 0 && <span className="meta" title="Unlocks"><Icon name="unlocks" />{dep}</span>}
      </div>
      <div className="card__actions">
        <AdvanceButton task={task} small />
      </div>
    </article>
  );
}
