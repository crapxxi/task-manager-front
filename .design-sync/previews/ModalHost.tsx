import { ModalHost, useUI } from 'task-manager-front';
import { useEffect } from 'react';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

// The app centers .modal-root as a fixed viewport overlay; the preview pins it
// into flow so each dialog shows whole inside its card cell.
const InFlow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', minHeight: 120 }}>
    <style>{`.modal-root { position: static; } .modal-backdrop { display: none; } .modal { max-height: none; margin: 0 auto; }`}</style>
    {children}
  </div>
);

const OpenTaskForm = () => {
  const { openCreate } = useUI();
  useEffect(() => { openCreate(); }, [openCreate]);
  return <ModalHost />;
};
export const NewTask = () => <InFlow><OpenTaskForm /></InFlow>;

const OpenProjectForm = () => {
  const { openCreateProject } = useUI();
  useEffect(() => { openCreateProject(); }, [openCreateProject]);
  return <ModalHost />;
};
export const NewProject = () => <InFlow><OpenProjectForm /></InFlow>;

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
};
export const ConfirmDelete = () => <InFlow><OpenConfirm /></InFlow>;
