import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DetailPesanan from "./DetailPesanan";
import DeleteKonfirmasi from "./DeleteKonfirmasi";

const TableTransaksi = ({ refreshTrigger }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
      alert("Password tidak boleh kosong!");
      return;
    }

 
    console.log("Password diterima. Memproses hapus untuk ID:", idToDelete);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ada, silakan login ulang.");
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
      alert("Transaksi berhasil dihapus.");
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert(`Error: ${err.message}`);
    }

    // 4. Tutup modal setelah semua selesai
    setShowDeleteModal(false);
    setIdToDelete(null);
  };


  return (
    <div className="w-full overflow-x-auto mt-3">
      <div className="max-h-[350px] overflow-y-auto relative rounded-lg">
        <table className="w-full text-[13px] text-gray-700 border-collapse">
          <thead className="sticky top-0 z-20 bg-gray-100 shadow-sm">
            <tr className="text-center">
              <th className="px-3 py-2 border-b border-gray-300">No</th>
              <th className="px-3 py-2 border-b border-gray-300">
                ID Transaksi
              </th>
              <th className="px-3 py-2 border-b border-gray-300">Tanggal</th>
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

          <tbody className="text-center">
            {transactionList.map((trx, index) => (
              <tr key={trx.transactionId} className="hover:bg-gray-50">
                <td className="border-t border-gray-200 px-3 py-2">
                  {index + 1}
                </td>
                <td className="border-t border-gray-200 px-3 py-2">{`T-${trx.transactionId}`}</td>
                <td className="border-t border-gray-200 px-3 py-2">
                  {new Date(trx.transactionDate).toLocaleDateString()}
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
                <td className="border-t border-gray-200 px-3 flex  justify-center py-2">
                  <button 
                 onClick={() => {
                      // Simpan ID yang mau dihapus & buka modal
                      setIdToDelete(trx.transactionId);
                      setShowDeleteModal(true);
                    }}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition">
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

      {/* 6. Render Modal Konfirmasi Hapus di sini */}
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
