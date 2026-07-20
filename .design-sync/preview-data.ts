// Shared preview fixture for design-sync cards. The app's providers fetch from
// /api/v1/** on mount; static preview cards have no backend, so this installs a
// window.fetch stub returning realistic sample data BEFORE the providers mount,
// and seeds the localStorage keys the providers read at init.

const user = { id: 1, name: 'Alona', surname: null, username: 'alona', role: 'USER' };

export const projects = [
  { id: 1, title: 'Website Redesign', description: 'Q3 marketing site refresh', createdAt: '2026-06-01T09:00:00Z' },
  { id: 2, title: 'Mobile App', description: 'iOS + Android companion app', createdAt: '2026-06-20T09:00:00Z' },
];

// source = prerequisite, target = dependent
export const edges = [
  { id: 1, sourceId: 1, targetId: 2, type: 'STRICT_PREREQUISITE' },
  { id: 2, sourceId: 2, targetId: 3, type: 'STRICT_PREREQUISITE' },
  { id: 3, sourceId: 3, targetId: 5, type: 'STRICT_PREREQUISITE' },
  { id: 4, sourceId: 4, targetId: 5, type: 'STRICT_PREREQUISITE' },
  { id: 5, sourceId: 5, targetId: 8, type: 'STRICT_PREREQUISITE' },
  { id: 6, sourceId: 4, targetId: 7, type: 'STRICT_PREREQUISITE' },
  { id: 7, sourceId: 6, targetId: 8, type: 'OPTIONAL_LINK' },
  // Links between siblings under one parent. NOTE: the real backend does not
  // return these yet — its graph query only walks top-level tasks, so an edge
  // whose source is a subtask never reaches the client. Kept here so the
  // subtask panel's "after …" rows stay previewable.
  { id: 8, sourceId: 13, targetId: 14, type: 'STRICT_PREREQUISITE' },
  { id: 9, sourceId: 10, targetId: 12, type: 'STRICT_PREREQUISITE' },
];

const t = (o: Record<string, unknown>) => ({
  description: null, durationHours: 8, status: 'TODO', isBlocked: false, projectId: 1,
  complexity: 'MEDIUM', importance: 3, calculatedTime: null,
  createdAt: '2026-06-02T10:00:00Z', updatedAt: null, completedAt: null,
  groupId: null, archiveId: null, parentId: null, ...o,
});

export const tasks = [
  t({ id: 1, title: 'Design system audit', status: 'COMPLETED', complexity: 'EASY', importance: 3, durationHours: 8, groupId: 1, completedAt: '2026-06-10T15:00:00Z', description: 'Inventory the current tokens, components and page templates.' }),
  t({ id: 2, title: 'Wireframes', status: 'COMPLETED', importance: 4, durationHours: 16, groupId: 1, completedAt: '2026-06-18T12:00:00Z', description: 'Low-fi flows for home, pricing and docs.' }),
  t({ id: 3, title: 'Visual design', status: 'IN_PROGRESS', complexity: 'HARD', importance: 5, durationHours: 40, groupId: 1, description: 'High-fidelity mockups in both themes.' }),
  t({ id: 4, title: 'Component library', status: 'IN_PROGRESS', importance: 4, durationHours: 24, groupId: 2, description: 'Build the shared React components.' }),
  t({ id: 5, title: 'Homepage build', isBlocked: true, importance: 4, durationHours: 20, groupId: 2, description: 'Assemble the new homepage from the component library.' }),
  t({ id: 6, title: 'Content rewrite', complexity: 'EASY', importance: 2, durationHours: 12, description: 'Refresh copy for the six core pages.' }),
  t({ id: 7, title: 'CMS migration', isBlocked: true, complexity: 'HARD', importance: 3, durationHours: 32, groupId: 2, description: 'Move page content into the new headless CMS.' }),
  t({ id: 8, title: 'Launch QA', isBlocked: true, importance: 5, durationHours: 16, description: 'Cross-browser pass and accessibility audit before go-live.' }),
  t({ id: 9, title: 'Legacy browser testing', status: 'EXPIRED', complexity: 'EASY', importance: 1, durationHours: 6, description: 'IE11 support — descoped after the deadline passed.' }),

  // Subtasks. The project task list carries them (tagged by parentId); the
  // graph endpoint below deliberately leaves them out, exactly as the backend does.
  t({ id: 10, parentId: 4, title: 'Buttons & inputs', status: 'COMPLETED', complexity: 'EASY', importance: 3, durationHours: 6, completedAt: '2026-06-22T11:00:00Z' }),
  t({ id: 11, parentId: 4, title: 'Cards & lists', status: 'COMPLETED', importance: 3, durationHours: 8, completedAt: '2026-06-26T16:00:00Z' }),
  t({ id: 12, parentId: 4, title: 'Data table', status: 'IN_PROGRESS', complexity: 'HARD', importance: 4, durationHours: 10 }),
  t({ id: 13, parentId: 7, title: 'Export legacy pages', importance: 3, durationHours: 12 }),
  t({ id: 14, parentId: 7, title: 'Map content models', complexity: 'HARD', importance: 4, durationHours: 20 }),
];

const influence: Record<number, number> = { 1: 4, 2: 3, 3: 2, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 };

export const graph = {
  // Subtasks never appear as nodes of their own — they're folded into the
  // parent's counters instead.
  nodes: tasks.filter((x) => x.parentId == null).map((x) => {
    const kids = tasks.filter((k) => k.parentId === x.id);
    return {
      id: x.id, title: x.title, status: x.status, durationHours: x.durationHours,
      isBlocked: x.isBlocked, influence: influence[x.id as number] ?? 0,
      subtaskCount: kids.length,
      completedSubtaskCount: kids.filter((k) => k.status === 'COMPLETED').length,
    };
  }),
  edges,
};

export const groups = [
  { id: 1, projectId: 1, title: 'Design', activeTaskCount: 3 },
  { id: 2, projectId: 1, title: 'Build', activeTaskCount: 3 },
];

export const archives = {
  items: [
    { id: 11, projectId: 1, title: 'Kickoff & research', archivedAt: '2026-06-30T10:00:00Z', taskCount: 5 },
  ],
  page: 0, size: 20, total: 1,
};

/** A ready-made client-side Task (the `Task` model) for prop-driven previews. */
export const sampleTask = {
  id: 5, title: 'Homepage build', description: 'Assemble the new homepage from the component library.',
  durationHours: 20, status: 'TODO', isBlocked: false, complexity: 'MEDIUM', importance: 4,
  createdAt: '2026-06-02T10:00:00Z', updatedAt: null, completedAt: null, groupId: 2, parentId: null,
};

/** All tasks with critical-path finish hours (feeds PlanView + RoadmapView). */
const finishHour: Record<number, number> = { 1: 0, 2: 0, 3: 40, 4: 24, 5: 60, 6: 12, 7: 56, 8: 76, 9: 0, 13: 12, 14: 32 };
export const tasksWithTime = tasks.map((x) => ({ ...x, calculatedTime: finishHour[x.id as number] ?? x.durationHours }));

/**
 * Backend's suggested execution order: TODO tasks, topological by critical path.
 * Subtasks 13/14 are in here on purpose — the suggest query filters by status
 * only (no `parentTask is null`), so the real endpoint mixes them in with
 * top-level work. The plan marks them rather than pretending they're absent.
 */
export const suggested = [6, 13, 14, 7, 5, 8].map((id) => tasksWithTime.find((x) => x.id === id));

export function installPreviewMock(overrides: Record<string, unknown> = {}) {
  localStorage.setItem('tm.token', 'preview-token');
  localStorage.setItem('tm.username', 'alona');
  localStorage.setItem('tm.name', 'Alona');
  localStorage.setItem('tm.project.alona', '1');
  const data = { projects, tasks, graph, groups, archives, user, ...overrides };
  const realFetch = window.fetch.bind(window);
  const json = (body: unknown) =>
    new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (!url.startsWith('/api/')) return realFetch(input as RequestInfo, init);
    if (url.includes('/auth/me')) return json(data.user);
    if (/\/api\/v1\/suggest\/tasks\/\d+\/time/.test(url)) return json(tasksWithTime);
    if (/\/api\/v1\/suggest\/tasks\/\d+/.test(url)) return json(suggested);
    if (/\/api\/v1\/projects/.test(url)) return json(data.projects);
    if (/\/api\/v1\/tasks\/\d+\/tasks/.test(url)) return json(data.tasks);
    if (/\/api\/v1\/tasks\/(\d+)\/subtasks/.test(url)) {
      const parentId = Number(url.match(/\/tasks\/(\d+)\/subtasks/)![1]);
      return json((data.tasks as { parentId: number | null }[]).filter((x) => x.parentId === parentId));
    }
    if (/\/api\/v1\/graph\/tasks\/all\//.test(url)) return json(data.graph);
    if (/\/api\/v1\/groups\/project\/\d+\/active/.test(url)) return json(data.groups);
    if (/\/api\/v1\/groups\/project\//.test(url)) return json({ items: data.groups, page: 0, size: 20, total: (data.groups as unknown[]).length });
    if (/\/api\/v1\/archives\//.test(url)) return json(data.archives);
    return json({});
  };
}
