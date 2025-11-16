import React, { useState, useEffect } from "react";
import { FaHistory } from "react-icons/fa";

// Helper function untuk format tanggal
const formatTanggal = (isoDate) => {
  const date = new Date(isoDate);
  // Tampilkan waktu juga, karena ini log harian
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function untuk mengecek apakah tanggal "hari ini"
const isToday = (isoDate) => {
  const date = new Date(isoDate);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export default function In_Out() {
  const [combinedLog, setCombinedLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token tidak ditemukan. Silakan login ulang.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        // --- 1. Ambil "STOK MASUK" dari API Products (Filter Hari Ini) ---
        const productsRes = await fetch(
          "http://127.0.0.1:5000/api/products/?limit=1000&offset=0",
          { headers }
        );
        if (!productsRes.ok) throw new Error("Gagal mengambil data produk");
        const productData = await productsRes.json();
        
        const mappedIn = productData.productList
          .filter((p) => isToday(p.receivedDate)) // <-- FILTER HARI INI
          .map((p) => ({
            id: `in-${p.productId}`,
            tanggal: new Date(p.receivedDate),
            jenis: p.productName,
            tipe: "Masuk",
            jumlah: p.weight, 
          }));

        // --- 2. Ambil "STOK KELUAR" (Filter Hari Ini) ---
        
        // 2a. Ambil daftar ID transaksi HARI INI
        const transListRes = await fetch(
          "http://127.0.0.1:5000/api/transaction/", 
          { headers }
        );
        if (!transListRes.ok) throw new Error("Gagal mengambil daftar transaksi");
        const transListData = await transListRes.json();
        
        // Filter transaksi HARI INI sebelum mengambil detail
        const transactionsToday = transListData.transactionList
          .filter((t) => isToday(t.transactionDate)); // <-- FILTER HARI INI
        
        const transactionIdsToday = transactionsToday.map((t) => t.transactionId);

        // 2b. Jika tidak ada transaksi hari ini, lewati
        let mappedOut = [];
        if (transactionIdsToday.length > 0) {
          // 2c. Ambil detail HANYA untuk transaksi hari ini
          const detailPromises = transactionIdsToday.map((id) =>
            fetch(`http://127.0.0.1:5000/api/transaction/${id}`, { headers })
          );

          const detailResponses = await Promise.all(detailPromises);
          
          const detailJsonPromises = detailResponses.map((res) => {
            if (!res.ok) throw new Error("Gagal mengambil detail transaksi");
            return res.json();
          });
          const transactionDetails = await Promise.all(detailJsonPromises);

          // 2d. Ubah data detail menjadi format log
          transactionDetails.forEach((trans) => {
            trans.items.forEach((item, index) => {
              mappedOut.push({
                id: `out-${trans.transactionId}-${index}`,
                tanggal: new Date(trans.transactionDate),
                jenis: item.productName,
                tipe: "Keluar",
                jumlah: item.quantity,
              });
            });
          });
        }

        // --- 3. Gabungkan dan Urutkan ---
        const allLogs = [...mappedIn, ...mappedOut];
        allLogs.sort((a, b) => b.tanggal - a.tanggal); // Urutkan terbaru di atas

        setCombinedLog(allLogs);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLogs();
  }, []); // [] = jalankan sekali

  if (loading) {
    return (
      <div className="w-[720px] bg-white rounded-2xl shadow-md p-5">
        Memuat riwayat hari ini...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[720px] bg-white rounded-2xl shadow-md p-5 text-red-500">
        Error: {error}
      </div>
    );
  }

  // Render komponen
  return (
    <div className="w-[720px] bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg mb-1 flex items-center gap-2">
        <FaHistory className="text-red-600" /> Riwayat Stok Hari Ini
      </h2>
      <p className="text-gray-500 text-[12px] mb-4">
        Menampilkan semua aktivitas stok beras hari ini.
      </p>

      <div className="max-h-[270px] overflow-y-auto">
        <table className="w-full text-sm text-center border border-gray-100 rounded-lg">
          <thead className="bg-gray-100 mb-5 border-gray-100 sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-semibold border-b">Waktu</th>
              <th className="px-4 py-3 font-semibold border-b">Jenis Beras</th>
              <th className="px-4 py-3 font-semibold border-b">Status</th>
              <th className="px-4 py-3 font-semibold border-b">Stok</th>
            </tr>
          </thead>
          <tbody>
            {combinedLog.length > 0 ? (
              combinedLog.map((row) => (
                <tr
                  key={row.id} 
                  className="hover:bg-gray-50 transition text-center"
                >
                  <td className="px-4 py-3 border-b text-gray-700">
                    {/* Ubah format tanggal jadi jam */}
                    {formatTanggal(row.tanggal)}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {row.jenis}
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Belum ada aktivitas stok hari ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}