import type {
  AuthResponse,
  DependencyType,
  LoginRequest,
  Project,
  ProjectRequest,
  RegisterRequest,
  TaskGraph,
  TaskRequest,
  TaskResponse,
  TaskWithTime,
  UserResponse,
} from './types';

type Query = Record<string, string | number>;

/* ============================================================
   JWT token storage
   The backend protects every /api route except /api/auth/login and
   /api/auth/register, so the token is read straight from localStorage
   and sent on every request.
   ============================================================ */
const TOKEN_KEY = 'tm.token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Fired when the server rejects our token (expired/invalid/missing). */
export const UNAUTHORIZED_EVENT = 'tm:unauthorized';

async function req<T>(method: string, path: string, opts: { query?: Query; body?: unknown } = {}): Promise<T> {
  let url = path;
  if (opts.query) {
    const qs = new URLSearchParams(
      Object.entries(opts.query).map(([k, v]) => [k, String(v)]),
    ).toString();
    url += (url.includes('?') ? '&' : '?') + qs;
  }

  const token = getToken();
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const init: RequestInit = { method, headers };
  if (opts.body !== undefined) init.body = JSON.stringify(opts.body);

  const res = await fetch(url, init);

  // 401 = expired/invalid token; 403 with no token = unauthenticated hit on a
  // protected route. (A 403 *with* a token is an ownership error — let it through
  // as a normal error so we don't sign the user out of a valid session.)
  // The /api/auth/** endpoints are exempt: a bad login is a form error, not a
  // session that expired.
  const isAuthEndpoint = path.startsWith('/api/v1/auth/');
  if (!isAuthEndpoint && (res.status === 401 || (res.status === 403 && !token))) {
    clearToken();
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new Error('Your session has expired. Please sign in again.');
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data && (data as { message?: string }).message) ||
      (typeof data === 'string' && data) ||
      `${res.status} ${res.statusText}`;
    throw new Error(String(message));
  }
  return data as T;
}

/* ============================================================
   Endpoints — mirror the backend controllers under /api/v1/**.
   ============================================================ */
export const api = {
  // auth
  register: (body: RegisterRequest) => req<AuthResponse>('POST', '/api/v1/auth/register', { body }),
  login: (body: LoginRequest) => req<AuthResponse>('POST', '/api/v1/auth/login', { body }),
  me: () => req<UserResponse>('GET', '/api/v1/auth/me'),

  // projects
  getProjects: () => req<Project[]>('GET', '/api/v1/projects'),
  createProject: (body: ProjectRequest) => req<Project>('POST', '/api/v1/projects', { body }),
  updateProject: (id: number, body: ProjectRequest) => req<Project>('PUT', `/api/v1/projects/${id}`, { body }),
  deleteProject: (id: number) => req<void>('DELETE', `/api/v1/projects/${id}`),

  // tasks (scoped to a project)
  getTasks: (projectId: number) => req<TaskResponse[]>('GET', `/api/v1/tasks/${projectId}/tasks`),
  createTask: (body: TaskRequest) => req<TaskResponse>('POST', '/api/v1/tasks', { body }),
  updateTask: (id: number, body: TaskRequest) => req<TaskResponse>('PUT', `/api/v1/tasks/${id}`, { body }),
  deleteTask: (id: number) => req<void>('DELETE', `/api/v1/tasks/${id}`),
  bind: (taskId: number, parentId: number, type?: DependencyType) =>
    req<TaskResponse[]>('PATCH', '/api/v1/tasks/bind', { query: { taskId, parentId, ...(type ? { type } : {}) } }),
  unbind: (taskId: number, parentId: number) => req<TaskResponse[]>('PATCH', '/api/v1/tasks/unbind', { query: { taskId, parentId } }),
  toggleStatus: (id: number) => req<TaskResponse>('PATCH', `/api/v1/tasks/${id}/toggle-status`),

  // dependency graph
  getGraph: (projectId: number) => req<TaskGraph>('GET', `/api/v1/graph/tasks/all/${projectId}`),
  calcDuration: (taskId: number) => req<number>('GET', `/api/v1/graph/tasks/${taskId}/calculate-duration`),

  // suggested execution plan (TODO tasks, topological order by critical path)
  getSuggested: (projectId: number) => req<TaskResponse[]>('GET', `/api/v1/suggest/tasks/${projectId}`),
  getTasksWithTime: (projectId: number) => req<TaskWithTime[]>('GET', `/api/v1/suggest/tasks/${projectId}/time`),
};
