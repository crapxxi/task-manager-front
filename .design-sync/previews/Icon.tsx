import { Icon } from 'task-manager-front';

const NAMES = [
  'plus', 'x', 'check', 'play', 'lock', 'clock', 'edit', 'trash', 'unlink', 'refresh',
  'sun', 'moon', 'info', 'alert', 'sum', 'search', 'folder', 'unlocks', 'link', 'fit',
  'zoomin', 'zoomout', 'flag', 'user', 'maximize', 'minimize', 'target', 'archive',
  'influence', 'logout',
];

export const AllIcons = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 92px)', gap: 14 }}>
    {NAMES.map((n) => (
      <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontSize: 11, opacity: 0.85 }}>
        <Icon name={n} size={20} />
        {n}
      </div>
    ))}
  </div>
);
