import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DetailPesanan from "./DetailPesanan";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DeleteKonfirmasi from "./DeleteKonfirmasi";
import { toast } from "react-toastify";
import Loading from "../kecilComponent/Loading";
import { FaRepeat } from "react-icons/fa6";
import ReturKonfirmasi from "../kecilComponent/ReturKonfirmasi";

const TableTransaksi = ({ refreshTrigger, setExportHandler }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // Untuk loading halaman awal
  const [isActionLoading, setIsActionLoading] = useState(false); // Untuk hapus/edit

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [showReturModal, setShowReturModal] = useState(false);
  const [idToRetur, setIdToRetur] = useState(null);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ada, silakan login ulang");
          return;
        }

        const res = await fetch("http://127.0.0.1:5000/api/transaction/", {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`Gagal ambil transaksi: ${res.status}`);

        const data = await res.json();
        setTransactionList(data.transactionList || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchTransaksi();
  }, [refreshTrigger]);

  const handleDetail = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setShowDetail(true);
  };

  const executeDelete = async (password) => {
    if (!password) {
      toast.warn("Password tidak boleh kosong!");
      return;
    }
    // MULAI LOADING
    setShowDeleteModal(false);
    setIsActionLoading(true);
    //jeda minimum
    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token tidak ada, silakan login ulang.");
        return;
      }

      const res = await fetch(
        `http://127.0.0.1:5000/api/transaction/${idToDelete}`, // Gunakan idToDelete
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || `Gagal menghapus: ${res.status}`);
      }

      setTransactionList((prevList) =>
        prevList.filter((trx) => trx.transactionId !== idToDelete)
      );
      toast.success("Transaksi berhasil dihapus.");
    } catch (err) {
      console.error("Error deleting transaction:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      await minDelay; // Tunggu sisa waktu minimum
      setIsActionLoading(false);
      setIdToDelete(null);
    }

    setShowDeleteModal(false);
    setIdToDelete(null);
  };

const executeRetur = async (password) => {
  if (!password) {
    toast.warn("Password tidak boleh kosong!");
    return;
  }

  setShowReturModal(false);
  setIsActionLoading(true);

  const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://127.0.0.1:5000/api/transaction/${idToRetur}/retur`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Gagal memproses retur");
    }

    // update list transaksi
    setTransactionList((prev) =>
      prev.filter((trx) => trx.transactionId !== idToRetur)
    );

    toast.success("Retur berhasil. Stok dikembalikan.");
  } catch (err) {
    toast.error(err.message);
  } finally {
    await minDelay;
    setIsActionLoading(false);
    setIdToRetur(null);
  }
};


  //3. FUNGSI HANDLEEXPORT
  const handleExport = useCallback(() => {
    if (transactionList.length === 0) {
      toast.info("Tidak ada data transaksi untuk diekspor!");
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
    doc.text("Laporan Data Transaksi", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${today}`, 14, 40);
    doc.setDrawColor(180, 180, 180);
    doc.line(14, 45, pageWidth - 14, 45);

    const tableHeaders = [
      "ID Transaksi",
      "Nama Pemesan",
      "Tanggal",
      "Waktu",
      "Total Item",
      "Total Harga",
    ];

    const tableBody = transactionList.map((trx) => [
      `T-${trx.transactionId}`,
      trx.customerName || "-",
      new Date(trx.transactionDate).toLocaleDateString("id-ID"),
      new Date(trx.transactionDate).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      trx.totalItems,
      `Rp.${Number(trx.totalPrice).toLocaleString("id-ID")}`,
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

    doc.save("Laporan-Transaksi-CRJAYA.pdf");
    toast.success("Berhasil di unduh");
  }, [transactionList]);

  //  useEffect UNTUK REGISTRASI
  useEffect(() => {
    setExportHandler(() => handleExport);
  }, [handleExport, setExportHandler]);

  //KONDISI LOADING HALAMAN
  if (isPageLoading) {
    return (
      <div className="w-full text-center p-10">
        <p className="text-gray-500">Memuat data transaksi...</p>
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto mt-3">
      <Loading isLoading={isActionLoading} />
      <div className="max-h-[350px] overflow-y-auto relative rounded-lg">
        <table className="w-full text-[13px] text-gray-700 border-collapse">
          <thead className="sticky top-0 z-20 bg-gray-100 shadow-sm">
            <tr className="text-center">
              <th className="px-3 py-2 border-b border-gray-300">No</th>
              <th className="px-3 py-2 border-b border-gray-300">
                ID Transaksi
              </th>
              {/* KOLOM BARU 1 */}
              <th className="px-3 py-2 border-b border-gray-300 text-left">
                Nama Pemesan
              </th>
              <th className="px-3 py-2 border-b border-gray-300">Tanggal</th>
              {/* KOLOM BARU 2 */}
              <th className="px-3 py-2 border-b border-gray-300">Waktu</th>
              <th className="px-3 py-2 border-b border-gray-300">Total Item</th>
              <th className="px-3 py-2 border-b border-gray-300">
                Total Harga
              </th>
              <th className="px-3 py-2 border-b border-gray-300">
                Detail Pesanan
              </th>
              <th className="px-3 py-2 border-b border-gray-300">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-center ">
            {transactionList.map((trx, index) => (
              <tr key={trx.transactionId} className="hover:bg-gray-50">
                <td className="border-t border-gray-200 px-3 py-2">
                  {index + 1}
                </td>
                <td className="border-t border-gray-200 px-3 py-2">{`T-${trx.transactionId}`}</td>

                {/* DATA BARU 1 */}
                <td className="border-t border-gray-200 px-3 py-2 text-left">
                  {trx.customerName || "-"}
                </td>

                <td className="border-t border-gray-200 px-3 py-2">
                  {/* Hanya Tanggal */}
                  {new Date(trx.transactionDate).toLocaleDateString("id-ID")}
                </td>

                {/* DATA BARU 2 */}
                <td className="border-t border-gray-200 px-3 py-2">
                  {/* Hanya Waktu */}
                  {new Date(trx.transactionDate).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="border-t border-gray-200 px-3 py-2">
                  {trx.totalItems}
                </td>
                <td className="border-t border-gray-200 px-3 py-2">
                  Rp.{Number(trx.totalPrice).toLocaleString()}
                </td>
                <td className="border-t border-gray-200 px-3 py-2">
                  <button
                    onClick={() => handleDetail(trx.transactionId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                  >
                    Detail
                  </button>
                </td>

                <td className="border-t border-gray-200  flex justify-center py-2">
                  <button
                    onClick={() => {
                      setIdToRetur(trx.transactionId);
                      setShowReturModal(true);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
                  >
                    <FaRepeat className="text-green-500 hover:text-green-700" />
                  </button>

                  <button
                    onClick={() => {
                      setIdToDelete(trx.transactionId);
                      setShowDeleteModal(true);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
                  >
                    <FaTrash className="text-red-500  hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Pesanan Modal */}
      {showDetail && (
        <DetailPesanan
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          transactionId={selectedTransactionId}
        />
      )}

      {showReturModal && (
        <ReturKonfirmasi
          isOpen={showReturModal}
          onClose={() => setShowReturModal(false)}
          onConfirm={executeRetur}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <DeleteKonfirmasi
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={executeDelete}
        />
      )}
    </div>
  );
};

export default TableTransaksi;
