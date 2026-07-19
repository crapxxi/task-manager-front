AdvanceButton from task-manager-front. Use via `window.TaskManagerDS.AdvanceButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Forward-only status control matching the backend's toggle endpoint.

## Examples

### States

```jsx
() => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <AdvanceButton task={t({ status: 'TODO', isBlocked: false })} />
    <AdvanceButton task={t({ status: 'TODO', isBlocked: true })} />
    <AdvanceButton task={t({ status: 'IN_PROGRESS' })} />
    <AdvanceButton task={t({ status: 'COMPLETED' })} />
    <AdvanceButton task={t({ status: 'EXPIRED' })} />
  </div>
)
```

### Small

```jsx
() => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <AdvanceButton small task={t({ status: 'TODO', isBlocked: false })} />
    <AdvanceButton small task={t({ status: 'TODO', isBlocked: true })} />
    <AdvanceButton small task={t({ status: 'IN_PROGRESS' })} />
  </div>
)
```
