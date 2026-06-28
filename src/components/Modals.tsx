import { useState, type FormEvent } from 'react';
import { Icon } from '../icons';
import { useTasks, useToast, useUI } from '../state';
import type { Task, TaskRequest } from '../types';

export function ModalHost() {
  const { form, confirmRequest } = useUI();
  return (
    <>
      {form && <TaskFormModal task={form.task} />}
      {confirmRequest && <ConfirmDialog />}
    </>
  );
}

function TaskFormModal({ task }: { task: Task | null }) {
  const editing = !!task;
  const { create, update } = useTasks();
  const { closeForm } = useUI();
  const { push } = useToast();

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [duration, setDuration] = useState(task ? String(task.durationHours) : '');
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const t = title.trim();
    const d = duration === '' ? NaN : Number(duration);
    const errors: string[] = [];
    if (!t) errors.push('Title is required.');
    if (t.length > 255) errors.push('Title must be 255 characters or fewer.');
    if (description.length > 10000) errors.push('Description is too long.');
    if (!Number.isFinite(d) || !Number.isInteger(d) || d < 1 || d > 100) errors.push('Duration must be a whole number between 1 and 100 hours.');
    if (errors.length) { setErr(errors.join(' ')); return; }

    const body: TaskRequest = { title: t, description: description.trim() || null, durationHours: d };
    setSaving(true);
    setErr(null);
    try {
      if (editing && task) await update(task.id, body);
      else await create(body);
      push(editing ? 'Task updated' : 'Task created', 'success');
      closeForm();
    } catch (e2) {
      setErr((e2 as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={closeForm} />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2 className="modal__title">{editing ? 'Edit task' : 'New task'}</h2>
          <button className="iconbtn" title="Close" onClick={closeForm}><Icon name="x" /></button>
        </div>
        <div className="modal__body">
          <form className="form" onSubmit={submit}>
            <label className="field">
              <span className="field__label">Title<span className="field__req">required</span></span>
              <input
                className="input"
                autoFocus
                maxLength={255}
                placeholder="e.g. Design the database schema"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">Description</span>
              <textarea
                className="input textarea"
                maxLength={10000}
                rows={4}
                placeholder="Notes, acceptance criteria, links…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">Estimated effort (hours)<span className="field__req">required</span></span>
              <input
                className="input"
                type="number"
                min={1}
                max={100}
                step={1}
                placeholder="1–100"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            {err && <div className="form__err">{err}</div>}
            <div className="form__actions">
              <button type="button" className="btn btn--ghost" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn btn--accent" disabled={saving}>
                {editing ? 'Save changes' : 'Create task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog() {
  const { confirmRequest, resolveConfirm } = useUI();
  if (!confirmRequest) return null;
  const { opts } = confirmRequest;
  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={() => resolveConfirm(false)} />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2 className="modal__title">{opts.title}</h2>
          <button className="iconbtn" title="Close" onClick={() => resolveConfirm(false)}><Icon name="x" /></button>
        </div>
        <div className="modal__body">
          <p className="drawer__desc" style={{ marginBottom: 18 }}>{opts.message}</p>
          <div className="form__actions">
            <button className="btn btn--ghost" onClick={() => resolveConfirm(false)}>Cancel</button>
            <button className="btn btn--danger" onClick={() => resolveConfirm(true)}>{opts.confirmLabel ?? 'Confirm'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
