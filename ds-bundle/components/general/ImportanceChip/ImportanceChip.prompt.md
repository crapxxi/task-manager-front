ImportanceChip from task-manager-front. Use via `window.TaskManagerDS.ImportanceChip` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Priority label ("High", "Critical"…); 0 reads as a quiet "Not important".

## Examples

### AllLevels

```jsx
() => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
    {[0, 1, 2, 3, 4, 5].map((v) => <ImportanceChip key={v} value={v} />)}
  </div>
)
```
