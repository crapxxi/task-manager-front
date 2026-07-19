import { GraphView } from 'task-manager-front';
import { installPreviewMock } from '../preview-data';

installPreviewMock();

// In the app the graph fills the shell's flexible main area; the preview card
// has no intrinsic height, so the harness gives it one.
export const Graph = () => (
  <div style={{ height: 640, display: 'flex', flexDirection: 'column' }}>
    <GraphView />
  </div>
);
