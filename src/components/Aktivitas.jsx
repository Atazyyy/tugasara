import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowRightLeft, History, Plus, Trash2 } from "lucide-react";
import { COLUMNS, PROJECTS, columnById } from "../data/seed";
import { relTime } from "../utils/format";

const TYPE_META = {
  move: { icon: ArrowRightLeft, cls: "bg-accent-soft text-accent-deep", verb: "memindahkan" },
  create: { icon: Plus, cls: "bg-emerald-50 text-emerald-600", verb: "menambahkan tugas" },
  delete: { icon: Trash2, cls: "bg-red-50 text-red-600", verb: "menghapus tugas" },
};

function ColumnChip({ id }) {
  const col = columnById(id);
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[11px] font-bold text-ink">
      <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
      {col.label}
    </span>
  );
}

function Entry({ item }) {
  const meta = TYPE_META[item.type] || TYPE_META.move;
  const Icon = meta.icon;
  const project = PROJECTS.find((p) => p.id === item.projectId);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 border-b border-edge px-4 py-3.5 last:border-b-0 sm:px-5"
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${meta.cls}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-ink">
          <span className="font-extrabold">{item.actor}</span> {meta.verb}{" "}
          <span className="font-bold">&ldquo;{item.taskTitle}&rdquo;</span>
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mute">
          {item.type === "move" && (
            <span className="flex flex-wrap items-center gap-1.5">
              <ColumnChip id={item.from} />
              <ArrowRight className="h-3 w-3" />
              <ColumnChip id={item.to} />
            </span>
          )}
          {item.type !== "move" && item.to && <ColumnChip id={item.to} />}
          <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-bold text-mute">
            {project ? project.key : "—"}
          </span>
        </div>
      </div>
      <span className="shrink-0 pt-0.5 text-[11px] font-semibold text-mute">
        {relTime(item.ts)}
      </span>
    </motion.li>
  );
}

export default function Aktivitas({ board }) {
  const { activity } = board;
  const [filter, setFilter] = useState("semua");

  const filtered = activity
    .filter((a) => filter === "semua" || a.projectId === filter)
    .slice(0, 40);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Log Aktivitas</h1>
        <p className="mt-1 text-sm text-mute">
          Riwayat perpindahan tugas antar kolom di semua proyek workspace.
        </p>
      </div>

      {/* Filter proyek */}
      <div className="flex flex-wrap gap-2">
        {[{ id: "semua", key: "ALL", name: "Semua proyek" }, ...PROJECTS].map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter(p.id)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              filter === p.id
                ? "border-accent bg-accent text-white shadow-sm"
                : "border-edge bg-card text-mute hover:border-accent hover:text-accent-deep"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Daftar aktivitas */}
      <div className="rounded-2xl border border-edge bg-card">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <History className="h-8 w-8 text-mute/50" />
            <p className="text-sm font-bold text-ink">Belum ada aktivitas</p>
            <p className="max-w-xs text-xs text-mute">
              Pindahkan, tambahkan, atau hapus tugas di papan kanban — semuanya tercatat di sini.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            <ul>
              {filtered.map((a) => (
                <Entry key={a.id} item={a} />
              ))}
            </ul>
          </AnimatePresence>
        )}
      </div>

      <p className="text-xs text-mute">
        Maksimal 40 entri terbaru ditampilkan · {COLUMNS.length} kolom status:{" "}
        {COLUMNS.map((c) => c.label).join(" → ")}.
      </p>
    </div>
  );
}
