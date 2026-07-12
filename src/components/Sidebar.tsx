import { Icon } from '../icons';
import { useAuth, useProjects, useTheme, useUI } from '../state';

export function Sidebar() {
  const { theme, toggle } = useTheme();
  const { username, name, logout } = useAuth();
  const { projects, currentId, selectProject, status } = useProjects();
  const { openCreateProject, clearSelection } = useUI();
  const display = name || username || '';

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">Task Manager</div>

      <div className="sidebar__section">
        <div className="sidebar__heading">Projects</div>
        <nav className="projects" aria-label="Projects">
          {status === 'loading' && <div className="projects__empty">Loading…</div>}
          {status === 'ready' && projects.length === 0 && (
            <div className="projects__empty">No projects yet</div>
          )}
          {projects.map((p) => (
            <button
              key={p.id}
              className={`projects__item ${p.id === currentId ? 'is-active' : ''}`}
              title={p.title}
              onClick={() => { clearSelection(); selectProject(p.id); }}
            >
              <Icon name="folder" />
              <span className="projects__title">{p.title}</span>
            </button>
          ))}
        </nav>
        <button className="btn btn--ghost btn--block" onClick={openCreateProject}>
          <Icon name="plus" />
          New project
        </button>
      </div>

      <div className="sidebar__foot">
        <div className="sidebar__user" title={username ?? ''}>
          <Icon name="user" />
          <span className="sidebar__username">{display}</span>
        </div>
        <div className="sidebar__footbtns">
          <button className="iconbtn" title="Toggle theme" aria-label="Toggle theme" onClick={toggle}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button className="iconbtn" title="Sign out" aria-label="Sign out" onClick={logout}>
            <Icon name="logout" />
          </button>
        </div>
      </div>
    </aside>
  );
}
