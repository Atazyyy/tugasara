import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { COLUMNS, LABELS, MEMBERS, PRIORITIES, memberById } from "../data/seed";
import { fromISODateInput, toISODateInput } from "../utils/format";

export default function TaskModal({ open, projectId, defaultCol, onSubmit, onClose }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (open) {
      setForm({
        title: "",
        assigneeId: MEMBERS[0].id,
        priority: "sedang",
        labelId: LABELS[0].id,
        deadline: toISODateInput(Date.now() + 3 * 86400000),
        col: defaultCol || "backlog",
      });
    }
  }, [open, defaultCol]);

  if (!open || !form) return null;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const valid = form.title.trim().length > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit(projectId, { ...form, deadline: fromISODateInput(form.deadline) });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.form
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl border border-edge bg-card p-5 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">Tambah Tugas Baru</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="rounded-lg p-1.5 text-mute hover:bg-canvas hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <label className="mt-4 block text-xs font-bold text-mute">
            Judul tugas
            <input
              autoFocus
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="cth. Desain banner promo akhir pekan"
              className="mt-1.5 w-full rounded-xl border border-edge bg-canvas px-3 py-2.5 text-sm font-semibold text-ink outline-none placeholder:font-normal placeholder:text-mute/70 focus:border-accent"
            />
          </label>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-xs font-bold text-mute">
              Pic
              <select
                value={form.assigneeId}
                onChange={(e) => set("assigneeId", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-edge bg-canvas px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-accent"
              >
                {MEMBERS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-bold text-mute">
              Label
              <select
                value={form.labelId}
                onChange={(e) => set("labelId", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-edge bg-canvas px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-accent"
              >
                {LABELS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-bold text-mute">
              Deadline
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-edge bg-canvas px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-accent"
              />
            </label>
            <label className="block text-xs font-bold text-mute">
              Kolom tujuan
              <select
                value={form.col}
                onChange={(e) => set("col", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-edge bg-canvas px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-accent"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3">
            <p className="text-xs font-bold text-mute">Prioritas</p>
            <div className="mt-1.5 flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => set("priority", p.id)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
                    form.priority === p.id
                      ? "border-accent bg-accent-soft text-accent-deep"
                      : "border-edge bg-canvas text-mute hover:border-accent"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-edge px-4 py-2.5 text-sm font-bold text-mute hover:bg-canvas"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!valid}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tambah Tugas
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
