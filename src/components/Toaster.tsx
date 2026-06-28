import { Icon } from '../icons';
import { useToast } from '../state';

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.kind}`} onClick={() => dismiss(t.id)}>
          <Icon name={t.kind === 'success' ? 'check' : t.kind === 'error' ? 'alert' : 'info'} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
