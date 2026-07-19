ModalHost from task-manager-front. Use via `window.TaskManagerDS.ModalHost` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

## Examples

### NewTask

```jsx
() => <InFlow><OpenTaskForm /></InFlow>;

const OpenProjectForm = () => {
  const { openCreateProject } = useUI();
  useEffect(() => { openCreateProject(); }, [openCreateProject]);
  return <ModalHost />;
}
```

### NewProject

```jsx
() => <InFlow><OpenProjectForm /></InFlow>;

const OpenConfirm = () => {
  const { confirm } = useUI();
  useEffect(() => {
    void confirm({
      title: 'Delete project',
      message: 'Delete “Website Redesign” with all of its tasks? This can’t be undone.',
      confirmLabel: 'Delete',
    });
  }, [confirm]);
  return <ModalHost />;
}
```

### ConfirmDelete

```jsx
() => <InFlow><OpenConfirm /></InFlow>
```
