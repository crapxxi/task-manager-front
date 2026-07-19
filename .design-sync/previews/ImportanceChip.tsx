import { ImportanceChip } from 'task-manager-front';

export const AllLevels = () => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
    {[0, 1, 2, 3, 4, 5].map((v) => <ImportanceChip key={v} value={v} />)}
  </div>
);
