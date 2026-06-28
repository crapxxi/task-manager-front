import { BrandGlyph, Icon } from '../icons';
import { useAuth, useTasks, useTheme, useUI, type View } from '../state';

function NavBtn({ view, label, icon, active, onClick }: {
  view: View; label: string; icon: string; active: boolean; onClick: (v: View) => void;
}) {
  return (
    <button
      className={`nav__btn ${active ? 'is-active' : ''}`}
      title={label}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      onClick={() => onClick(view)}
    >
      <Icon name={icon} />
    </button>
  );
}

export function Sidebar() {
  const { view, setView } = useUI();
  const { theme, toggle } = useTheme();
  const { reload } = useTasks();
  const { username, name, logout } = useAuth();
  const display = name || username;
  const initials = (display ?? '?').replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase() || '?';

  return (
    <aside className="sidebar">
      <div className="sidebar__brand" title="Foundry"><BrandGlyph /></div>

      <nav className="nav" role="tablist" aria-label="Views">
        <NavBtn view="board" label="Board" icon="board" active={view === 'board'} onClick={setView} />
        <NavBtn view="graph" label="Graph" icon="graph" active={view === 'graph'} onClick={setView} />
      </nav>

      <div className="sidebar__foot">
        <button className="nav__btn" title="Refresh" aria-label="Refresh" onClick={() => void reload()}>
          <Icon name="refresh" />
        </button>
        <button className="nav__btn" title="Toggle theme" aria-label="Toggle theme" onClick={toggle}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
        <button className="nav__btn" title={username ? `Sign out (${username})` : 'Sign out'} aria-label="Sign out" onClick={logout}>
          <Icon name="logout" />
        </button>
        <div className="avatar" title={display ?? ''}>{initials}</div>
      </div>
    </aside>
  );
}
