GraphView from task-manager-front. Use via `window.TaskManagerDS.GraphView` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### Graph

```jsx
() => (
  <div style={{ height: 640, display: 'flex', flexDirection: 'column' }}>
    <GraphView />
  </div>
)
```
