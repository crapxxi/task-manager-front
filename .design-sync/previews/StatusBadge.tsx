import { StatusBadge } from 'task-manager-front';

export const AllStatuses = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <StatusBadge status="TODO" />
    <StatusBadge status="IN_PROGRESS" />
    <StatusBadge status="COMPLETED" />
    <StatusBadge status="EXPIRED" />
  </div>
);
