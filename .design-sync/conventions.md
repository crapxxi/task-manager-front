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
