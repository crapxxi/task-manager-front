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
import type {
  DependencyType,
  GraphArchive,
  GraphEdge,
  Project,
  ProjectRequest,
  RegisterRequest,
  Task,
  TaskGraph,
  TaskGroup,
  TaskRequest,
} from './types';

/* ============================================================
   Theme
   ============================================================ */
type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('tm.theme') as Theme) || 'light');
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
   Projects (list + current selection)
   ============================================================ */
type LoadStatus = 'loading' | 'ready' | 'error';

const CURRENT_PROJECT_KEY = 'tm.project.';

interface ProjectsCtx {
  status: LoadStatus;
  projects: Project[];
  currentId: number | null;
  current: Project | null;
  selectProject: (id: number) => void;
  reload: () => Promise<void>;
  create: (body: ProjectRequest) => Promise<void>;
  update: (id: number, body: ProjectRequest) => Promise<void>;
  remove: (id: number) => Promise<boolean>;
}
const ProjectsContext = createContext<ProjectsCtx | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { push } = useToast();
  const { username } = useAuth();
  const storageKey = CURRENT_PROJECT_KEY + (username ?? 'anon');

  const [status, setStatus] = useState<LoadStatus>('loading');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? Number(raw) : null;
  });

  // Keep the selection valid: fall back to the first project, or none.
  const settle = useCallback((list: Project[], preferred: number | null) => {
    const valid = preferred != null && list.some((p) => p.id === preferred) ? preferred : list[0]?.id ?? null;
    setCurrentId(valid);
    if (valid != null) localStorage.setItem(storageKey, String(valid));
    else localStorage.removeItem(storageKey);
  }, [storageKey]);

  const reload = useCallback(async () => {
    try {
      const list = await api.getProjects();
      setProjects(list);
      setCurrentId((prev) => {
        const valid = prev != null && list.some((p) => p.id === prev) ? prev : list[0]?.id ?? null;
        if (valid != null) localStorage.setItem(storageKey, String(valid));
        else localStorage.removeItem(storageKey);
        return valid;
      });
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load projects', err);
      setStatus('error');
    }
  }, [storageKey]);

  useEffect(() => { void reload(); }, [reload]);

  const selectProject = useCallback((id: number) => {
    setCurrentId(id);
    localStorage.setItem(storageKey, String(id));
  }, [storageKey]);

  const create = useCallback(async (body: ProjectRequest) => {
    const created = await api.createProject(body);
    const list = await api.getProjects().catch(() => null);
    if (list) setProjects(list);
    else setProjects((ps) => [...ps, created]);
    // Jump straight into the new project.
    setCurrentId(created.id);
    localStorage.setItem(storageKey, String(created.id));
    setStatus('ready');
  }, [storageKey]);

  const update = useCallback(async (id: number, body: ProjectRequest) => {
    const updated = await api.updateProject(id, body);
    setProjects((ps) => ps.map((p) => (p.id === id ? updated : p)));
  }, []);

  const remove = useCallback(async (id: number): Promise<boolean> => {
    try {
      await api.deleteProject(id);
      const list = projects.filter((p) => p.id !== id);
      setProjects(list);
      settle(list, currentId === id ? null : currentId);
      push('Project deleted', 'success');
      return true;
    } catch (err) {
      push((err as Error).message, 'error');
      return false;
    }
  }, [projects, currentId, settle, push]);

  const current = useMemo(() => projects.find((p) => p.id === currentId) ?? null, [projects, currentId]);

  const value = useMemo<ProjectsCtx>(
    () => ({ status, projects, currentId, current, selectProject, reload, create, update, remove }),
    [status, projects, currentId, current, selectProject, reload, create, update, remove],
  );
  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}
export const useProjects = () => {
  const c = useContext(ProjectsContext);
  if (!c) throw new Error('useProjects outside provider');
  return c;
};

/* ============================================================
   Tasks (data + actions, scoped to the current project)
   ============================================================ */
interface TasksCtx {
  status: LoadStatus;
  tasks: Task[];
  byId: Map<number, Task>;
  edges: GraphEdge[];
  groups: TaskGroup[];
  reload: () => Promise<void>;
  prerequisitesOf: (id: number) => Task[];
  dependentsOf: (id: number) => Task[];
  descendants: (id: number) => Set<number>;
  /** Transitive dependents reachable via STRICT prerequisites only (what a task truly unlocks). */
  strictDescendants: (id: number) => Set<number>;
  /** Backend-computed influence per task (count of strict transitive dependents). */
  influenceById: Map<number, number>;
  create: (body: Omit<TaskRequest, 'projectId'>) => Promise<void>;
  update: (id: number, body: Omit<TaskRequest, 'projectId'>) => Promise<void>;
  remove: (id: number) => Promise<boolean>;
  bind: (taskId: number, parentId: number, type?: DependencyType) => Promise<boolean>;
  unbind: (taskId: number, parentId: number) => Promise<boolean>;
  changeBindType: (taskId: number, parentId: number, type: DependencyType) => Promise<boolean>;
  toggle: (id: number) => Promise<boolean>;
  createGroup: (title: string) => Promise<TaskGroup | null>;
  renameGroup: (id: number, title: string) => Promise<boolean>;
  removeGroup: (id: number) => Promise<boolean>;
  setTaskGroup: (taskId: number, groupId: number | null) => Promise<boolean>;
  assignToGroup: (groupId: number, taskIds: number[]) => Promise<boolean>;
  /** Create a group and put the given tasks in it — one flow, one toast. */
  groupTasks: (title: string, taskIds: number[]) => Promise<boolean>;
  /** History of archived branches for the current project (newest first). */
  archives: GraphArchive[];
  /** Archive a completed branch: the root task plus everything it unlocks. */
  archiveBranch: (rootId: number, title: string | null) => Promise<boolean>;
  /** Bring an archived branch back into the active graph. */
  restoreArchive: (archiveId: number) => Promise<boolean>;
  /** Nodes + edges inside one archive (for the read-only viewer). */
  fetchArchiveGraph: (archiveId: number) => Promise<TaskGraph>;
}
const TasksContext = createContext<TasksCtx | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { push } = useToast();
  const { currentId } = useProjects();
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [archives, setArchives] = useState<GraphArchive[]>([]);
  const [influenceById, setInfluenceById] = useState<Map<number, number>>(new Map());

  const reload = useCallback(async () => {
    if (currentId == null) {
      setTasks([]);
      setEdges([]);
      setGroups([]);
      setArchives([]);
      setInfluenceById(new Map());
      setStatus('ready');
      return;
    }
    try {
      // The task list carries descriptions; the graph carries the edges.
      const [list, graph, groupList, archiveList] = await Promise.all([
        api.getTasks(currentId),
        api.getGraph(currentId),
        // Groups and archives are enhancements — a backend without them
        // shouldn't take the whole board down.
        api.getGroups(currentId).catch(() => []),
        api.getArchives(currentId).catch(() => []),
      ]);
      // The list endpoint returns archived tasks too — only active ones belong
      // on the board; archived branches live behind the graph's History panel.
      setTasks(list.filter((t) => t.archiveId == null).map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description ?? '',
        durationHours: t.durationHours,
        status: t.status,
        isBlocked: !!t.isBlocked,
        complexity: t.complexity ?? 'MEDIUM',
        importance: t.importance ?? 0,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt ?? null,
        completedAt: t.completedAt ?? null,
        groupId: t.groupId ?? null,
      })));
      setEdges(graph.edges);
      setGroups(groupList);
      setArchives([...archiveList].sort((a, b) => b.archivedAt.localeCompare(a.archivedAt)));
      setInfluenceById(new Map(graph.nodes.map((n) => [n.id, n.influence ?? 0])));
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load tasks', err);
      setStatus('error');
    }
  }, [currentId]);

  // Show a spinner when switching projects, then load.
  useEffect(() => {
    setStatus('loading');
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
  // Downstream cone via STRICT edges only — the tasks this one actually unlocks,
  // mirroring how the backend counts influence.
  const strictDescendants = useCallback(
    (id: number) => {
      const out = new Map<number, number[]>();
      for (const e of edges) {
        if (e.type !== 'STRICT_PREREQUISITE') continue;
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
      seen.delete(id);
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
  const create = useCallback(async (body: Omit<TaskRequest, 'projectId'>) => {
    if (currentId == null) throw new Error('Create a project first');
    await api.createTask({ ...body, projectId: currentId });
    await reload();
  }, [currentId, reload]);

  const update = useCallback(async (id: number, body: Omit<TaskRequest, 'projectId'>) => {
    if (currentId == null) throw new Error('Create a project first');
    await api.updateTask(id, { ...body, projectId: currentId });
    await reload();
  }, [currentId, reload]);

  const remove = useCallback((id: number) => run(() => api.deleteTask(id), 'Task deleted'), [run]);
  const bind = useCallback(
    (taskId: number, parentId: number, type?: DependencyType) =>
      run(() => api.bind(taskId, parentId, type), type === 'OPTIONAL_LINK' ? 'Optional link added' : 'Prerequisite added'),
    [run],
  );
  const unbind = useCallback((taskId: number, parentId: number) => run(() => api.unbind(taskId, parentId), 'Dependency removed'), [run]);
  const changeBindType = useCallback(
    (taskId: number, parentId: number, type: DependencyType) =>
      run(() => api.updateBindType(taskId, parentId, type), type === 'OPTIONAL_LINK' ? 'Link is now optional' : 'Link is now required'),
    [run],
  );
  const toggle = useCallback((id: number) => run(() => api.toggleStatus(id), 'Status updated'), [run]);

  // Returns the created group (not just a flag) so callers can chain an assign.
  const createGroup = useCallback(async (title: string): Promise<TaskGroup | null> => {
    if (currentId == null) return null;
    try {
      const g = await api.createGroup({ projectId: currentId, title });
      await reload();
      push('Group created', 'success');
      return g;
    } catch (err) {
      push((err as Error).message, 'error');
      return null;
    }
  }, [currentId, reload, push]);
  const groupTasks = useCallback(async (title: string, taskIds: number[]): Promise<boolean> => {
    if (currentId == null || taskIds.length === 0) return false;
    try {
      const g = await api.createGroup({ projectId: currentId, title });
      await api.assignToGroup(g.id, taskIds);
      await reload();
      push(`Group “${title}” created with ${taskIds.length} task${taskIds.length === 1 ? '' : 's'}`, 'success');
      return true;
    } catch (err) {
      push((err as Error).message, 'error');
      await reload(); // the group may exist without its tasks — show the truth
      return false;
    }
  }, [currentId, reload, push]);
  const renameGroup = useCallback((id: number, title: string) => {
    if (currentId == null) return Promise.resolve(false);
    return run(() => api.updateGroup(id, { projectId: currentId, title }), 'Group renamed');
  }, [run, currentId]);
  const removeGroup = useCallback(
    (id: number) => run(() => api.deleteGroup(id), 'Group deleted — its tasks are ungrouped'),
    [run],
  );
  const assignToGroup = useCallback(
    (groupId: number, taskIds: number[]) => run(() => api.assignToGroup(groupId, taskIds), 'Tasks added to group'),
    [run],
  );
  // The update endpoint expects the full body, so rebuild it from the cached task.
  const setTaskGroup = useCallback((taskId: number, groupId: number | null) => {
    const t = byId.get(taskId);
    if (!t || currentId == null) return Promise.resolve(false);
    const body: TaskRequest = {
      projectId: currentId,
      title: t.title,
      description: t.description || null,
      durationHours: t.durationHours,
      complexity: t.complexity,
      importance: t.importance,
      groupId,
    };
    return run(() => api.updateTask(taskId, body), groupId == null ? 'Removed from group' : 'Moved to group');
  }, [run, byId, currentId]);

  const archiveBranch = useCallback((rootId: number, title: string | null) => {
    if (currentId == null) return Promise.resolve(false);
    return run(() => api.archiveBranches(currentId, [rootId], title), 'Branch archived');
  }, [run, currentId]);
  const restoreArchive = useCallback((archiveId: number) => {
    if (currentId == null) return Promise.resolve(false);
    return run(() => api.restoreArchive(currentId, archiveId), 'Branch restored to the graph');
  }, [run, currentId]);
  const fetchArchiveGraph = useCallback((archiveId: number) => {
    if (currentId == null) return Promise.reject(new Error('No project selected'));
    return api.getArchiveGraph(currentId, archiveId);
  }, [currentId]);

  const value = useMemo<TasksCtx>(
    () => ({
      status, tasks, byId, edges, groups, reload, prerequisitesOf, dependentsOf, descendants,
      strictDescendants, influenceById,
      create, update, remove, bind, unbind, changeBindType, toggle,
      createGroup, renameGroup, removeGroup, setTaskGroup, assignToGroup, groupTasks,
      archives, archiveBranch, restoreArchive, fetchArchiveGraph,
    }),
    [status, tasks, byId, edges, groups, reload, prerequisitesOf, dependentsOf, descendants,
      strictDescendants, influenceById,
      create, update, remove, bind, unbind, changeBindType, toggle,
      createGroup, renameGroup, removeGroup, setTaskGroup, assignToGroup, groupTasks,
      archives, archiveBranch, restoreArchive, fetchArchiveGraph],
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
export type View = 'board' | 'graph' | 'plan' | 'roadmap';
export interface ConfirmOptions { title: string; message: string; confirmLabel?: string }
interface ConfirmRequest { opts: ConfirmOptions; resolve: (ok: boolean) => void }

interface UICtx {
  view: View;
  setView: (v: View) => void;
  selectedId: number | null;
  select: (id: number) => void;
  clearSelection: () => void;
  /** When set, the graph shows only this task and everything it unlocks. */
  branchRoot: number | null;
  focusBranch: (id: number | null) => void;
  search: string;
  setSearch: (s: string) => void;
  form: { task: Task | null } | null;
  openCreate: () => void;
  openEdit: (task: Task) => void;
  closeForm: () => void;
  projectForm: { project: Project | null } | null;
  openCreateProject: () => void;
  openEditProject: (project: Project) => void;
  closeProjectForm: () => void;
  confirmRequest: ConfirmRequest | null;
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  resolveConfirm: (ok: boolean) => void;
}
const UIContext = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>(() => (localStorage.getItem('tm.view') as View) || 'board');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [branchRoot, setBranchRoot] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<{ task: Task | null } | null>(null);
  const [projectForm, setProjectForm] = useState<{ project: Project | null } | null>(null);
  const [confirmRequest, setConfirmRequest] = useState<ConfirmRequest | null>(null);

  const setView = useCallback((v: View) => { setViewState(v); localStorage.setItem('tm.view', v); }, []);
  const select = useCallback((id: number) => setSelectedId(id), []);
  const clearSelection = useCallback(() => setSelectedId(null), []);
  const focusBranch = useCallback((id: number | null) => setBranchRoot(id), []);
  const openCreate = useCallback(() => setForm({ task: null }), []);
  const openEdit = useCallback((task: Task) => setForm({ task }), []);
  const closeForm = useCallback(() => setForm(null), []);
  const openCreateProject = useCallback(() => setProjectForm({ project: null }), []);
  const openEditProject = useCallback((project: Project) => setProjectForm({ project }), []);
  const closeProjectForm = useCallback(() => setProjectForm(null), []);
  const confirm = useCallback(
    (opts: ConfirmOptions) => new Promise<boolean>((resolve) => setConfirmRequest({ opts, resolve })),
    [],
  );
  const resolveConfirm = useCallback(
    (ok: boolean) => setConfirmRequest((req) => { req?.resolve(ok); return null; }),
    [],
  );

  const value = useMemo<UICtx>(
    () => ({
      view, setView, selectedId, select, clearSelection, branchRoot, focusBranch, search, setSearch,
      form, openCreate, openEdit, closeForm,
      projectForm, openCreateProject, openEditProject, closeProjectForm,
      confirmRequest, confirm, resolveConfirm,
    }),
    [view, setView, selectedId, select, clearSelection, branchRoot, focusBranch, search,
      form, openCreate, openEdit, closeForm,
      projectForm, openCreateProject, openEditProject, closeProjectForm,
      confirmRequest, confirm, resolveConfirm],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
export const useUI = () => {
  const c = useContext(UIContext);
  if (!c) throw new Error('useUI outside provider');
  return c;
};
