import { useEffect, useState, type ReactNode } from 'react';
import { BrandGlyph, Icon } from '../icons';
import { useAuth, useTasks, useUI } from '../state';

function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let timer: number;
    // Re-render right at the next minute boundary so HH:MM is never stale.
    const schedule = () => {
      timer = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, 60_000 - (Date.now() % 60_000) + 50);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);
  return now;
}

export function TopBar() {
  const { openCreate } = useUI();
  const { username, name } = useAuth();
  const { tasks, status } = useTasks();
  const now = useClock();

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'COMPLETED').length;
  const blocked = tasks.filter((t) => t.isBlocked).length;

  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const day = now.toLocaleDateString('en-US', { day: '2-digit' });
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const date = `${weekday} · ${day} ${month}`;
  // 24-hour clock (e.g. 19:42) to match the design.
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  let sub: ReactNode;
  if (status !== 'ready') sub = <>Loading your dependency map…</>;
  else if (total === 0) sub = <>No tasks yet — create your first to map it out.</>;
  else sub = (
    <>
      You've completed <b>{done}</b> of {total}
      {blocked > 0 && <> · {blocked} blocked</>}.
    </>
  );

  return (
    <header className="topbar">
      <div className="topbar__lead">
        <div className="topbar__brandm" title="Foundry"><BrandGlyph size={18} /></div>
        <div style={{ minWidth: 0 }}>
          <div className="topbar__greeting">{greetingFor(now.getHours())}{(name || username) ? `, ${name || username}` : ''}</div>
          <div className="topbar__sub">{sub}</div>
        </div>
      </div>

      <div className="topbar__right">
        <div className="clock">{date}<br /><b>{time}</b></div>
        <div className="topbar__div" />
        <button className="btn btn--wire" title="New task" onClick={openCreate}>
          <Icon name="plus" /><span className="btn__label">New task</span>
        </button>
      </div>
    </header>
  );
}
