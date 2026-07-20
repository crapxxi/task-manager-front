import { Icon } from '../icons';
import { useProjects, useUI } from '../state';

export function TopBar() {
  const { current, remove } = useProjects();
  const { view, setView, openCreate, openEditProject, confirm, clearSelection } = useUI();

  if (!current) return null;

  async function onDeleteProject() {
    if (!current) return;
    const ok = await confirm({
      title: 'Delete project',
      message: `Delete “${current.title}” with all of its tasks? This can’t be undone.`,
      confirmLabel: 'Delete',
    });
    if (!ok) return;
    clearSelection();
    await remove(current.id);
  }

  return (
    <header className="topbar">
      <div className="topbar__info">
        <h1 className="topbar__title">{current.title}</h1>
        {current.description && <p className="topbar__desc">{current.description}</p>}
      </div>

      <div className="topbar__actions">
        <div className="tabs" role="tablist" aria-label="Views">
          <button
            role="tab"
            aria-selected={view === 'board'}
            className={`tabs__btn ${view === 'board' ? 'is-active' : ''}`}
            onClick={() => setView('board')}
          >
            Board
          </button>
          <button
            role="tab"
            aria-selected={view === 'graph'}
            className={`tabs__btn ${view === 'graph' ? 'is-active' : ''}`}
            onClick={() => setView('graph')}
          >
            Graph
          </button>
          <button
            role="tab"
            aria-selected={view === 'plan'}
            className={`tabs__btn ${view === 'plan' ? 'is-active' : ''}`}
            onClick={() => setView('plan')}
          >
            Plan
          </button>
          <button
            role="tab"
            aria-selected={view === 'roadmap'}
            className={`tabs__btn ${view === 'roadmap' ? 'is-active' : ''}`}
            onClick={() => setView('roadmap')}
          >
            Roadmap
          </button>
        </div>

        <button className="iconbtn" title="Edit project" onClick={() => openEditProject(current)}><Icon name="edit" /></button>
        <button className="iconbtn iconbtn--danger" title="Delete project" onClick={() => void onDeleteProject()}><Icon name="trash" /></button>

        <button className="btn btn--primary" onClick={() => openCreate()}>
          <Icon name="plus" />
          New task
        </button>
      </div>
    </header>
  );
}
