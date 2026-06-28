# Taskflow — Task Manager frontend

A React + TypeScript + Vite frontend for the Spring Boot **Task Manager** API
(dependency-aware tasks with a blocking DAG).

## Run

1. Start the backend (Spring Boot) on `http://localhost:8080`.
2. In this folder:
   ```bash
   npm install
   npm run dev
   ```
3. Open **http://localhost:3000**.

The Vite dev server **proxies `/api` → `http://localhost:8080`**, so the browser
only ever talks to one origin — no CORS configuration and no backend changes
needed.

## Build

```bash
npm run build     # type-check (tsc) + production bundle into dist/
npm run preview   # serve the production build (also proxies /api)
```

To serve the built app straight from Spring Boot instead of the proxy, copy the
contents of `dist/` into the backend's `src/main/resources/static/` — then it is
same-origin and needs no proxy.

## Features

- **Board** — Kanban columns (To Do / In Progress / Completed); forward-only
  status advance via the `toggle-status` endpoint; blocked tasks are locked.
- **Graph** — interactive dependency DAG: layered layout (prerequisites above
  dependents), status colours, strict vs. optional edges, pan / zoom / drag,
  fit-to-view, and click-to-focus highlighting.
- **Task drawer** — description, badges, prerequisites (with add via `bind`,
  remove via `unbind`, cycle-safe candidate filtering), "unlocks" list, and
  **subtree effort** (`calculate-duration`).
- Create / edit / delete with validation mirroring the backend constraints,
  toasts that surface the backend's `ErrorResponse.message`, light/dark themes,
  and graceful loading / offline states.

## Project layout

```
src/
  api.ts            typed fetch client for /api
  types.ts          DTOs + client model
  state.tsx         Theme / Toast / Tasks / UI context providers
  icons.tsx         inline icon set
  lib/graph.ts      layered DAG layout + edge geometry
  components/        TopBar, StatsBar, BoardView, GraphView, TaskDrawer, Modals, Toaster, ui
```

## Notes on the API

The client treats `GET /api/graph/tasks` as the source of truth for ids,
status, and relationships, and enriches descriptions from `GET /api/tasks`
(matched by id, with a unique-title fallback).
# task-manager-front
