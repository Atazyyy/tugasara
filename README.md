Kategori: Web App — Project Management Tool

# Tugasara — Papan Kanban & Manajemen Proyek

> **Kategori proyek: Web App — Project Management Tool.**
> Workspace manajemen proyek dengan papan kanban 4 kolom, switcher tiga
> proyek, progress bar, status overdue, dan log aktivitas tim.

Aplikasi manajemen proyek fiktif "Tugasara" untuk workspace digital studio
"Studio Antara". Proyek ini adalah **concept demo** untuk portofolio jasa
pembuatan web app — seluruh nama, proyek, tugas, dan anggota tim bersifat
fiktif. Nama "Tugasara" sengaja dibuat unik (belum dipakai entita mana pun
di internet).

**Live:** https://tugasara.vercel.app

## Fitur

- **Switcher 3 proyek**: Redesain Website Kafe Lumut, Peluncuran Aplikasi
  Hadirku v2, dan Konten Media Sosial Rimpang — masing-masing dengan papan
  dan statistiknya sendiri.
- **Papan kanban 4 kolom**: Backlog → Dikerjakan → Review → Selesai, dengan
  penghitung jumlah kartu per kolom.
- **Kartu tugas**: judul, assignee (avatar inisial), badge prioritas,
  badge label, deadline (berubah merah + "Terlambat x hr" saat lewat), dan
  avatar PIC.
- **Pindah kolom pakai tombol ◀ ▶** di tiap kartu (tanpa drag & drop),
  plus tambah tugas via modal (judul, PIC, prioritas, label, deadline,
  kolom tujuan) dan hapus tugas dengan konfirmasi inline.
- **Header proyek**: progress bar % tugas selesai (animasi), jumlah tugas
  overdue, deadline terdekat, dan avatar anggota tim.
- **Tab Aktivitas**: log perpindahan tugas antar kolom (plus penambahan &
  penghapusan) dengan filter per proyek dan waktu relatif.
- Seluruh data tersimpan di **localStorage** — tombol "Reset data demo"
  memuat ulang data awal.
- Responsif desktop + mobile (kolom menyesuaikan lebar layar), animasi
  halus Framer Motion, ikon Lucide, tanpa backend & tanpa library chart.

## Untuk siapa demo ini?

Agensi digital, studio kreatif, tim produk, atau bisnis apa pun yang butuh
papan kanban ringan untuk mengatur proyek klien tanpa setup rumit.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.
