import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '../icons';
import { useProjects, useTasks, useToast, useUI } from '../state';
import { COMPLEXITY_LABEL, COMPLEXITY_ORDER, IMPORTANCE_LABEL, type Complexity, type Project, type Task } from '../types';

export function ModalHost() {
  const { form, projectForm, confirmRequest } = useUI();
  return (
    <>
      {form && <TaskFormModal task={form.task} />}
      {projectForm && <ProjectFormModal project={projectForm.project} />}
      {confirmRequest && <ConfirmDialog />}
    </>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button className="iconbtn" title="Close" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
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
  const [complexity, setComplexity] = useState<Complexity>(task?.complexity ?? 'MEDIUM');
  const [importance, setImportance] = useState(task?.importance ?? 0);
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

    const body = { title: t, description: description.trim() || null, durationHours: d, complexity, importance };
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
    <Modal title={editing ? 'Edit task' : 'New task'} onClose={closeForm}>
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
        <div className="field">
          <span className="field__label">Complexity<span className="field__req">required</span></span>
          <div className="seg">
            {COMPLEXITY_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                className={`seg__btn ${complexity === c ? 'is-active' : ''}`}
                onClick={() => setComplexity(c)}
              >
                {COMPLEXITY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field__label">Importance<span className="field__opt">helps pick what to do first</span></span>
          <div className="prio" role="radiogroup" aria-label="Importance">
            {IMPORTANCE_LABEL.map((label, v) => (
              <button
                key={label}
                type="button"
                className={`prio__btn prio__btn--${v} ${importance === v ? 'is-active' : ''}`}
                onClick={() => setImportance(v)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {err && <div className="form__err">{err}</div>}
        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={closeForm}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {editing ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ProjectFormModal({ project }: { project: Project | null }) {
  const editing = !!project;
  const { create, update } = useProjects();
  const { closeProjectForm } = useUI();
  const { push } = useToast();

  const [title, setTitle] = useState(project?.title ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) { setErr('Title is required.'); return; }
    if (t.length > 255) { setErr('Title must be 255 characters or fewer.'); return; }
    if (description.length > 1000) { setErr('Description is too long.'); return; }

    setSaving(true);
    setErr(null);
    try {
      const body = { title: t, description: description.trim() || null };
      if (editing && project) await update(project.id, body);
      else await create(body);
      push(editing ? 'Project updated' : 'Project created', 'success');
      closeProjectForm();
    } catch (e2) {
      setErr((e2 as Error).message);
      setSaving(false);
    }
  }

  return (
    <Modal title={editing ? 'Edit project' : 'New project'} onClose={closeProjectForm}>
      <form className="form" onSubmit={submit}>
        <label className="field">
          <span className="field__label">Title<span className="field__req">required</span></span>
          <input
            className="input"
            autoFocus
            maxLength={255}
            placeholder="e.g. Website redesign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field__label">Description</span>
          <textarea
            className="input textarea"
            maxLength={1000}
            rows={3}
            placeholder="What is this project about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {err && <div className="form__err">{err}</div>}
        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={closeProjectForm}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {editing ? 'Save changes' : 'Create project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ConfirmDialog() {
  const { confirmRequest, resolveConfirm } = useUI();
  if (!confirmRequest) return null;
  const { opts } = confirmRequest;
  return (
    <Modal title={opts.title} onClose={() => resolveConfirm(false)}>
      <p className="confirm__msg">{opts.message}</p>
      <div className="form__actions">
        <button className="btn btn--ghost" onClick={() => resolveConfirm(false)}>Cancel</button>
        <button className="btn btn--danger" onClick={() => resolveConfirm(true)}>{opts.confirmLabel ?? 'Confirm'}</button>
      </div>
    </Modal>
  );
}
