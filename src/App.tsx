import { useEffect } from 'react';
import {
  AuthProvider,
  ThemeProvider,
  ToastProvider,
  TasksProvider,
  UIProvider,
  useAuth,
  useUI,
} from './state';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { StatsBar } from './components/StatsBar';
import { BoardView } from './components/BoardView';
import { GraphView } from './components/GraphView';
import { TaskDrawer } from './components/TaskDrawer';
import { ModalHost } from './components/Modals';
import { Toaster } from './components/Toaster';
import { AuthScreen } from './components/AuthScreen';

function Shell() {
  const { view, selectedId, clearSelection, form, closeForm, confirmRequest, resolveConfirm } = useUI();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (confirmRequest) resolveConfirm(false);
      else if (form) closeForm();
      else if (selectedId != null) clearSelection();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmRequest, form, selectedId, resolveConfirm, closeForm, clearSelection]);

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <TopBar />
        <main className="content">
          <StatsBar />
          {view === 'board' ? <BoardView /> : <GraphView />}
        </main>
      </div>
      <TaskDrawer />
      <ModalHost />
      <Toaster />
    </div>
  );
}

/** The task layer only mounts once authenticated, so it never fetches without a token. */
function Authenticated() {
  return (
    <TasksProvider>
      <UIProvider>
        <Shell />
      </UIProvider>
    </TasksProvider>
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
