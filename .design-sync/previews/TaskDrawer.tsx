import { TaskDrawer, useTasks, useUI } from 'task-manager-front';
import { useEffect } from 'react';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

// Select once the mocked tasks have loaded — selecting before byId is
// populated would make the drawer immediately clear the selection.
const OpenDrawer = () => {
  const { select } = useUI();
  const { byId } = useTasks();
  useEffect(() => { if (byId.has(5)) select(5); }, [byId, select]);
  return <TaskDrawer />;
};

// The app slides .drawer in as a fixed right-edge panel; the preview pins it
// into flow at its app width so the whole panel shows inside the card.
export const Open = () => (
  <div style={{ position: 'relative' }}>
    <style>{`.scrim { display: none; } .drawer { position: static; width: 420px; height: auto; max-height: none; }`}</style>
    <OpenDrawer />
  </div>
);
