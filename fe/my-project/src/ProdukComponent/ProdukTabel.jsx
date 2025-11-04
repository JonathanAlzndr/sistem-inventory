import React from "react";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import BttnEkspor from "../kecilComponent/bttnEkspor";

const dummyProduk = [
  {
    id: 1,
    nama: "Beras Dua Merpati",
    kategori: "5kg",
    hargaBeli: 45000,
    hargaJual: 50000,
    stok: 30,
    tanggalMasuk: "2025-10-20",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 3,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 4,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 5,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 6,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 7,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
  {
    id: 8,
    nama: "Beras Pandan Wangi",
    kategori: "10kg",
    hargaBeli: 85000,
    hargaJual: 90000,
    stok: 12,
    tanggalMasuk: "2025-10-25",
    gambar: "https://via.placeholder.com/60",
  },
];

export default function ProdukTabel() {
  const handleExport = () => {
    // nanti bisa ganti ke ekspor Excel / CSV
    alert("Fitur ekspor data masih coming soon 🚀");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header atas */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-700">
          Daftar Produk
        </h2>
        <BttnEkspor
        onClick={handleExport}/>
 
      </div>

      {/* Tabel produk */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-scroll rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left ">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className=" ">
              <th className="p-3 ">No</th>
              <th className="p-3 ">Nama Produk</th>
              <th className="p-3 ">Kategori</th>
              <th className="p-3 ">Harga Beli</th>
              <th className="p-3 ">Harga Jual</th>
              <th className="p-3 ">Stok</th>
              <th className="p-3 ">Tanggal Masuk</th>
              <th className="p-3 text-center  ">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {dummyProduk.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition border-b border-gray-100 last:border-none"
              >
                <td className="p-3">
                  {item.id}.
                </td>
                <td className="p-3  text-gray-700 font-medium">{item.nama}</td>
                <td className="p-3 text-gray-600">{item.kategori}</td>
                <td className="p-3 text-gray-600">
                  Rp{item.hargaBeli.toLocaleString()}
                </td>
                <td className="p-3 text-gray-600">
                  Rp{item.hargaJual.toLocaleString()}
                </td>
                <td
                  className={`p-3 font-medium ${
                    item.stok <= 5
                      ? "text-red-500"
                      : item.stok < 15
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {item.stok}
                </td>
                <td className="p-3 text-gray-600">{item.tanggalMasuk}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
