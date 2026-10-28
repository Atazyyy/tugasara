import { useCallback, useEffect, useState } from "react";
import { COL_ORDER, STORAGE_KEY, buildSeed, uid } from "../data/seed";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.tasks) && Array.isArray(parsed.activity)) {
      return parsed;
    }
  } catch {
    // data rusak → muat seed baru
  }
  return buildSeed();
}

// Seluruh state papan (tugas + log aktivitas) tersimpan di localStorage.
export default function useBoard() {
  const [state, setState] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Pindah kolom dengan tombol ◀ ▶ (dir = -1 atau +1).
  const moveTask = useCallback((taskId, dir) => {
    setState((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return s;
      const idx = COL_ORDER.indexOf(task.col);
      const nextCol = COL_ORDER[idx + dir];
      if (!nextCol) return s;
      const entry = {
        id: uid("a"),
        ts: Date.now(),
        projectId: task.projectId,
        actor: "Kamu",
        type: "move",
        taskTitle: task.title,
        from: task.col,
        to: nextCol,
      };
      return {
        ...s,
        tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, col: nextCol } : t)),
        activity: [entry, ...s.activity].slice(0, 80),
      };
    });
  }, []);

  const addTask = useCallback((projectId, data) => {
    setState((s) => {
      const task = {
        id: uid("t"),
        projectId,
        title: data.title.trim(),
        assigneeId: data.assigneeId,
        priority: data.priority,
        labelId: data.labelId,
        deadline: data.deadline,
        col: data.col,
      };
      const entry = {
        id: uid("a"),
        ts: Date.now(),
        projectId,
        actor: "Kamu",
        type: "create",
        taskTitle: task.title,
        from: null,
        to: data.col,
      };
      return { ...s, tasks: [...s.tasks, task], activity: [entry, ...s.activity].slice(0, 80) };
    });
  }, []);

  const deleteTask = useCallback((taskId) => {
    setState((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return s;
      const entry = {
        id: uid("a"),
        ts: Date.now(),
        projectId: task.projectId,
        actor: "Kamu",
        type: "delete",
        taskTitle: task.title,
        from: task.col,
        to: null,
      };
      return {
        ...s,
        tasks: s.tasks.filter((t) => t.id !== taskId),
        activity: [entry, ...s.activity].slice(0, 80),
      };
    });
  }, []);

  const resetDemo = useCallback(() => setState(buildSeed()), []);

  return { tasks: state.tasks, activity: state.activity, moveTask, addTask, deleteTask, resetDemo };
}
