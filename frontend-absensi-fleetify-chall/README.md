# Fleetify Absensi - Frontend

Katakan ini deskripsinya:

Fleetify Absensi adalah aplikasi frontend untuk sistem manajemen absensi berbasis **Next.js**, **React**, dan **TailwindCSS** dengan dukungan **shadcn/ui** untuk komponen modern.  
Aplikasi ini terintegrasi dengan backend Laravel untuk manajemen karyawan, departemen, serta pencatatan absensi.

Dikerjakan oleh **Izamul Fikri** untuk test masuk Fleetify.

---

## Fitur Utama
- **Dashboard Absensi**  
  - Menampilkan data absensi dengan filter (hari ini, rentang tanggal, bulanan, tahunan, semua data).  
  - Statistik KPI absensi (terlambat, pulang cepat, kehadiran lengkap, dll).  
  - Aksi check-in & check-out dengan verifikasi Captcha.

- **Manajemen Karyawan**  
  - Tambah, edit, hapus karyawan.  
  - Setiap karyawan terhubung dengan departemen.  

- **Manajemen Departemen**  
  - Tambah, edit, hapus departemen.  
  - Atur jam maksimal masuk & keluar.

- **UI Modern**  
  - Dibangun dengan [shadcn/ui](https://ui.shadcn.com/) dan [TailwindCSS](https://tailwindcss.com/).  
  - Ikon dari [Lucide React](https://lucide.dev/).

---

## Tech Stack
- **Next.js 13+ (App Router, TypeScript, React 18)**  
- **TailwindCSS** untuk styling.  
- **shadcn/ui** sebagai library UI.  
- **Lucide React** untuk ikon.  
- **Backend Laravel** sebagai API server.

---

## Instalasi

1. **Clone repository**  
   ```bash
   git clone repo ini
   cd folder project
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**  
   Buat file `.env.local` di root project jika belum ada:

   ```env
   NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
   ```

4. **Jalankan development server**  
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

   Akses di [http://localhost:3000](http://localhost:3000).

---

## Struktur Project

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Halaman utama (AttendancePage)
│   └── attendance/      # Kalau ada rute khusus misal /attendance
│       └── page.tsx     # Optional, halaman lain
│
├── components/
│   ├── attendance/
│   │   ├── AttendanceDashboard.tsx
│   │   ├── CaptchaGate.tsx
│   │   ├── FilterLogs.tsx
│   │   ├── LogTable.tsx
│   │   ├── types.ts
│   │   └── utils.ts
│   │
│   ├── departments/
│   │   └── DepartmentManagement.tsx
│   │
│   ├── employees/
│   │   └── EmployeeManagement.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/              # shadcn/ui components (hasil generate shadcn)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── ...
└── styles/
    └── globals.css      # Style global

```

---

© 2025 Izamul Dapet Kerja
