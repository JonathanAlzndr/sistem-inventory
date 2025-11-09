import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import BttnEkspor from "../kecilComponent/bttnEkspor";

export default function ProdukTabel() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExport = () => {
    alert("Fitur ekspor data masih coming soon 🚀");
  };

  const fetchProduk = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan! Silakan login ulang.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://127.0.0.1:5000/api/products/?limit=20&offset=0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Wajib agar tidak 401
        },
      });

      if (!res.ok) {
        // Kalau token salah / expired
        if (res.status === 401) {
          alert("Sesi Anda telah berakhir. Silakan login ulang.");
          localStorage.removeItem("token");
          window.location.href = "/"; 
          return;
        }

  
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.msg || "Gagal mengambil data produk");
      }

      const data = await res.json();
      setProdukList(data.productList || []);
      console.log(data)
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Terjadi kesalahan saat mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchProduk();

  const refreshHandler = () => {
    fetchProduk();
  };
   window.addEventListener("storage", refreshHandler);
  return () => window.removeEventListener("storage", refreshHandler);
}, []);

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Memuat data produk...</p>;
  }


  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header atas */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-700">Daftar Produk</h2>
        <BttnEkspor onClick={handleExport} />
      </div>

      {/* Tabel produk */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-scroll rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Nama Produk</th>
              <th className="p-3">Berat</th>
              <th className="p-3">Harga Beli</th>
              <th className="p-3">Harga Jual</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Tanggal Masuk</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {produkList.length > 0 ? (
              produkList.map((item, index) => (
                <tr
                  key={item.productId || index}
                  className="hover:bg-gray-50 transition border-b border-gray-100 last:border-none"
                >
                  <td className="p-3">{index + 1}.</td>
                  <td className="p-3 text-gray-700 font-medium flex items-center gap-2">
                    {item.imgPath && (
                      <img
                        src={item.imgPath}
                        alt={item.productName}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    {item.productName}
                  </td>
                  <td className="p-3 text-gray-600">{item.weight} kg</td>
                  <td className="p-3 text-gray-600">
                    Rp{Number(item.purchasePrice || 0).toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-600">
                    Rp{Number(item.sellPrice || 0).toLocaleString()}
                  </td>
                  <td
                    className={`p-3 font-medium ${
                      item.currentStock <= 5
                        ? "text-red-500"
                        : item.currentStock < 15
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.currentStock}
                  </td>
                  <td className="p-3 text-gray-600">
                    {item.receivedDate
                      ? new Date(item.receivedDate).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">
                      <FaEdit />
                    </button>
                    <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-4">
                  Tidak ada produk ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
