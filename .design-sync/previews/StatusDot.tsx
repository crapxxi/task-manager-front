import { StatusDot } from 'task-manager-front';

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 16, fontSize: 13 }}>
    {children}
    {label}
  </span>
);

export const AllStatuses = () => (
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    <Cell label="To do"><StatusDot status="TODO" /></Cell>
    <Cell label="In progress"><StatusDot status="IN_PROGRESS" /></Cell>
    <Cell label="Completed"><StatusDot status="COMPLETED" /></Cell>
    <Cell label="Expired"><StatusDot status="EXPIRED" /></Cell>
  </div>
);
