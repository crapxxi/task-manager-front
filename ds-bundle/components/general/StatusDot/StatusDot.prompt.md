StatusDot from task-manager-front. Use via `window.TaskManagerDS.StatusDot` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### AllStatuses

```jsx
() => (
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    <Cell label="To do"><StatusDot status="TODO" /></Cell>
    <Cell label="In progress"><StatusDot status="IN_PROGRESS" /></Cell>
    <Cell label="Completed"><StatusDot status="COMPLETED" /></Cell>
    <Cell label="Expired"><StatusDot status="EXPIRED" /></Cell>
  </div>
)
```
