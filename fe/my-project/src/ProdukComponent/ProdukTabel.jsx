import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import BttnEkspor from "../kecilComponent/bttnEkspor";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CgAddR } from "react-icons/cg";
import { toast } from "react-toastify";
import Loading from "../kecilComponent/Loading";
import KonfirmasiModal from "../kecilComponent/InfoKonfirmasi";
import { useWeightFilter, useProdukFiltered } from "./UseProdukFilter";

export default function ProdukTabel({
  setEditData,
  setProdukList,
  produkList,
  setIsOpen,
}) {
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // 1. dropdown berat
  const { weightList, selectedWeight, setSelectedWeight } = useWeightFilter();

  // 2. produk terfilter
  const {
    produkList: produkFiltered,
    setProdukList: setProdukListFiltered,
    loading: loadingFiltered,
  } = useProdukFiltered(selectedWeight);

  const handleExport = () => {
    if (produkList.length === 0) {
      toast.info("Tidak ada data untuk diekspor!");
      return;
    }

    const doc = new jsPDF();

    // --- 1. MEMBUAT HEADER PERUSAHAAN ---

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight(); // (Opsional, untuk footer)
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Judul Perusahaan (Besar dan di Tengah)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CR.JAYA", pageWidth / 2, 20, { align: "center" });

    // Judul Laporan (Lebih kecil, di bawahnya)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Laporan Data Produk", pageWidth / 2, 30, { align: "center" });

    // Tanggal Cetak (Kecil, di kiri)
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${today}`, 14, 40); // 14 adalah margin kiri

    // Garis Pemisah
    doc.setDrawColor(180, 180, 180); // Warna garis abu-abu
    doc.line(14, 45, pageWidth - 14, 45); // Garis dari margin kiri ke kanan

    // --- 2. MEMBUAT TABEL (Sama seperti sebelumnya) ---

    const tableHeaders = [
      "Nama Produk",
      "Berat (kg)",
      "Stok",
      "Harga Jual",
      "Harga Beli",
      "Tgl. Masuk",
    ];

    const tableBody = produkList.map((p) => [
      p.productName,
      p.weight,
      p.currentStock,
      `Rp${Number(p.sellPrice || 0).toLocaleString("id-ID")}`,
      `Rp${Number(p.purchasePrice || 0).toLocaleString("id-ID")}`,
      p.receivedDate
        ? new Date(p.receivedDate).toLocaleDateString("id-ID")
        : "-",
    ]);

    // Gunakan 'autoTable' sebagai fungsi
    autoTable(doc, {
      startY: 50, // <-- PENTING: Mulai tabel di bawah header (Y=50)
      head: [tableHeaders],
      body: tableBody,
      theme: "grid",

      // --- 3. (OPSIONAL) MEMBUAT FOOTER/NOMOR HALAMAN ---
      // Ini akan otomatis menambahkan footer di SETIAP halaman
      didDrawPage: (data) => {
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(
          `Halaman ${data.pageNumber} dari ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10, // Posisi 10mm dari bawah
          { align: "center" }
        );
      },
    });

    // --- 4. SIMPAN FILE ---
    doc.save("Laporan-Produk-CRJAYA.pdf");
    toast.success("Data berhasil diekspor!");
  };

  // Ambil data produk saat pertama kali load
  const fetchProduk = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan! Silakan login ulang.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        "http://127.0.0.1:5000/api/products/?limit=1000&offset=0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          toast.info("Sesi Anda berakhir, silakan login ulang.");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.msg || "Gagal mengambil data produk");
      }

      const data = await res.json();
      setProdukList(data.productList || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Terjadi kesalahan saat mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  //  Hapus produk langsung dari list

  const executeDelete = async () => {
    // Tutup modal dan mulai loading
    setShowDeleteModal(false);
    setIsActionLoading(true);
    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        // Gunakan 'idToDelete' dari state
        `http://127.0.0.1:5000/api/products/${idToDelete}/deactivate`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Produk berhasil dihapus!");
        setProdukList(
          (prev) => prev.filter((p) => p.productId !== idToDelete) // Gunakan idToDelete
        );
      } else {
        toast.error(data.msg || "Gagal menghapus produk");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan server saat menghapus produk!");
    } finally {
      await minDelay;
      setIsActionLoading(false); // Hentikan loading
      setIdToDelete(null); // Bersihkan ID
    }
  };
  const openDeleteModal = (id) => {
    setIdToDelete(id); // Simpan ID yang akan dihapus
    setShowDeleteModal(true); // Buka modal
  };

  if (loadingFiltered) {
    return (
      <p className="text-gray-500 text-center mt-4">Memuat data produk...</p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header atas */}
      <Loading isLoading={isActionLoading} />
      {/* 5. PASANG MODAL KONFIRMASI DI SINI */}
      <KonfirmasiModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={executeDelete}
        title="Konfirmasi Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini? Stok akan dinonaktifkan."
      />
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-700">Daftar Produk</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditData(null); // keluar dari mode edit
              setIsOpen(true);
            }}
            className="hover:scale-102 duration-95 p-1 border rounded-[7px] bg-green-500 border-gray-300 text-white text-[13px] w-[140px] gap-2 flex items-center justify-center"
          >
            Tambah Produk <CgAddR className="text-[14px]" />
          </button>
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="p-2 border border-gray-300 rounded-[7px] w-[140px]  text-sm bg-gray-50"
          >
            <option value="">Semua</option>
            {weightList.map((w) => (
              <option key={w} value={w}>
                {w} kg
              </option>
            ))}
          </select>

          <BttnEkspor onClick={handleExport} />
        </div>
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
            {produkFiltered.length > 0 ? (
              produkFiltered.map((item, index) => (
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
                    {item.currentStock == 0 ? "Habis" : item.currentStock}
                  </td>
                  <td className="p-3 text-gray-600">
                    {item.receivedDate
                      ? new Date(item.receivedDate).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => setEditData(item)}
                      className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item.productId)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
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
