import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Columns3,
  Plus,
  RotateCcw,
  Users,
} from "lucide-react";
import {
  COLUMNS,
  MEMBERS,
  PROJECTS,
  WORKSPACE,
  isOverdue,
  nearestDeadline,
} from "../data/seed";
import { fmtDate, fmtDateFull } from "../utils/format";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

function StatCard({ icon: Icon, tone, value, label, children }) {
  const tones = {
    amber: "bg-accent-soft text-accent-deep",
    red: "bg-red-50 text-red-600",
    emerald: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="rounded-2xl border border-edge bg-card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3.5 text-2xl font-extrabold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-mute">{label}</p>
      {children}
    </div>
  );
}

export default function Papan({ board }) {
  const { tasks, moveTask, addTask, deleteTask, resetDemo } = board;
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [modal, setModal] = useState(null); // { col } | null

  const project = PROJECTS.find((p) => p.id === activeId);
  const projectTasks = useMemo(
    () => tasks.filter((t) => t.projectId === activeId),
    [tasks, activeId]
  );

  const total = projectTasks.length;
  const done = projectTasks.filter((t) => t.col === "selesai").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const overdueCount = projectTasks.filter(isOverdue).length;
  const nearest = nearestDeadline(projectTasks);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Papan Proyek</h1>
          <p className="mt-1 text-sm text-mute">
            Workspace &ldquo;{WORKSPACE}&rdquo; · {fmtDateFull(Date.now())}
          </p>
        </div>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-card px-3.5 py-2 text-xs font-bold text-mute transition-colors hover:border-accent hover:text-accent-deep"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset data demo
        </button>
      </div>

      {/* Switcher 3 proyek */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PROJECTS.map((p) => {
          const count = tasks.filter((t) => t.projectId === p.id).length;
          const active = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                active
                  ? "border-accent bg-card shadow-md"
                  : "border-edge bg-card/60 hover:border-accent/50 hover:bg-card"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold ${
                  active ? "bg-accent text-white" : "bg-canvas text-mute"
                }`}
              >
                {p.key}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold text-ink">{p.name}</span>
                <span className="block text-xs text-mute">{count} tugas</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Header proyek: progres + overdue */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-edge bg-card p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-ink">{project.name}</h2>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-mute">{project.desc}</p>
            </div>
            <div className="flex items-center -space-x-1.5" title="Anggota tim">
              {MEMBERS.map((m) => (
                <span
                  key={m.id}
                  title={m.name}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card text-[10px] font-extrabold text-white"
                  style={{ backgroundColor: m.color }}
                >
                  {m.initials}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-well">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-extrabold text-ink">{pct}%</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-xs text-mute">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            {done} dari {total} tugas selesai
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard
            icon={AlertTriangle}
            tone={overdueCount > 0 ? "red" : "emerald"}
            value={overdueCount}
            label={overdueCount > 0 ? "Tugas overdue" : "Tidak ada overdue"}
          />
          <StatCard
            icon={CalendarClock}
            tone="amber"
            value={nearest ? fmtDate(nearest.deadline) : "—"}
            label="Deadline terdekat"
          >
            {nearest && (
              <p className="mt-1 truncate text-xs font-semibold text-ink">{nearest.title}</p>
            )}
          </StatCard>
        </div>
      </div>

      {/* Papan kanban 4 kolom */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-ink">
          <Columns3 className="h-4 w-4 text-accent" />
          Papan Kanban
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
            const colTasks = projectTasks.filter((t) => t.col === col.id);
            return (
              <div key={col.id} className="flex flex-col rounded-2xl bg-well p-3">
                <div className="flex items-center justify-between px-1 pb-3">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-ink">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                    {col.label}
                  </span>
                  <span className="rounded-full bg-card px-2 py-0.5 text-xs font-extrabold text-mute">
                    {colTasks.length}
                  </span>
                </div>
                <div className="flex min-h-[80px] flex-1 flex-col gap-2.5">
                  <AnimatePresence initial={false}>
                    {colTasks.map((t) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        onMove={moveTask}
                        onDelete={deleteTask}
                      />
                    ))}
                  </AnimatePresence>
                  {colTasks.length === 0 && (
                    <p className="rounded-xl border border-dashed border-edge px-3 py-4 text-center text-xs text-mute">
                      Belum ada tugas
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setModal({ col: col.id })}
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-edge bg-card/60 px-3 py-2.5 text-xs font-bold text-mute transition-colors hover:border-accent hover:text-accent-deep"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Tambah tugas
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-mute">
        <Users className="h-3.5 w-3.5" />
        Pindahkan kartu antar kolom dengan tombol ◀ ▶ di kartu — tanpa drag &amp; drop.
      </p>

      <TaskModal
        open={!!modal}
        projectId={activeId}
        defaultCol={modal?.col}
        onSubmit={addTask}
        onClose={() => setModal(null)}
      />
    </div>
  );
}
