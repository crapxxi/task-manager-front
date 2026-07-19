Icon from task-manager-front. Use via `window.TaskManagerDS.Icon` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### AllIcons

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 92px)', gap: 14 }}>
    {NAMES.map((n) => (
      <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontSize: 11, opacity: 0.85 }}>
        <Icon name={n} size={20} />
        {n}
      </div>
    ))}
  </div>
)
```
