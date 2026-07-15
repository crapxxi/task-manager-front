export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
export type DependencyType = 'STRICT_PREREQUISITE' | 'OPTIONAL_LINK';
export type Complexity = 'EASY' | 'MEDIUM' | 'HARD';

export const COMPLEXITY_LABEL: Record<Complexity, string> = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const COMPLEXITY_ORDER: Complexity[] = ['EASY', 'MEDIUM', 'HARD'];

/** Importance is 0–5 on the backend (0 = not important, 5 = critical). */
export const IMPORTANCE_LABEL = ['Not important', 'Someday', 'Low', 'Normal', 'High', 'Critical'] as const;

/* ============================================================
   Projects — every task lives inside a project
   ============================================================ */

/** GET /api/projects → element; also returned by create/update. */
export interface Project {
  id: number;
  title: string;
  description: string | null;
}

/** Body for POST/PUT /api/projects. */
export interface ProjectRequest {
  title: string;
  description: string | null;
}

/* ============================================================
   Tasks
   ============================================================ */

/** Shape returned by GET /api/v1/tasks/{projectId}/tasks and the mutation endpoints. */
export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  durationHours: number;
  status: TaskStatus;
  isBlocked: boolean;
  projectId: number;
  complexity: Complexity;
  importance: number;
  /** Earliest possible finish hour on the critical path; only /suggest/tasks/{id}/time fills it. */
  calculatedTime: number | null;
  createdAt: string;
  updatedAt: string | null;
  completedAt: string | null;
}

/** GET /api/v1/suggest/tasks/{projectId}/time → TaskResponse with calculatedTime populated. */
export interface TaskWithTime extends TaskResponse {
  calculatedTime: number;
}

/** Body for POST/PUT /api/v1/tasks — projectId, complexity and importance (0–5) are required by the backend. */
export interface TaskRequest {
  projectId: number;
  title: string;
  description: string | null;
  durationHours: number;
  complexity: Complexity;
  importance: number;
}

/** GET /api/graph/tasks/all/{projectId} → nodes. */
export interface GraphNode {
  id: number;
  title: string;
  status: TaskStatus;
  durationHours: number;
  isBlocked: boolean;
}

/** Graph edges (source = prerequisite, target = dependent). */
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

/** Client-side task model (the list endpoint already carries everything). */
export interface Task {
  id: number;
  title: string;
  description: string;
  durationHours: number;
  status: TaskStatus;
  isBlocked: boolean;
  complexity: Complexity;
  importance: number;
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'To do',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired',
};

/** Board columns. EXPIRED gets its own column only when such tasks exist. */
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
