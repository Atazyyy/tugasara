export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });

export const fmtDateFull = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Waktu relatif untuk log aktivitas.
export const relTime = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d === 1) return "kemarin";
  if (d < 7) return `${d} hari lalu`;
  return fmtDate(ts);
};

// Metadata deadline sebuah tugas: label ramah + flag overdue.
export const deadlineMeta = (ts) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dl = new Date(ts);
  dl.setHours(0, 0, 0, 0);
  const diff = Math.round((dl.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return { overdue: true, label: `Terlambat ${-diff} hr` };
  if (diff === 0) return { overdue: false, label: "Hari ini" };
  if (diff === 1) return { overdue: false, label: "Besok" };
  return { overdue: false, label: fmtDate(ts) };
};

// YYYY-MM-DD lokal untuk <input type="date">.
export const toISODateInput = (ts = Date.now()) => {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

// Konversi "YYYY-MM-DD" dari date input → timestamp pukul 17.00.
export const fromISODateInput = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 17, 0, 0, 0).getTime();
};
