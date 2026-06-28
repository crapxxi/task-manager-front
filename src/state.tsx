import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { api, clearToken, getToken, setToken, UNAUTHORIZED_EVENT } from './api';
import type { GraphEdge, RegisterRequest, Task, TaskRequest } from './types';

/* ============================================================
   Theme
   ============================================================ */
type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('tm.theme') as Theme) || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('tm.theme', theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) throw new Error('useTheme outside provider');
  return c;
};

/* ============================================================
   Toasts
   ============================================================ */
export type ToastKind = 'success' | 'error' | 'info';
export interface Toast { id: number; message: string; kind: ToastKind }
interface ToastCtx { toasts: Toast[]; push: (message: string, kind?: ToastKind) => void; dismiss: (id: number) => void }
const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const dismiss = useCallback((id: number) => setToasts((ts) => ts.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (message: string, kind: ToastKind = 'info') => {
      const id = ++idRef.current;
      setToasts((ts) => [...ts, { id, message, kind }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );
  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
export const useToast = () => {
  const c = useContext(ToastContext);
  if (!c) throw new Error('useToast outside provider');
  return c;
};

/* ============================================================
   Auth (JWT)
   ============================================================ */
const USERNAME_KEY = 'tm.username';
const NAME_KEY = 'tm.name';

interface AuthCtx {
  token: string | null;
  username: string | null;
  name: string | null;
  isAuthenticated: boolean;
  /** True after the server invalidated an existing session (token expired). */
  sessionExpired: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem(USERNAME_KEY));
  const [name, setName] = useState<string | null>(() => localStorage.getItem(NAME_KEY));
  const [sessionExpired, setSessionExpired] = useState(false);

  // Mirrors `token` so the (mount-once) unauthorized listener can read it fresh.
  const tokenRef = useRef(token);
  useEffect(() => { tokenRef.current = token; }, [token]);

  // Pull the profile after auth so the UI can greet by first name; non-fatal.
  const hydrate = useCallback(async (newToken: string, fallbackUsername: string) => {
    setToken(newToken);
    setTokenState(newToken);
    setSessionExpired(false);
    try {
      const me = await api.me();
      localStorage.setItem(USERNAME_KEY, me.username);
      localStorage.setItem(NAME_KEY, me.name ?? '');
      setUsername(me.username);
      setName(me.name ?? null);
    } catch {
      // Profile fetch failed — keep the session and just greet by username.
      localStorage.setItem(USERNAME_KEY, fallbackUsername);
      setUsername(fallbackUsername);
    }
  }, []);

  const login = useCallback(async (user: string, password: string) => {
    const res = await api.login({ username: user, password });
    await hydrate(res.token, res.username);
  }, [hydrate]);

  // Register now returns a token directly — no second round-trip to log in.
  const register = useCallback(async (data: RegisterRequest) => {
    const res = await api.register(data);
    await hydrate(res.token, res.username);
  }, [hydrate]);

  const logout = useCallback(() => {
    clearToken();
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(NAME_KEY);
    setTokenState(null);
    setUsername(null);
    setName(null);
  }, []);

  // The api layer fires this (and clears the token) when the server rejects it.
  useEffect(() => {
    const onUnauthorized = () => {
      const wasAuthenticated = tokenRef.current != null;
      clearToken();
      localStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(NAME_KEY);
      setTokenState(null);
      setUsername(null);
      setName(null);
      if (wasAuthenticated) setSessionExpired(true);
    };
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({ token, username, name, isAuthenticated: !!token, sessionExpired, login, register, logout }),
    [token, username, name, sessionExpired, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth outside provider');
  return c;
};

/* ============================================================
   Tasks (data + actions)
   ============================================================ */
type LoadStatus = 'loading' | 'ready' | 'error';
interface TasksCtx {
  status: LoadStatus;
  tasks: Task[];
  byId: Map<number, Task>;
  edges: GraphEdge[];
  reload: () => Promise<void>;
  prerequisitesOf: (id: number) => Task[];
  dependentsOf: (id: number) => Task[];
  descendants: (id: number) => Set<number>;
  create: (body: TaskRequest) => Promise<void>;
  update: (id: number, body: TaskRequest) => Promise<void>;
  remove: (id: number) => Promise<boolean>;
  bind: (taskId: number, parentId: number) => Promise<boolean>;
  unbind: (taskId: number, parentId: number) => Promise<boolean>;
  toggle: (id: number) => Promise<boolean>;
}
const TasksContext = createContext<TasksCtx | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { push } = useToast();
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  const reload = useCallback(async () => {
    try {
      const [graph, list] = await Promise.all([api.getGraph(), api.getTasks().catch(() => [])]);
      const descById = new Map<number, string>();
      const descByTitle = new Map<string, string>();
      for (const t of list) {
        if (t.id != null) descById.set(t.id, t.description ?? '');
        descByTitle.set(t.title, t.description ?? '');
      }
      const merged: Task[] = graph.nodes.map((n) => ({
        id: n.id,
        title: n.title,
        status: n.status,
        durationHours: n.durationHours,
        isBlocked: !!n.isBlocked,
        description: descById.get(n.id) ?? descByTitle.get(n.title) ?? '',
      }));
      setTasks(merged);
      setEdges(graph.edges);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load tasks', err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const byId = useMemo(() => new Map(tasks.map((t) => [t.id, t])), [tasks]);

  const prerequisitesOf = useCallback(
    (id: number) => edges.filter((e) => e.targetId === id).map((e) => byId.get(e.sourceId)).filter((t): t is Task => !!t),
    [edges, byId],
  );
  const dependentsOf = useCallback(
    (id: number) => edges.filter((e) => e.sourceId === id).map((e) => byId.get(e.targetId)).filter((t): t is Task => !!t),
    [edges, byId],
  );
  const descendants = useCallback(
    (id: number) => {
      const out = new Map<number, number[]>();
      for (const e of edges) {
        const arr = out.get(e.sourceId);
        if (arr) arr.push(e.targetId);
        else out.set(e.sourceId, [e.targetId]);
      }
      const seen = new Set<number>();
      const stack = [id];
      while (stack.length) {
        const u = stack.pop()!;
        for (const v of out.get(u) ?? []) if (!seen.has(v)) { seen.add(v); stack.push(v); }
      }
      return seen;
    },
    [edges],
  );

  const run = useCallback(
    async (fn: () => Promise<unknown>, okMsg: string): Promise<boolean> => {
      try {
        await fn();
        await reload();
        push(okMsg, 'success');
        return true;
      } catch (err) {
        push((err as Error).message, 'error');
        return false;
      }
    },
    [reload, push],
  );

  // create/update reload but stay silent so the form can show inline errors + its own toast.
  const create = useCallback(async (body: TaskRequest) => { await api.createTask(body); await reload(); }, [reload]);
  const update = useCallback(async (id: number, body: TaskRequest) => { await api.updateTask(id, body); await reload(); }, [reload]);

  const remove = useCallback((id: number) => run(() => api.deleteTask(id), 'Task deleted'), [run]);
  const bind = useCallback((taskId: number, parentId: number) => run(() => api.bind(taskId, parentId), 'Prerequisite added'), [run]);
  const unbind = useCallback((taskId: number, parentId: number) => run(() => api.unbind(taskId, parentId), 'Dependency removed'), [run]);
  const toggle = useCallback((id: number) => run(() => api.toggleStatus(id), 'Status updated'), [run]);

  const value = useMemo<TasksCtx>(
    () => ({ status, tasks, byId, edges, reload, prerequisitesOf, dependentsOf, descendants, create, update, remove, bind, unbind, toggle }),
    [status, tasks, byId, edges, reload, prerequisitesOf, dependentsOf, descendants, create, update, remove, bind, unbind, toggle],
  );
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
export const useTasks = () => {
  const c = useContext(TasksContext);
  if (!c) throw new Error('useTasks outside provider');
  return c;
};

/* ============================================================
   UI (view, selection, search, modals)
   ============================================================ */
export type View = 'board' | 'graph';
export interface ConfirmOptions { title: string; message: string; confirmLabel?: string }
interface ConfirmRequest { opts: ConfirmOptions; resolve: (ok: boolean) => void }

interface UICtx {
  view: View;
  setView: (v: View) => void;
  selectedId: number | null;
  select: (id: number) => void;
  clearSelection: () => void;
  search: string;
  setSearch: (s: string) => void;
  form: { task: Task | null } | null;
  openCreate: () => void;
  openEdit: (task: Task) => void;
  closeForm: () => void;
  confirmRequest: ConfirmRequest | null;
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  resolveConfirm: (ok: boolean) => void;
}
const UIContext = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>(() => (localStorage.getItem('tm.view') as View) || 'board');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<{ task: Task | null } | null>(null);
  const [confirmRequest, setConfirmRequest] = useState<ConfirmRequest | null>(null);

  const setView = useCallback((v: View) => { setViewState(v); localStorage.setItem('tm.view', v); }, []);
  const select = useCallback((id: number) => setSelectedId(id), []);
  const clearSelection = useCallback(() => setSelectedId(null), []);
  const openCreate = useCallback(() => setForm({ task: null }), []);
  const openEdit = useCallback((task: Task) => setForm({ task }), []);
  const closeForm = useCallback(() => setForm(null), []);
  const confirm = useCallback(
    (opts: ConfirmOptions) => new Promise<boolean>((resolve) => setConfirmRequest({ opts, resolve })),
    [],
  );
  const resolveConfirm = useCallback(
    (ok: boolean) => setConfirmRequest((req) => { req?.resolve(ok); return null; }),
    [],
  );

  const value = useMemo<UICtx>(
    () => ({ view, setView, selectedId, select, clearSelection, search, setSearch, form, openCreate, openEdit, closeForm, confirmRequest, confirm, resolveConfirm }),
    [view, setView, selectedId, select, clearSelection, search, form, openCreate, openEdit, closeForm, confirmRequest, confirm, resolveConfirm],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
export const useUI = () => {
  const c = useContext(UIContext);
  if (!c) throw new Error('useUI outside provider');
  return c;
};
