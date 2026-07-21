import { Icon } from '../icons';
import { useTasks, useUI } from '../state';
import type { TaskStatus } from '../types';
import { formatDuration } from '../lib/duration';

export function StatsBar() {
  const { status, tasks } = useTasks();
  const { view, search, setSearch } = useUI();
  if (status !== 'ready' || tasks.length === 0) return null;

  const by = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;
  const blocked = tasks.filter((t) => t.isBlocked).length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);
  const done = by('COMPLETED');
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div className="stats">
      <span className="stat stat--pct" title={`${done} of ${tasks.length} tasks completed`}>
        <span className="progress"><span className="progress__fill" style={{ width: `${pct}%` }} /></span>
        {pct}% done
      </span>
      <span className="stat">{tasks.length} tasks</span>
      <span className="stat stat--todo">{by('TODO')} to do</span>
      <span className="stat stat--progress">{by('IN_PROGRESS')} in progress</span>
      <span className="stat stat--done">{done} completed</span>
      {by('EXPIRED') > 0 && <span className="stat stat--expired">{by('EXPIRED')} expired</span>}
      {blocked > 0 && <span className="stat stat--blocked">{blocked} blocked</span>}
      <span className="stat stat--hours">{formatDuration(totalMinutes)} total</span>
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
