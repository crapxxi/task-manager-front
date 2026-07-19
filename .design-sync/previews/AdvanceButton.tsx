import { AdvanceButton } from 'task-manager-front';
import { sampleTask } from '../preview-data';

const t = (o: Record<string, unknown>) => ({ ...sampleTask, ...o }) as never;

export const States = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <AdvanceButton task={t({ status: 'TODO', isBlocked: false })} />
    <AdvanceButton task={t({ status: 'TODO', isBlocked: true })} />
    <AdvanceButton task={t({ status: 'IN_PROGRESS' })} />
    <AdvanceButton task={t({ status: 'COMPLETED' })} />
    <AdvanceButton task={t({ status: 'EXPIRED' })} />
  </div>
);

export const Small = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <AdvanceButton small task={t({ status: 'TODO', isBlocked: false })} />
    <AdvanceButton small task={t({ status: 'TODO', isBlocked: true })} />
    <AdvanceButton small task={t({ status: 'IN_PROGRESS' })} />
  </div>
);
