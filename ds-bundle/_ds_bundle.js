/* @ds-bundle: {"namespace":"TaskManagerDS","components":[{"name":"AdvanceButton","sourcePath":"components/general/AdvanceButton/AdvanceButton.jsx"},{"name":"AuthScreen","sourcePath":"components/general/AuthScreen/AuthScreen.jsx"},{"name":"BoardView","sourcePath":"components/general/BoardView/BoardView.jsx"},{"name":"ConnectionError","sourcePath":"components/general/ConnectionError/ConnectionError.jsx"},{"name":"EmptyState","sourcePath":"components/general/EmptyState/EmptyState.jsx"},{"name":"GraphView","sourcePath":"components/general/GraphView/GraphView.jsx"},{"name":"Icon","sourcePath":"components/general/Icon/Icon.jsx"},{"name":"ImportanceChip","sourcePath":"components/general/ImportanceChip/ImportanceChip.jsx"},{"name":"LoadingState","sourcePath":"components/general/LoadingState/LoadingState.jsx"},{"name":"ModalHost","sourcePath":"components/general/ModalHost/ModalHost.jsx"},{"name":"NoProjects","sourcePath":"components/general/NoProjects/NoProjects.jsx"},{"name":"PlanView","sourcePath":"components/general/PlanView/PlanView.jsx"},{"name":"ProjectsError","sourcePath":"components/general/ProjectsError/ProjectsError.jsx"},{"name":"RoadmapView","sourcePath":"components/general/RoadmapView/RoadmapView.jsx"},{"name":"Sidebar","sourcePath":"components/general/Sidebar/Sidebar.jsx"},{"name":"StatsBar","sourcePath":"components/general/StatsBar/StatsBar.jsx"},{"name":"StatusBadge","sourcePath":"components/general/StatusBadge/StatusBadge.jsx"},{"name":"StatusDot","sourcePath":"components/general/StatusDot/StatusDot.jsx"},{"name":"TaskDrawer","sourcePath":"components/general/TaskDrawer/TaskDrawer.jsx"},{"name":"Toaster","sourcePath":"components/general/Toaster/Toaster.jsx"},{"name":"TopBar","sourcePath":"components/general/TopBar/TopBar.jsx"}],"sourceHashes":{"components/general/AdvanceButton/AdvanceButton.jsx":"a82bfcda871f","components/general/AdvanceButton/AdvanceButton.d.ts":"7aa07e60506c","components/general/AdvanceButton/AdvanceButton.prompt.md":"e6fc1053800b","components/general/AuthScreen/AuthScreen.jsx":"e042e84139d5","components/general/AuthScreen/AuthScreen.d.ts":"93f71d7d2117","components/general/AuthScreen/AuthScreen.prompt.md":"dca820fad9e6","components/general/BoardView/BoardView.jsx":"10154abd4327","components/general/BoardView/BoardView.d.ts":"d2f467408399","components/general/BoardView/BoardView.prompt.md":"e5c74e4cd7b0","components/general/ConnectionError/ConnectionError.jsx":"00657a5a6e10","components/general/ConnectionError/ConnectionError.d.ts":"1d97edfce728","components/general/ConnectionError/ConnectionError.prompt.md":"b0d553b4f63d","components/general/EmptyState/EmptyState.jsx":"06b67c91b0db","components/general/EmptyState/EmptyState.d.ts":"54afc5924cdc","components/general/EmptyState/EmptyState.prompt.md":"ec662a89b924","components/general/GraphView/GraphView.jsx":"548749557fc6","components/general/GraphView/GraphView.d.ts":"3a20ab3be36b","components/general/GraphView/GraphView.prompt.md":"0fbaa3390cd6","components/general/Icon/Icon.jsx":"90d479e4da3a","components/general/Icon/Icon.d.ts":"a63639c76069","components/general/Icon/Icon.prompt.md":"ff1abf64cac2","components/general/ImportanceChip/ImportanceChip.jsx":"5a593e113ee4","components/general/ImportanceChip/ImportanceChip.d.ts":"ba1c80e72873","components/general/ImportanceChip/ImportanceChip.prompt.md":"f79a06ea960f","components/general/LoadingState/LoadingState.jsx":"56964ac30a85","components/general/LoadingState/LoadingState.d.ts":"68b3880c8b02","components/general/LoadingState/LoadingState.prompt.md":"c820bd578c41","components/general/ModalHost/ModalHost.jsx":"de19e415ea0e","components/general/ModalHost/ModalHost.d.ts":"371eb34f860c","components/general/ModalHost/ModalHost.prompt.md":"cd0a5005fdbe","components/general/NoProjects/NoProjects.jsx":"300775d3987f","components/general/NoProjects/NoProjects.d.ts":"23a8c7112e9f","components/general/NoProjects/NoProjects.prompt.md":"c8843a6cc899","components/general/PlanView/PlanView.jsx":"504075c03caa","components/general/PlanView/PlanView.d.ts":"1d1ad894bfe1","components/general/PlanView/PlanView.prompt.md":"47c3ff0c784d","components/general/ProjectsError/ProjectsError.jsx":"c80cb7fdc0c3","components/general/ProjectsError/ProjectsError.d.ts":"098fe8d38475","components/general/ProjectsError/ProjectsError.prompt.md":"998318f2212a","components/general/RoadmapView/RoadmapView.jsx":"7c952813bdc4","components/general/RoadmapView/RoadmapView.d.ts":"afcf413ba805","components/general/RoadmapView/RoadmapView.prompt.md":"039dc3444570","components/general/Sidebar/Sidebar.jsx":"979bcc7890a3","components/general/Sidebar/Sidebar.d.ts":"83755e054271","components/general/Sidebar/Sidebar.prompt.md":"35714d29f71f","components/general/StatsBar/StatsBar.jsx":"5132a1bb17ca","components/general/StatsBar/StatsBar.d.ts":"43410be6bf2a","components/general/StatsBar/StatsBar.prompt.md":"3a43734f4e35","components/general/StatusBadge/StatusBadge.jsx":"0ba658ff25a7","components/general/StatusBadge/StatusBadge.d.ts":"863514111d33","components/general/StatusBadge/StatusBadge.prompt.md":"5b1d13105ae9","components/general/StatusDot/StatusDot.jsx":"ece1f21912f5","components/general/StatusDot/StatusDot.d.ts":"3886b5c40497","components/general/StatusDot/StatusDot.prompt.md":"c5c7c6924a85","components/general/TaskDrawer/TaskDrawer.jsx":"d75f38bb84b9","components/general/TaskDrawer/TaskDrawer.d.ts":"26ad1ea94a4d","components/general/TaskDrawer/TaskDrawer.prompt.md":"0dbfd018a5a6","components/general/Toaster/Toaster.jsx":"bb99d3e0f95c","components/general/Toaster/Toaster.d.ts":"210e32587d7b","components/general/Toaster/Toaster.prompt.md":"c0f7374819d9","components/general/TopBar/TopBar.jsx":"837d4406780f","components/general/TopBar/TopBar.d.ts":"bcf8c1602dd4","components/general/TopBar/TopBar.prompt.md":"343d00393abd"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
"use strict";
var TaskManagerDS = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx16(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs14(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx16;
      module.exports.jsxs = jsxs14;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs14 : jsx16)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/ds-entry.ts
  var ds_entry_exports = {};
  __export(ds_entry_exports, {
    AdvanceButton: () => AdvanceButton,
    App: () => App,
    AuthProvider: () => AuthProvider,
    AuthScreen: () => AuthScreen,
    BoardView: () => BoardView,
    ConnectionError: () => ConnectionError,
    EmptyState: () => EmptyState,
    GraphView: () => GraphView,
    Icon: () => Icon,
    ImportanceChip: () => ImportanceChip,
    LoadingState: () => LoadingState,
    ModalHost: () => ModalHost,
    NoProjects: () => NoProjects,
    PlanView: () => PlanView,
    ProjectsError: () => ProjectsError,
    ProjectsProvider: () => ProjectsProvider,
    RoadmapView: () => RoadmapView,
    Sidebar: () => Sidebar,
    StatsBar: () => StatsBar,
    StatusBadge: () => StatusBadge,
    StatusDot: () => StatusDot,
    TaskDrawer: () => TaskDrawer,
    TasksProvider: () => TasksProvider,
    ThemeProvider: () => ThemeProvider,
    ToastProvider: () => ToastProvider,
    Toaster: () => Toaster,
    TopBar: () => TopBar,
    UIProvider: () => UIProvider,
    useAuth: () => useAuth,
    useProjects: () => useProjects,
    useTasks: () => useTasks,
    useTheme: () => useTheme,
    useToast: () => useToast,
    useUI: () => useUI
  });
  init_define_import_meta_env();

  // src/components/ui.tsx
  init_define_import_meta_env();

  // src/icons.tsx
  init_define_import_meta_env();
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  var PATHS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    play: '<path d="M7 4.5 19 12 7 19.5z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    unlink: '<path d="m18.84 12.25 1.72-1.71a4.5 4.5 0 0 0-6.36-6.37l-1.71 1.72"/><path d="m5.17 11.75-1.72 1.71a4.5 4.5 0 0 0 6.36 6.37l1.71-1.72"/><path d="m2 2 20 20"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.74"/><path d="M21 3v6h-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/>',
    sum: '<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8L12 12l-5.9 7.2a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    unlocks: '<path d="M15 10l5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>',
    link: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><path d="M8 12h8"/>',
    fit: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    zoomin: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    zoomout: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/>',
    flag: '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.5 2 1.3 0 2.2-.3 2.9-.6a.5.5 0 0 1 .6.5v9.8a1 1 0 0 1-.4.8 6 6 0 0 1-3.1 1c-3 0-5-2-7.5-2-1.5 0-2.5.4-3 .7"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    maximize: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    minimize: '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
    influence: '<circle cx="5" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M7.1 11 16 6.6"/><path d="M7.1 13 16 17.4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>'
  };
  function Icon({ name, size, sw }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        viewBox: "0 0 24 24",
        width: size ?? "1em",
        height: size ?? "1em",
        fill: name === "play" ? "currentColor" : "none",
        stroke: "currentColor",
        strokeWidth: sw ?? 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "icon",
        "aria-hidden": "true",
        dangerouslySetInnerHTML: { __html: PATHS[name] ?? "" }
      }
    );
  }

  // src/types.ts
  init_define_import_meta_env();
  var COMPLEXITY_LABEL = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard"
  };
  var COMPLEXITY_ORDER = ["EASY", "MEDIUM", "HARD"];
  var IMPORTANCE_LABEL = ["Not important", "Someday", "Low", "Normal", "High", "Critical"];
  var STATUS_LABEL = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    EXPIRED: "Expired"
  };
  var STATUS_ORDER = ["TODO", "IN_PROGRESS", "COMPLETED"];
  var AUTH_LIMITS = {
    usernameMin: 5,
    nameMin: 2,
    passwordMin: 8
  };

  // src/state.tsx
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim(), 1);

  // src/api.ts
  init_define_import_meta_env();
  var TOKEN_KEY = "tm.token";
  var getToken = () => localStorage.getItem(TOKEN_KEY);
  var setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
  var clearToken = () => localStorage.removeItem(TOKEN_KEY);
  var UNAUTHORIZED_EVENT = "tm:unauthorized";
  async function req(method, path, opts = {}) {
    let url = path;
    if (opts.query) {
      const qs = new URLSearchParams(
        Object.entries(opts.query).map(([k, v]) => [k, String(v)])
      ).toString();
      url += (url.includes("?") ? "&" : "?") + qs;
    }
    const token = getToken();
    const headers = {};
    if (opts.body !== void 0) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const init = { method, headers };
    if (opts.body !== void 0) init.body = JSON.stringify(opts.body);
    const res = await fetch(url, init);
    const isAuthEndpoint = path.startsWith("/api/v1/auth/");
    if (!isAuthEndpoint && (res.status === 401 || res.status === 403 && !token)) {
      clearToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
      throw new Error("Your session has expired. Please sign in again.");
    }
    if (res.status === 204) return void 0;
    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }
    if (!res.ok) {
      const message = data && typeof data === "object" && "message" in data && data.message || typeof data === "string" && data || `${res.status} ${res.statusText}`;
      throw new Error(String(message));
    }
    return data;
  }
  var api = {
    // auth
    register: (body) => req("POST", "/api/v1/auth/register", { body }),
    login: (body) => req("POST", "/api/v1/auth/login", { body }),
    me: () => req("GET", "/api/v1/auth/me"),
    // projects
    getProjects: () => req("GET", "/api/v1/projects"),
    createProject: (body) => req("POST", "/api/v1/projects", { body }),
    updateProject: (id, body) => req("PUT", `/api/v1/projects/${id}`, { body }),
    deleteProject: (id) => req("DELETE", `/api/v1/projects/${id}`),
    // tasks (scoped to a project)
    getTasks: (projectId) => req("GET", `/api/v1/tasks/${projectId}/tasks`),
    createTask: (body) => req("POST", "/api/v1/tasks", { body }),
    updateTask: (id, body) => req("PUT", `/api/v1/tasks/${id}`, { body }),
    deleteTask: (id) => req("DELETE", `/api/v1/tasks/${id}`),
    bind: (taskId, parentId, type) => req("PATCH", `/api/v1/tasks/${taskId}/bind/${parentId}`, type ? { query: { type } } : {}),
    unbind: (taskId, parentId) => req("PATCH", `/api/v1/tasks/${taskId}/unbind/${parentId}`),
    toggleStatus: (id) => req("PATCH", `/api/v1/tasks/${id}/toggle-status`),
    updateBindType: (taskId, parentId, type) => req("PATCH", `/api/v1/tasks/${taskId}/dependency-update/${parentId}`, { query: { type } }),
    // task groups (named super-nodes)
    // Paged management list — includes groups whose tasks were all archived.
    getGroups: (projectId, page = 0, size = 20, q) => req("GET", `/api/v1/groups/project/${projectId}`, {
      query: q ? { page, size, q } : { page, size }
    }),
    // Groups with ≥1 task on the active graph — feeds folds, pickers, roadmap lanes.
    getActiveGroups: (projectId) => req("GET", `/api/v1/groups/project/${projectId}/active`),
    createGroup: (body) => req("POST", "/api/v1/groups", { body }),
    updateGroup: (id, body) => req("PUT", `/api/v1/groups/${id}`, { body }),
    deleteGroup: (id) => req("DELETE", `/api/v1/groups/${id}`),
    assignToGroup: (groupId, taskIds) => req("PATCH", `/api/v1/groups/${groupId}/assign`, { query: { taskIds: taskIds.join(",") } }),
    // dependency graph
    getGraph: (projectId) => req("GET", `/api/v1/graph/tasks/all/${projectId}`),
    // graph archives (history of completed branches)
    archiveBranches: (projectId, rootTaskIds, title) => req("POST", `/api/v1/archives/${projectId}`, { body: { rootTaskIds, title } }),
    // Paged history, newest first (server-side order).
    getArchives: (projectId, page = 0, size = 20, q) => req("GET", `/api/v1/archives/${projectId}`, {
      query: q ? { page, size, q } : { page, size }
    }),
    getArchiveGraph: (projectId, archiveId) => req("GET", `/api/v1/archives/${projectId}/${archiveId}`),
    restoreArchive: (projectId, archiveId) => req("DELETE", `/api/v1/archives/${projectId}/${archiveId}`),
    calcDuration: (taskId) => req("GET", `/api/v1/graph/tasks/${taskId}/calculate-duration`),
    // suggested execution plan (TODO tasks, topological order by critical path)
    getSuggested: (projectId) => req("GET", `/api/v1/suggest/tasks/${projectId}`),
    getTasksWithTime: (projectId) => req("GET", `/api/v1/suggest/tasks/${projectId}/time`)
  };

  // src/state.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim(), 1);
  var ThemeContext = (0, import_react.createContext)(null);
  function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, import_react.useState)(() => localStorage.getItem("tm.theme") || "light");
    (0, import_react.useEffect)(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("tm.theme", theme);
    }, [theme]);
    const toggle = (0, import_react.useCallback)(() => setTheme((t) => t === "dark" ? "light" : "dark"), []);
    const value = (0, import_react.useMemo)(() => ({ theme, toggle }), [theme, toggle]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ThemeContext.Provider, { value, children });
  }
  var useTheme = () => {
    const c = (0, import_react.useContext)(ThemeContext);
    if (!c) throw new Error("useTheme outside provider");
    return c;
  };
  var ToastContext = (0, import_react.createContext)(null);
  function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, import_react.useState)([]);
    const idRef = (0, import_react.useRef)(0);
    const dismiss = (0, import_react.useCallback)((id) => setToasts((ts) => ts.filter((t) => t.id !== id)), []);
    const push = (0, import_react.useCallback)(
      (message, kind = "info") => {
        const id = ++idRef.current;
        setToasts((ts) => [...ts, { id, message, kind }]);
        window.setTimeout(() => dismiss(id), 4e3);
      },
      [dismiss]
    );
    const value = (0, import_react.useMemo)(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToastContext.Provider, { value, children });
  }
  var useToast = () => {
    const c = (0, import_react.useContext)(ToastContext);
    if (!c) throw new Error("useToast outside provider");
    return c;
  };
  var USERNAME_KEY = "tm.username";
  var NAME_KEY = "tm.name";
  var AuthContext = (0, import_react.createContext)(null);
  function AuthProvider({ children }) {
    const [token, setTokenState] = (0, import_react.useState)(() => getToken());
    const [username, setUsername] = (0, import_react.useState)(() => localStorage.getItem(USERNAME_KEY));
    const [name, setName] = (0, import_react.useState)(() => localStorage.getItem(NAME_KEY));
    const [sessionExpired, setSessionExpired] = (0, import_react.useState)(false);
    const tokenRef = (0, import_react.useRef)(token);
    (0, import_react.useEffect)(() => {
      tokenRef.current = token;
    }, [token]);
    const hydrate = (0, import_react.useCallback)(async (newToken, fallbackUsername) => {
      setToken(newToken);
      setTokenState(newToken);
      setSessionExpired(false);
      try {
        const me = await api.me();
        localStorage.setItem(USERNAME_KEY, me.username);
        localStorage.setItem(NAME_KEY, me.name ?? "");
        setUsername(me.username);
        setName(me.name ?? null);
      } catch {
        localStorage.setItem(USERNAME_KEY, fallbackUsername);
        setUsername(fallbackUsername);
      }
    }, []);
    const login = (0, import_react.useCallback)(async (user, password) => {
      const res = await api.login({ username: user, password });
      await hydrate(res.token, res.username);
    }, [hydrate]);
    const register = (0, import_react.useCallback)(async (data) => {
      const res = await api.register(data);
      await hydrate(res.token, res.username);
    }, [hydrate]);
    const logout = (0, import_react.useCallback)(() => {
      clearToken();
      localStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(NAME_KEY);
      setTokenState(null);
      setUsername(null);
      setName(null);
    }, []);
    (0, import_react.useEffect)(() => {
      const onUnauthorized = () => {
        const wasAuthenticated = tokenRef.current != null;
        clearToken();
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(NAME_KEY);
        setTokenState(null);
        setUsername(null);
        setName(null);
        if (wasAuthenticated) setSessionExpired(true);
      };
      window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
      return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    }, []);
    const value = (0, import_react.useMemo)(
      () => ({ token, username, name, isAuthenticated: !!token, sessionExpired, login, register, logout }),
      [token, username, name, sessionExpired, login, register, logout]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AuthContext.Provider, { value, children });
  }
  var useAuth = () => {
    const c = (0, import_react.useContext)(AuthContext);
    if (!c) throw new Error("useAuth outside provider");
    return c;
  };
  var CURRENT_PROJECT_KEY = "tm.project.";
  var ProjectsContext = (0, import_react.createContext)(null);
  function ProjectsProvider({ children }) {
    const { push } = useToast();
    const { username } = useAuth();
    const storageKey = CURRENT_PROJECT_KEY + (username ?? "anon");
    const [status, setStatus] = (0, import_react.useState)("loading");
    const [projects, setProjects] = (0, import_react.useState)([]);
    const [currentId, setCurrentId] = (0, import_react.useState)(() => {
      const raw = localStorage.getItem(storageKey);
      return raw ? Number(raw) : null;
    });
    const settle = (0, import_react.useCallback)((list, preferred) => {
      const valid = preferred != null && list.some((p) => p.id === preferred) ? preferred : list[0]?.id ?? null;
      setCurrentId(valid);
      if (valid != null) localStorage.setItem(storageKey, String(valid));
      else localStorage.removeItem(storageKey);
    }, [storageKey]);
    const reload = (0, import_react.useCallback)(async () => {
      try {
        const list = await api.getProjects();
        setProjects(list);
        setCurrentId((prev) => {
          const valid = prev != null && list.some((p) => p.id === prev) ? prev : list[0]?.id ?? null;
          if (valid != null) localStorage.setItem(storageKey, String(valid));
          else localStorage.removeItem(storageKey);
          return valid;
        });
        setStatus("ready");
      } catch (err) {
        console.error("Failed to load projects", err);
        setStatus("error");
      }
    }, [storageKey]);
    (0, import_react.useEffect)(() => {
      void reload();
    }, [reload]);
    const selectProject = (0, import_react.useCallback)((id) => {
      setCurrentId(id);
      localStorage.setItem(storageKey, String(id));
    }, [storageKey]);
    const create = (0, import_react.useCallback)(async (body) => {
      const created = await api.createProject(body);
      const list = await api.getProjects().catch(() => null);
      if (list) setProjects(list);
      else setProjects((ps) => [...ps, created]);
      setCurrentId(created.id);
      localStorage.setItem(storageKey, String(created.id));
      setStatus("ready");
    }, [storageKey]);
    const update = (0, import_react.useCallback)(async (id, body) => {
      const updated = await api.updateProject(id, body);
      setProjects((ps) => ps.map((p) => p.id === id ? updated : p));
    }, []);
    const remove = (0, import_react.useCallback)(async (id) => {
      try {
        await api.deleteProject(id);
        const list = projects.filter((p) => p.id !== id);
        setProjects(list);
        settle(list, currentId === id ? null : currentId);
        push("Project deleted", "success");
        return true;
      } catch (err) {
        push(err.message, "error");
        return false;
      }
    }, [projects, currentId, settle, push]);
    const current = (0, import_react.useMemo)(() => projects.find((p) => p.id === currentId) ?? null, [projects, currentId]);
    const value = (0, import_react.useMemo)(
      () => ({ status, projects, currentId, current, selectProject, reload, create, update, remove }),
      [status, projects, currentId, current, selectProject, reload, create, update, remove]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ProjectsContext.Provider, { value, children });
  }
  var useProjects = () => {
    const c = (0, import_react.useContext)(ProjectsContext);
    if (!c) throw new Error("useProjects outside provider");
    return c;
  };
  var TasksContext = (0, import_react.createContext)(null);
  var ARCHIVE_PAGE_SIZE = 20;
  function TasksProvider({ children }) {
    const { push } = useToast();
    const { currentId } = useProjects();
    const [status, setStatus] = (0, import_react.useState)("loading");
    const [tasks, setTasks] = (0, import_react.useState)([]);
    const [edges, setEdges] = (0, import_react.useState)([]);
    const [groups, setGroups] = (0, import_react.useState)([]);
    const [archives, setArchives] = (0, import_react.useState)([]);
    const [archivesTotal, setArchivesTotal] = (0, import_react.useState)(0);
    const [influenceById, setInfluenceById] = (0, import_react.useState)(/* @__PURE__ */ new Map());
    const reload = (0, import_react.useCallback)(async () => {
      if (currentId == null) {
        setTasks([]);
        setEdges([]);
        setGroups([]);
        setArchives([]);
        setArchivesTotal(0);
        setInfluenceById(/* @__PURE__ */ new Map());
        setStatus("ready");
        return;
      }
      try {
        const [list, graph, groupList, archivePage] = await Promise.all([
          api.getTasks(currentId),
          api.getGraph(currentId),
          // Groups and archives are enhancements — a backend without them
          // shouldn't take the whole board down.
          api.getActiveGroups(currentId).catch(() => []),
          api.getArchives(currentId, 0, ARCHIVE_PAGE_SIZE).catch(() => null)
        ]);
        setTasks(list.filter((t) => t.archiveId == null).map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description ?? "",
          durationHours: t.durationHours,
          status: t.status,
          isBlocked: !!t.isBlocked,
          complexity: t.complexity ?? "MEDIUM",
          importance: t.importance ?? 0,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt ?? null,
          completedAt: t.completedAt ?? null,
          groupId: t.groupId ?? null
        })));
        setEdges(graph.edges);
        setGroups(groupList);
        setArchives(archivePage?.items ?? []);
        setArchivesTotal(archivePage?.total ?? 0);
        setInfluenceById(new Map(graph.nodes.map((n) => [n.id, n.influence ?? 0])));
        setStatus("ready");
      } catch (err) {
        console.error("Failed to load tasks", err);
        setStatus("error");
      }
    }, [currentId]);
    (0, import_react.useEffect)(() => {
      setStatus("loading");
      void reload();
    }, [reload]);
    const byId = (0, import_react.useMemo)(() => new Map(tasks.map((t) => [t.id, t])), [tasks]);
    const prerequisitesOf = (0, import_react.useCallback)(
      (id) => edges.filter((e) => e.targetId === id).map((e) => byId.get(e.sourceId)).filter((t) => !!t),
      [edges, byId]
    );
    const dependentsOf = (0, import_react.useCallback)(
      (id) => edges.filter((e) => e.sourceId === id).map((e) => byId.get(e.targetId)).filter((t) => !!t),
      [edges, byId]
    );
    const descendants = (0, import_react.useCallback)(
      (id) => {
        const out = /* @__PURE__ */ new Map();
        for (const e of edges) {
          const arr = out.get(e.sourceId);
          if (arr) arr.push(e.targetId);
          else out.set(e.sourceId, [e.targetId]);
        }
        const seen = /* @__PURE__ */ new Set();
        const stack = [id];
        while (stack.length) {
          const u = stack.pop();
          for (const v of out.get(u) ?? []) if (!seen.has(v)) {
            seen.add(v);
            stack.push(v);
          }
        }
        return seen;
      },
      [edges]
    );
    const strictDescendants = (0, import_react.useCallback)(
      (id) => {
        const out = /* @__PURE__ */ new Map();
        for (const e of edges) {
          if (e.type !== "STRICT_PREREQUISITE") continue;
          const arr = out.get(e.sourceId);
          if (arr) arr.push(e.targetId);
          else out.set(e.sourceId, [e.targetId]);
        }
        const seen = /* @__PURE__ */ new Set();
        const stack = [id];
        while (stack.length) {
          const u = stack.pop();
          for (const v of out.get(u) ?? []) if (!seen.has(v)) {
            seen.add(v);
            stack.push(v);
          }
        }
        seen.delete(id);
        return seen;
      },
      [edges]
    );
    const run = (0, import_react.useCallback)(
      async (fn, okMsg) => {
        try {
          await fn();
          await reload();
          push(okMsg, "success");
          return true;
        } catch (err) {
          push(err.message, "error");
          return false;
        }
      },
      [reload, push]
    );
    const create = (0, import_react.useCallback)(async (body) => {
      if (currentId == null) throw new Error("Create a project first");
      await api.createTask({ ...body, projectId: currentId });
      await reload();
    }, [currentId, reload]);
    const update = (0, import_react.useCallback)(async (id, body) => {
      if (currentId == null) throw new Error("Create a project first");
      await api.updateTask(id, { ...body, projectId: currentId });
      await reload();
    }, [currentId, reload]);
    const remove = (0, import_react.useCallback)((id) => run(() => api.deleteTask(id), "Task deleted"), [run]);
    const bind = (0, import_react.useCallback)(
      (taskId, parentId, type) => run(() => api.bind(taskId, parentId, type), type === "OPTIONAL_LINK" ? "Optional link added" : "Prerequisite added"),
      [run]
    );
    const unbind = (0, import_react.useCallback)((taskId, parentId) => run(() => api.unbind(taskId, parentId), "Dependency removed"), [run]);
    const changeBindType = (0, import_react.useCallback)(
      (taskId, parentId, type) => run(() => api.updateBindType(taskId, parentId, type), type === "OPTIONAL_LINK" ? "Link is now optional" : "Link is now required"),
      [run]
    );
    const toggle = (0, import_react.useCallback)((id) => run(() => api.toggleStatus(id), "Status updated"), [run]);
    const createGroup = (0, import_react.useCallback)(async (title) => {
      if (currentId == null) return null;
      try {
        const g = await api.createGroup({ projectId: currentId, title });
        await reload();
        push("Group created", "success");
        return g;
      } catch (err) {
        push(err.message, "error");
        return null;
      }
    }, [currentId, reload, push]);
    const groupTasks = (0, import_react.useCallback)(async (title, taskIds) => {
      if (currentId == null || taskIds.length === 0) return false;
      try {
        const g = await api.createGroup({ projectId: currentId, title });
        await api.assignToGroup(g.id, taskIds);
        await reload();
        push(`Group \u201C${title}\u201D created with ${taskIds.length} task${taskIds.length === 1 ? "" : "s"}`, "success");
        return true;
      } catch (err) {
        push(err.message, "error");
        await reload();
        return false;
      }
    }, [currentId, reload, push]);
    const renameGroup = (0, import_react.useCallback)((id, title) => {
      if (currentId == null) return Promise.resolve(false);
      return run(() => api.updateGroup(id, { projectId: currentId, title }), "Group renamed");
    }, [run, currentId]);
    const removeGroup = (0, import_react.useCallback)(
      (id) => run(() => api.deleteGroup(id), "Group deleted \u2014 its tasks are ungrouped"),
      [run]
    );
    const assignToGroup = (0, import_react.useCallback)(
      (groupId, taskIds) => run(() => api.assignToGroup(groupId, taskIds), "Tasks added to group"),
      [run]
    );
    const setTaskGroup = (0, import_react.useCallback)((taskId, groupId) => {
      const t = byId.get(taskId);
      if (!t || currentId == null) return Promise.resolve(false);
      const body = {
        projectId: currentId,
        title: t.title,
        description: t.description || null,
        durationHours: t.durationHours,
        complexity: t.complexity,
        importance: t.importance,
        groupId
      };
      return run(() => api.updateTask(taskId, body), groupId == null ? "Removed from group" : "Moved to group");
    }, [run, byId, currentId]);
    const loadMoreArchives = (0, import_react.useCallback)(async () => {
      if (currentId == null) return;
      try {
        const nextPage = Math.floor(archives.length / ARCHIVE_PAGE_SIZE);
        const res = await api.getArchives(currentId, nextPage, ARCHIVE_PAGE_SIZE);
        setArchives((prev) => {
          const seen = new Set(prev.map((a) => a.id));
          return [...prev, ...res.items.filter((a) => !seen.has(a.id))];
        });
        setArchivesTotal(res.total);
      } catch (err) {
        push(err.message, "error");
      }
    }, [currentId, archives.length, push]);
    const archiveBranch = (0, import_react.useCallback)((rootId, title) => {
      if (currentId == null) return Promise.resolve(false);
      return run(() => api.archiveBranches(currentId, [rootId], title), "Branch archived");
    }, [run, currentId]);
    const restoreArchive = (0, import_react.useCallback)((archiveId) => {
      if (currentId == null) return Promise.resolve(false);
      return run(() => api.restoreArchive(currentId, archiveId), "Branch restored to the graph");
    }, [run, currentId]);
    const fetchArchiveGraph = (0, import_react.useCallback)((archiveId) => {
      if (currentId == null) return Promise.reject(new Error("No project selected"));
      return api.getArchiveGraph(currentId, archiveId);
    }, [currentId]);
    const value = (0, import_react.useMemo)(
      () => ({
        status,
        tasks,
        byId,
        edges,
        groups,
        reload,
        prerequisitesOf,
        dependentsOf,
        descendants,
        strictDescendants,
        influenceById,
        create,
        update,
        remove,
        bind,
        unbind,
        changeBindType,
        toggle,
        createGroup,
        renameGroup,
        removeGroup,
        setTaskGroup,
        assignToGroup,
        groupTasks,
        archives,
        archivesTotal,
        loadMoreArchives,
        archiveBranch,
        restoreArchive,
        fetchArchiveGraph
      }),
      [
        status,
        tasks,
        byId,
        edges,
        groups,
        reload,
        prerequisitesOf,
        dependentsOf,
        descendants,
        strictDescendants,
        influenceById,
        create,
        update,
        remove,
        bind,
        unbind,
        changeBindType,
        toggle,
        createGroup,
        renameGroup,
        removeGroup,
        setTaskGroup,
        assignToGroup,
        groupTasks,
        archives,
        archivesTotal,
        loadMoreArchives,
        archiveBranch,
        restoreArchive,
        fetchArchiveGraph
      ]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TasksContext.Provider, { value, children });
  }
  var useTasks = () => {
    const c = (0, import_react.useContext)(TasksContext);
    if (!c) throw new Error("useTasks outside provider");
    return c;
  };
  var UIContext = (0, import_react.createContext)(null);
  function UIProvider({ children }) {
    const [view, setViewState] = (0, import_react.useState)(() => localStorage.getItem("tm.view") || "board");
    const [selectedId, setSelectedId] = (0, import_react.useState)(null);
    const [branchRoot, setBranchRoot] = (0, import_react.useState)(null);
    const [search, setSearch] = (0, import_react.useState)("");
    const [form, setForm] = (0, import_react.useState)(null);
    const [projectForm, setProjectForm] = (0, import_react.useState)(null);
    const [confirmRequest, setConfirmRequest] = (0, import_react.useState)(null);
    const setView = (0, import_react.useCallback)((v) => {
      setViewState(v);
      localStorage.setItem("tm.view", v);
    }, []);
    const select = (0, import_react.useCallback)((id) => setSelectedId(id), []);
    const clearSelection = (0, import_react.useCallback)(() => setSelectedId(null), []);
    const focusBranch = (0, import_react.useCallback)((id) => setBranchRoot(id), []);
    const openCreate = (0, import_react.useCallback)(() => setForm({ task: null }), []);
    const openEdit = (0, import_react.useCallback)((task) => setForm({ task }), []);
    const closeForm = (0, import_react.useCallback)(() => setForm(null), []);
    const openCreateProject = (0, import_react.useCallback)(() => setProjectForm({ project: null }), []);
    const openEditProject = (0, import_react.useCallback)((project) => setProjectForm({ project }), []);
    const closeProjectForm = (0, import_react.useCallback)(() => setProjectForm(null), []);
    const confirm = (0, import_react.useCallback)(
      (opts) => new Promise((resolve) => setConfirmRequest({ opts, resolve })),
      []
    );
    const resolveConfirm = (0, import_react.useCallback)(
      (ok) => setConfirmRequest((req2) => {
        req2?.resolve(ok);
        return null;
      }),
      []
    );
    const value = (0, import_react.useMemo)(
      () => ({
        view,
        setView,
        selectedId,
        select,
        clearSelection,
        branchRoot,
        focusBranch,
        search,
        setSearch,
        form,
        openCreate,
        openEdit,
        closeForm,
        projectForm,
        openCreateProject,
        openEditProject,
        closeProjectForm,
        confirmRequest,
        confirm,
        resolveConfirm
      }),
      [
        view,
        setView,
        selectedId,
        select,
        clearSelection,
        branchRoot,
        focusBranch,
        search,
        form,
        openCreate,
        openEdit,
        closeForm,
        projectForm,
        openCreateProject,
        openEditProject,
        closeProjectForm,
        confirmRequest,
        confirm,
        resolveConfirm
      ]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(UIContext.Provider, { value, children });
  }
  var useUI = () => {
    const c = (0, import_react.useContext)(UIContext);
    if (!c) throw new Error("useUI outside provider");
    return c;
  };

  // src/components/ui.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim(), 1);
  function StatusDot({ status }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `status-dot d-${status.toLowerCase()}` });
  }
  function ImportanceChip({ value }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `chip chip--imp-${value}`, title: "Importance", children: [
      value > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "flag" }),
      IMPORTANCE_LABEL[value] ?? IMPORTANCE_LABEL[0]
    ] });
  }
  function StatusBadge({ status }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `status-badge s-${status.toLowerCase()}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "status-dot" }),
      STATUS_LABEL[status]
    ] });
  }
  function AdvanceButton({ task, small }) {
    const { toggle } = useTasks();
    const sm = small ? " btn--sm" : "";
    if (task.status === "COMPLETED") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "done-pill", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "check" }),
        "Completed"
      ] });
    }
    if (task.status === "EXPIRED") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "done-pill done-pill--expired", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "clock" }),
        "Expired"
      ] });
    }
    if (task.status === "TODO") {
      if (task.isBlocked) {
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: `btn btn--ghost${sm}`, disabled: true, title: "Complete prerequisites first", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "lock" }),
          "Blocked"
        ] });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: `btn btn--primary${sm}`, onClick: (e) => {
        e.stopPropagation();
        void toggle(task.id);
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "play" }),
        small ? "Start" : "Start task"
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: `btn btn--success${sm}`, onClick: (e) => {
      e.stopPropagation();
      void toggle(task.id);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "check" }),
      small ? "Complete" : "Mark complete"
    ] });
  }
  function LoadingState() {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "placeholder", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "spinner" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "placeholder__text", children: "Loading tasks\u2026" })
    ] });
  }
  function EmptyState() {
    const { openCreate } = useUI();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "placeholder", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "placeholder__title", children: "No tasks yet" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "placeholder__text", children: "Create your first task. You can link tasks together later so one waits for another." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "btn btn--primary", onClick: openCreate, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "plus" }),
        "New task"
      ] })
    ] });
  }
  function NoProjects() {
    const { openCreateProject } = useUI();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "placeholder placeholder--page", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "placeholder__title", children: "Welcome!" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "placeholder__text", children: "Tasks are grouped into projects. Create your first project to get started." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "btn btn--primary", onClick: openCreateProject, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "plus" }),
        "New project"
      ] })
    ] });
  }
  function ProjectsError() {
    const { reload } = useProjects();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "placeholder placeholder--page", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "placeholder__art placeholder__art--warn", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "alert", size: 36 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "placeholder__title", children: "Couldn\u2019t load your projects" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "placeholder__text", children: "The server didn\u2019t respond. Make sure the backend is running, then try again." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "btn btn--primary", onClick: () => void reload(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "refresh" }),
        "Retry"
      ] })
    ] });
  }
  function ConnectionError() {
    const { reload } = useTasks();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "placeholder", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "placeholder__art placeholder__art--warn", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "alert", size: 36 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "placeholder__title", children: "Couldn\u2019t load tasks" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "placeholder__text", children: "The server didn\u2019t respond. Check that the backend is running, then try again." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "btn btn--primary", onClick: () => void reload(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "refresh" }),
        "Retry"
      ] })
    ] });
  }

  // src/components/TopBar.tsx
  init_define_import_meta_env();
  var import_jsx_runtime4 = __toESM(require_react_shim(), 1);
  function TopBar() {
    const { current, remove } = useProjects();
    const { view, setView, openCreate, openEditProject, confirm, clearSelection } = useUI();
    if (!current) return null;
    async function onDeleteProject() {
      if (!current) return;
      const ok = await confirm({
        title: "Delete project",
        message: `Delete \u201C${current.title}\u201D with all of its tasks? This can\u2019t be undone.`,
        confirmLabel: "Delete"
      });
      if (!ok) return;
      clearSelection();
      await remove(current.id);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("header", { className: "topbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "topbar__info", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "topbar__title", children: current.title }),
        current.description && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "topbar__desc", children: current.description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "topbar__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "tabs", role: "tablist", "aria-label": "Views", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              role: "tab",
              "aria-selected": view === "board",
              className: `tabs__btn ${view === "board" ? "is-active" : ""}`,
              onClick: () => setView("board"),
              children: "Board"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              role: "tab",
              "aria-selected": view === "graph",
              className: `tabs__btn ${view === "graph" ? "is-active" : ""}`,
              onClick: () => setView("graph"),
              children: "Graph"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              role: "tab",
              "aria-selected": view === "plan",
              className: `tabs__btn ${view === "plan" ? "is-active" : ""}`,
              onClick: () => setView("plan"),
              children: "Plan"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              role: "tab",
              "aria-selected": view === "roadmap",
              className: `tabs__btn ${view === "roadmap" ? "is-active" : ""}`,
              onClick: () => setView("roadmap"),
              children: "Roadmap"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "iconbtn", title: "Edit project", onClick: () => openEditProject(current), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "edit" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "iconbtn iconbtn--danger", title: "Delete project", onClick: () => void onDeleteProject(), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "trash" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: "btn btn--primary", onClick: openCreate, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "plus" }),
          "New task"
        ] })
      ] })
    ] });
  }

  // src/components/Sidebar.tsx
  init_define_import_meta_env();
  var import_jsx_runtime5 = __toESM(require_react_shim(), 1);
  function Sidebar() {
    const { theme, toggle } = useTheme();
    const { username, name, logout } = useAuth();
    const { projects, currentId, selectProject, status } = useProjects();
    const { openCreateProject, clearSelection } = useUI();
    const display = name || username || "";
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("aside", { className: "sidebar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "sidebar__brand", children: "Task Manager" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "sidebar__section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "sidebar__heading", children: "Projects" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("nav", { className: "projects", "aria-label": "Projects", children: [
          status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "projects__empty", children: "Loading\u2026" }),
          status === "ready" && projects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "projects__empty", children: "No projects yet" }),
          projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              className: `projects__item ${p.id === currentId ? "is-active" : ""}`,
              title: p.title,
              onClick: () => {
                clearSelection();
                selectProject(p.id);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "folder" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "projects__title", children: p.title })
              ]
            },
            p.id
          ))
        ] }),
        projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "select",
          {
            className: "projects__select",
            "aria-label": "Switch project",
            value: currentId ?? "",
            onChange: (e) => {
              clearSelection();
              selectProject(Number(e.target.value));
            },
            children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: p.id, children: p.title }, p.id))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { className: "btn btn--ghost btn--block", onClick: openCreateProject, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "plus" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "sidebar__newlabel", children: "New project" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "sidebar__foot", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "sidebar__user", title: username ?? "", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "user" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "sidebar__username", children: display })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "sidebar__footbtns", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "iconbtn", title: "Toggle theme", "aria-label": "Toggle theme", onClick: toggle, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: theme === "dark" ? "sun" : "moon" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "iconbtn", title: "Sign out", "aria-label": "Sign out", onClick: logout, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "logout" }) })
        ] })
      ] })
    ] });
  }

  // src/components/StatsBar.tsx
  init_define_import_meta_env();
  var import_jsx_runtime6 = __toESM(require_react_shim(), 1);
  function StatsBar() {
    const { status, tasks } = useTasks();
    const { view, search, setSearch } = useUI();
    if (status !== "ready" || tasks.length === 0) return null;
    const by = (s) => tasks.filter((t) => t.status === s).length;
    const blocked = tasks.filter((t) => t.isBlocked).length;
    const hours = tasks.reduce((sum, t) => sum + t.durationHours, 0);
    const done = by("COMPLETED");
    const pct = Math.round(done / tasks.length * 100);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stats", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--pct", title: `${done} of ${tasks.length} tasks completed`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "progress", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "progress__fill", style: { width: `${pct}%` } }) }),
        pct,
        "% done"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat", children: [
        tasks.length,
        " tasks"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--todo", children: [
        by("TODO"),
        " to do"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--progress", children: [
        by("IN_PROGRESS"),
        " in progress"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--done", children: [
        done,
        " completed"
      ] }),
      by("EXPIRED") > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--expired", children: [
        by("EXPIRED"),
        " expired"
      ] }),
      blocked > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--blocked", children: [
        blocked,
        " blocked"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat stat--hours", children: [
        hours,
        "h total"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "stats__spacer" }),
      view === "board" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "search", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "search" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "input",
          {
            className: "search__input",
            type: "search",
            placeholder: "Search tasks\u2026",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] })
    ] });
  }

  // src/components/Toaster.tsx
  init_define_import_meta_env();
  var import_jsx_runtime7 = __toESM(require_react_shim(), 1);
  function Toaster() {
    const { toasts, dismiss } = useToast();
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "toasts", "aria-live": "polite", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `toast toast--${t.kind}`, onClick: () => dismiss(t.id), children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: t.kind === "success" ? "check" : t.kind === "error" ? "alert" : "info" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: t.message })
    ] }, t.id)) });
  }

  // src/components/BoardView.tsx
  init_define_import_meta_env();
  var import_jsx_runtime8 = __toESM(require_react_shim(), 1);
  var COLUMN_LABEL = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    EXPIRED: "Expired"
  };
  function BoardView() {
    const { status, tasks } = useTasks();
    const { search } = useUI();
    if (status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("section", { className: "view board", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LoadingState, {}) });
    if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("section", { className: "view board", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ConnectionError, {}) });
    if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("section", { className: "view board", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(EmptyState, {}) });
    const q = search.trim().toLowerCase();
    const filtered = tasks.filter(
      (t) => !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
    const columns = tasks.some((t) => t.status === "EXPIRED") ? [...STATUS_ORDER, "EXPIRED"] : STATUS_ORDER;
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("section", { className: `view board ${columns.length === 4 ? "board--x4" : ""}`, children: columns.map((col) => {
      const items = filtered.filter((t) => t.status === col).sort((a, b) => Number(a.isBlocked) - Number(b.isBlocked) || b.importance - a.importance);
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: `column column--${col.toLowerCase()}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "column__head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "column__dot" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { className: "column__title", children: COLUMN_LABEL[col] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "column__count", children: items.length })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "column__body", children: items.length > 0 ? items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TaskCard, { task: t }, t.id)) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-empty", children: q ? "No matches" : "Nothing here yet" }) })
      ] }, col);
    }) });
  }
  function nameList(tasks, shown = 2) {
    const names = tasks.slice(0, shown).map((t) => t.title.length > 18 ? t.title.slice(0, 17) + "\u2026" : t.title);
    const rest = tasks.length - names.length;
    return names.join(", ") + (rest > 0 ? ` +${rest}` : "");
  }
  function TaskCard({ task }) {
    const { prerequisitesOf, dependentsOf, edges, byId } = useTasks();
    const { selectedId, select } = useUI();
    const pre = prerequisitesOf(task.id).length;
    const dep = dependentsOf(task.id).length;
    const waitingFor = edges.filter((e) => e.targetId === task.id && e.type === "STRICT_PREREQUISITE").map((e) => byId.get(e.sourceId)).filter((t) => !!t && t.status !== "COMPLETED");
    const opensNext = edges.filter((e) => e.sourceId === task.id && e.type === "STRICT_PREREQUISITE").map((e) => byId.get(e.targetId)).filter((t) => !!t).filter((d) => !edges.some((e) => e.targetId === d.id && e.type === "STRICT_PREREQUISITE" && e.sourceId !== task.id && (byId.get(e.sourceId)?.status ?? "COMPLETED") !== "COMPLETED"));
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "article",
      {
        className: `card ${task.isBlocked ? "card--blocked" : ""} ${selectedId === task.id ? "card--active" : ""}`,
        role: "button",
        tabIndex: 0,
        onClick: () => select(task.id),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(task.id);
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "card__top", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(StatusBadge, { status: task.status }),
            task.isBlocked && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "chip chip--blocked", title: "Waiting on unfinished prerequisites", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "lock" }),
              "Blocked"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { className: "card__title", children: task.title }),
          task.description && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "card__desc", children: task.description }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "card__meta", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ImportanceChip, { value: task.importance }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "meta", title: "Estimated effort", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "clock" }),
              task.durationHours,
              "h"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `meta meta--cx-${task.complexity.toLowerCase()}`, title: "Complexity", children: COMPLEXITY_LABEL[task.complexity] }),
            pre > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "meta", title: "Prerequisites", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "link" }),
              pre
            ] }),
            dep > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "meta", title: "Unlocks", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "unlocks" }),
              dep
            ] })
          ] }),
          task.status !== "COMPLETED" && waitingFor.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "card__rel card__rel--wait", title: `Waiting for: ${waitingFor.map((t) => t.title).join(", ")}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "lock" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "card__rel-text", children: [
              "Waiting for: ",
              nameList(waitingFor)
            ] })
          ] }),
          task.status !== "COMPLETED" && opensNext.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "card__rel card__rel--open", title: `Completing this opens: ${opensNext.map((t) => t.title).join(", ")}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "unlocks" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "card__rel-text", children: [
              "Opens: ",
              nameList(opensNext)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "card__actions", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(AdvanceButton, { task, small: true }) })
        ]
      }
    );
  }

  // src/components/RoadmapView.tsx
  init_define_import_meta_env();
  var import_react2 = __toESM(require_react_shim(), 1);

  // src/lib/graph.ts
  init_define_import_meta_env();
  var NODE_W = 210;
  var NODE_H = 64;
  var HGAP = 48;
  var VGAP = 72;
  var GROUP_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#e11d48"];
  var groupColor = (gid) => GROUP_COLORS[Math.abs(gid) % GROUP_COLORS.length];
  function computeLayout(tasks, edges) {
    const ids = new Set(tasks.map((t) => t.id));
    const out = /* @__PURE__ */ new Map();
    const indeg = /* @__PURE__ */ new Map();
    const parents = /* @__PURE__ */ new Map();
    for (const t of tasks) {
      out.set(t.id, []);
      indeg.set(t.id, 0);
      parents.set(t.id, []);
    }
    for (const e of edges) {
      if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
      out.get(e.sourceId).push(e.targetId);
      parents.get(e.targetId).push(e.sourceId);
      indeg.set(e.targetId, indeg.get(e.targetId) + 1);
    }
    const work = new Map(indeg);
    const layer = /* @__PURE__ */ new Map();
    const queue = [];
    for (const t of tasks) if (work.get(t.id) === 0) {
      layer.set(t.id, 0);
      queue.push(t.id);
    }
    for (let i = 0; i < queue.length; i++) {
      const u = queue[i];
      for (const v of out.get(u)) {
        layer.set(v, Math.max(layer.get(v) ?? 0, (layer.get(u) ?? 0) + 1));
        work.set(v, work.get(v) - 1);
        if (work.get(v) === 0) queue.push(v);
      }
    }
    for (const t of tasks) if (!layer.has(t.id)) layer.set(t.id, 0);
    const layers = [];
    const title = (id) => tasks.find((t) => t.id === id)?.title ?? "";
    for (const t of tasks) {
      const L = layer.get(t.id);
      (layers[L] || (layers[L] = [])).push(t.id);
    }
    for (const L of layers) L?.sort((a, b) => title(a).localeCompare(title(b)));
    for (let iter = 0; iter < 4; iter++) {
      for (let li = 1; li < layers.length; li++) {
        const L = layers[li];
        if (!L) continue;
        const idx = /* @__PURE__ */ new Map();
        (layers[li - 1] ?? []).forEach((id, i) => idx.set(id, i));
        const bc = /* @__PURE__ */ new Map();
        for (const id of L) {
          const ps = parents.get(id).filter((p) => idx.has(p));
          bc.set(id, ps.length ? ps.reduce((s, p) => s + idx.get(p), 0) / ps.length : 1e9);
        }
        L.sort((a, b) => bc.get(a) - bc.get(b) || title(a).localeCompare(title(b)));
      }
    }
    const maxCount = Math.max(1, ...layers.map((L) => L ? L.length : 0));
    const totalW = maxCount * NODE_W + (maxCount - 1) * HGAP;
    const positions = /* @__PURE__ */ new Map();
    layers.forEach((L, li) => {
      if (!L) return;
      const rowW = L.length * NODE_W + (L.length - 1) * HGAP;
      const startX = (totalW - rowW) / 2;
      L.forEach(
        (id, i) => positions.set(id, {
          x: startX + i * (NODE_W + HGAP) + NODE_W / 2,
          y: li * (NODE_H + VGAP) + NODE_H / 2 + 24
        })
      );
    });
    return positions;
  }
  function computeCollapse(taskIds, edges, collapsed) {
    const ids = new Set(taskIds);
    const out = /* @__PURE__ */ new Map();
    const parents = /* @__PURE__ */ new Map();
    const indeg = /* @__PURE__ */ new Map();
    for (const id of taskIds) {
      out.set(id, []);
      parents.set(id, []);
      indeg.set(id, 0);
    }
    for (const e of edges) {
      if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
      out.get(e.sourceId).push(e.targetId);
      parents.get(e.targetId).push(e.sourceId);
      indeg.set(e.targetId, indeg.get(e.targetId) + 1);
    }
    const queue = [];
    const work = new Map(indeg);
    for (const id of taskIds) if (work.get(id) === 0) queue.push(id);
    const rep = /* @__PURE__ */ new Map();
    for (let i = 0; i < queue.length; i++) {
      const v = queue[i];
      const ps = parents.get(v);
      if (ps.length) {
        let repId = null;
        let covered = true;
        for (const p of ps) {
          const hiddenBy = rep.get(p);
          if (hiddenBy != null) repId ?? (repId = hiddenBy);
          else if (collapsed.has(p)) repId ?? (repId = p);
          else {
            covered = false;
            break;
          }
        }
        if (covered && repId != null) rep.set(v, repId);
      }
      for (const w of out.get(v)) {
        work.set(w, work.get(w) - 1);
        if (work.get(w) === 0) queue.push(w);
      }
    }
    return rep;
  }
  function edgePath(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      const s2 = dx >= 0 ? 1 : -1;
      const x1 = a.x + s2 * (NODE_W / 2);
      const x2 = b.x - s2 * (NODE_W / 2);
      const bend2 = s2 * Math.max(28, Math.abs(x2 - x1) / 2);
      return `M ${x1} ${a.y} C ${x1 + bend2} ${a.y}, ${x2 - bend2} ${b.y}, ${x2} ${b.y}`;
    }
    const s = dy >= 0 ? 1 : -1;
    const y1 = a.y + s * (NODE_H / 2);
    const y2 = b.y - s * (NODE_H / 2);
    const bend = s * Math.max(28, Math.abs(y2 - y1) / 2);
    return `M ${a.x} ${y1} C ${a.x} ${y1 + bend}, ${b.x} ${y2 - bend}, ${b.x} ${y2}`;
  }

  // src/components/RoadmapView.tsx
  var import_jsx_runtime9 = __toESM(require_react_shim(), 1);
  var HOUR_W = 13;
  var DAY_HOURS = 8;
  var ROW_H = 40;
  var HEADER_H = 40;
  function RoadmapView() {
    const { currentId } = useProjects();
    const { tasks, groups, edges } = useTasks();
    const { select, selectedId } = useUI();
    const [state, setState] = (0, import_react2.useState)({ kind: "loading" });
    const [hoverId, setHoverId] = (0, import_react2.useState)(null);
    const tasksSig = (0, import_react2.useMemo)(
      () => tasks.map((t) => `${t.id}:${t.status}:${t.durationHours}`).join(",") + "|" + edges.length,
      [tasks, edges]
    );
    const load = (0, import_react2.useCallback)(async () => {
      if (currentId == null) return;
      setState({ kind: "loading" });
      try {
        const withTime = await api.getTasksWithTime(currentId);
        setState({ kind: "ready", finishById: new Map(withTime.map((t) => [t.id, t.calculatedTime])) });
      } catch (err) {
        setState({ kind: "error", message: err.message });
      }
    }, [currentId]);
    (0, import_react2.useEffect)(() => {
      void load();
    }, [load, tasksSig]);
    const bars = (0, import_react2.useMemo)(() => {
      if (state.kind !== "ready") return /* @__PURE__ */ new Map();
      const m = /* @__PURE__ */ new Map();
      for (const t of tasks) {
        if (t.status === "COMPLETED" || t.status === "EXPIRED") continue;
        const color = t.groupId != null ? groupColor(t.groupId) : "var(--primary)";
        if (t.status === "IN_PROGRESS") {
          m.set(t.id, { task: t, start: 0, end: t.durationHours, color });
        } else {
          const end = state.finishById.get(t.id) ?? t.durationHours;
          m.set(t.id, { task: t, start: Math.max(0, end - t.durationHours), end, color });
        }
      }
      return m;
    }, [state, tasks]);
    const rows = (0, import_react2.useMemo)(() => {
      const list = [];
      const used = /* @__PURE__ */ new Set();
      const groupRows = [];
      for (const g of groups) {
        const members = [...bars.values()].filter((b) => b.task.groupId === g.id);
        if (!members.length) continue;
        members.sort((a, b) => a.start - b.start || a.end - b.end);
        groupRows.push({
          row: {
            kind: "group",
            id: g.id,
            title: g.title,
            color: groupColor(g.id),
            start: Math.min(...members.map((b) => b.start)),
            end: Math.max(...members.map((b) => b.end)),
            count: members.length
          },
          bars: members
        });
        for (const b of members) used.add(b.task.id);
      }
      groupRows.sort((a, b) => a.row.start - b.row.start || a.row.end - b.row.end);
      const loose = [...bars.values()].filter((b) => !used.has(b.task.id)).sort((a, b) => a.start - b.start || a.end - b.end);
      for (const { row, bars: members } of groupRows) {
        list.push(row);
        for (const b of members) list.push({ kind: "task", bar: b });
      }
      if (loose.length && groupRows.length) {
        list.push({
          kind: "group",
          id: -1,
          title: "Ungrouped",
          color: "var(--todo)",
          start: Math.min(...loose.map((b) => b.start)),
          end: Math.max(...loose.map((b) => b.end)),
          count: loose.length
        });
      }
      for (const b of loose) list.push({ kind: "task", bar: b });
      return list;
    }, [bars, groups]);
    const totalHours = (0, import_react2.useMemo)(
      () => [...bars.values()].reduce((m, b) => Math.max(m, b.end), 0),
      [bars]
    );
    const days = Math.max(3, Math.ceil(totalHours / DAY_HOURS));
    const tlW = days * DAY_HOURS * HOUR_W;
    const rowCenter = (0, import_react2.useMemo)(() => {
      const m = /* @__PURE__ */ new Map();
      rows.forEach((r, i) => {
        if (r.kind === "task") m.set(r.bar.task.id, i * ROW_H + ROW_H / 2);
      });
      return m;
    }, [rows]);
    const connectors = (0, import_react2.useMemo)(() => {
      const list = [];
      for (const e of edges) {
        if (e.type !== "STRICT_PREREQUISITE") continue;
        const src = bars.get(e.sourceId);
        const tgt = bars.get(e.targetId);
        const y1 = rowCenter.get(e.sourceId);
        const y2 = rowCenter.get(e.targetId);
        if (!src || !tgt || y1 == null || y2 == null) continue;
        const x1 = src.end * HOUR_W;
        const x2 = tgt.start * HOUR_W;
        const bend = Math.max(18, Math.min(40, Math.abs(x2 - x1) / 2));
        list.push({
          id: e.id,
          d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2 - 3} ${y2}`,
          sourceId: e.sourceId,
          targetId: e.targetId
        });
      }
      return list;
    }, [edges, bars, rowCenter]);
    const linkFocus = hoverId ?? selectedId;
    if (state.kind === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("section", { className: "view roadmap", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "spinner" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "placeholder__text", children: "Laying out the roadmap\u2026" })
      ] }) });
    }
    if (state.kind === "error") {
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("section", { className: "view roadmap", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "placeholder__art placeholder__art--warn", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "alert", size: 36 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "placeholder__title", children: "Couldn\u2019t build the roadmap" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "placeholder__text", children: state.message }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { className: "btn btn--primary", onClick: () => void load(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "refresh" }),
          "Retry"
        ] })
      ] }) });
    }
    if (rows.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("section", { className: "view roadmap", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "placeholder__title", children: "Nothing to schedule" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "placeholder__text", children: "Every task is completed \u2014 or there are no tasks yet. New \u201CTo do\u201D work will appear here on the dependency timeline." })
      ] }) });
    }
    const bodyH = rows.length * ROW_H;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "view roadmap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__summary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "plan__total", children: [
          "Remaining: ",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("b", { children: [
            totalHours,
            "h"
          ] }),
          totalHours >= DAY_HOURS && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "muted", children: [
            " \xB7 ~",
            (totalHours / DAY_HOURS).toFixed(totalHours / DAY_HOURS < 10 ? 1 : 0),
            " workdays"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "muted small", children: "Bars follow the dependency schedule: each task at its earliest slot on the critical path, 8h = 1 day. Arrows are strict prerequisites." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "roadmap__body", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__canvas", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__list", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "roadmap__list-head", children: "Tasks" }),
          rows.map(
            (r) => r.kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__lrow roadmap__lrow--group", style: { height: ROW_H }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "gpanel__dot", style: { background: r.color } }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "roadmap__lname", title: r.title, children: r.title }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "muted small", children: r.count })
            ] }, `g${r.id}`) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "button",
              {
                className: `roadmap__lrow roadmap__lrow--task ${selectedId === r.bar.task.id ? "is-active" : ""}`,
                style: { height: ROW_H },
                onClick: () => select(r.bar.task.id),
                title: `${r.bar.task.title} \u2014 ${STATUS_LABEL[r.bar.task.status]}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(StatusDot, { status: r.bar.task.status }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "roadmap__lname", children: r.bar.task.title }),
                  r.bar.task.isBlocked && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "chip chip--blocked chip--xs", children: "blocked" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "muted small roadmap__lh", children: [
                    r.bar.task.durationHours,
                    "h"
                  ] })
                ]
              },
              r.bar.task.id
            )
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__tl", style: { width: tlW }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "roadmap__days", style: { height: HEADER_H }, children: Array.from({ length: days }, (_, d) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__day", style: { width: DAY_HOURS * HOUR_W }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
              "Day ",
              d + 1
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "muted", children: [
              "+",
              (d + 1) * DAY_HOURS,
              "h"
            ] })
          ] }, d)) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "roadmap__grid", style: { height: bodyH }, children: [
            Array.from({ length: days - 1 }, (_, d) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "roadmap__grid-line", style: { left: (d + 1) * DAY_HOURS * HOUR_W } }, d)),
            rows.map(
              (r, i) => r.kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                "div",
                {
                  className: "roadmap__grouprow",
                  style: { top: i * ROW_H, height: ROW_H }
                },
                `band${r.id}`
              ) : null
            ),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("svg", { className: "roadmap__links", width: tlW, height: bodyH, "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("defs", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("marker", { id: "road-arrow", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M0 0 L10 5 L0 10 z", fill: "var(--edge)" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("marker", { id: "road-arrow-hot", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M0 0 L10 5 L0 10 z", fill: "var(--primary)" }) })
              ] }),
              connectors.map((c) => {
                const hot = linkFocus != null && (c.sourceId === linkFocus || c.targetId === linkFocus);
                return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                  "path",
                  {
                    className: hot ? "is-hot" : "",
                    d: c.d,
                    markerEnd: `url(#${hot ? "road-arrow-hot" : "road-arrow"})`
                  },
                  c.id
                );
              })
            ] }),
            rows.map(
              (r, i) => r.kind === "group" ? null : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                "button",
                {
                  className: `roadbar ${r.bar.task.status === "IN_PROGRESS" ? "roadbar--progress" : ""} ${selectedId === r.bar.task.id ? "is-active" : ""}`,
                  style: {
                    top: i * ROW_H + 6,
                    left: r.bar.start * HOUR_W,
                    width: Math.max((r.bar.end - r.bar.start) * HOUR_W, 26),
                    background: r.bar.color
                  },
                  onClick: () => select(r.bar.task.id),
                  onMouseEnter: () => setHoverId(r.bar.task.id),
                  onMouseLeave: () => setHoverId(null),
                  title: `${r.bar.task.title} \xB7 ${r.bar.start}\u2013${r.bar.end}h`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "roadbar__label", children: r.bar.task.title })
                },
                r.bar.task.id
              )
            )
          ] })
        ] })
      ] }) })
    ] });
  }

  // src/components/PlanView.tsx
  init_define_import_meta_env();
  var import_react3 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime10 = __toESM(require_react_shim(), 1);
  function PlanView() {
    const { currentId } = useProjects();
    const { tasks, byId } = useTasks();
    const { select, selectedId } = useUI();
    const [state, setState] = (0, import_react3.useState)({ kind: "loading" });
    const tasksSig = (0, import_react3.useMemo)(
      () => tasks.map((t) => `${t.id}:${t.status}:${t.isBlocked}:${t.durationHours}`).join(","),
      [tasks]
    );
    const load = (0, import_react3.useCallback)(async () => {
      if (currentId == null) return;
      setState({ kind: "loading" });
      try {
        const [order, withTime] = await Promise.all([
          api.getSuggested(currentId),
          api.getTasksWithTime(currentId)
        ]);
        const hourById = new Map(withTime.map((t) => [t.id, t.calculatedTime]));
        const rows2 = order.map((t, i) => ({
          ...t,
          calculatedTime: hourById.get(t.id) ?? t.durationHours,
          position: i + 1
        }));
        const totalHours2 = withTime.reduce((max, t) => Math.max(max, t.calculatedTime ?? 0), 0);
        setState({ kind: "ready", rows: rows2, totalHours: totalHours2 });
      } catch (err) {
        setState({ kind: "error", message: err.message });
      }
    }, [currentId]);
    (0, import_react3.useEffect)(() => {
      void load();
    }, [load, tasksSig]);
    if (state.kind === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("section", { className: "view plan", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "spinner" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "placeholder__text", children: "Building the plan\u2026" })
      ] }) });
    }
    if (state.kind === "error") {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("section", { className: "view plan", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "placeholder__art placeholder__art--warn", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "alert", size: 36 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h3", { className: "placeholder__title", children: "Couldn\u2019t build the plan" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "placeholder__text", children: state.message }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("button", { className: "btn btn--primary", onClick: () => void load(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "refresh" }),
          "Retry"
        ] })
      ] }) });
    }
    const { rows, totalHours } = state;
    if (rows.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("section", { className: "view plan", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "placeholder", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h3", { className: "placeholder__title", children: "Nothing to plan" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "placeholder__text", children: "There are no tasks in \u201CTo do\u201D. Tasks that are in progress or completed don\u2019t appear here." })
      ] }) });
    }
    const days = totalHours / 8;
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("section", { className: "view plan", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "plan__summary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "plan__total", children: [
          "Estimated total: ",
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("b", { children: [
            totalHours,
            "h"
          ] }),
          totalHours >= 8 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "muted", children: [
            " \xB7 ~",
            days.toFixed(days < 10 ? 1 : 0),
            " workdays"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "muted small", children: "Suggested order for the remaining \u201CTo do\u201D tasks. \u201CDone by\u201D is the earliest finish hour given the dependencies." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ol", { className: "plan__list", children: rows.map((row) => {
        const live = byId.get(row.id);
        const blocked = live?.isBlocked ?? row.isBlocked;
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
          "button",
          {
            className: `planrow ${selectedId === row.id ? "is-active" : ""}`,
            onClick: () => select(row.id),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "planrow__num", children: row.position }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(StatusDot, { status: row.status }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "planrow__title", children: row.title }),
              blocked && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "chip chip--blocked chip--xs", children: "blocked" }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ImportanceChip, { value: row.importance }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: `meta meta--cx-${row.complexity.toLowerCase()}`, children: COMPLEXITY_LABEL[row.complexity] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "meta", title: "Estimated effort", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "clock" }),
                row.durationHours,
                "h"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "planrow__finish", title: "Earliest possible finish, counting prerequisite hours", children: [
                "done by ",
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("b", { children: [
                  row.calculatedTime,
                  "h"
                ] })
              ] })
            ]
          }
        ) }, row.id);
      }) })
    ] });
  }

  // src/components/GraphView.tsx
  init_define_import_meta_env();
  var import_react4 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime11 = __toESM(require_react_shim(), 1);
  var truncate = (s, n) => s.length > n ? s.slice(0, n - 1) + "\u2026" : s;
  function readPositions(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return /* @__PURE__ */ new Map();
      return new Map(JSON.parse(raw));
    } catch {
      return /* @__PURE__ */ new Map();
    }
  }
  function writePositions(key, positions) {
    try {
      localStorage.setItem(key, JSON.stringify([...positions.entries()]));
    } catch {
    }
  }
  function readIdSet(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }
  function writeIdSet(key, ids) {
    try {
      if (ids.size) localStorage.setItem(key, JSON.stringify([...ids]));
      else localStorage.removeItem(key);
    } catch {
    }
  }
  function ghostPath(a, x, y) {
    const dx = x - a.x;
    const dy = y - a.y;
    const horizontal = Math.abs(dx) > Math.abs(dy);
    const x1 = horizontal ? a.x + (dx >= 0 ? 1 : -1) * (NODE_W / 2) : a.x;
    const y1 = horizontal ? a.y : a.y + (dy >= 0 ? 1 : -1) * (NODE_H / 2);
    const mx = (x1 + x) / 2;
    const my = (y1 + y) / 2;
    return horizontal ? `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y}, ${x} ${y}` : `M ${x1} ${y1} C ${x1} ${my}, ${x} ${my}, ${x} ${y}`;
  }
  function GraphView() {
    const {
      status,
      tasks,
      byId,
      edges,
      groups,
      descendants,
      strictDescendants,
      influenceById,
      bind,
      unbind,
      changeBindType,
      createGroup,
      renameGroup,
      removeGroup,
      assignToGroup,
      groupTasks,
      archives,
      archivesTotal,
      loadMoreArchives,
      archiveBranch,
      restoreArchive,
      fetchArchiveGraph
    } = useTasks();
    const { selectedId, select, branchRoot, focusBranch, form, projectForm, confirmRequest, confirm } = useUI();
    const { username } = useAuth();
    const { currentId } = useProjects();
    const posKeyBase = `tm.graph.pos.${username ?? "anon"}.${currentId ?? 0}`;
    const collapseKey = `tm.graph.fold.${username ?? "anon"}.${currentId ?? 0}`;
    const gfoldKey = `tm.graph.gfold.${username ?? "anon"}.${currentId ?? 0}`;
    const svgRef = (0, import_react4.useRef)(null);
    const canvasRef = (0, import_react4.useRef)(null);
    const [full, setFull] = (0, import_react4.useState)(false);
    const [collapsed, setCollapsed] = (0, import_react4.useState)(() => readIdSet(collapseKey));
    const [foldedGroups, setFoldedGroups] = (0, import_react4.useState)(() => readIdSet(gfoldKey));
    const [connect, setConnect] = (0, import_react4.useState)(null);
    const [popover, setPopover] = (0, import_react4.useState)(null);
    const [panel, setPanel] = (0, import_react4.useState)(false);
    const [histPanel, setHistPanel] = (0, import_react4.useState)(false);
    const [archiveBar, setArchiveBar] = (0, import_react4.useState)(false);
    const [viewerArchive, setViewerArchive] = (0, import_react4.useState)(null);
    const [selectMode, setSelectMode] = (0, import_react4.useState)(false);
    const [picked, setPicked] = (0, import_react4.useState)(/* @__PURE__ */ new Set());
    const [influenceMode, setInfluenceMode] = (0, import_react4.useState)(false);
    const branchSet = (0, import_react4.useMemo)(() => {
      if (branchRoot == null || !byId.has(branchRoot)) return null;
      const set = new Set(descendants(branchRoot));
      set.add(branchRoot);
      return set;
    }, [branchRoot, byId, descendants]);
    const posKey = branchSet != null ? `${posKeyBase}.b${branchRoot}` : posKeyBase;
    const scopedTasks = (0, import_react4.useMemo)(() => branchSet ? tasks.filter((t) => branchSet.has(t.id)) : tasks, [tasks, branchSet]);
    const scopedEdges = (0, import_react4.useMemo)(
      () => branchSet ? edges.filter((e) => branchSet.has(e.sourceId) && branchSet.has(e.targetId)) : edges,
      [edges, branchSet]
    );
    const prevProject = (0, import_react4.useRef)(currentId);
    (0, import_react4.useEffect)(() => {
      if (prevProject.current !== currentId) {
        prevProject.current = currentId;
        focusBranch(null);
        setSelectMode(false);
        setPicked(/* @__PURE__ */ new Set());
        setHistPanel(false);
        setArchiveBar(false);
        setViewerArchive(null);
      }
    }, [currentId, focusBranch]);
    (0, import_react4.useEffect)(() => {
      if (branchRoot != null && status === "ready" && !byId.has(branchRoot)) focusBranch(null);
    }, [branchRoot, status, byId, focusBranch]);
    const validTargets = (0, import_react4.useRef)(/* @__PURE__ */ new Set());
    const liveTarget = (0, import_react4.useRef)(null);
    const foldOwner = (0, import_react4.useRef)(collapseKey);
    (0, import_react4.useEffect)(() => {
      if (foldOwner.current !== collapseKey) {
        foldOwner.current = collapseKey;
        setCollapsed(readIdSet(collapseKey));
        setFoldedGroups(readIdSet(gfoldKey));
      }
    }, [collapseKey, gfoldKey]);
    (0, import_react4.useEffect)(() => {
      if (status !== "ready" || tasks.length === 0) return;
      const alive = new Set(tasks.map((t) => t.id));
      setCollapsed((prev) => {
        const pruned = new Set([...prev].filter((id) => alive.has(id)));
        return pruned.size === prev.size ? prev : pruned;
      });
      const aliveGroups = new Set(groups.map((g) => g.id));
      setFoldedGroups((prev) => {
        const pruned = new Set([...prev].filter((id) => aliveGroups.has(id)));
        return pruned.size === prev.size ? prev : pruned;
      });
    }, [status, tasks, groups]);
    (0, import_react4.useEffect)(() => {
      if (foldOwner.current === collapseKey) writeIdSet(collapseKey, collapsed);
    }, [collapseKey, collapsed]);
    (0, import_react4.useEffect)(() => {
      if (foldOwner.current === collapseKey) writeIdSet(gfoldKey, foldedGroups);
    }, [collapseKey, gfoldKey, foldedGroups]);
    const memberOfFolded = (0, import_react4.useMemo)(() => {
      const m = /* @__PURE__ */ new Map();
      if (!foldedGroups.size) return m;
      for (const t of scopedTasks) if (t.groupId != null && foldedGroups.has(t.groupId)) m.set(t.id, -t.groupId);
      return m;
    }, [scopedTasks, foldedGroups]);
    const branchRep = (0, import_react4.useMemo)(() => {
      const remaining = scopedTasks.filter((t) => !memberOfFolded.has(t.id)).map((t) => t.id);
      return computeCollapse(remaining, scopedEdges, collapsed);
    }, [scopedTasks, memberOfFolded, scopedEdges, collapsed]);
    const rep = (0, import_react4.useMemo)(() => {
      const m = new Map(branchRep);
      for (const [id, r] of memberOfFolded) m.set(id, r);
      return m;
    }, [branchRep, memberOfFolded]);
    const visibleTasks = (0, import_react4.useMemo)(() => scopedTasks.filter((t) => !rep.has(t.id)), [scopedTasks, rep]);
    const groupNodes = (0, import_react4.useMemo)(() => {
      const counts = /* @__PURE__ */ new Map();
      for (const r of memberOfFolded.values()) counts.set(-r, (counts.get(-r) ?? 0) + 1);
      return groups.filter((g) => foldedGroups.has(g.id) && (counts.get(g.id) ?? 0) > 0).map((g) => ({ id: -g.id, gid: g.id, title: g.title, count: counts.get(g.id) }));
    }, [groups, foldedGroups, memberOfFolded]);
    const hiddenCounts = (0, import_react4.useMemo)(() => {
      const m = /* @__PURE__ */ new Map();
      for (const r of branchRep.values()) m.set(r, (m.get(r) ?? 0) + 1);
      return m;
    }, [branchRep]);
    const childCounts = (0, import_react4.useMemo)(() => {
      const ids = new Set(scopedTasks.map((t) => t.id));
      const m = /* @__PURE__ */ new Map();
      for (const e of scopedEdges) {
        if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
        m.set(e.sourceId, (m.get(e.sourceId) ?? 0) + 1);
      }
      return m;
    }, [scopedTasks, scopedEdges]);
    const drawnEdges = (0, import_react4.useMemo)(() => {
      const seen = /* @__PURE__ */ new Set();
      const list = [];
      for (const e of scopedEdges) {
        const from = rep.get(e.sourceId) ?? e.sourceId;
        const to = rep.get(e.targetId) ?? e.targetId;
        if (from === to) continue;
        const agg = from !== e.sourceId || to !== e.targetId;
        const key = agg ? `a${from}>${to}` : `e${e.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({ edge: e, from, to, agg });
      }
      return list;
    }, [scopedEdges, rep]);
    const layoutNodes = (0, import_react4.useMemo)(
      () => [
        ...visibleTasks.map((t) => ({ id: t.id, title: t.title })),
        ...groupNodes.map((g) => ({ id: g.id, title: g.title }))
      ],
      [visibleTasks, groupNodes]
    );
    const layoutLinks = (0, import_react4.useMemo)(
      () => drawnEdges.map(({ from, to }) => ({ sourceId: from, targetId: to })),
      [drawnEdges]
    );
    const sig = (0, import_react4.useMemo)(
      () => posKey + "|" + layoutNodes.map((n) => n.id).sort((a, b) => a - b).join(","),
      [posKey, layoutNodes]
    );
    const [positions, setPositions] = (0, import_react4.useState)(() => /* @__PURE__ */ new Map());
    const posOwner = (0, import_react4.useRef)("");
    const [tf, setTf] = (0, import_react4.useState)({ tx: 0, ty: 0, k: 1 });
    const [panning, setPanning] = (0, import_react4.useState)(false);
    const [hoverId, setHoverId] = (0, import_react4.useState)(null);
    const laidSig = (0, import_react4.useRef)("");
    const needFit = (0, import_react4.useRef)(false);
    const drag = (0, import_react4.useRef)(null);
    const pointers = (0, import_react4.useRef)(/* @__PURE__ */ new Map());
    const pinch = (0, import_react4.useRef)(null);
    (0, import_react4.useEffect)(() => {
      if (sig !== laidSig.current) {
        laidSig.current = sig;
        const layout = computeLayout(layoutNodes, layoutLinks);
        if (posKey !== posKeyBase) {
          for (const [id, p] of readPositions(posKeyBase)) if (layout.has(id)) layout.set(id, p);
        }
        for (const [id, p] of readPositions(posKey)) if (layout.has(id)) layout.set(id, p);
        setPositions(layout);
        posOwner.current = posKey;
        needFit.current = true;
      }
    }, [sig, layoutNodes, layoutLinks, posKey, posKeyBase]);
    (0, import_react4.useEffect)(() => {
      if (!positions.size || posOwner.current !== posKey) return;
      const t = window.setTimeout(() => {
        const merged = readPositions(posKey);
        for (const [id, p] of positions) merged.set(id, p);
        const alive = new Set(tasks.map((t2) => t2.id));
        for (const g of groups) alive.add(-g.id);
        for (const id of [...merged.keys()]) if (!alive.has(id)) merged.delete(id);
        writePositions(posKey, merged);
      }, 400);
      return () => window.clearTimeout(t);
    }, [positions, posKey, tasks, groups]);
    (0, import_react4.useEffect)(() => {
      if (status !== "ready" || posOwner.current !== posKeyBase) return;
      const prefix = `${posKeyBase}.b`;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix) && !byId.has(Number(k.slice(prefix.length)))) {
          localStorage.removeItem(k);
        }
      }
    }, [status, byId, posKeyBase]);
    const fitToView = (0, import_react4.useCallback)(() => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const W = r.width || 800;
      const H = r.height || 520;
      const pts = [...positions.values()];
      if (!pts.length) {
        setTf({ tx: 0, ty: 0, k: 1 });
        return;
      }
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of pts) {
        minX = Math.min(minX, p.x - NODE_W / 2);
        maxX = Math.max(maxX, p.x + NODE_W / 2);
        minY = Math.min(minY, p.y - NODE_H / 2);
        maxY = Math.max(maxY, p.y + NODE_H / 2);
      }
      const pad = 56;
      const k = Math.max(0.25, Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY), 1.5));
      setTf({ k, tx: W / 2 - (minX + maxX) / 2 * k, ty: H / 2 - (minY + maxY) / 2 * k });
    }, [positions]);
    const centerOn = (0, import_react4.useCallback)((wx, wy) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      setTf((t) => ({ ...t, tx: (r.width || 800) / 2 - wx * t.k, ty: (r.height || 520) / 2 - wy * t.k }));
    }, []);
    (0, import_react4.useLayoutEffect)(() => {
      if (needFit.current && positions.size) {
        needFit.current = false;
        fitToView();
      }
    }, [positions, fitToView]);
    const prevFull = (0, import_react4.useRef)(full);
    (0, import_react4.useLayoutEffect)(() => {
      if (prevFull.current !== full) {
        prevFull.current = full;
        fitToView();
      }
    }, [full, fitToView]);
    const zoom = (0, import_react4.useCallback)((px, py, factor) => {
      setTf((t) => {
        const k = Math.max(0.25, Math.min(2.6, t.k * factor));
        const gx = (px - t.tx) / t.k;
        const gy = (py - t.ty) / t.k;
        return { k, tx: px - gx * k, ty: py - gy * k };
      });
    }, []);
    (0, import_react4.useEffect)(() => {
      const svg = svgRef.current;
      if (!svg) return;
      const onWheel = (e) => {
        e.preventDefault();
        const r = svg.getBoundingClientRect();
        zoom(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
      };
      svg.addEventListener("wheel", onWheel, { passive: false });
      return () => svg.removeEventListener("wheel", onWheel);
    }, [zoom]);
    (0, import_react4.useEffect)(() => {
      const onKey = (e) => {
        if (e.key !== "Escape") return;
        if (viewerArchive) {
          setViewerArchive(null);
          e.stopImmediatePropagation();
          return;
        }
        if (archiveBar) {
          setArchiveBar(false);
          e.stopImmediatePropagation();
          return;
        }
        if (histPanel) {
          setHistPanel(false);
          e.stopImmediatePropagation();
          return;
        }
        if (panel) {
          setPanel(false);
          e.stopImmediatePropagation();
          return;
        }
        if (popover) {
          setPopover(null);
          e.stopImmediatePropagation();
          return;
        }
        if (connect) {
          setConnect(null);
          drag.current = null;
          e.stopImmediatePropagation();
          return;
        }
        if (selectedId != null || form || projectForm || confirmRequest) return;
        if (selectMode) {
          exitSelect();
          e.stopImmediatePropagation();
          return;
        }
        if (branchRoot != null) {
          focusBranch(null);
          e.stopImmediatePropagation();
          return;
        }
        if (full) setFull(false);
      };
      window.addEventListener("keydown", onKey, { capture: true });
      return () => window.removeEventListener("keydown", onKey, { capture: true });
    });
    (0, import_react4.useEffect)(() => {
      setPicked((prev) => {
        if (!prev.size) return prev;
        const alive = new Set(visibleTasks.map((t) => t.id));
        const pruned = new Set([...prev].filter((id) => alive.has(id)));
        return pruned.size === prev.size ? prev : pruned;
      });
    }, [visibleTasks]);
    const togglePick = (0, import_react4.useCallback)((id) => {
      setPicked((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }, []);
    const exitSelect = (0, import_react4.useCallback)(() => {
      setSelectMode(false);
      setPicked(/* @__PURE__ */ new Set());
    }, []);
    const computeValidTargets = (0, import_react4.useCallback)((sourceId) => {
      const parents = /* @__PURE__ */ new Map();
      for (const e of edges) {
        const arr = parents.get(e.targetId);
        if (arr) arr.push(e.sourceId);
        else parents.set(e.targetId, [e.sourceId]);
      }
      const blocked = /* @__PURE__ */ new Set([sourceId]);
      const stack = [sourceId];
      while (stack.length) {
        const u = stack.pop();
        for (const p of parents.get(u) ?? []) if (!blocked.has(p)) {
          blocked.add(p);
          stack.push(p);
        }
      }
      for (const e of edges) if (e.sourceId === sourceId) blocked.add(e.targetId);
      const valid = /* @__PURE__ */ new Set();
      for (const t of visibleTasks) {
        if (t.status === "TODO" && !blocked.has(t.id)) valid.add(t.id);
      }
      return valid;
    }, [edges, visibleTasks]);
    const toGraph = (0, import_react4.useCallback)((clientX, clientY) => {
      const r = svgRef.current.getBoundingClientRect();
      return { x: (clientX - r.left - tf.tx) / tf.k, y: (clientY - r.top - tf.ty) / tf.k };
    }, [tf]);
    const openPopoverAt = (0, import_react4.useCallback)((clientX, clientY, make) => {
      const r = canvasRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = Math.min(Math.max(clientX - r.left, 8), r.width - 200);
      const y = Math.min(Math.max(clientY - r.top, 8), r.height - 96);
      setPopover(make(x, y));
    }, []);
    function onPointerDown(e) {
      e.currentTarget.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (popover) setPopover(null);
      if (panel) setPanel(false);
      if (histPanel) setHistPanel(false);
      if (pointers.current.size === 2) {
        const svg = svgRef.current;
        if (!svg) return;
        const r = svg.getBoundingClientRect();
        const [a, b] = [...pointers.current.values()];
        const mx = (a.x + b.x) / 2 - r.left;
        const my = (a.y + b.y) / 2 - r.top;
        pinch.current = {
          startDist: Math.hypot(a.x - b.x, a.y - b.y),
          startK: tf.k,
          gx: (mx - tf.tx) / tf.k,
          gy: (my - tf.ty) / tf.k
        };
        drag.current = null;
        setConnect(null);
        setPanning(false);
        return;
      }
      if (pointers.current.size > 2) return;
      const el = e.target;
      const handle = el.closest("[data-handle]");
      if (handle) {
        const sourceId = Number(handle.getAttribute("data-handle"));
        validTargets.current = computeValidTargets(sourceId);
        liveTarget.current = null;
        const g = toGraph(e.clientX, e.clientY);
        drag.current = { type: "connect", sourceId };
        setConnect({ sourceId, gx: g.x, gy: g.y, targetId: null });
        return;
      }
      const chip = el.closest("[data-collapse]");
      if (chip) {
        drag.current = { type: "chip", id: Number(chip.getAttribute("data-collapse")), sx: e.clientX, sy: e.clientY, moved: false };
        return;
      }
      const branchEl = el.closest("[data-branch]");
      if (branchEl) {
        drag.current = { type: "branch", id: Number(branchEl.getAttribute("data-branch")), sx: e.clientX, sy: e.clientY, moved: false };
        return;
      }
      const node = el.closest("[data-node]");
      if (node) {
        const id = Number(node.getAttribute("data-node"));
        const p = positions.get(id);
        if (!p) return;
        drag.current = { type: "node", id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, moved: false };
        return;
      }
      const edgeEl = el.closest("[data-edge]");
      if (edgeEl) {
        drag.current = { type: "edge", id: Number(edgeEl.getAttribute("data-edge")), sx: e.clientX, sy: e.clientY, moved: false };
        return;
      }
      drag.current = { type: "pan", sx: e.clientX, sy: e.clientY, otx: tf.tx, oty: tf.ty, moved: false };
      setPanning(true);
    }
    function onPointerMove(e) {
      if (pointers.current.has(e.pointerId)) {
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      if (pinch.current && pointers.current.size >= 2) {
        const svg = svgRef.current;
        if (!svg) return;
        const r = svg.getBoundingClientRect();
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const mx = (a.x + b.x) / 2 - r.left;
        const my = (a.y + b.y) / 2 - r.top;
        const { startDist, startK, gx, gy } = pinch.current;
        const k = Math.max(0.25, Math.min(2.6, startK * dist / startDist));
        setTf({ k, tx: mx - gx * k, ty: my - gy * k });
        return;
      }
      const d = drag.current;
      if (!d) return;
      if (d.type === "connect") {
        const under = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-node]");
        const overId = under ? Number(under.getAttribute("data-node")) : null;
        const targetId = overId != null && validTargets.current.has(overId) ? overId : null;
        liveTarget.current = targetId;
        const g = toGraph(e.clientX, e.clientY);
        setConnect({ sourceId: d.sourceId, gx: g.x, gy: g.y, targetId });
        return;
      }
      const dx = e.clientX - d.sx;
      const dy = e.clientY - d.sy;
      const slop = e.pointerType === "mouse" ? 3 : 12;
      if (Math.abs(dx) + Math.abs(dy) > slop) d.moved = true;
      if (d.type === "pan") {
        setTf((t) => ({ ...t, tx: d.otx + dx, ty: d.oty + dy }));
      } else if (d.type === "node") {
        setPositions((prev) => {
          const next = new Map(prev);
          next.set(d.id, { x: d.ox + dx / tf.k, y: d.oy + dy / tf.k });
          return next;
        });
      }
    }
    function onPointerUp(e) {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinch.current = null;
      const d = drag.current;
      if (d) {
        if (d.type === "node" && !d.moved) {
          if (d.id < 0) unfoldGroup(-d.id);
          else if (selectMode) togglePick(d.id);
          else select(d.id);
        } else if (d.type === "chip" && !d.moved) toggleCollapse(d.id);
        else if (d.type === "branch" && !d.moved) focusBranch(branchRoot === d.id ? null : d.id);
        else if (d.type === "edge" && !d.moved) {
          openPopoverAt(e.clientX, e.clientY, (x, y) => ({ kind: "edge", edgeId: d.id, x, y }));
        } else if (d.type === "connect") {
          const targetId = liveTarget.current;
          if (targetId != null) {
            openPopoverAt(e.clientX, e.clientY, (x, y) => ({
              kind: "create",
              sourceId: d.sourceId,
              targetId,
              x,
              y
            }));
          }
          liveTarget.current = null;
          setConnect(null);
        }
      }
      drag.current = null;
      setPanning(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
    }
    function onPointerCancel(e) {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinch.current = null;
      if (drag.current?.type === "connect") setConnect(null);
      drag.current = null;
      setPanning(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
    }
    const toggleCollapse = (0, import_react4.useCallback)((id) => {
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }, []);
    const foldGroup = (0, import_react4.useCallback)((gid) => {
      setFoldedGroups((prev) => new Set(prev).add(gid));
    }, []);
    const unfoldGroup = (0, import_react4.useCallback)((gid) => {
      setFoldedGroups((prev) => {
        const next = new Set(prev);
        next.delete(gid);
        return next;
      });
    }, []);
    async function createLink(sourceId, targetId, type) {
      setPopover(null);
      await bind(targetId, sourceId, type);
    }
    async function removeLink(edge) {
      setPopover(null);
      await unbind(edge.targetId, edge.sourceId);
    }
    async function switchLinkType(edge) {
      setPopover(null);
      const next = edge.type === "OPTIONAL_LINK" ? "STRICT_PREREQUISITE" : "OPTIONAL_LINK";
      await changeBindType(edge.targetId, edge.sourceId, next);
    }
    const visibleIds = (0, import_react4.useMemo)(() => new Set(visibleTasks.map((t) => t.id)), [visibleTasks]);
    const focusId = connect ? null : hoverId ?? (selectedId != null && visibleIds.has(selectedId) ? selectedId : null);
    const neighbors = (0, import_react4.useMemo)(() => {
      const set = /* @__PURE__ */ new Set();
      if (focusId != null) {
        for (const e of scopedEdges) {
          if (e.sourceId === focusId) set.add(e.targetId);
          if (e.targetId === focusId) set.add(e.sourceId);
        }
      }
      return set;
    }, [scopedEdges, focusId]);
    const maxInfluence = (0, import_react4.useMemo)(
      () => visibleTasks.reduce((m, t) => Math.max(m, influenceById.get(t.id) ?? 0), 0),
      [visibleTasks, influenceById]
    );
    const nodeColor = (0, import_react4.useMemo)(() => {
      const statusVar = {
        TODO: "var(--todo)",
        IN_PROGRESS: "var(--progress)",
        COMPLETED: "var(--done)",
        EXPIRED: "var(--expired)"
      };
      const m = /* @__PURE__ */ new Map();
      for (const t of visibleTasks) m.set(t.id, t.isBlocked ? "var(--blocked)" : statusVar[t.status] ?? "var(--todo)");
      for (const g of groupNodes) m.set(g.id, groupColor(g.gid));
      return m;
    }, [visibleTasks, groupNodes]);
    const influenceCone = (0, import_react4.useMemo)(
      () => influenceMode && focusId != null ? strictDescendants(focusId) : null,
      [influenceMode, focusId, strictDescendants]
    );
    const coneWithRoot = (0, import_react4.useMemo)(
      () => influenceCone != null && focusId != null ? /* @__PURE__ */ new Set([focusId, ...influenceCone]) : null,
      [influenceCone, focusId]
    );
    const coneColor = coneWithRoot != null && focusId != null ? byId.get(focusId)?.status === "COMPLETED" ? "var(--inf-done)" : "var(--inf-open)" : null;
    const overlay = status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LoadingState, {}) : status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ConnectionError, {}) : tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EmptyState, {}) : null;
    const connectSource = connect ? positions.get(connect.sourceId) : null;
    const popEdge = popover?.kind === "edge" ? edges.find((e) => e.id === popover.edgeId) : null;
    const popSourceExpired = popover?.kind === "create" && byId.get(popover.sourceId)?.status === "EXPIRED";
    const collapsedCount = branchRep.size;
    const branchAllCompleted = branchSet != null && scopedTasks.length > 0 && scopedTasks.every((t) => t.status === "COMPLETED");
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: `view graph ${full ? "graph--full" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "graph-toolbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "legend", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LegendSwatch, { color: "var(--todo)", label: "To do" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LegendSwatch, { color: "var(--progress)", label: "In progress" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LegendSwatch, { color: "var(--done)", label: "Completed" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LegendSwatch, { color: "var(--blocked)", label: "Blocked" }),
          tasks.some((t) => t.status === "EXPIRED") && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LegendSwatch, { color: "var(--expired)", label: "Expired" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "legend__item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "legend__line" }),
            "Required"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "legend__item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "legend__line legend__line--dash" }),
            "Optional"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gbtns", children: [
          branchSet && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: "btn btn--sm gbranch",
              title: "Branch focus is on \u2014 click to show the whole project (Esc)",
              onClick: () => focusBranch(null),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "target" }),
                truncate(byId.get(branchRoot)?.title ?? "", 18),
                " \xB7 ",
                scopedTasks.length,
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" })
              ]
            }
          ),
          branchSet && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: "btn btn--sm",
              disabled: !branchAllCompleted,
              title: branchAllCompleted ? "Move this completed branch into the archive" : "Only a fully completed branch can be archived",
              onClick: () => {
                exitSelect();
                setPanel(false);
                setHistPanel(false);
                setArchiveBar(true);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "archive" }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "gbtn__label", children: "Archive" })
              ]
            }
          ),
          collapsedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: "btn btn--ghost btn--sm",
              title: "Expand all collapsed branches",
              onClick: () => setCollapsed(/* @__PURE__ */ new Set()),
              children: [
                collapsedCount,
                " hidden",
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "gbtn__label", children: " \u2014 expand" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: `btn btn--ghost btn--sm ${influenceMode ? "is-active" : ""}`,
              title: "Influence overlay \u2014 shade tasks by how much they unlock; hover one to light up its downstream cone",
              "aria-pressed": influenceMode,
              onClick: () => setInfluenceMode((v) => !v),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "influence" }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "gbtn__label", children: "Influence" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: `btn btn--ghost btn--sm ${selectMode ? "is-active" : ""}`,
              title: "Pick several tasks, then group them in one go",
              "aria-pressed": selectMode,
              onClick: () => selectMode ? exitSelect() : setSelectMode(true),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "check" }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "gbtn__label", children: "Select" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: `btn btn--ghost btn--sm ${panel ? "is-active" : ""}`,
              title: "Task groups",
              "aria-expanded": panel,
              onClick: () => {
                setPanel((p) => !p);
                setHistPanel(false);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "folder" }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gbtn__label", children: [
                  "Groups",
                  groups.length > 0 ? ` (${groups.length})` : ""
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "button",
            {
              className: `btn btn--ghost btn--sm ${histPanel ? "is-active" : ""}`,
              title: "Archived branches \u2014 the graph's history",
              "aria-expanded": histPanel,
              onClick: () => {
                setHistPanel((h) => !h);
                setPanel(false);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "archive" }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gbtn__label", children: [
                  "History",
                  archivesTotal > 0 ? ` (${archivesTotal})` : ""
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Fit to view", onClick: fitToView, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "fit" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              className: "iconbtn",
              title: "Re-arrange",
              onClick: () => {
                setPositions(computeLayout(layoutNodes, layoutLinks));
                needFit.current = true;
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "refresh" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              className: "iconbtn",
              title: full ? "Exit fullscreen (Esc)" : "Fullscreen",
              "aria-pressed": full,
              onClick: () => setFull((f) => !f),
              children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: full ? "minimize" : "maximize" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "graph-canvas", ref: canvasRef, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "svg",
          {
            ref: svgRef,
            className: `graph-svg ${panning ? "is-panning" : ""} ${connect ? "is-linking" : ""}`,
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "8.5", refY: "5", markerWidth: "6.5", markerHeight: "6.5", orient: "auto-start-reverse", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M0 0 L10 5 L0 10 z", fill: "context-stroke" }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { transform: `translate(${tf.tx},${tf.ty}) scale(${tf.k})`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "edges", children: [
                  drawnEdges.map(({ edge, from, to, agg }) => {
                    const a = positions.get(from);
                    const b = positions.get(to);
                    if (!a || !b) return null;
                    const d = edgePath(a, b);
                    if (agg) {
                      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { className: "edge edge--agg", d, markerEnd: "url(#arrow)", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: "Links into a folded node" }) }, `a${from}>${to}`);
                    }
                    const inCone = coneWithRoot != null && edge.type === "STRICT_PREREQUISITE" && coneWithRoot.has(edge.sourceId) && coneWithRoot.has(edge.targetId);
                    const active = coneWithRoot != null ? inCone : focusId != null && (edge.sourceId === focusId || edge.targetId === focusId);
                    const dim = coneWithRoot != null ? !inCone : focusId != null && !active || !!connect;
                    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                        "path",
                        {
                          className: `edge edge--${edge.type === "OPTIONAL_LINK" ? "optional" : "strict"} ${active ? "is-active" : ""} ${inCone ? "edge--influence" : ""} ${dim ? "is-dim" : ""}`,
                          style: inCone && coneColor ? { stroke: coneColor } : void 0,
                          d,
                          markerEnd: "url(#arrow)"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { className: "edge-hit", "data-edge": edge.id, d })
                    ] }, edge.id);
                  }),
                  connect && connectSource && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                    "path",
                    {
                      className: `edge edge--ghost ${connect.targetId != null ? "is-valid" : ""}`,
                      d: connect.targetId != null && positions.get(connect.targetId) ? edgePath(connectSource, positions.get(connect.targetId)) : ghostPath(connectSource, connect.gx, connect.gy),
                      markerEnd: "url(#arrow)"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "nodes", children: [
                  visibleTasks.map((t) => {
                    const p = positions.get(t.id);
                    if (!p) return null;
                    const isSource = connect?.sourceId === t.id;
                    const isTarget = connect?.targetId === t.id;
                    const linkable = connect ? validTargets.current.has(t.id) : false;
                    const selected = focusId === t.id || isSource;
                    const inCone = coneWithRoot != null && coneWithRoot.has(t.id);
                    const dim = connect ? !isSource && !linkable : coneWithRoot != null ? !inCone : focusId != null && focusId !== t.id && !neighbors.has(t.id);
                    const influence = influenceById.get(t.id) ?? 0;
                    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                      TaskNode,
                      {
                        task: t,
                        p,
                        selected,
                        dim,
                        highlight: isTarget,
                        isCollapsed: collapsed.has(t.id) && (hiddenCounts.get(t.id) ?? 0) > 0,
                        hiddenCount: hiddenCounts.get(t.id) ?? 0,
                        childCount: childCounts.get(t.id) ?? 0,
                        selectable: selectMode,
                        picked: picked.has(t.id),
                        isBranchRoot: branchRoot === t.id,
                        influenceMode,
                        influence,
                        heat: maxInfluence > 0 ? influence / maxInfluence : 0,
                        coneRoot: influenceCone != null && focusId === t.id,
                        onHover: setHoverId
                      },
                      t.id
                    );
                  }),
                  groupNodes.map((g) => {
                    const p = positions.get(g.id);
                    if (!p) return null;
                    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(GroupSuperNode, { node: g, p, dim: !!connect }, g.id);
                  })
                ] })
              ] })
            ]
          }
        ),
        popover?.kind === "create" && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop", style: { left: popover.x, top: popover.y }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop__title", children: [
            truncate(byId.get(popover.sourceId)?.title ?? "", 18),
            " \u2192 ",
            truncate(byId.get(popover.targetId)?.title ?? "", 18)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop__row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "button",
              {
                className: "btn btn--sm",
                disabled: popSourceExpired,
                title: popSourceExpired ? "An expired task can never complete \u2014 use an optional link" : "Must be done first \u2014 blocks the task",
                onClick: () => void createLink(popover.sourceId, popover.targetId, "STRICT_PREREQUISITE"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "lock" }),
                  "Required"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "button",
              {
                className: "btn btn--ghost btn--sm",
                title: "Related, but does not block",
                onClick: () => void createLink(popover.sourceId, popover.targetId, "OPTIONAL_LINK"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "link" }),
                  "Optional"
                ]
              }
            )
          ] })
        ] }),
        popover?.kind === "edge" && popEdge && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop", style: { left: popover.x, top: popover.y }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop__title", children: [
            popEdge.type === "OPTIONAL_LINK" ? "Optional link" : "Required prerequisite",
            ": ",
            truncate(byId.get(popEdge.sourceId)?.title ?? "", 16),
            " \u2192 ",
            truncate(byId.get(popEdge.targetId)?.title ?? "", 16)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpop__row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "button",
              {
                className: "btn btn--ghost btn--sm",
                title: popEdge.type === "OPTIONAL_LINK" ? "Make it block the dependent task" : "Keep the link but stop blocking",
                onClick: () => void switchLinkType(popEdge),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: popEdge.type === "OPTIONAL_LINK" ? "lock" : "link" }),
                  popEdge.type === "OPTIONAL_LINK" ? "Make required" : "Make optional"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("button", { className: "btn btn--ghost btn--sm btn--danger", onClick: () => void removeLink(popEdge), children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "unlink" }),
              "Remove"
            ] })
          ] })
        ] }),
        panel && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          GroupsPanel,
          {
            projectId: currentId,
            folded: foldedGroups,
            onFold: foldGroup,
            onUnfold: unfoldGroup,
            onCreate: createGroup,
            onRename: renameGroup,
            onDelete: async (g) => {
              const ok = await confirm({
                title: "Delete group",
                message: `Delete \u201C${g.title}\u201D? Its tasks stay \u2014 they just leave the group.`,
                confirmLabel: "Delete"
              });
              if (ok) await removeGroup(g.id);
            },
            onClose: () => setPanel(false)
          }
        ),
        selectMode && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          SelectBar,
          {
            count: picked.size,
            groups,
            busyDisabled: picked.size === 0,
            onAssign: async (gid) => {
              if (await assignToGroup(gid, [...picked])) exitSelect();
            },
            onCreate: async (title) => {
              if (await groupTasks(title, [...picked])) exitSelect();
            },
            onDone: exitSelect
          }
        ),
        histPanel && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          HistoryPanel,
          {
            archives,
            total: archivesTotal,
            onLoadMore: loadMoreArchives,
            onView: (a) => setViewerArchive(a),
            onRestore: async (a) => {
              const ok = await confirm({
                title: "Restore branch",
                message: `Return \u201C${a.title}\u201D to the active graph? Its tasks become part of the project again.`,
                confirmLabel: "Restore"
              });
              if (ok) await restoreArchive(a.id);
            },
            onClose: () => setHistPanel(false)
          }
        ),
        archiveBar && branchSet && branchRoot != null && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          ArchiveBar,
          {
            count: scopedTasks.length,
            onArchive: async (title) => {
              if (await archiveBranch(branchRoot, title)) setArchiveBar(false);
            },
            onCancel: () => setArchiveBar(false)
          }
        ),
        !overlay && positions.size > 1 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Minimap, { positions, colorById: nodeColor, tf, svgRef, onCenter: centerOn }),
        overlay && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "graph-overlay", children: overlay })
      ] }),
      viewerArchive && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        ArchiveViewer,
        {
          archive: viewerArchive,
          fetchGraph: fetchArchiveGraph,
          onClose: () => setViewerArchive(null)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "graph-help muted small", "aria-hidden": "true", children: "Drag from a node\u2019s \u25CB to another task to add a dependency \xB7 tap a line to edit it \xB7 \u2296 folds a branch" })
    ] });
  }
  function SelectBar({ count, groups, busyDisabled, onAssign, onCreate, onDone }) {
    const [creating, setCreating] = (0, import_react4.useState)(groups.length === 0);
    const [title, setTitle] = (0, import_react4.useState)("");
    const [busy, setBusy] = (0, import_react4.useState)(false);
    const disabled = busyDisabled || busy;
    async function create() {
      if (disabled || !title.trim()) return;
      setBusy(true);
      await onCreate(title.trim());
      setBusy(false);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gselbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gselbar__count", children: [
        count,
        " picked"
      ] }),
      !creating ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
        "select",
        {
          className: "input input--sm gselbar__pick",
          value: "",
          disabled,
          title: busyDisabled ? "Tap tasks on the graph first" : "Put the picked tasks into a group",
          onChange: async (e) => {
            const v = e.target.value;
            if (v === "new") {
              setCreating(true);
              return;
            }
            if (v === "") return;
            setBusy(true);
            await onAssign(Number(v));
            setBusy(false);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "", disabled: true, children: "Group\u2026" }),
            groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: g.id, children: g.title }, g.id)),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "new", children: "\uFF0B New group\u2026" })
          ]
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "input",
          {
            className: "input input--sm gselbar__pick",
            autoFocus: true,
            placeholder: "Group name\u2026",
            maxLength: 255,
            value: title,
            onChange: (e) => setTitle(e.target.value),
            onKeyDown: (e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              void create();
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "btn btn--sm", disabled: disabled || !title.trim(), onClick: () => void create(), children: "Create" }),
        groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "button",
          {
            className: "btn btn--ghost btn--sm",
            onClick: () => {
              setCreating(false);
              setTitle("");
            },
            children: "Cancel"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Done", onClick: onDone, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
    ] });
  }
  function TaskNode({ task, p, selected, dim, highlight, isCollapsed, hiddenCount, childCount, selectable, picked, isBranchRoot, influenceMode, influence, heat, coneRoot, onHover }) {
    const badge = isCollapsed ? `+${hiddenCount}` : "\u2212";
    const badgeW = isCollapsed ? Math.max(26, 12 + 7 * badge.length) : 18;
    const infW = 24 + 7 * String(influence).length;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      "g",
      {
        className: [
          "gnode",
          `gnode--${task.status.toLowerCase()}`,
          task.isBlocked ? "gnode--blocked" : "",
          selected ? "is-selected" : "",
          dim ? "is-dim" : "",
          highlight ? "is-target" : "",
          isCollapsed ? "gnode--super" : "",
          picked ? "is-picked" : "",
          coneRoot ? "gnode--cone-root" : "",
          // Influence accent colour: green depth for finished work, rust for open.
          influenceMode && influence > 0 ? task.status === "COMPLETED" ? "gnode--inf-done" : "gnode--inf-open" : "",
          influenceMode && influence > 0 && heat >= 0.65 ? "gnode--hot" : ""
        ].join(" "),
        "data-node": task.id,
        transform: `translate(${p.x},${p.y})`,
        onPointerEnter: (e) => {
          if (e.pointerType === "mouse") onHover(task.id);
        },
        onPointerLeave: (e) => {
          if (e.pointerType === "mouse") onHover(null);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: `${task.title} \u2014 ${STATUS_LABEL[task.status]}${influenceMode ? ` \xB7 unlocks ${influence} task${influence === 1 ? "" : "s"}` : ""}${isCollapsed ? ` (+${hiddenCount} hidden)` : ""}` }),
          isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__stack", x: -NODE_W / 2 + 5, y: -NODE_H / 2 + 5, width: NODE_W, height: NODE_H, rx: 12 }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__box", x: -NODE_W / 2, y: -NODE_H / 2, width: NODE_W, height: NODE_H, rx: 12 }),
          influenceMode && influence > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "rect",
              {
                className: "gnode__heat",
                x: -NODE_W / 2,
                y: -NODE_H / 2,
                width: NODE_W,
                height: NODE_H,
                rx: 12,
                style: { opacity: 0.05 + 0.14 * heat }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__heat-track", x: -NODE_W / 2 + 14, y: NODE_H / 2 - 8, width: NODE_W - 28, height: 3, rx: 1.5 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "rect",
              {
                className: "gnode__heat-fill",
                x: -NODE_W / 2 + 14,
                y: NODE_H / 2 - 8,
                width: Math.max(6, (NODE_W - 28) * heat),
                height: 3,
                rx: 1.5
              }
            )
          ] }),
          task.groupId != null && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__gstrip", x: -NODE_W / 2, y: -NODE_H / 2 + 10, width: 4, height: NODE_H - 20, rx: 2, fill: groupColor(task.groupId) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__dot", cx: -NODE_W / 2 + 20, cy: -10, r: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("text", { className: "gnode__title", x: -NODE_W / 2 + 32, y: -6, children: truncate(task.title, 20) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("text", { className: "gnode__sub", x: -NODE_W / 2 + 32, y: 16, children: [
            task.durationHours,
            "h \xB7",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("tspan", { className: `gnode__imp--${task.importance}`, children: IMPORTANCE_LABEL[task.importance] }),
            task.isBlocked && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("tspan", { children: " \xB7 Blocked" })
          ] }),
          influenceMode && influence > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "gnode__inf", transform: `translate(${NODE_W / 2 - infW / 2 - 8}, ${NODE_H / 2 - 14})`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__inf-bg", x: -infW / 2, y: -8.5, width: infW, height: 17, rx: 8.5 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "path",
              {
                className: "gnode__inf-bolt",
                transform: `translate(${-infW / 2 + 9}, 0)`,
                d: "M0.9 -4.6 L-2.7 0.5 H-0.7 L-1 4.6 L2.8 -0.7 H0.7 Z"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("text", { className: "gnode__inf-label", x: 3.5, y: 0.5, children: influence })
          ] }),
          selectable && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "gnode__pickmark", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__pick-ring", cx: NODE_W / 2 - 14, cy: -NODE_H / 2 + 14, r: 9 }),
            picked && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "path",
              {
                className: "gnode__pick-check",
                d: `M ${NODE_W / 2 - 18} ${-NODE_H / 2 + 14} l 3 3.5 l 5.5 -7`
              }
            )
          ] }),
          !selectable && (childCount > 0 || isBranchRoot) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: `gnode__branch ${isBranchRoot ? "is-root" : ""}`, "data-branch": task.id, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__branch-hit", cx: NODE_W / 2 - 20, cy: -NODE_H / 2, r: 14 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__branch-bg", cx: NODE_W / 2 - 20, cy: -NODE_H / 2, r: 9 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__branch-ring", cx: NODE_W / 2 - 20, cy: -NODE_H / 2, r: 4.5 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__branch-core", cx: NODE_W / 2 - 20, cy: -NODE_H / 2, r: 1.6 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: isBranchRoot ? "Exit branch focus" : "Focus this branch" })
          ] }),
          !selectable && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "gnode__handle", "data-handle": task.id, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__handle-hit", cx: NODE_W / 2, cy: 0, r: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__handle-dot", cx: NODE_W / 2, cy: 0, r: 6 })
          ] }),
          (childCount > 0 || isCollapsed) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("g", { className: "gnode__fold", "data-collapse": task.id, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "rect",
              {
                className: "gnode__fold-hit",
                x: -badgeW / 2 - 8,
                y: NODE_H / 2 - 14,
                width: badgeW + 16,
                height: 30
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "rect",
              {
                className: "gnode__fold-bg",
                x: -badgeW / 2,
                y: NODE_H / 2 - 9,
                width: badgeW,
                height: 18,
                rx: 9
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("text", { className: "gnode__fold-label", x: 0, y: NODE_H / 2 + 4, children: badge }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: isCollapsed ? `Expand branch (+${hiddenCount} tasks)` : "Collapse this branch" })
          ] })
        ]
      }
    );
  }
  function GroupSuperNode({ node, p, dim }) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      "g",
      {
        className: `gnode gnode--group ${dim ? "is-dim" : ""}`,
        "data-node": node.id,
        transform: `translate(${p.x},${p.y})`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: `${node.title} \u2014 ${node.count} tasks (tap to expand)` }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__stack", x: -NODE_W / 2 + 5, y: -NODE_H / 2 + 5, width: NODE_W, height: NODE_H, rx: 12 }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__box", x: -NODE_W / 2, y: -NODE_H / 2, width: NODE_W, height: NODE_H, rx: 12, style: { stroke: groupColor(node.gid) } }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__gstrip", x: -NODE_W / 2, y: -NODE_H / 2 + 10, width: 4, height: NODE_H - 20, rx: 2, fill: groupColor(node.gid) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("text", { className: "gnode__title", x: -NODE_W / 2 + 18, y: -6, children: truncate(node.title, 22) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("text", { className: "gnode__sub", x: -NODE_W / 2 + 18, y: 16, children: [
            node.count,
            " task",
            node.count === 1 ? "" : "s",
            " \xB7 tap to expand"
          ] })
        ]
      }
    );
  }
  var GROUP_PAGE_SIZE = 20;
  function GroupsPanel({ projectId, folded, onFold, onUnfold, onCreate, onRename, onDelete, onClose }) {
    const [newTitle, setNewTitle] = (0, import_react4.useState)("");
    const [renamingId, setRenamingId] = (0, import_react4.useState)(null);
    const [draft, setDraft] = (0, import_react4.useState)("");
    const [busy, setBusy] = (0, import_react4.useState)(false);
    const [q, setQ] = (0, import_react4.useState)("");
    const [items, setItems] = (0, import_react4.useState)([]);
    const [total, setTotal] = (0, import_react4.useState)(0);
    const [loadingMore, setLoadingMore] = (0, import_react4.useState)(false);
    const [refresh, setRefresh] = (0, import_react4.useState)(0);
    (0, import_react4.useEffect)(() => {
      if (projectId == null) return;
      let cancelled = false;
      const timer = window.setTimeout(() => {
        api.getGroups(projectId, 0, GROUP_PAGE_SIZE, q.trim() || void 0).then((res) => {
          if (cancelled) return;
          setItems(res.items);
          setTotal(res.total);
        }).catch(() => {
          if (cancelled) return;
          setItems([]);
          setTotal(0);
        });
      }, q.trim() ? 250 : 0);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }, [projectId, q, refresh]);
    const refetch = () => setRefresh((n) => n + 1);
    async function loadMore() {
      if (projectId == null || loadingMore) return;
      setLoadingMore(true);
      try {
        const nextPage = Math.floor(items.length / GROUP_PAGE_SIZE);
        const res = await api.getGroups(projectId, nextPage, GROUP_PAGE_SIZE, q.trim() || void 0);
        setItems((prev) => {
          const seen = new Set(prev.map((g) => g.id));
          return [...prev, ...res.items.filter((g) => !seen.has(g.id))];
        });
        setTotal(res.total);
      } catch {
      }
      setLoadingMore(false);
    }
    async function submitNew(e) {
      e.preventDefault();
      const t = newTitle.trim();
      if (!t || busy) return;
      setBusy(true);
      if (await onCreate(t)) setNewTitle("");
      setBusy(false);
      refetch();
    }
    async function submitRename(gid) {
      const t = draft.trim();
      setRenamingId(null);
      if (t && !busy) {
        setBusy(true);
        await onRename(gid, t);
        setBusy(false);
        refetch();
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gpanel__title", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "folder" }),
          " Groups",
          total > 0 ? ` (${total})` : ""
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn iconbtn--sm", title: "Close", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "input",
        {
          className: "input input--sm gpanel__search",
          placeholder: "Search groups\u2026",
          value: q,
          onChange: (e) => setQ(e.target.value)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__list", children: [
        items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "muted small gpanel__empty", children: q.trim() ? "No groups match the search." : "No groups yet. Create one and pick it in a task\u2019s panel \u2014 then fold the whole group into a single node here." }),
        items.map((g) => {
          const count = g.activeTaskCount ?? 0;
          const isFolded = folded.has(g.id);
          return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "gpanel__dot", style: { background: groupColor(g.id) } }),
            renamingId === g.id ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "input",
              {
                className: "input input--sm gpanel__rename",
                autoFocus: true,
                value: draft,
                onChange: (e) => setDraft(e.target.value),
                onBlur: () => void submitRename(g.id),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void submitRename(g.id);
                  }
                  if (e.key === "Escape") {
                    e.stopPropagation();
                    setRenamingId(null);
                  }
                }
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gpanel__name", title: g.title, children: [
              g.title,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "muted", children: [
                "\xB7 ",
                count
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "button",
              {
                className: `btn btn--ghost btn--sm ${isFolded ? "is-active" : ""}`,
                disabled: count === 0,
                title: count === 0 ? "No active tasks in this group" : isFolded ? "Expand back into tasks" : "Fold into one node",
                onClick: () => isFolded ? onUnfold(g.id) : onFold(g.id),
                children: isFolded ? "Unfold" : "Fold"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "button",
              {
                className: "iconbtn iconbtn--sm",
                title: "Rename",
                onClick: () => {
                  setRenamingId(g.id);
                  setDraft(g.title);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "edit" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "button",
              {
                className: "iconbtn iconbtn--sm iconbtn--danger",
                title: "Delete group",
                onClick: () => void Promise.resolve(onDelete(g)).then(refetch),
                children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "trash" })
              }
            )
          ] }, g.id);
        }),
        items.length < total && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "btn btn--ghost btn--sm gpanel__more", disabled: loadingMore, onClick: () => void loadMore(), children: loadingMore ? "Loading\u2026" : `Load more (${items.length} of ${total})` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("form", { className: "gpanel__new", onSubmit: submitNew, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "input",
          {
            className: "input input--sm",
            placeholder: "New group\u2026",
            maxLength: 255,
            value: newTitle,
            onChange: (e) => setNewTitle(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("button", { className: "btn btn--sm", type: "submit", disabled: !newTitle.trim() || busy, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "plus" }),
          "Add"
        ] })
      ] })
    ] });
  }
  function LegendSwatch({ color, label }) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "legend__item", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "legend__swatch", style: { background: color } }),
      label
    ] });
  }
  var MINIMAP_W = 176;
  var MINIMAP_H = 118;
  var MINIMAP_PAD = 10;
  function Minimap({ positions, colorById, tf, svgRef, onCenter }) {
    const dragging = (0, import_react4.useRef)(false);
    const bounds = (0, import_react4.useMemo)(() => {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of positions.values()) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }
      if (!Number.isFinite(minX)) return null;
      const worldW = Math.max(maxX - minX, NODE_W);
      const worldH = Math.max(maxY - minY, NODE_H);
      const s2 = Math.min((MINIMAP_W - MINIMAP_PAD * 2) / worldW, (MINIMAP_H - MINIMAP_PAD * 2) / worldH);
      const ox2 = (MINIMAP_W - worldW * s2) / 2 - minX * s2;
      const oy2 = (MINIMAP_H - worldH * s2) / 2 - minY * s2;
      return { s: s2, ox: ox2, oy: oy2 };
    }, [positions]);
    if (!bounds) return null;
    const { s, ox, oy } = bounds;
    const toMini = (x, y) => ({ x: ox + x * s, y: oy + y * s });
    const r = svgRef.current?.getBoundingClientRect();
    const W = r?.width || 800;
    const H = r?.height || 520;
    const view = {
      x: ox + -tf.tx / tf.k * s,
      y: oy + -tf.ty / tf.k * s,
      w: W / tf.k * s,
      h: H / tf.k * s
    };
    const navigate = (e) => {
      const box = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - box.left;
      const my = e.clientY - box.top;
      onCenter((mx - ox) / s, (my - oy) / s);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      "svg",
      {
        className: "minimap",
        width: MINIMAP_W,
        height: MINIMAP_H,
        onPointerDown: (e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          navigate(e);
        },
        onPointerMove: (e) => {
          if (dragging.current) navigate(e);
        },
        onPointerUp: (e) => {
          dragging.current = false;
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {
          }
        },
        onPointerCancel: () => {
          dragging.current = false;
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "minimap__bg", x: 0, y: 0, width: MINIMAP_W, height: MINIMAP_H, rx: 8 }),
          [...positions].map(([id, p]) => {
            const m = toMini(p.x, p.y);
            return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { cx: m.x, cy: m.y, r: id < 0 ? 3.4 : 2.6, fill: colorById.get(id) ?? "var(--todo)" }, id);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "rect",
            {
              className: "minimap__view",
              x: view.x,
              y: view.y,
              width: view.w,
              height: view.h,
              style: { clipPath: `inset(0 round 3px)` }
            }
          )
        ]
      }
    );
  }
  var formatArchiveDate = (iso) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" });
  };
  function HistoryPanel({ archives, total, onLoadMore, onView, onRestore, onClose }) {
    const [loadingMore, setLoadingMore] = (0, import_react4.useState)(false);
    async function loadMore() {
      if (loadingMore) return;
      setLoadingMore(true);
      await onLoadMore();
      setLoadingMore(false);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gpanel__title", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "archive" }),
          " History"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn iconbtn--sm", title: "Close", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__list", children: [
        archives.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "muted small gpanel__empty", children: "No archived branches yet. Focus a fully completed branch and hit \u201CArchive\u201D \u2014 it moves off the board but stays here." }),
        archives.map((a) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gpanel__row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gpanel__name", title: a.title, children: [
            a.title,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "muted", children: [
              "\xB7 ",
              formatArchiveDate(a.archivedAt),
              " \xB7 ",
              a.taskCount,
              " task",
              a.taskCount === 1 ? "" : "s"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "btn btn--ghost btn--sm", title: "Open a read-only view of this branch", onClick: () => onView(a), children: "View" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "btn btn--ghost btn--sm", title: "Return the branch to the active graph", onClick: () => onRestore(a), children: "Restore" })
        ] }, a.id)),
        archives.length < total && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "btn btn--ghost btn--sm gpanel__more", disabled: loadingMore, onClick: () => void loadMore(), children: loadingMore ? "Loading\u2026" : `Load more (${archives.length} of ${total})` })
      ] })
    ] });
  }
  function ArchiveBar({ count, onArchive, onCancel }) {
    const [title, setTitle] = (0, import_react4.useState)("");
    const [busy, setBusy] = (0, import_react4.useState)(false);
    async function submit() {
      if (busy) return;
      setBusy(true);
      await onArchive(title.trim() || null);
      setBusy(false);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "gselbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gselbar__count", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "archive" }),
        " ",
        count,
        " task",
        count === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "gselbar__pair", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "input",
          {
            className: "input input--sm",
            placeholder: "Archive name (optional)\u2026",
            maxLength: 255,
            autoFocus: true,
            value: title,
            onChange: (e) => setTitle(e.target.value),
            onKeyDown: (e) => {
              if (e.key !== "Enter" || busy) return;
              e.preventDefault();
              void submit();
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("button", { className: "btn btn--sm", disabled: busy, onClick: () => void submit(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "archive" }),
          "Archive"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Cancel", onClick: onCancel, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
    ] });
  }
  function ArchiveViewer({ archive, fetchGraph, onClose }) {
    const [state, setState] = (0, import_react4.useState)({ kind: "loading" });
    (0, import_react4.useEffect)(() => {
      let alive = true;
      setState({ kind: "loading" });
      fetchGraph(archive.id).then((graph) => {
        if (alive) setState({ kind: "ok", graph });
      }).catch((err) => {
        if (alive) setState({ kind: "error", message: err.message });
      });
      return () => {
        alive = false;
      };
    }, [archive.id, fetchGraph]);
    const [picked, setPicked] = (0, import_react4.useState)(null);
    const [vb, setVb] = (0, import_react4.useState)(null);
    const svgRef = (0, import_react4.useRef)(null);
    const pointers = (0, import_react4.useRef)(/* @__PURE__ */ new Map());
    const pinch = (0, import_react4.useRef)(null);
    const drag = (0, import_react4.useRef)(null);
    (0, import_react4.useEffect)(() => {
      setVb(null);
      setPicked(null);
    }, [archive.id]);
    const layout = (0, import_react4.useMemo)(
      () => state.kind === "ok" ? computeLayout(state.graph.nodes.map((n) => ({ id: n.id, title: n.title })), state.graph.edges) : null,
      [state]
    );
    const base = (0, import_react4.useMemo)(() => {
      if (!layout || layout.size === 0) return null;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of layout.values()) {
        minX = Math.min(minX, p.x - NODE_W / 2);
        maxX = Math.max(maxX, p.x + NODE_W / 2);
        minY = Math.min(minY, p.y - NODE_H / 2);
        maxY = Math.max(maxY, p.y + NODE_H / 2);
      }
      const pad = 32;
      return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
    }, [layout]);
    const box = vb ?? base;
    const applyZoom = (0, import_react4.useCallback)((b, factor) => {
      if (!base) return b;
      const w = Math.min(Math.max(b.w / factor, base.w / 8), base.w * 3);
      const h = b.h * (w / b.w);
      return { x: b.x + (b.w - w) / 2, y: b.y + (b.h - h) / 2, w, h };
    }, [base]);
    const zoomBy = (0, import_react4.useCallback)((factor) => {
      setVb((prev) => {
        const b = prev ?? base;
        return b ? applyZoom(b, factor) : prev;
      });
    }, [base, applyZoom]);
    (0, import_react4.useEffect)(() => {
      const svg = svgRef.current;
      if (!svg) return;
      const onWheel = (e) => {
        e.preventDefault();
        zoomBy(e.deltaY < 0 ? 1.2 : 1 / 1.2);
      };
      svg.addEventListener("wheel", onWheel, { passive: false });
      return () => svg.removeEventListener("wheel", onWheel);
    }, [zoomBy, state.kind]);
    function unitsPerPx(b) {
      const r = svgRef.current?.getBoundingClientRect();
      if (!r || !r.width || !r.height) return 1;
      return Math.max(b.w / r.width, b.h / r.height);
    }
    function onPointerDown(e) {
      if (!box) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        pinch.current = { startDist: Math.hypot(a.x - b.x, a.y - b.y) || 1, startBox: box };
        drag.current = null;
        return;
      }
      drag.current = { sx: e.clientX, sy: e.clientY, start: box, moved: false };
    }
    function onPointerMove(e) {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch.current && pointers.current.size >= 2) {
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 0) setVb(applyZoom(pinch.current.startBox, dist / pinch.current.startDist));
        return;
      }
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.sx;
      const dy = e.clientY - d.sy;
      const slop = e.pointerType === "mouse" ? 3 : 12;
      if (Math.abs(dx) + Math.abs(dy) > slop) d.moved = true;
      if (!d.moved) return;
      const upp = unitsPerPx(d.start);
      setVb({ ...d.start, x: d.start.x - dx * upp, y: d.start.y - dy * upp });
    }
    function onPointerUp(e) {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinch.current = null;
      const d = drag.current;
      if (d && !d.moved && state.kind === "ok") {
        const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-anode]");
        const id = el ? Number(el.getAttribute("data-anode")) : null;
        setPicked(id != null ? state.graph.nodes.find((n) => n.id === id) ?? null : null);
      }
      drag.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
    }
    function onPointerCancel(e) {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinch.current = null;
      drag.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "modal-root", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "modal-backdrop", onClick: onClose }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "modal modal--graph", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "modal__head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { className: "modal__title", children: archive.title }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Close", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "modal__body", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "muted small archview__meta", children: [
            "Archived ",
            formatArchiveDate(archive.archivedAt),
            state.kind === "ok" && ` \xB7 ${state.graph.nodes.length} task${state.graph.nodes.length === 1 ? "" : "s"}`
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "archview__canvas", children: [
            state.kind === "loading" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "archview__center muted", children: "Loading\u2026" }),
            state.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "archview__center danger", children: state.message }),
            state.kind === "ok" && layout && box && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "svg",
              {
                ref: svgRef,
                className: "archview__svg",
                viewBox: `${box.x} ${box.y} ${box.w} ${box.h}`,
                preserveAspectRatio: "xMidYMid meet",
                onPointerDown,
                onPointerMove,
                onPointerUp,
                onPointerCancel,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("marker", { id: "arrow-arch", viewBox: "0 0 10 10", refX: "8.5", refY: "5", markerWidth: "6.5", markerHeight: "6.5", orient: "auto-start-reverse", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M0 0 L10 5 L0 10 z", fill: "context-stroke" }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("g", { className: "edges", children: state.graph.edges.map((e) => {
                    const a = layout.get(e.sourceId);
                    const b = layout.get(e.targetId);
                    if (!a || !b) return null;
                    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                      "path",
                      {
                        className: `edge edge--${e.type === "OPTIONAL_LINK" ? "optional" : "strict"}`,
                        d: edgePath(a, b),
                        markerEnd: "url(#arrow-arch)"
                      },
                      e.id
                    );
                  }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("g", { className: "nodes", children: state.graph.nodes.map((n) => {
                    const p = layout.get(n.id);
                    if (!p) return null;
                    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
                      "g",
                      {
                        "data-anode": n.id,
                        className: `gnode gnode--${n.status.toLowerCase()} ${picked?.id === n.id ? "is-selected" : ""}`,
                        transform: `translate(${p.x},${p.y})`,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { className: "gnode__box", x: -NODE_W / 2, y: -NODE_H / 2, width: NODE_W, height: NODE_H, rx: 12 }),
                          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { className: "gnode__dot", cx: -NODE_W / 2 + 20, cy: -10, r: 4 }),
                          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("text", { className: "gnode__title", x: -NODE_W / 2 + 32, y: -6, children: truncate(n.title, 20) }),
                          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("text", { className: "gnode__sub", x: -NODE_W / 2 + 32, y: 16, children: [
                            n.durationHours,
                            "h \xB7 ",
                            STATUS_LABEL[n.status]
                          ] })
                        ]
                      },
                      n.id
                    );
                  }) })
                ]
              }
            ),
            state.kind === "ok" && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "archview__tools", children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Zoom in", onClick: () => zoomBy(1.25), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "zoomin" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Zoom out", onClick: () => zoomBy(1 / 1.25), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "zoomout" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Fit to view", onClick: () => setVb(null), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "fit" }) })
            ] }),
            picked && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "archview__info", children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(StatusDot, { status: picked.status }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "archview__info-text", children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "archview__info-title", children: picked.title }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "muted small", children: [
                  picked.durationHours,
                  "h \xB7 ",
                  STATUS_LABEL[picked.status]
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "iconbtn", title: "Close", onClick: () => setPicked(null), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "x" }) })
            ] })
          ] })
        ] })
      ] })
    ] });
  }

  // src/components/AuthScreen.tsx
  init_define_import_meta_env();
  var import_react5 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime12 = __toESM(require_react_shim(), 1);
  function AuthScreen() {
    const { login, register, sessionExpired } = useAuth();
    const { theme, toggle } = useTheme();
    const [mode, setMode] = (0, import_react5.useState)("login");
    const [username, setUsername] = (0, import_react5.useState)("");
    const [name, setName] = (0, import_react5.useState)("");
    const [surname, setSurname] = (0, import_react5.useState)("");
    const [password, setPassword] = (0, import_react5.useState)("");
    const [error, setError] = (0, import_react5.useState)(null);
    const [busy, setBusy] = (0, import_react5.useState)(false);
    const isLogin = mode === "login";
    const switchMode = (m) => {
      setMode(m);
      setError(null);
    };
    function validate() {
      if (username.trim().length < AUTH_LIMITS.usernameMin)
        return `Username must be at least ${AUTH_LIMITS.usernameMin} characters.`;
      if (!isLogin && name.trim().length < AUTH_LIMITS.nameMin)
        return `Name must be at least ${AUTH_LIMITS.nameMin} characters.`;
      if (password.length < AUTH_LIMITS.passwordMin)
        return `Password must be at least ${AUTH_LIMITS.passwordMin} characters.`;
      return null;
    }
    async function onSubmit(e) {
      e.preventDefault();
      const problem = validate();
      if (problem) {
        setError(problem);
        return;
      }
      setBusy(true);
      setError(null);
      try {
        if (isLogin) {
          await login(username.trim(), password);
        } else {
          await register({
            username: username.trim(),
            name: name.trim(),
            surname: surname.trim() || null,
            password
          });
        }
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
        setBusy(false);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "auth", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { className: "iconbtn auth__theme", title: "Toggle theme", onClick: toggle, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: theme === "dark" ? "sun" : "moon" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "auth__card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { className: "auth__title", children: "Task Manager" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "auth__sub", children: "Plan tasks and their dependencies" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "tabs auth__switch", role: "tablist", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": isLogin,
              className: `tabs__btn ${isLogin ? "is-active" : ""}`,
              onClick: () => switchMode("login"),
              children: "Sign in"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": !isLogin,
              className: `tabs__btn ${!isLogin ? "is-active" : ""}`,
              onClick: () => switchMode("register"),
              children: "Create account"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("form", { className: "form", onSubmit, noValidate: true, children: [
          sessionExpired && !error && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "hint", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "info" }),
            "Your session expired. Please sign in again."
          ] }),
          error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "form__err", children: error }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { className: "field__label", htmlFor: "auth-username", children: [
              "Username ",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "field__req", children: "required" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "input",
              {
                id: "auth-username",
                className: "input",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                autoComplete: "username",
                autoFocus: true,
                placeholder: "your_username"
              }
            )
          ] }),
          !isLogin && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { className: "field__label", htmlFor: "auth-name", children: [
                "Name ",
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "field__req", children: "required" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "input",
                {
                  id: "auth-name",
                  className: "input",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  autoComplete: "given-name",
                  placeholder: "Ada"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { className: "field__label", htmlFor: "auth-surname", children: [
                "Surname ",
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "field__opt", children: "optional" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "input",
                {
                  id: "auth-surname",
                  className: "input",
                  value: surname,
                  onChange: (e) => setSurname(e.target.value),
                  autoComplete: "family-name",
                  placeholder: "Lovelace"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { className: "field__label", htmlFor: "auth-password", children: [
              "Password ",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "field__req", children: "required" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "input",
              {
                id: "auth-password",
                className: "input",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                autoComplete: isLogin ? "current-password" : "new-password",
                placeholder: `At least ${AUTH_LIMITS.passwordMin} characters`
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "submit", className: "btn btn--primary btn--block", disabled: busy, children: busy ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "spinner spinner--sm" }),
            isLogin ? "Signing in\u2026" : "Creating account\u2026"
          ] }) : isLogin ? "Sign in" : "Create account" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "auth__foot", children: [
          isLogin ? "Don't have an account? " : "Already have an account? ",
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "linkbtn", onClick: () => switchMode(isLogin ? "register" : "login"), children: isLogin ? "Create one" : "Sign in" })
        ] })
      ] })
    ] });
  }

  // src/components/Modals.tsx
  init_define_import_meta_env();
  var import_react6 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime13 = __toESM(require_react_shim(), 1);
  function ModalHost() {
    const { form, projectForm, confirmRequest } = useUI();
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
      form && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TaskFormModal, { task: form.task }),
      projectForm && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ProjectFormModal, { project: projectForm.project }),
      confirmRequest && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ConfirmDialog, {})
    ] });
  }
  function Modal({ title, onClose, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "modal-root", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "modal-backdrop", onClick: onClose }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "modal", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "modal__head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "modal__title", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { className: "iconbtn", title: "Close", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Icon, { name: "x" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "modal__body", children })
      ] })
    ] });
  }
  function TaskFormModal({ task }) {
    const editing = !!task;
    const { create, update, groups } = useTasks();
    const { closeForm } = useUI();
    const { push } = useToast();
    const [title, setTitle] = (0, import_react6.useState)(task?.title ?? "");
    const [description, setDescription] = (0, import_react6.useState)(task?.description ?? "");
    const [duration, setDuration] = (0, import_react6.useState)(task ? String(task.durationHours) : "");
    const [complexity, setComplexity] = (0, import_react6.useState)(task?.complexity ?? "MEDIUM");
    const [importance, setImportance] = (0, import_react6.useState)(task?.importance ?? 0);
    const [groupId, setGroupId] = (0, import_react6.useState)(task?.groupId ?? null);
    const [err, setErr] = (0, import_react6.useState)(null);
    const [saving, setSaving] = (0, import_react6.useState)(false);
    async function submit(e) {
      e.preventDefault();
      const t = title.trim();
      const d = duration === "" ? NaN : Number(duration);
      const errors = [];
      if (!t) errors.push("Title is required.");
      if (t.length > 255) errors.push("Title must be 255 characters or fewer.");
      if (description.length > 1e4) errors.push("Description is too long.");
      if (!Number.isFinite(d) || !Number.isInteger(d) || d < 1 || d > 100) errors.push("Duration must be a whole number between 1 and 100 hours.");
      if (errors.length) {
        setErr(errors.join(" "));
        return;
      }
      const body = { title: t, description: description.trim() || null, durationHours: d, complexity, importance, groupId };
      setSaving(true);
      setErr(null);
      try {
        if (editing && task) await update(task.id, body);
        else await create(body);
        push(editing ? "Task updated" : "Task created", "success");
        closeForm();
      } catch (e2) {
        setErr(e2.message);
        setSaving(false);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Modal, { title: editing ? "Edit task" : "New task", onClose: closeForm, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("form", { className: "form", onSubmit: submit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Title",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__req", children: "required" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "input",
          {
            className: "input",
            autoFocus: true,
            maxLength: 255,
            placeholder: "e.g. Design the database schema",
            value: title,
            onChange: (e) => setTitle(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__label", children: "Description" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "textarea",
          {
            className: "input textarea",
            maxLength: 1e4,
            rows: 4,
            placeholder: "Notes, acceptance criteria, links\u2026",
            value: description,
            onChange: (e) => setDescription(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Estimated effort (hours)",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__req", children: "required" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "input",
          {
            className: "input",
            type: "number",
            min: 1,
            max: 100,
            step: 1,
            placeholder: "1\u2013100",
            value: duration,
            onChange: (e) => setDuration(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Complexity",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__req", children: "required" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "seg", children: COMPLEXITY_ORDER.map((c) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "button",
          {
            type: "button",
            className: `seg__btn ${complexity === c ? "is-active" : ""}`,
            onClick: () => setComplexity(c),
            children: COMPLEXITY_LABEL[c]
          },
          c
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Importance",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__opt", children: "helps pick what to do first" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "prio", role: "radiogroup", "aria-label": "Importance", children: IMPORTANCE_LABEL.map((label, v) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "button",
          {
            type: "button",
            className: `prio__btn prio__btn--${v} ${importance === v ? "is-active" : ""}`,
            onClick: () => setImportance(v),
            children: label
          },
          label
        )) })
      ] }),
      groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Group",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__opt", children: "folds together on the graph" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
          "select",
          {
            className: "input",
            value: groupId ?? "",
            onChange: (e) => setGroupId(e.target.value === "" ? null : Number(e.target.value)),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("option", { value: "", children: "No group" }),
              groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("option", { value: g.id, children: g.title }, g.id))
            ]
          }
        )
      ] }),
      err && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "form__err", children: err }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "form__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", className: "btn btn--ghost", onClick: closeForm, children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "submit", className: "btn btn--primary", disabled: saving, children: editing ? "Save changes" : "Create task" })
      ] })
    ] }) });
  }
  function ProjectFormModal({ project }) {
    const editing = !!project;
    const { create, update } = useProjects();
    const { closeProjectForm } = useUI();
    const { push } = useToast();
    const [title, setTitle] = (0, import_react6.useState)(project?.title ?? "");
    const [description, setDescription] = (0, import_react6.useState)(project?.description ?? "");
    const [err, setErr] = (0, import_react6.useState)(null);
    const [saving, setSaving] = (0, import_react6.useState)(false);
    async function submit(e) {
      e.preventDefault();
      const t = title.trim();
      if (!t) {
        setErr("Title is required.");
        return;
      }
      if (t.length > 255) {
        setErr("Title must be 255 characters or fewer.");
        return;
      }
      if (description.length > 1e3) {
        setErr("Description is too long.");
        return;
      }
      setSaving(true);
      setErr(null);
      try {
        const body = { title: t, description: description.trim() || null };
        if (editing && project) await update(project.id, body);
        else await create(body);
        push(editing ? "Project updated" : "Project created", "success");
        closeProjectForm();
      } catch (e2) {
        setErr(e2.message);
        setSaving(false);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Modal, { title: editing ? "Edit project" : "New project", onClose: closeProjectForm, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("form", { className: "form", onSubmit: submit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "field__label", children: [
          "Title",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__req", children: "required" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "input",
          {
            className: "input",
            autoFocus: true,
            maxLength: 255,
            placeholder: "e.g. Website redesign",
            value: title,
            onChange: (e) => setTitle(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("label", { className: "field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "field__label", children: "Description" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "textarea",
          {
            className: "input textarea",
            maxLength: 1e3,
            rows: 3,
            placeholder: "What is this project about?",
            value: description,
            onChange: (e) => setDescription(e.target.value)
          }
        )
      ] }),
      err && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "form__err", children: err }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "form__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", className: "btn btn--ghost", onClick: closeProjectForm, children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "submit", className: "btn btn--primary", disabled: saving, children: editing ? "Save changes" : "Create project" })
      ] })
    ] }) });
  }
  function ConfirmDialog() {
    const { confirmRequest, resolveConfirm } = useUI();
    if (!confirmRequest) return null;
    const { opts } = confirmRequest;
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Modal, { title: opts.title, onClose: () => resolveConfirm(false), children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "confirm__msg", children: opts.message }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "form__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { className: "btn btn--ghost", onClick: () => resolveConfirm(false), children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { className: "btn btn--danger", onClick: () => resolveConfirm(true), children: opts.confirmLabel ?? "Confirm" })
      ] })
    ] });
  }

  // src/components/TaskDrawer.tsx
  init_define_import_meta_env();
  var import_react7 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime14 = __toESM(require_react_shim(), 1);
  function TaskDrawer() {
    const { selectedId, clearSelection } = useUI();
    const { byId } = useTasks();
    const task = selectedId != null ? byId.get(selectedId) : void 0;
    (0, import_react7.useEffect)(() => {
      if (selectedId != null && !byId.has(selectedId)) clearSelection();
    }, [selectedId, byId, clearSelection]);
    if (!task) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "scrim", onPointerDown: clearSelection }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DrawerBody, { task }, task.id)
    ] });
  }
  function DrawerBody({ task }) {
    const { clearSelection, openEdit, confirm, focusBranch, setView } = useUI();
    const { prerequisitesOf, dependentsOf, remove, unbind, edges, byId } = useTasks();
    const prerequisites = prerequisitesOf(task.id);
    const dependents = dependentsOf(task.id);
    const blockingIds = (0, import_react7.useMemo)(() => new Set(
      edges.filter((e) => e.targetId === task.id && e.type === "STRICT_PREREQUISITE" && byId.get(e.sourceId)?.status !== "COMPLETED").map((e) => e.sourceId)
    ), [edges, byId, task.id]);
    const opensNextIds = (0, import_react7.useMemo)(() => new Set(
      edges.filter((e) => e.sourceId === task.id && e.type === "STRICT_PREREQUISITE").map((e) => e.targetId).filter((depId) => !edges.some((e) => e.targetId === depId && e.type === "STRICT_PREREQUISITE" && e.sourceId !== task.id && (byId.get(e.sourceId)?.status ?? "COMPLETED") !== "COMPLETED"))
    ), [edges, byId, task.id]);
    async function onDelete() {
      const ok = await confirm({
        title: "Delete task",
        message: `Delete \u201C${task.title}\u201D? Its dependency links will be removed. This can\u2019t be undone.`,
        confirmLabel: "Delete"
      });
      if (!ok) return;
      if (await remove(task.id)) clearSelection();
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("aside", { className: "drawer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StatusDot, { status: task.status }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "drawer__title", children: task.title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { className: "iconbtn", title: "Close", onClick: clearSelection, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "x" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__badges", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StatusBadge, { status: task.status }),
        task.isBlocked && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "chip chip--blocked", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "lock" }),
          "Blocked"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "chip", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "clock" }),
          task.durationHours,
          "h"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `chip chip--cx-${task.complexity.toLowerCase()}`, children: COMPLEXITY_LABEL[task.complexity] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ImportanceChip, { value: task.importance }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "chip chip--muted", children: [
          "#",
          task.id
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drawer__label", children: "Description" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: `drawer__desc ${task.description ? "" : "muted"}`, children: task.description || "No description provided." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(AdvanceButton, { task }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { className: "btn btn--ghost", onClick: () => openEdit(task), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "edit" }),
          "Edit"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "button",
          {
            className: "btn btn--ghost",
            title: "Show only this task and everything it unlocks on the graph",
            onClick: () => {
              focusBranch(task.id);
              setView("graph");
              clearSelection();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "target" }),
              "Branch"
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { className: "btn btn--ghost btn--danger", onClick: onDelete, children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "trash" }),
          "Delete"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(EffortWidget, { task }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(GroupSection, { task }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        DepSection,
        {
          title: "Prerequisites",
          subtitle: "Must be completed before this task",
          rows: prerequisites,
          onRemove: (p) => void unbind(task.id, p.id),
          chipFor: (p) => blockingIds.has(p.id) ? { label: "blocks this", kind: "wait" } : null,
          footer: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(AddPrerequisite, { task })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        DepSection,
        {
          title: "Unlocks",
          subtitle: "Tasks waiting on this one",
          rows: dependents,
          onRemove: (d) => void unbind(d.id, task.id),
          chipFor: (d) => opensNextIds.has(d.id) ? { label: task.status === "COMPLETED" ? "opened by this" : "opens next", kind: "open" } : null
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drawer__label", children: "History" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dl", { className: "times", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { children: "Created" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { children: formatDateTime(task.createdAt) ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { children: "Updated" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { children: formatDateTime(task.updatedAt) ?? "\u2014" }),
          task.completedAt && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { children: "Completed" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { children: formatDateTime(task.completedAt) })
          ] })
        ] })
      ] })
    ] });
  }
  function formatDateTime(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString(void 0, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function EffortWidget({ task }) {
    const [state, setState] = (0, import_react7.useState)({ kind: "idle" });
    async function calc() {
      setState({ kind: "loading" });
      try {
        setState({ kind: "ok", hours: await api.calcDuration(task.id) });
      } catch (e) {
        setState({ kind: "error", message: e.message });
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drawer__section", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "effort__row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drawer__label", children: "Subtree effort" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `effort__val ${state.kind === "ok" ? "" : "muted"}`, children: [
          state.kind === "idle" && "Not calculated yet",
          state.kind === "loading" && "Calculating\u2026",
          state.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "danger", children: state.message }),
          state.kind === "ok" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(EffortResult, { hours: state.hours })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { className: "btn btn--ghost btn--sm", onClick: calc, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "sum" }),
        "Calculate"
      ] })
    ] }) });
  }
  function EffortResult({ hours }) {
    const days = hours / 8;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("b", { children: [
        hours,
        "h"
      ] }),
      hours >= 8 && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "muted", children: [
        " \xB7 ~",
        days.toFixed(days < 10 ? 1 : 0),
        " workdays"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "muted small", children: "This task plus everything it unlocks." })
    ] });
  }
  function DepSection({ title, subtitle, rows, onRemove, chipFor, footer }) {
    const { select } = useUI();
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__label", children: [
        title,
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "drawer__sublabel", children: subtitle })
      ] }),
      rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "deplist", children: rows.map((t) => {
        const rel = chipFor?.(t) ?? null;
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "deprow", onClick: () => select(t.id), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StatusDot, { status: t.status }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "deprow__title", children: t.title }),
          rel && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `chip chip--xs chip--rel-${rel.kind}`, children: rel.label }),
          t.isBlocked && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "chip chip--blocked chip--xs", children: "blocked" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "muted deprow__h", children: [
            t.durationHours,
            "h"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              className: "iconbtn iconbtn--sm",
              title: "Remove dependency",
              onClick: (e) => {
                e.stopPropagation();
                onRemove(t);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "unlink" })
            }
          )
        ] }, t.id);
      }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "muted small", children: "None" }),
      footer
    ] });
  }
  function GroupSection({ task }) {
    const { groups, setTaskGroup } = useTasks();
    const [busy, setBusy] = (0, import_react7.useState)(false);
    if (groups.length === 0 && task.groupId == null) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "drawer__section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "drawer__label", children: "Group" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "select",
        {
          className: "input input--sm",
          disabled: busy,
          value: task.groupId ?? "",
          onChange: async (e) => {
            const next = e.target.value === "" ? null : Number(e.target.value);
            setBusy(true);
            await setTaskGroup(task.id, next);
            setBusy(false);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("option", { value: "", children: "No group" }),
            groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("option", { value: g.id, children: g.title }, g.id))
          ]
        }
      )
    ] });
  }
  function AddPrerequisite({ task }) {
    const { tasks, prerequisitesOf, descendants, bind } = useTasks();
    const [open, setOpen] = (0, import_react7.useState)(false);
    const [query, setQuery] = (0, import_react7.useState)("");
    const [type, setType] = (0, import_react7.useState)("STRICT_PREREQUISITE");
    if (task.status !== "TODO") {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "hint", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "info" }),
        "Only tasks in \u201CTo do\u201D can take on new prerequisites."
      ] });
    }
    const existing = new Set(prerequisitesOf(task.id).map((p) => p.id));
    const wouldCycle = descendants(task.id);
    const candidates = tasks.filter((c) => c.id !== task.id && !existing.has(c.id) && !wouldCycle.has(c.id) && (type === "OPTIONAL_LINK" || c.status !== "EXPIRED"));
    const q = query.trim().toLowerCase();
    const shown = candidates.filter((c) => !q || c.title.toLowerCase().includes(q));
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { className: "btn btn--ghost btn--sm", onClick: () => setOpen((o) => !o), children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plus" }),
        "Add prerequisite"
      ] }),
      open && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "picker", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "picker__types", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              className: `picker__type ${type === "STRICT_PREREQUISITE" ? "is-active" : ""}`,
              onClick: () => setType("STRICT_PREREQUISITE"),
              title: "Must be done first \u2014 blocks this task",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "lock" }),
                "Required"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              className: `picker__type ${type === "OPTIONAL_LINK" ? "is-active" : ""}`,
              onClick: () => setType("OPTIONAL_LINK"),
              title: "Related, but does not block this task",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "link" }),
                "Optional"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "input",
          {
            className: "input input--sm",
            type: "search",
            autoFocus: true,
            placeholder: type === "OPTIONAL_LINK" ? "Find a task to link\u2026" : "Find a task to require\u2026",
            value: query,
            onChange: (e) => setQuery(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "picker__list", children: shown.length > 0 ? shown.map((c) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "button",
          {
            className: "picker__item",
            onClick: async () => {
              if (await bind(task.id, c.id, type)) {
                setOpen(false);
                setQuery("");
              }
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StatusDot, { status: c.status }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "picker__title", children: c.title }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "muted", children: [
                c.durationHours,
                "h"
              ] })
            ]
          },
          c.id
        )) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "picker__empty muted", children: candidates.length ? "No matches." : "No eligible tasks available." }) })
      ] })
    ] });
  }

  // src/App.tsx
  init_define_import_meta_env();
  var import_react8 = __toESM(require_react_shim(), 1);
  var import_jsx_runtime15 = __toESM(require_react_shim(), 1);
  function Shell() {
    const { view, selectedId, clearSelection, form, projectForm, closeForm, closeProjectForm, confirmRequest, resolveConfirm } = useUI();
    const { status: projectsStatus, current } = useProjects();
    (0, import_react8.useEffect)(() => {
      const onKey = (e) => {
        if (e.key !== "Escape") return;
        if (confirmRequest) resolveConfirm(false);
        else if (form) closeForm();
        else if (projectForm) closeProjectForm();
        else if (selectedId != null) clearSelection();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [confirmRequest, form, projectForm, selectedId, resolveConfirm, closeForm, closeProjectForm, clearSelection]);
    let content;
    if (projectsStatus === "error") content = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ProjectsError, {});
    else if (projectsStatus === "ready" && !current) content = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NoProjects, {});
    else content = /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TopBar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(StatsBar, {}),
      view === "board" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(BoardView, {}),
      view === "graph" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(GraphView, {}),
      view === "plan" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PlanView, {}),
      view === "roadmap" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RoadmapView, {})
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "app", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Sidebar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("main", { className: "main", children: content }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TaskDrawer, {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ModalHost, {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Toaster, {})
    ] });
  }
  function Authenticated() {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ProjectsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TasksProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(UIProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Shell, {}) }) }) });
  }
  function Gate() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Authenticated, {}) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AuthScreen, {});
  }
  function App() {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Gate, {}) }) }) });
  }
  return __toCommonJS(ds_entry_exports);
})();
window.TaskManagerDS=TaskManagerDS.__dsMainNs?Object.assign({},TaskManagerDS,TaskManagerDS.__dsMainNs,{__dsMainNs:undefined}):TaskManagerDS;
