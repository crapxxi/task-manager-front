import { Toaster, useToast } from 'task-manager-front';
import { useEffect } from 'react';

const PushToasts = () => {
  const { push } = useToast();
  useEffect(() => {
    push('Task created', 'success');
    push('Your session has expired. Please sign in again.', 'error');
    push('Status updated', 'info');
  }, [push]);
  return <Toaster />;
};

// The app anchors .toasts fixed at the viewport bottom; inside a preview card
// that escapes the cell, so the harness pins the stack back into flow.
export const Kinds = () => (
  <div style={{ position: 'relative', minHeight: 150 }}>
    <style>{`.toasts { position: static; transform: none; align-items: flex-start; }`}</style>
    <PushToasts />
  </div>
);
