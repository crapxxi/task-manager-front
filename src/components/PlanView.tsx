import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { Icon } from '../icons';
import { useProjects, useTasks, useUI } from '../state';
import { COMPLEXITY_LABEL, type TaskWithTime } from '../types';
import { ImportanceChip, StatusDot } from './ui';

interface PlanRow extends TaskWithTime {
  /** 1-based position in the suggested execution order. */
  position: number;
}

type PlanState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; rows: PlanRow[]; totalHours: number };

/**
 * "Plan" view: the backend's suggested execution order for the project's
 * TODO tasks (topological sort of strict dependencies), each with the
 * earliest hour it can be finished, assuming work happens sequentially
 * along the critical path.
 */
export function PlanView() {
  const { currentId } = useProjects();
  const { tasks, byId } = useTasks();
  const { select, selectedId } = useUI();
  const [state, setState] = useState<PlanState>({ kind: 'loading' });

  // Refetch whenever the project's tasks change (status toggles, binds, edits…),
  // so the plan never shows stale ordering.
  const tasksSig = useMemo(
    () => tasks.map((t) => `${t.id}:${t.status}:${t.isBlocked}:${t.durationHours}`).join(','),
    [tasks],
  );

  const load = useCallback(async () => {
    if (currentId == null) return;
    setState({ kind: 'loading' });
    try {
      // Order comes from /suggest/tasks/{id}; finish hours from /time.
      const [order, withTime] = await Promise.all([
        api.getSuggested(currentId),
        api.getTasksWithTime(currentId),
      ]);
      const hourById = new Map(withTime.map((t) => [t.id, t.calculatedFinishHour]));
      const rows: PlanRow[] = order.map((t, i) => ({
        ...t,
        calculatedFinishHour: hourById.get(t.id) ?? t.durationHours,
        position: i + 1,
      }));
      const totalHours = withTime.reduce((max, t) => Math.max(max, t.calculatedFinishHour), 0);
      setState({ kind: 'ready', rows, totalHours });
    } catch (err) {
      setState({ kind: 'error', message: (err as Error).message });
    }
  }, [currentId]);

  useEffect(() => { void load(); }, [load, tasksSig]);

  if (state.kind === 'loading') {
    return (
      <section className="view plan">
        <div className="placeholder"><div className="spinner" /><p className="placeholder__text">Building the plan…</p></div>
      </section>
    );
  }

  if (state.kind === 'error') {
    return (
      <section className="view plan">
        <div className="placeholder">
          <div className="placeholder__art placeholder__art--warn"><Icon name="alert" size={36} /></div>
          <h3 className="placeholder__title">Couldn’t build the plan</h3>
          <p className="placeholder__text">{state.message}</p>
          <button className="btn btn--primary" onClick={() => void load()}><Icon name="refresh" />Retry</button>
        </div>
      </section>
    );
  }

  const { rows, totalHours } = state;

  if (rows.length === 0) {
    return (
      <section className="view plan">
        <div className="placeholder">
          <h3 className="placeholder__title">Nothing to plan</h3>
          <p className="placeholder__text">There are no tasks in “To do”. Tasks that are in progress or completed don’t appear here.</p>
        </div>
      </section>
    );
  }

  const days = totalHours / 8;

  return (
    <section className="view plan">
      <div className="plan__summary">
        <span className="plan__total">
          Estimated total: <b>{totalHours}h</b>
          {totalHours >= 8 && <span className="muted"> · ~{days.toFixed(days < 10 ? 1 : 0)} workdays</span>}
        </span>
        <span className="muted small">Suggested order for the remaining “To do” tasks. “Done by” is the earliest finish hour given the dependencies.</span>
      </div>

      <ol className="plan__list">
        {rows.map((row) => {
          const live = byId.get(row.id);
          const blocked = live?.isBlocked ?? row.isBlocked;
          return (
            <li key={row.id}>
              <button
                className={`planrow ${selectedId === row.id ? 'is-active' : ''}`}
                onClick={() => select(row.id)}
              >
                <span className="planrow__num">{row.position}</span>
                <StatusDot status={row.status} />
                <span className="planrow__title">{row.title}</span>
                {blocked && <span className="chip chip--blocked chip--xs">blocked</span>}
                <ImportanceChip value={row.importance} />
                <span className={`meta meta--cx-${row.complexity.toLowerCase()}`}>{COMPLEXITY_LABEL[row.complexity]}</span>
                <span className="meta" title="Estimated effort"><Icon name="clock" />{row.durationHours}h</span>
                <span className="planrow__finish" title="Earliest possible finish, counting prerequisite hours">
                  done by <b>{row.calculatedFinishHour}h</b>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
