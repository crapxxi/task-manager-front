import { Icon } from '../icons';
import { useTasks, useUI } from '../state';
import type { TaskStatus } from '../types';

export function StatsBar() {
  const { status, tasks } = useTasks();
  const { view, search, setSearch } = useUI();
  if (status !== 'ready' || tasks.length === 0) return null;

  const by = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;
  const blocked = tasks.filter((t) => t.isBlocked).length;
  const hours = tasks.reduce((sum, t) => sum + t.durationHours, 0);

  return (
    <div className="stats">
      <Stat kind="total" label="Total" n={tasks.length} />
      <Stat kind="todo" label="To do" n={by('TODO')} />
      <Stat kind="progress" label="In progress" n={by('IN_PROGRESS')} />
      <Stat kind="done" label="Completed" n={by('COMPLETED')} />
      {blocked > 0 && (
        <span className="stat stat--blocked">
          <Icon name="lock" />
          <b>{blocked}</b>
          blocked
        </span>
      )}
      <span className="stat stat--hours" title="Total estimated effort">
        <Icon name="clock" />
        <b>{hours}</b>
        h total
      </span>
      <div className="stats__spacer" />
      {view === 'board' && (
        <div className="search">
          <Icon name="search" />
          <input
            className="search__input"
            type="search"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

function Stat({ kind, label, n }: { kind: string; label: string; n: number }) {
  return (
    <span className={`stat stat--${kind}`}>
      <span className="stat__dot" />
      <b>{n}</b>
      {label}
    </span>
  );
}
