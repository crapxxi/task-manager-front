export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type DependencyType = 'STRICT_PREREQUISITE' | 'OPTIONAL_LINK';

/** Shape returned by GET /api/tasks and the mutation endpoints. */
export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  durationHours: number;
  status: TaskStatus;
  isBlocked: boolean;
}

/** Body for POST/PUT /api/tasks. */
export interface TaskRequest {
  title: string;
  description: string | null;
  durationHours: number;
}

/** GET /api/graph/tasks → nodes. */
export interface GraphNode {
  id: number;
  title: string;
  status: TaskStatus;
  durationHours: number;
  isBlocked: boolean;
}

/** GET /api/graph/tasks → edges (source = prerequisite, target = dependent). */
export interface GraphEdge {
  id: number;
  sourceId: number;
  targetId: number;
  type: DependencyType;
}

export interface TaskGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/** The backend's ErrorResponse body. */
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

/** Client-side merged model: graph node (has id + live status) + description. */
export interface Task {
  id: number;
  title: string;
  description: string;
  durationHours: number;
  status: TaskStatus;
  isBlocked: boolean;
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'To do',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
};

export const STATUS_ORDER: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];

/* ============================================================
   Auth (JWT) — mirrors the backend's auth DTOs
   ============================================================ */
export type UserRole = 'USER';

/** Body for POST /api/auth/login. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Body for POST /api/auth/register (surname is optional). */
export interface RegisterRequest {
  username: string;
  name: string;
  surname: string | null;
  password: string;
}

/** POST /api/auth/login → token to send as `Authorization: Bearer <token>`. */
export interface AuthResponse {
  username: string;
  token: string;
}

/** GET /api/auth/me → the current user's profile. */
export interface UserResponse {
  id: number;
  name: string;
  surname: string | null;
  username: string;
  role: UserRole;
}

/** Backend validation constraints, reused for client-side checks. */
export const AUTH_LIMITS = {
  usernameMin: 5,
  nameMin: 2,
  passwordMin: 8,
} as const;
