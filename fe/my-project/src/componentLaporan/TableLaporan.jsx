import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

const TABLE_HEAD = [
  "Nama Beras",
  "Tanggal Masuk",
  "Kategori",
  "Stok saat ini",
  "Status",
];

// Helper function untuk menentukan status berdasarkan stok
const getStatusByStock = (stock) => {
  if (stock <= 0) {
    return "Habis";
  }
  if (stock <= 10) {
    // Anda bisa ubah angka 5 ini jika perlu
    return "Menipis";
  }
  return "Aman";
};

export default function TableLaporan({
  pilihStatus,
  CariProduk,
  setExportHandler,
}) {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaporanProduk = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan, silakan login ulang.");
        }

        const res = await fetch(
          "http://127.0.0.1:5000/api/products/?limit=100&offset=0",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`Gagal mengambil data: ${res.status}`);
        }

        const data = await res.json();

        // Format data API
        const formattedData = data.productList.map((p) => ({
          nama: p.productName,
          tanggalMasuk: new Date(p.receivedDate).toLocaleDateString("id-ID"),
          kategori: `${p.weight} kg`,
          Stok: p.currentStock,

          // Status sekarang dihitung berdasarkan stok
          status: getStatusByStock(p.currentStock),
        }));

        setProdukList(formattedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporanProduk();
  }, []); // [] = Hanya berjalan sekali saat komponen dimuat

  const FilterData = produkList.filter((item) => {
    const namaProduk = item.nama || "";

    // Pastikan 'pilihStatus' ada sebelum di-toLowerCase()
    const statusFilter = pilihStatus || "Semua";

    const cocokStatus =
      statusFilter === "Semua" || item.status === statusFilter;
    const cocokNama = namaProduk
      .toLowerCase()
      .includes(CariProduk.toLowerCase());
    return cocokStatus && cocokNama;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Aman":
        return "bg-green-100 text-green-700";
      case "Menipis":
        return "bg-yellow-100 text-yellow-700";
      case "Habis":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleExport = useCallback(() => {
    if (produkList.length === 0) {
      alert("Tidak ada data transaksi untuk diekspor!");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CR.JAYA", pageWidth / 2, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Laporan Data Total stok Di Gudang", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${today}`, 14, 40);
    doc.setDrawColor(180, 180, 180);
    doc.line(14, 45, pageWidth - 14, 45);

    const tableHeaders = [
      "Nama Beras",
      "Tanggal Masuk",
      "Kategori",
      "Stok saat ini",
      "Status",
    ];

    const tableBody = produkList.map((p) => [
      p.nama,
      p.tanggalMasuk,
      p.kategori,
      p.Stok,
      p.status,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [tableHeaders],
      body: tableBody,
      theme: "grid",
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(
          `Halaman ${data.pageNumber} dari ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      },
    });

    doc.save("Laporan-TotalStok-CRJAYA.pdf");
  }, [produkList]);

  // --- 4. useEffect UNTUK REGISTRASI DIPINDAHKAN KELUAR ---
  useEffect(() => {
    setExportHandler(() => handleExport);
  }, [handleExport, setExportHandler]);

  if (loading) {
    return (
      <div className="h-[450px] rounded-[10px] shadow-md bg-white flex items-center justify-center">
        <p className="text-gray-500">Memuat data laporan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[450px] rounded-[10px] shadow-md bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className=" h-ful overflow-y-scroll max-h-[450px] rounded-[10px] shadow-md bg-white">
      <table className="w-full min-w-max text-left border-collapse">
        <thead className="sticky top-0">
          <tr className="bg-gray-100">
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="p-4 text-gray-700 font-semibold text-sm"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          key={pilihStatus}
          className=" overflow-y-scroll duration-500 ease-in-out animate-fadeIn transition-all max-h-[450px] "
        >
          {FilterData.length === 0 ? (
            <tr>
              <td
                colSpan={TABLE_HEAD.length}
                className="text-center p-4 text-gray-500"
              >
                Tidak ada data yang ditemukan.
              </td>
            </tr>
          ) : (
            FilterData.map((row, index) => {
              const isLast = index === FilterData.length - 1;
              const rowClass = isLast ? "p-4 " : "p-4 border-b border-gray-200";

              return (
                <tr key={index} className="px-1 hover:bg-gray-50 ">
                  <td className={rowClass} w-full>
                    {row.nama}
                  </td>
                  <td className={rowClass}>{row.tanggalMasuk}</td>
                  <td className={rowClass}>{row.kategori}</td>
                  <td className={rowClass}>{row.Stok}</td>
                  <td className={`${rowClass}`}>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
