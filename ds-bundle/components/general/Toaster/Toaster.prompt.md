Toaster from task-manager-front. Use via `window.TaskManagerDS.Toaster` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### Kinds

```jsx
() => (
  <div style={{ position: 'relative', minHeight: 150 }}>
    <style>{`.toasts { position: static; transform: none; align-items: flex-start; }`}</style>
    <PushToasts />
  </div>
)
```
