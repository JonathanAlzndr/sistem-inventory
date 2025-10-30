import React from "react";
import { FaHistory } from "react-icons/fa";

const DataTransaksi = [
  { tanggal: "2025-10-01", jenis: "Superwing", tipe: "Masuk", jumlah: 120 },
  { tanggal: "2025-10-02", jenis: "Superwing", tipe: "Keluar", jumlah: 80 },
  { tanggal: "2025-10-03", jenis: "Dua Merpati", tipe: "Masuk", jumlah: 150 },
  { tanggal: "2025-10-04", jenis: "Membramo", tipe: "Keluar", jumlah: 100 },
  { tanggal: "2025-10-05", jenis: "Dua Merpati", tipe: "Masuk", jumlah: 90 },
  { tanggal: "2025-10-06", jenis: "Rojolele", tipe: "Keluar", jumlah: 60 },
  { tanggal: "2025-10-07", jenis: "C4", tipe: "Masuk", jumlah: 200 },
  { tanggal: "2025-10-08", jenis: "Mentari", tipe: "Masuk", jumlah: 75 },
];

export default function In_Out() {
  return (
    <div className="w-[720px] bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg mb-1 flex items-center gap-2">
        <FaHistory className="text-red-600" /> Riwayat Beras Masuk & Keluar
      </h2>
      <p className="text-gray-500 text-[12px] mb-4">
        Menampilkan aktivitas stok beras dalam 7 hari terakhir.
      </p>

      {/* wrapper scroll */}
      <div className="max-h-[250px] overflow-y-auto">
        <table className="w-full text-sm text-center border border-gray-100 rounded-lg">
          <thead className="bg-gray-100 mb-5 border-gray-100  sticky top-0 z-20  shadow-sm">
            <tr>
              <th className="px-4 py-3 font-semibold border-b">Tanggal</th>
              <th className="px-4 py-3 font-semibold border-b">Jenis Beras</th>
              <th className="px-4 py-3 font-semibold border-b">Status</th>
              <th className="px-4 py-3 font-semibold border-b">Jumlah (kg)</th>
            </tr>
          </thead>
          <tbody>
            {DataTransaksi.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition text-center"
              >
                <td className="px-4 py-3 border-b text-gray-700">
                  {row.tanggal}
                </td>
                <td className="px-4 py-3 border-b text-gray-700">{row.jenis}</td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.tipe === "Masuk"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.tipe}
                  </span>
                </td>
                <td className="px-4 py-3 border-b text-gray-500">
                  {row.jumlah}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
