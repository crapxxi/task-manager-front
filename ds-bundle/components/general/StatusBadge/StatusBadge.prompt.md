StatusBadge from task-manager-front. Use via `window.TaskManagerDS.StatusBadge` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### AllStatuses

```jsx
() => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <StatusBadge status="TODO" />
    <StatusBadge status="IN_PROGRESS" />
    <StatusBadge status="COMPLETED" />
    <StatusBadge status="EXPIRED" />
  </div>
)
```
