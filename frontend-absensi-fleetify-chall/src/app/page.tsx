export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold">Welcome to Fleetify Absensi</h1>
      <p className="mt-4 text-gray-600">Kelola absensi, karyawan, dan departemen dengan mudah.</p>
      <a
        href="/attendance"
        className="mt-6 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Masuk ke Dashboard Absensi
      </a>
    </main>
  );
}
