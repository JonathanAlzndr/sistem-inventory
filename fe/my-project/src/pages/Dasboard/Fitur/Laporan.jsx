import React from "react";

// Ini adalah halaman yang akan muncul di dalam <Outlet />
export default function Laporan() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Halaman Laporan</h2>
      <p>
        Ini adalah konten untuk halaman laporan. Konten ini akan muncul di dalam
        layout utama (di sebelah Sidebar dan di bawah Navbar).
      </p>
      {/* Tambahkan tabel, chart, atau apa pun di sini */}
    </div>
  );
}
