# design-sync notes — task-manager-front

- This repo is a Vite React **application**, not a packaged library: no `main`/`module`/`exports` in package.json, `dist/` is an app build. The converter runs from a hand-written barrel entry `.design-sync/ds-entry.ts` (`cfg.entry`) that re-exports the component surface; **do not** run without it — `node_modules/task-manager-front` doesn't exist, so bare synth-entry mode crashes in `projectFor`. All 21 components are pinned with explicit paths in `componentSrcMap` (no shipped `.d.ts` to discover from).
- Every component reads a six-level context chain: `ThemeProvider > ToastProvider > AuthProvider > ProjectsProvider > TasksProvider > UIProvider` (all from `src/state.tsx`, wired in `cfg.provider`). Order matters: Projects needs Toast+Auth above it; Tasks needs Toast+Projects.
- Providers fetch `/api/v1/**` on mount. Previews for data-driven components install a `window.fetch` stub from `.design-sync/preview-data.ts` (also seeds `tm.token`/`tm.username`/`tm.name`/`tm.project.alona` in localStorage) BEFORE the providers mount. Endpoints mocked: projects, tasks, graph, active groups, groups page, archives, suggest, suggest/time, auth/me.
- Views take **zero props** — variant coverage comes from the mocked data, not props.
- Fixed-position overlays needed harness CSS inside their previews to render inside card cells: Toaster (`.toasts` → static), ModalHost (`.modal-root` → static, backdrop hidden), TaskDrawer (`.drawer` → static at 420px, scrim hidden). GraphView needs an explicit-height (640px) flex wrapper — it fills the app shell's main area and collapses otherwise. TaskDrawer's preview selects task 5 only after `byId` is populated (selecting earlier gets auto-cleared).
- Wide views use `cfg.overrides` `cardMode: column` (+1280x760 viewport for Board/Roadmap/Plan/Graph); TopBar/StatsBar are column without viewport.
- Styling: single stylesheet `src/index.css` (`cfg.cssEntry`; 32 tokens on `:root`, dark theme via `[data-theme='dark']`). System font stack — no font files to ship.
- Six providers + `App` are excluded from component cards via `componentSrcMap: null` but remain bundle exports (34 exports total incl. the six `use*` hooks).
- Render check: playwright **1.60.0** pinned in `.ds-sync/` — matches the cached chromium-1223 in `~/Library/Caches/ms-playwright`. Latest playwright pins 1228 and fails to launch.
- Toast messages auto-dismiss after 4s; the capture screenshots fast enough today, but a very slow render-check run could catch an empty Toaster card — re-push the toasts or re-capture if that ever shows up.

## Known render warns

(none — final validate was 21/21 clean with zero warns)

## Uploaded project is STALE as of 2026-07-20

The subtask feature + a visual refresh landed in the app **without** a re-sync
(the user chose frontend-only that session), so claude.ai/design project
`0258b05f` still serves the pre-subtask components and the old palette. The next
sync is a normal re-sync — nothing special to do, just expect a large diff:
every card re-renders (new tokens, accent rail) and `SubtaskProgress` is a new
export that needs adding to `ds-entry.ts` + `componentSrcMap`.

What changed: `Task`/`TaskRequest`/`TaskResponse` gained `parentId`, `GraphNode`
gained `subtaskCount`/`completedSubtaskCount`, `api.getSubtasks` was added, and
`useTasks().tasks` now returns **top-level tasks only** (subtasks live in
`allTasks`/`subtasksOf`/`subtaskStats`). `preview-data.ts` was updated to match:
tasks 10–14 are subtasks, the graph fixture filters them out and carries the two
new counters, and the mock router answers `/tasks/{id}/subtasks`.

## Re-sync risks

- `preview-data.ts` mirrors the backend DTO shapes (`TaskResponse`, `TaskGraph`, `PageResponse`, suggest endpoints). If `src/types.ts` or `src/api.ts` endpoints change, the mock silently drifts → views fall back to error/empty states. Check those files' diffs on re-sync.
- `ds-entry.ts` enumerates component modules; a new component file in `src/components/` must be added there AND to `componentSrcMap` or it won't ship.
- The overlay harness `<style>` blocks in Toaster/ModalHost/TaskDrawer previews pin app class names (`.toasts`, `.modal-root`, `.modal-backdrop`, `.drawer`, `.scrim`); renames in `index.css` break those previews quietly (cards show the fixed-position clipping again).
- The provider chain in `cfg.provider` mirrors `App.tsx`'s nesting; if the app reorders/adds providers, update the config.
- Build assumed node 24 + npm (package-lock.json, `npm ci`); no repo build script is run (barrel entry compiles straight from `src/`).
