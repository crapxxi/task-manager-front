import { Icon } from '../icons';
import { useTasks, useUI } from '../state';
import { COMPLEXITY_LABEL, STATUS_ORDER, type Task, type TaskStatus } from '../types';
import { AdvanceButton, ConnectionError, EmptyState, ImportanceChip, LoadingState, StatusBadge } from './ui';

const COLUMN_LABEL: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired',
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

  // The Expired column only appears once something actually expires.
  const columns: TaskStatus[] = tasks.some((t) => t.status === 'EXPIRED')
    ? [...STATUS_ORDER, 'EXPIRED']
    : STATUS_ORDER;

  return (
    <section className={`view board ${columns.length === 4 ? 'board--x4' : ''}`}>
      {columns.map((col) => {
        // Within a column, important tasks float up and blocked ones sink down.
        const items = filtered
          .filter((t) => t.status === col)
          .sort((a, b) => (Number(a.isBlocked) - Number(b.isBlocked)) || (b.importance - a.importance));
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

/** "Auth API, DB schema +2" — a couple of names, the rest folded into a count. */
function nameList(tasks: Task[], shown = 2): string {
  const names = tasks.slice(0, shown).map((t) => (t.title.length > 18 ? t.title.slice(0, 17) + '…' : t.title));
  const rest = tasks.length - names.length;
  return names.join(', ') + (rest > 0 ? ` +${rest}` : '');
}

function TaskCard({ task }: { task: Task }) {
  const { prerequisitesOf, dependentsOf, edges, byId } = useTasks();
  const { selectedId, select } = useUI();
  const pre = prerequisitesOf(task.id).length;
  const dep = dependentsOf(task.id).length;

  // The tasks keeping this one closed: unfinished strict prerequisites.
  const waitingFor = edges
    .filter((e) => e.targetId === task.id && e.type === 'STRICT_PREREQUISITE')
    .map((e) => byId.get(e.sourceId))
    .filter((t): t is Task => !!t && t.status !== 'COMPLETED');
  // The tasks this one opens: dependents whose only unfinished strict
  // prerequisite is this task — completing it unblocks them immediately.
  const opensNext = edges
    .filter((e) => e.sourceId === task.id && e.type === 'STRICT_PREREQUISITE')
    .map((e) => byId.get(e.targetId))
    .filter((t): t is Task => !!t)
    .filter((d) => !edges.some((e) =>
      e.targetId === d.id && e.type === 'STRICT_PREREQUISITE' && e.sourceId !== task.id
      && (byId.get(e.sourceId)?.status ?? 'COMPLETED') !== 'COMPLETED'));

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
        <ImportanceChip value={task.importance} />
        <span className="meta" title="Estimated effort"><Icon name="clock" />{task.durationHours}h</span>
        <span className={`meta meta--cx-${task.complexity.toLowerCase()}`} title="Complexity">{COMPLEXITY_LABEL[task.complexity]}</span>
        {pre > 0 && <span className="meta" title="Prerequisites"><Icon name="link" />{pre}</span>}
        {dep > 0 && <span className="meta" title="Unlocks"><Icon name="unlocks" />{dep}</span>}
      </div>
      {task.status !== 'COMPLETED' && waitingFor.length > 0 && (
        <div className="card__rel card__rel--wait" title={`Waiting for: ${waitingFor.map((t) => t.title).join(', ')}`}>
          <Icon name="lock" />
          <span className="card__rel-text">Waiting for: {nameList(waitingFor)}</span>
        </div>
      )}
      {task.status !== 'COMPLETED' && opensNext.length > 0 && (
        <div className="card__rel card__rel--open" title={`Completing this opens: ${opensNext.map((t) => t.title).join(', ')}`}>
          <Icon name="unlocks" />
          <span className="card__rel-text">Opens: {nameList(opensNext)}</span>
        </div>
      )}
      <div className="card__actions">
        <AdvanceButton task={task} small />
      </div>
    </article>
  );
}
