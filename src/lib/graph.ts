import type { GraphEdge, Task } from '../types';

export const NODE_W = 210;
export const NODE_H = 64;
const HGAP = 48;
const VGAP = 72;

export interface XY {
  x: number;
  y: number;
}

/**
 * Layered ("Sugiyama"-ish) layout for the dependency DAG.
 * Prerequisites sit above their dependents; barycenter sweeps reduce crossings.
 */
export function computeLayout(tasks: Task[], edges: GraphEdge[]): Map<number, XY> {
  const ids = new Set(tasks.map((t) => t.id));
  const out = new Map<number, number[]>();
  const indeg = new Map<number, number>();
  const parents = new Map<number, number[]>();
  for (const t of tasks) {
    out.set(t.id, []);
    indeg.set(t.id, 0);
    parents.set(t.id, []);
  }
  for (const e of edges) {
    if (!ids.has(e.sourceId) || !ids.has(e.targetId)) continue;
    out.get(e.sourceId)!.push(e.targetId);
    parents.get(e.targetId)!.push(e.sourceId);
    indeg.set(e.targetId, indeg.get(e.targetId)! + 1);
  }

  // Longest-path layering via Kahn topological order.
  const work = new Map(indeg);
  const layer = new Map<number, number>();
  const queue: number[] = [];
  for (const t of tasks) if (work.get(t.id) === 0) { layer.set(t.id, 0); queue.push(t.id); }
  for (let i = 0; i < queue.length; i++) {
    const u = queue[i];
    for (const v of out.get(u)!) {
      layer.set(v, Math.max(layer.get(v) ?? 0, (layer.get(u) ?? 0) + 1));
      work.set(v, work.get(v)! - 1);
      if (work.get(v) === 0) queue.push(v);
    }
  }
  for (const t of tasks) if (!layer.has(t.id)) layer.set(t.id, 0); // cycle safety

  const layers: number[][] = [];
  const title = (id: number) => tasks.find((t) => t.id === id)?.title ?? '';
  for (const t of tasks) {
    const L = layer.get(t.id)!;
    (layers[L] ||= []).push(t.id);
  }
  for (const L of layers) L?.sort((a, b) => title(a).localeCompare(title(b)));

  // Barycenter sweeps.
  for (let iter = 0; iter < 4; iter++) {
    for (let li = 1; li < layers.length; li++) {
      const L = layers[li];
      if (!L) continue;
      const idx = new Map<number, number>();
      (layers[li - 1] ?? []).forEach((id, i) => idx.set(id, i));
      const bc = new Map<number, number>();
      for (const id of L) {
        const ps = parents.get(id)!.filter((p) => idx.has(p));
        bc.set(id, ps.length ? ps.reduce((s, p) => s + idx.get(p)!, 0) / ps.length : 1e9);
      }
      L.sort((a, b) => (bc.get(a)! - bc.get(b)!) || title(a).localeCompare(title(b)));
    }
  }

  const maxCount = Math.max(1, ...layers.map((L) => (L ? L.length : 0)));
  const totalW = maxCount * NODE_W + (maxCount - 1) * HGAP;
  const positions = new Map<number, XY>();
  layers.forEach((L, li) => {
    if (!L) return;
    const rowW = L.length * NODE_W + (L.length - 1) * HGAP;
    const startX = (totalW - rowW) / 2;
    L.forEach((id, i) =>
      positions.set(id, {
        x: startX + i * (NODE_W + HGAP) + NODE_W / 2,
        y: li * (NODE_H + VGAP) + NODE_H / 2 + 24,
      }),
    );
  });
  return positions;
}

/**
 * Smooth bezier between two nodes, attached to whichever sides face each
 * other: bottom→top for mostly-vertical links, side→side for mostly-
 * horizontal ones. The arrowhead auto-orients along the path.
 */
export function edgePath(a: XY, b: XY): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    const s = dx >= 0 ? 1 : -1;
    const x1 = a.x + s * (NODE_W / 2);
    const x2 = b.x - s * (NODE_W / 2);
    const bend = s * Math.max(28, Math.abs(x2 - x1) / 2);
    return `M ${x1} ${a.y} C ${x1 + bend} ${a.y}, ${x2 - bend} ${b.y}, ${x2} ${b.y}`;
  }

  const s = dy >= 0 ? 1 : -1;
  const y1 = a.y + s * (NODE_H / 2);
  const y2 = b.y - s * (NODE_H / 2);
  const bend = s * Math.max(28, Math.abs(y2 - y1) / 2);
  return `M ${a.x} ${y1} C ${a.x} ${y1 + bend}, ${b.x} ${y2 - bend}, ${b.x} ${y2}`;
}
