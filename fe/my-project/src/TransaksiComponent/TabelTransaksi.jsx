import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DetailPesanan from "./DetailPesanan";

const TableTransaksi = () => {
  const [showDetail, setShowDetail] = useState(false);

  const dataTransaksi = Array.from({ length: 30 }, (_, i) => ({
    no: i + 1,
    id: "T-xxxx-xxxx",
    tanggal: "22-10-2025",
    waktu: "17:00 WITA",
    jumlah: "40",
    total: "Rp. xxx.xxx.xx",
  }));

  return (
    <>
      <div className="w-full overflow-x-auto mt-3">
        {/* Bungkus scroll hanya di vertical */}
        <div className="max-h-[350px] overflow-y-auto relative rounded-lg">
          <table className="w-full text-[13px] text-gray-700 border-collapse">
            <thead className="sticky top-0 z-20 bg-gray-100 shadow-sm">
              <tr className="text-center">
                <th className="px-3 py-2 border-b border-gray-300">No</th>
                <th className="px-3 py-2 border-b border-gray-300">
                  ID Transaksi
                </th>
                <th className="px-3 py-2 border-b border-gray-300">Tanggal</th>
                <th className="px-3 py-2 border-b border-gray-300">
                  Waktu Pesanan
                </th>
                <th className="px-3 py-2 border-b border-gray-300">
                  Jumlah Pesanan
                </th>
                <th className="px-3 py-2 border-b border-gray-300">
                  Total Pembayaran
                </th>
                <th className="px-3 py-2 border-b border-gray-300">
                  Detail Pesanan
                </th>
                <th className="px-3 py-2 border-b border-gray-300">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {dataTransaksi.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.no}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.id}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.tanggal}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.waktu}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.jumlah}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    {item.total}
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    <button
                      onClick={() => setShowDetail(true)}
                      className="bg-blue-500 hover:bg-blue-600  text-white px-3 py-1 rounded-md text-xs font-medium  transition"
                    >
                      Detail
                    </button>
              
                  </td>
                  <td className="border-t border-gray-200 px-3 py-2">
                    <div className="flex justify-center gap-2">
                      <button className="w-6 h-6 flex items-center justify-center   rounded hover:bg-gray-100 transition">
                        <FaEdit className="text-blue-500 hover:text-blue-700 text-lg" />
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center  rounded hover:bg-gray-100 transition">
                        <FaTrash className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <DetailPesanan isOpen={showDetail} onClose={() => setShowDetail(false)} />
      </div>
    </>
  );
};

export default TableTransaksi;
