import React, { useState } from "react";

const FormCatat = ({ isOpen, onClose, cart ,setRefreshTrigger}) => {
  if (!isOpen) return null;

  // State input user
  const [namaPemesan, setNamaPemesan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [loading, setLoading] = useState(false);

  // Hitung total item & harga hanya untuk tampilan
  const totalItem = cart.reduce((acc, item) => acc + (item.jumlah || 0), 0);
  const totalHarga = cart.reduce(
    (acc, item) => acc + (item.harga || 0) * (item.jumlah || 0),
    0
  );

  const handleSimpan = async () => {
    if (cart.length === 0) {
      alert("Tidak ada produk yang dipilih!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }

      // Format sesuai backend: items = [{productId, jumlah}]
      const payload = {
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          jumlah: item.jumlah || 1,
        })),
      };

      const res = await fetch("http://127.0.0.1:5000/api/transaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Gagal simpan transaksi: ${res.status} - ${JSON.stringify(errorData)}`
        );
      }

      const data = await res.json();
      console.log("Transaksi berhasil:", data);
      alert("Transaksi berhasil dicatat!");

        // Trigger refresh tabel
    setRefreshTrigger(prev => prev + 1);

    // Reset form & tutup
    setNamaPemesan("");
    setTanggal("");
    setWaktu("");
    onClose();

    } catch (err) {
      console.error("Error simpan transaksi:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[471px] h-[510px] p-5 flex flex-col space-y-3 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-start">Pencatatan</h2>

        {/* Info Section */}
        <div className="border rounded-[10px] p-5 space-y-3">
          <div className="flex justify-between text-sm border-b h-8 text-gray-600">
            <span>Jumlah Pesanan</span>
            <span>{totalItem}x</span>
          </div>
          <span>Total Pemesanan</span>
          <p className="text-center text-xl font-bold mt-3 text-gray-800">
            Rp {totalHarga.toLocaleString()}
          </p>
        </div>

        {/* Form Input */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Nama Pemesan</label>
            <input
              type="text"
              value={namaPemesan}
              onChange={(e) => setNamaPemesan(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Masukkan nama pemesan"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1">Waktu</label>
              <input
                type="time"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            onClick={handleSimpan}
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCatat;
