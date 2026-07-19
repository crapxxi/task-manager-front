# Task Manager DS — build conventions

## Setup: providers are mandatory

Every component reads React context. Wrap any composition in the full chain, in this exact order (inner ones depend on outer ones); hooks throw (`useTasks outside provider`) otherwise:

```jsx
<ThemeProvider><ToastProvider><AuthProvider><ProjectsProvider><TasksProvider><UIProvider>
  {/* your UI */}
</UIProvider></TasksProvider></ProjectsProvider></AuthProvider></ToastProvider></ThemeProvider>
```

Data flows from a REST backend (`/api/v1/projects`, `/api/v1/tasks/{projectId}/tasks`, `/api/v1/graph/tasks/all/{projectId}`): `ProjectsProvider`/`TasksProvider` fetch on mount. With no backend, views render their error/empty states — in a prototype, stub `window.fetch` for `/api/` URLs (return JSON arrays of projects/tasks) **before** mounting, or compose from the prop-driven primitives (`StatusBadge`, `StatusDot`, `ImportanceChip`, `AdvanceButton`, `Icon`) which need no data. View components (`BoardView`, `GraphView`, `PlanView`, `RoadmapView`) take **zero props** — everything comes from providers, so vary what you show by varying the fetched data. Dark mode: `ThemeProvider` sets `data-theme="dark"` on `<html>`; the stylesheet swaps tokens via `[data-theme='dark']`.

## Styling idiom: plain CSS classes + `var(--*)` tokens

No utility framework, no CSS-in-JS. One stylesheet defines a BEM-flavored class vocabulary and ~32 custom properties. For your own layout glue, use the tokens; for controls, reuse the component classes:

| Family | Real names |
|---|---|
| Buttons | `btn`, `btn--primary`, `btn--ghost`, `btn--success`, `btn--danger`, `btn--sm`, `btn--block`, `iconbtn`, `iconbtn--danger` |
| Chips/badges | `chip`, `chip--imp-0`…`chip--imp-5`, `chip--blocked`, `status-badge` + `s-todo/s-in_progress/s-completed/s-expired`, `status-dot` + `d-*`, `done-pill`, `meta`, `meta--cx-easy/medium/hard` |
| Forms | `form`, `field`, `field__label`, `input`, `textarea`, `seg`/`seg__btn`, `prio`/`prio__btn`, `form__actions`, `form__err` |
| Surfaces | `card`, `card--blocked`, `card--active`, `modal`, `drawer`, `toast`/`toast--success/error/info`, `placeholder`, `placeholder__title`, `placeholder__text` |
| Nav/state | `tabs`/`tabs__btn`, `is-active`, `sidebar`, `topbar`, `stats`/`stat`, `search`/`search__input` |
| Color tokens | `--bg --surface --surface-2 --border --border-strong --text --text-dim --text-faint --primary --primary-hover --primary-soft --success --danger --danger-soft --todo --progress --done --blocked --blocked-soft --expired --expired-soft` |
| Shape/depth | `--radius --radius-sm --shadow --shadow-lg` |

Example glue: `style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}`.

## Where the truth lives

Read `styles.css` (imports `_ds_bundle.css` — all tokens incl. the dark-theme block and every component class) before inventing styles. Each component's API is its `components/general/<Name>/<Name>.d.ts`; usage notes are in `<Name>.prompt.md`.

## Idiomatic example

```jsx
const { StatusBadge, ImportanceChip, AdvanceButton, Icon } = window.TaskManagerDS;
const task = { id: 5, title: 'Homepage build', status: 'TODO', isBlocked: false,
  durationHours: 20, complexity: 'MEDIUM', importance: 4, description: '', createdAt: '',
  updatedAt: null, completedAt: null, groupId: null };

<article className="card" style={{ maxWidth: 360 }}>
  <StatusBadge status={task.status} />
  <h3 className="card__title">{task.title}</h3>
  <div className="card__meta">
    <ImportanceChip value={task.importance} />
    <span className="meta"><Icon name="clock" />{task.durationHours}h</span>
  </div>
  <AdvanceButton task={task} small />
</article>
```

(`AdvanceButton` calls `useTasks()`, so even this card needs the provider wrap above.)

# TaskManagerDS (task-manager-front@0.1.0)

This design system is the published task-manager-front React library, bundled as a single
browser global. All 21 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.TaskManagerDS`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.TaskManagerDS.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { AdvanceButton } = window.TaskManagerDS;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<AdvanceButton />);
```

Wrap the tree in the provider — most components read theme/i18n from context:

```jsx
<ThemeProvider><ToastProvider><AuthProvider><ProjectsProvider><TasksProvider><UIProvider>{children}</UIProvider></TasksProvider></ProjectsProvider></AuthProvider></ToastProvider></ThemeProvider>
```

## Tokens

31 CSS custom properties from task-manager-front. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (5): `--surface`, `--surface-2`, `--border-strong`, …
- **radius** (2): `--radius`, `--radius-sm`
- **shadow** (2): `--shadow`, `--shadow-lg`
- **other** (22): `--bg`, `--border`, `--text`, …

## Components

### general
- `AdvanceButton`
- `AuthScreen`
- `BoardView`
- `ConnectionError`
- `EmptyState`
- `GraphView`
- `Icon`
- `ImportanceChip`
- `LoadingState`
- `ModalHost`
- `NoProjects`
- `PlanView`
- `ProjectsError`
- `RoadmapView`
- `Sidebar`
- `StatsBar`
- `StatusBadge`
- `StatusDot`
- `TaskDrawer`
- `Toaster`
- `TopBar`
