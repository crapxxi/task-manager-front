RoadmapView from task-manager-front. Use via `window.TaskManagerDS.RoadmapView` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Roadmap: Jira-style timeline of the remaining work. There are no calendar
dates on the backend, so bars sit on the dependency schedule instead — each
TODO task at its earliest critical-path slot, in-progress work at "now".

## Examples

### Roadmap

```jsx
() => <RoadmapView />
```
