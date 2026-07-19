TaskDrawer from task-manager-front. Use via `window.TaskManagerDS.TaskDrawer` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### Open

```jsx
() => (
  <div style={{ position: 'relative' }}>
    <style>{`.scrim { display: none; } .drawer { position: static; width: 420px; height: auto; max-height: none; }`}</style>
    <OpenDrawer />
  </div>
)
```
