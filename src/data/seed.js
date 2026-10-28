// Data contoh Tugasara — seluruh nama, proyek, dan anggota tim bersifat FIKTIF.
// Deadline & timestamp aktivitas dihitung relatif terhadap waktu halaman
// dibuka supaya demo selalu terlihat "hidup" (selalu ada yang overdue).

const DAY = 86400000; // satu hari dalam ms
const H = 3600000; // satu jam dalam ms

export const WA_NUMBER = "6281234567890";

export const STORAGE_KEY = "tugasara-board-v1";
export const WORKSPACE = "Studio Antara";

// ---------- Kolom kanban ----------
export const COLUMNS = [
  { id: "backlog", label: "Backlog", dot: "bg-slate-400" },
  { id: "dikerjakan", label: "Dikerjakan", dot: "bg-sky-500" },
  { id: "review", label: "Review", dot: "bg-violet-500" },
  { id: "selesai", label: "Selesai", dot: "bg-emerald-500" },
];

export const COL_ORDER = COLUMNS.map((c) => c.id);
export const columnById = (id) => COLUMNS.find((c) => c.id === id) || COLUMNS[0];

// ---------- Prioritas ----------
export const PRIORITIES = [
  { id: "rendah", label: "Rendah", cls: "bg-slate-100 text-slate-600" },
  { id: "sedang", label: "Sedang", cls: "bg-amber-100 text-amber-700" },
  { id: "tinggi", label: "Tinggi", cls: "bg-red-100 text-red-700" },
];
export const priorityById = (id) => PRIORITIES.find((p) => p.id === id) || PRIORITIES[1];

// ---------- Label ----------
export const LABELS = [
  { id: "desain", label: "Desain", cls: "bg-pink-100 text-pink-700" },
  { id: "frontend", label: "Frontend", cls: "bg-sky-100 text-sky-700" },
  { id: "backend", label: "Backend", cls: "bg-violet-100 text-violet-700" },
  { id: "konten", label: "Konten", cls: "bg-emerald-100 text-emerald-700" },
  { id: "riset", label: "Riset", cls: "bg-indigo-100 text-indigo-700" },
  { id: "bug", label: "Bug", cls: "bg-red-100 text-red-700" },
];
export const labelById = (id) => LABELS.find((l) => l.id === id) || LABELS[0];

// ---------- Anggota tim (fiktif) ----------
export const MEMBERS = [
  { id: "m1", name: "Raka Pratama", initials: "RP", color: "#0284c7" },
  { id: "m2", name: "Salsabila Ningrum", initials: "SN", color: "#d97706" },
  { id: "m3", name: "Dimas Prasetyo", initials: "DP", color: "#7c3aed" },
  { id: "m4", name: "Alya Ramadhani", initials: "AR", color: "#db2777" },
  { id: "m5", name: "Bagas Wicaksono", initials: "BW", color: "#059669" },
  { id: "m6", name: "Nadia Kusuma", initials: "NK", color: "#4f46e5" },
];
export const memberById = (id) => MEMBERS.find((m) => m.id === id) || MEMBERS[0];

// Deadline = pukul 17.00 pada hari (hari ini + offset hari).
const deadlineFor = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(17, 0, 0, 0);
  return d.getTime();
};

// ---------- Proyek & tugas (fiktif) ----------
const PROJECT_SPECS = [
  {
    id: "p1",
    key: "LUM",
    name: "Redesain Website Kafe Lumut",
    desc: "Pembaruan total website kafe fiktif di Dago: identitas visual baru, menu interaktif, dan form reservasi.",
    tasks: [
      { title: "Riset kompetitor kafe lokal", assigneeId: "m2", priority: "sedang", labelId: "riset", dl: -6, col: "selesai" },
      { title: "Wireframe halaman menu & cerita", assigneeId: "m4", priority: "sedang", labelId: "desain", dl: -4, col: "selesai" },
      { title: "Desain sistem warna & tipografi", assigneeId: "m4", priority: "tinggi", labelId: "desain", dl: -2, col: "selesai" },
      { title: "Setup repo & scaffolding frontend", assigneeId: "m1", priority: "sedang", labelId: "frontend", dl: -5, col: "selesai" },
      { title: "Desain hero section baru", assigneeId: "m4", priority: "tinggi", labelId: "desain", dl: 1, col: "review" },
      { title: "Audit copywriting halaman", assigneeId: "m6", priority: "sedang", labelId: "konten", dl: 0, col: "review" },
      { title: "Bangun halaman beranda", assigneeId: "m1", priority: "tinggi", labelId: "frontend", dl: 2, col: "dikerjakan" },
      { title: "Perbaiki layout rusak di mobile", assigneeId: "m2", priority: "tinggi", labelId: "bug", dl: -1, col: "dikerjakan" },
      { title: "Halaman menu + filter kategori", assigneeId: "m3", priority: "sedang", labelId: "frontend", dl: 4, col: "dikerjakan" },
      { title: "Cutup aset ikon menu", assigneeId: "m1", priority: "rendah", labelId: "desain", dl: 3, col: "backlog" },
      { title: "Form reservasi meja", assigneeId: "m3", priority: "sedang", labelId: "frontend", dl: 6, col: "backlog" },
      { title: "Integrasi peta lokasi", assigneeId: "m5", priority: "rendah", labelId: "frontend", dl: 8, col: "backlog" },
    ],
  },
  {
    id: "p2",
    key: "HDK",
    name: "Peluncuran Aplikasi Hadirku v2",
    desc: "Rilis besar aplikasi absensi karyawan: check-in berbasis lokasi, notifikasi pengingat, dan rekap ekspor.",
    tasks: [
      { title: "Riset keluhan pengguna v1", assigneeId: "m6", priority: "tinggi", labelId: "riset", dl: -7, col: "selesai" },
      { title: "Susun backlog fitur v2", assigneeId: "m3", priority: "sedang", labelId: "riset", dl: -6, col: "selesai" },
      { title: "Desain ulang dashboard absensi", assigneeId: "m4", priority: "tinggi", labelId: "desain", dl: -3, col: "selesai" },
      { title: "Prototype alur check-in GPS", assigneeId: "m4", priority: "sedang", labelId: "desain", dl: 0, col: "review" },
      { title: "Draf catatan rilis v2", assigneeId: "m6", priority: "rendah", labelId: "konten", dl: 4, col: "review" },
      { title: "API check-in berbasis lokasi", assigneeId: "m5", priority: "tinggi", labelId: "backend", dl: 1, col: "dikerjakan" },
      { title: "Migrasi database absensi", assigneeId: "m2", priority: "tinggi", labelId: "backend", dl: -1, col: "dikerjakan" },
      { title: "Perbaiki duplikat jam check-out", assigneeId: "m3", priority: "tinggi", labelId: "bug", dl: -2, col: "dikerjakan" },
      { title: "Notifikasi pengingat absensi", assigneeId: "m5", priority: "sedang", labelId: "backend", dl: 3, col: "backlog" },
      { title: "Ekspor rekap ke PDF", assigneeId: "m1", priority: "rendah", labelId: "frontend", dl: 5, col: "backlog" },
      { title: "Store listing & screenshot", assigneeId: "m1", priority: "sedang", labelId: "konten", dl: 6, col: "backlog" },
      { title: "Uji penerimaan pengguna (UAT)", assigneeId: "m6", priority: "tinggi", labelId: "riset", dl: 7, col: "backlog" },
    ],
  },
  {
    id: "p3",
    key: "RMP",
    name: "Konten Media Sosial Rimpang",
    desc: "Kampanye konten bulanan toko tanaman hias: carousel tips, video perawatan, dan evaluasi performa.",
    tasks: [
      { title: "Evaluasi konten bulan lalu", assigneeId: "m6", priority: "sedang", labelId: "riset", dl: -4, col: "selesai" },
      { title: "Susun kalender konten bulan ini", assigneeId: "m6", priority: "tinggi", labelId: "konten", dl: -3, col: "selesai" },
      { title: "Shooting katalog tanaman hias", assigneeId: "m2", priority: "sedang", labelId: "konten", dl: -1, col: "selesai" },
      { title: "Naskah video repotting monstera", assigneeId: "m6", priority: "sedang", labelId: "konten", dl: 0, col: "review" },
      { title: "Perbaiki salah tag produk di carousel", assigneeId: "m3", priority: "sedang", labelId: "bug", dl: -1, col: "review" },
      { title: "Desain template carousel tips", assigneeId: "m4", priority: "sedang", labelId: "desain", dl: 1, col: "dikerjakan" },
      { title: "Balas DM pertanyaan perawatan", assigneeId: "m2", priority: "tinggi", labelId: "konten", dl: -2, col: "dikerjakan" },
      { title: "Jadwal posting minggu depan", assigneeId: "m2", priority: "rendah", labelId: "konten", dl: 2, col: "backlog" },
      { title: "Riset hashtag niche tanaman", assigneeId: "m3", priority: "rendah", labelId: "riset", dl: 3, col: "backlog" },
      { title: "Kolaborasi konten dengan kreator", assigneeId: "m4", priority: "rendah", labelId: "konten", dl: 5, col: "backlog" },
    ],
  },
];

// ---------- Aktivitas awal (sebagian dari "riwayat" tim) ----------
const ACTIVITY_SPECS = [
  { h: 50, projectId: "p1", actorId: "m1", type: "move", taskTitle: "Riset kompetitor kafe lokal", from: "backlog", to: "dikerjakan" },
  { h: 47, projectId: "p1", actorId: "m1", type: "move", taskTitle: "Riset kompetitor kafe lokal", from: "dikerjakan", to: "selesai" },
  { h: 30, projectId: "p1", actorId: "m4", type: "move", taskTitle: "Desain hero section baru", from: "dikerjakan", to: "review" },
  { h: 26, projectId: "p1", actorId: "m2", type: "move", taskTitle: "Perbaiki layout rusak di mobile", from: "backlog", to: "dikerjakan" },
  { h: 8, projectId: "p1", actorId: "m6", type: "move", taskTitle: "Audit copywriting halaman", from: "dikerjakan", to: "review" },
  { h: 72, projectId: "p2", actorId: "m6", type: "move", taskTitle: "Riset keluhan pengguna v1", from: "review", to: "selesai" },
  { h: 45, projectId: "p2", actorId: "m5", type: "move", taskTitle: "API check-in berbasis lokasi", from: "backlog", to: "dikerjakan" },
  { h: 27, projectId: "p2", actorId: "m3", type: "move", taskTitle: "Perbaiki duplikat jam check-out", from: "backlog", to: "dikerjakan" },
  { h: 10, projectId: "p2", actorId: "m4", type: "move", taskTitle: "Prototype alur check-in GPS", from: "dikerjakan", to: "review" },
  { h: 5, projectId: "p2", actorId: "m6", type: "move", taskTitle: "Draf catatan rilis v2", from: "backlog", to: "review" },
  { h: 60, projectId: "p3", actorId: "m6", type: "move", taskTitle: "Evaluasi konten bulan lalu", from: "dikerjakan", to: "selesai" },
  { h: 36, projectId: "p3", actorId: "m2", type: "move", taskTitle: "Balas DM pertanyaan perawatan", from: "backlog", to: "dikerjakan" },
  { h: 12, projectId: "p3", actorId: "m4", type: "move", taskTitle: "Desain template carousel tips", from: "backlog", to: "dikerjakan" },
  { h: 6, projectId: "p3", actorId: "m6", type: "move", taskTitle: "Naskah video repotting monstera", from: "dikerjakan", to: "review" },
  { h: 3, projectId: "p3", actorId: "m3", type: "move", taskTitle: "Perbaiki salah tag produk di carousel", from: "dikerjakan", to: "review" },
];

export const PROJECTS = PROJECT_SPECS.map(({ id, key, name, desc }) => ({ id, key, name, desc }));
export const projectById = (id) => PROJECTS.find((p) => p.id === id) || PROJECTS[0];

export const uid = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

// State awal lengkap: { tasks, activity } — dipanggil saat pertama kali
// (belum ada localStorage) atau saat reset demo.
export function buildSeed() {
  const tasks = [];
  PROJECT_SPECS.forEach((p) => {
    p.tasks.forEach((t) => {
      tasks.push({
        id: uid("t"),
        projectId: p.id,
        title: t.title,
        assigneeId: t.assigneeId,
        priority: t.priority,
        labelId: t.labelId,
        deadline: deadlineFor(t.dl),
        col: t.col,
      });
    });
  });

  const activity = ACTIVITY_SPECS.map((a) => ({
    id: uid("a"),
    ts: Date.now() - a.h * H,
    projectId: a.projectId,
    actor: memberById(a.actorId).name,
    type: a.type,
    taskTitle: a.taskTitle,
    from: a.from,
    to: a.to,
  })).sort((x, y) => y.ts - x.ts);

  return { tasks, activity };
}

// ---------- Helper statistik ----------
export const startOfDay = (ts) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// Tugas overdue: lewat deadline & belum masuk kolom Selesai.
export const isOverdue = (task) =>
  task.col !== "selesai" && startOfDay(task.deadline) < startOfDay(Date.now());

export const nearestDeadline = (tasks) => {
  const open = tasks.filter((t) => t.col !== "selesai");
  if (!open.length) return null;
  return open.reduce((a, b) => (a.deadline <= b.deadline ? a : b));
};
