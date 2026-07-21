import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '../icons';
import { useProjects, useTasks, useToast, useUI } from '../state';
import { COMPLEXITY_LABEL, COMPLEXITY_ORDER, IMPORTANCE_LABEL, type Complexity, type Project, type Task } from '../types';
import { MAX_DAYS, MAX_DURATION, MIN_DURATION, formatDurationParts, minutesToParts, partsToMinutes } from '../lib/duration';

export function ModalHost() {
  const { form, projectForm, confirmRequest } = useUI();
  return (
    <>
      {form && <TaskFormModal task={form.task} presetParentId={form.parentId} />}
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

function TaskFormModal({ task, presetParentId }: { task: Task | null; presetParentId: number | null }) {
  const editing = !!task;
  const { create, update, groups, tasks, subtaskStats, byId } = useTasks();
  const { closeForm } = useUI();
  const { push } = useToast();

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  // Kept as three strings so a field can sit empty while another is being typed;
  // they collapse into a single minute count on submit, which is all the API sees.
  const initialParts = minutesToParts(task?.durationMinutes ?? 0);
  const [days, setDays] = useState(task && initialParts.days ? String(initialParts.days) : '');
  const [hours, setHours] = useState(task && initialParts.hours ? String(initialParts.hours) : '');
  const [mins, setMins] = useState(task && initialParts.minutes ? String(initialParts.minutes) : '');
  const [complexity, setComplexity] = useState<Complexity>(task?.complexity ?? 'MEDIUM');
  const [importance, setImportance] = useState(task?.importance ?? 0);
  const [groupId, setGroupId] = useState<number | null>(task?.groupId ?? null);
  const [parentId, setParentId] = useState<number | null>(task ? task.parentId : presetParentId);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Nesting is one level deep, so a task that already has subtasks can never
  // become one itself. Eligible parents are unfinished top-level tasks —
  // `tasks` excludes subtasks already. Mirrors the backend's attach validation.
  const canHaveParent = task == null || (subtaskStats.get(task.id)?.total ?? 0) === 0;
  const parentOptions = canHaveParent
    ? tasks.filter((p) => p.id !== task?.id && p.status !== 'COMPLETED')
    : [];
  const presetParent = presetParentId != null ? byId.get(presetParentId) : undefined;

  // A blank box means zero; anything unparseable poisons the whole total so the
  // validation below catches it instead of silently dropping a field.
  const part = (raw: string) => (raw.trim() === '' ? 0 : Number(raw));
  const totalMinutes = partsToMinutes({ days: part(days), hours: part(hours), minutes: part(mins) });
  const durationValid = Number.isInteger(totalMinutes) && totalMinutes >= MIN_DURATION && totalMinutes <= MAX_DURATION;

  // Echo the total back, so 1d 2h reads as "= 600 minutes" before it is sent.
  const durationHint = durationValid ? `= ${formatDurationParts(totalMinutes)} · ${totalMinutes} min` : null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const t = title.trim();
    const errors: string[] = [];
    if (!t) errors.push('Title is required.');
    if (t.length > 255) errors.push('Title must be 255 characters or fewer.');
    if (description.length > 10000) errors.push('Description is too long.');
    if (!durationValid) {
      errors.push(`Estimated effort must be between ${formatDurationParts(MIN_DURATION)} and ${formatDurationParts(MAX_DURATION)}.`);
    }
    if (errors.length) { setErr(errors.join(' ')); return; }
    const d = totalMinutes;

    const body = { title: t, description: description.trim() || null, durationMinutes: d, complexity, importance, groupId, parentId };
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
    <Modal
      title={editing ? 'Edit task' : presetParent ? `New subtask of “${presetParent.title}”` : 'New task'}
      onClose={closeForm}
    >
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
        {(parentOptions.length > 0 || parentId != null) && (
          <label className="field">
            <span className="field__label">
              Parent task
              <span className="field__opt">hides this one under another and completes it automatically</span>
            </span>
            <select
              className="input"
              value={parentId ?? ''}
              onChange={(e) => setParentId(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">No parent — top-level task</option>
              {parentOptions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </label>
        )}
        <div className="field">
          <span className="field__label">
            Estimated effort
            <span className="field__req">required</span>
          </span>
          {/* Split into the units people actually estimate in; the API still gets one minute count. */}
          <div className="dur">
            <DurationBox label="days" max={MAX_DAYS} step={1} value={days} onChange={setDays} />
            <DurationBox label="hours" max={23} step={1} value={hours} onChange={setHours} />
            <DurationBox label="minutes" max={59} step={5} value={mins} onChange={setMins} />
          </div>
          <span className="field__hint">
            {durationHint ?? `Between ${formatDurationParts(MIN_DURATION)} and ${formatDurationParts(MAX_DURATION)}.`}
          </span>
        </div>
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
        {groups.length > 0 && (
          <label className="field">
            <span className="field__label">Group<span className="field__opt">folds together on the graph</span></span>
            <select
              className="input"
              value={groupId ?? ''}
              onChange={(e) => setGroupId(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">No group</option>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
          </label>
        )}
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

/** One unit box of the days/hours/minutes trio. Digits only — the unit is the label. */
function DurationBox({
  label, max, step, value, onChange,
}: { label: string; max: number; step: number; value: string; onChange: (v: string) => void }) {
  return (
    <label className="dur__box">
      <input
        className="input dur__input"
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        step={step}
        placeholder="0"
        aria-label={`Estimated effort — ${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ''))}
      />
      <span className="dur__unit">{label}</span>
    </label>
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
