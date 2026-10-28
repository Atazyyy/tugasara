import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { labelById, memberById, priorityById } from "../data/seed";
import { deadlineMeta } from "../utils/format";

export default function TaskCard({ task, onMove, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const member = memberById(task.assigneeId);
  const label = labelById(task.labelId);
  const priority = priorityById(task.priority);
  const dl = deadlineMeta(task.deadline);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl border border-edge bg-card p-3.5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold leading-snug text-ink">{task.title}</p>
        <button
          onClick={() => setConfirming((c) => !c)}
          aria-label={`Hapus tugas ${task.title}`}
          className="shrink-0 rounded-md p-1 text-mute/60 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {confirming && (
        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs">
          <span className="font-semibold text-red-700">Hapus tugas ini?</span>
          <span className="flex gap-1.5">
            <button
              onClick={() => setConfirming(false)}
              className="rounded-md px-2 py-0.5 font-bold text-mute hover:bg-red-100"
            >
              Batal
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-md bg-red-600 px-2 py-0.5 font-bold text-white hover:bg-red-700"
            >
              Hapus
            </button>
          </span>
        </div>
      )}

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${label.cls}`}>
          {label.label}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${priority.cls}`}>
          {priority.label}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-edge pt-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            title={member.name}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
            style={{ backgroundColor: member.color }}
          >
            {member.initials}
          </span>
          <span
            className={`inline-flex items-center gap-1 truncate text-[11px] font-bold ${
              dl.overdue ? "text-red-600" : "text-mute"
            }`}
          >
            <CalendarDays className="h-3 w-3 shrink-0" />
            {dl.label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onMove(task.id, -1)}
            aria-label="Pindah ke kolom sebelumnya"
            className="rounded-md border border-edge bg-canvas p-1 text-mute transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge disabled:hover:text-mute"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => onMove(task.id, +1)}
            aria-label="Pindah ke kolom berikutnya"
            className="rounded-md border border-edge bg-canvas p-1 text-mute transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge disabled:hover:text-mute"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
