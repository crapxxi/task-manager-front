import { useEffect } from 'react';
import {
  AuthProvider,
  ProjectsProvider,
  TasksProvider,
  ThemeProvider,
  ToastProvider,
  UIProvider,
  useAuth,
  useProjects,
  useUI,
} from './state';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { StatsBar } from './components/StatsBar';
import { BoardView } from './components/BoardView';
import { GraphView } from './components/GraphView';
import { PlanView } from './components/PlanView';
import { RoadmapView } from './components/RoadmapView';
import { TaskDrawer } from './components/TaskDrawer';
import { ModalHost } from './components/Modals';
import { Toaster } from './components/Toaster';
import { AuthScreen } from './components/AuthScreen';
import { NoProjects, ProjectsError } from './components/ui';

function Shell() {
  const { view, selectedId, clearSelection, form, projectForm, closeForm, closeProjectForm, confirmRequest, resolveConfirm } = useUI();
  const { status: projectsStatus, current } = useProjects();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (confirmRequest) resolveConfirm(false);
      else if (form) closeForm();
      else if (projectForm) closeProjectForm();
      else if (selectedId != null) clearSelection();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmRequest, form, projectForm, selectedId, resolveConfirm, closeForm, closeProjectForm, clearSelection]);

  let content;
  if (projectsStatus === 'error') content = <ProjectsError />;
  else if (projectsStatus === 'ready' && !current) content = <NoProjects />;
  else content = (
    <>
      <TopBar />
      <StatsBar />
      {view === 'board' && <BoardView />}
      {view === 'graph' && <GraphView />}
      {view === 'plan' && <PlanView />}
      {view === 'roadmap' && <RoadmapView />}
    </>
  );

  return (
    <div className="app">
      <Sidebar />
      <main className="main">{content}</main>
      <TaskDrawer />
      <ModalHost />
      <Toaster />
    </div>
  );
}

/** The data layer only mounts once authenticated, so it never fetches without a token. */
function Authenticated() {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <UIProvider>
          <Shell />
        </UIProvider>
      </TasksProvider>
    </ProjectsProvider>
  );
}

function Gate() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Authenticated /> : <AuthScreen />;
}

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Gate />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
