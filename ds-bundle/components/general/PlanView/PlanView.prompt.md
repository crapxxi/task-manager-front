PlanView from task-manager-front. Use via `window.TaskManagerDS.PlanView` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

"Plan" view: the backend's suggested execution order for the project's
TODO tasks (topological sort of strict dependencies), each with the
earliest hour it can be finished, assuming work happens sequentially
along the critical path.

## Examples

### Plan

```jsx
() => <PlanView />
```
