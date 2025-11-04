import React from "react";

const TABLE_HEAD = [
  "Nama Beras",
  "Tanggal Masuk",
  "Kategori",
  "Stok saat ini",
  "Status",
];

const TABLE_ROWS = [
  {
    nama: "Dua Merpati",
    tanggalMasuk: "20/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
  {
    nama: "Pandan Wangi",
    tanggalMasuk: "15/10/2025",
    kategori: "10kg",
    Stok: 3,
    status: "Menipis",
  },
  {
    nama: "Ramos",
    tanggalMasuk: "10/10/2025",
    kategori: "25kg",
    Stok: 0,
    status: "Habis",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 2,
    status: "Menipis",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 0,
    status: "Habis",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 42,
    status: "Aman",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 5,
    status: "Menipis",
  },
  {
    nama: "Maknyus",
    tanggalMasuk: "25/10/2025",
    kategori: "5kg",
    Stok: 30,
    status: "Aman",
  },
];

export default function TableLaporan({ pilihStatus, CariProduk }) {
   const FilterData = TABLE_ROWS.filter((item) => {
    const cocokStatus = pilihStatus === "Semua" || item.status === pilihStatus;
    const cocokNama = item.nama.toLowerCase().includes(CariProduk.toLowerCase());
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

  return (
    <div className=" h-ful  overflow-y-scroll   max-h-[450px]  rounded-[10px] shadow-md bg-white">
      <table className="w-full min-w-max text-left border-collapse">
        <thead className="sticky top-0">
          <tr className="bg-gray-100">
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="p-4  text-gray-700 font-semibold text-sm"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          key={pilihStatus}
          className=" overflow-y-scroll  duration-500 ease-in-out  animate-fadeIn transition-all   max-h-[450px] "
        >
          {FilterData.map((row, index) => {
            const isLast = index === FilterData.length - 1;
            const rowClass = isLast ? "p-4 " : "p-4 border-b border-gray-200";

            return (
              <tr key={index} className="px-1 hover:bg-gray-50 ">
                <td className={rowClass} w-full >{row.nama}</td>
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
          })}
        </tbody>
      </table>
    </div>
  );
}
