"use strict";
var __dsPreview = (() => {
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
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
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

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.TaskManagerDS;
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
      function jsx2(t2, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t2, np(p, k)) : R.createElement(t2, np(p, k), c);
      }
      function jsxs(t2, p, k) {
        return R.createElement.apply(R, [t2, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t2, p, k, s) {
        return (s ? jsxs : jsx2)(t2, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/RoadmapView.tsx
  var RoadmapView_exports = {};
  __export(RoadmapView_exports, {
    Roadmap: () => Roadmap
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.TaskManagerDS;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/preview-data.ts
  init_define_import_meta_env();
  var user = { id: 1, name: "Alona", surname: null, username: "alona", role: "USER" };
  var projects = [
    { id: 1, title: "Website Redesign", description: "Q3 marketing site refresh", createdAt: "2026-06-01T09:00:00Z" },
    { id: 2, title: "Mobile App", description: "iOS + Android companion app", createdAt: "2026-06-20T09:00:00Z" }
  ];
  var edges = [
    { id: 1, sourceId: 1, targetId: 2, type: "STRICT_PREREQUISITE" },
    { id: 2, sourceId: 2, targetId: 3, type: "STRICT_PREREQUISITE" },
    { id: 3, sourceId: 3, targetId: 5, type: "STRICT_PREREQUISITE" },
    { id: 4, sourceId: 4, targetId: 5, type: "STRICT_PREREQUISITE" },
    { id: 5, sourceId: 5, targetId: 8, type: "STRICT_PREREQUISITE" },
    { id: 6, sourceId: 4, targetId: 7, type: "STRICT_PREREQUISITE" },
    { id: 7, sourceId: 6, targetId: 8, type: "OPTIONAL_LINK" }
  ];
  var t = (o) => ({
    description: null,
    durationHours: 8,
    status: "TODO",
    isBlocked: false,
    projectId: 1,
    complexity: "MEDIUM",
    importance: 3,
    calculatedTime: null,
    createdAt: "2026-06-02T10:00:00Z",
    updatedAt: null,
    completedAt: null,
    groupId: null,
    archiveId: null,
    ...o
  });
  var tasks = [
    t({ id: 1, title: "Design system audit", status: "COMPLETED", complexity: "EASY", importance: 3, durationHours: 8, groupId: 1, completedAt: "2026-06-10T15:00:00Z", description: "Inventory the current tokens, components and page templates." }),
    t({ id: 2, title: "Wireframes", status: "COMPLETED", importance: 4, durationHours: 16, groupId: 1, completedAt: "2026-06-18T12:00:00Z", description: "Low-fi flows for home, pricing and docs." }),
    t({ id: 3, title: "Visual design", status: "IN_PROGRESS", complexity: "HARD", importance: 5, durationHours: 40, groupId: 1, description: "High-fidelity mockups in both themes." }),
    t({ id: 4, title: "Component library", status: "IN_PROGRESS", importance: 4, durationHours: 24, groupId: 2, description: "Build the shared React components." }),
    t({ id: 5, title: "Homepage build", isBlocked: true, importance: 4, durationHours: 20, groupId: 2, description: "Assemble the new homepage from the component library." }),
    t({ id: 6, title: "Content rewrite", complexity: "EASY", importance: 2, durationHours: 12, description: "Refresh copy for the six core pages." }),
    t({ id: 7, title: "CMS migration", isBlocked: true, complexity: "HARD", importance: 3, durationHours: 32, groupId: 2, description: "Move page content into the new headless CMS." }),
    t({ id: 8, title: "Launch QA", isBlocked: true, importance: 5, durationHours: 16, description: "Cross-browser pass and accessibility audit before go-live." }),
    t({ id: 9, title: "Legacy browser testing", status: "EXPIRED", complexity: "EASY", importance: 1, durationHours: 6, description: "IE11 support — descoped after the deadline passed." })
  ];
  var influence = { 1: 4, 2: 3, 3: 2, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 };
  var graph = {
    nodes: tasks.map((x) => ({
      id: x.id,
      title: x.title,
      status: x.status,
      durationHours: x.durationHours,
      isBlocked: x.isBlocked,
      influence: influence[x.id] ?? 0
    })),
    edges
  };
  var groups = [
    { id: 1, projectId: 1, title: "Design", activeTaskCount: 3 },
    { id: 2, projectId: 1, title: "Build", activeTaskCount: 3 }
  ];
  var archives = {
    items: [
      { id: 11, projectId: 1, title: "Kickoff & research", archivedAt: "2026-06-30T10:00:00Z", taskCount: 5 }
    ],
    page: 0,
    size: 20,
    total: 1
  };
  var finishHour = { 1: 0, 2: 0, 3: 40, 4: 24, 5: 60, 6: 12, 7: 56, 8: 76, 9: 0 };
  var tasksWithTime = tasks.map((x) => ({ ...x, calculatedTime: finishHour[x.id] ?? x.durationHours }));
  var suggested = [6, 7, 5, 8].map((id) => tasksWithTime.find((x) => x.id === id));
  function installPreviewMock(overrides = {}) {
    localStorage.setItem("tm.token", "preview-token");
    localStorage.setItem("tm.username", "alona");
    localStorage.setItem("tm.name", "Alona");
    localStorage.setItem("tm.project.alona", "1");
    const data = { projects, tasks, graph, groups, archives, user, ...overrides };
    const realFetch = window.fetch.bind(window);
    const json = (body) => new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
    window.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.startsWith("/api/")) return realFetch(input, init);
      if (url.includes("/auth/me")) return json(data.user);
      if (/\/api\/v1\/suggest\/tasks\/\d+\/time/.test(url)) return json(tasksWithTime);
      if (/\/api\/v1\/suggest\/tasks\/\d+/.test(url)) return json(suggested);
      if (/\/api\/v1\/projects/.test(url)) return json(data.projects);
      if (/\/api\/v1\/tasks\/\d+\/tasks/.test(url)) return json(data.tasks);
      if (/\/api\/v1\/graph\/tasks\/all\//.test(url)) return json(data.graph);
      if (/\/api\/v1\/groups\/project\/\d+\/active/.test(url)) return json(data.groups);
      if (/\/api\/v1\/groups\/project\//.test(url)) return json({ items: data.groups, page: 0, size: 20, total: data.groups.length });
      if (/\/api\/v1\/archives\//.test(url)) return json(data.archives);
      return json({});
    };
  }

  // .design-sync/previews/RoadmapView.tsx
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  installPreviewMock();
  var Roadmap = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.RoadmapView, {});
  return __toCommonJS(RoadmapView_exports);
})();
