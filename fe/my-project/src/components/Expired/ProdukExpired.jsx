import React from "react";
import { FcExpired } from "react-icons/fc";

const ProdukExpired = () => {
  const dataDummy = [
    { Beras: "Dua Merpati", kategori: "5kg", TanggalMasuk: "20/01/2024" },
    { Beras: "Superwing - Kotamobago", kategori: "10kg", TanggalMasuk: "20/01/2024" },
    { Beras: "Membramo - Tolai", kategori: "120kg", TanggalMasuk: "20/01/2024" },
    { Beras: "Raja Beras", kategori: "25kg", TanggalMasuk: "15/01/2024" },
    { Beras: "Beras Premium", kategori: "50kg", TanggalMasuk: "10/01/2024" },
    { Beras: "Beras Premium", kategori: "50kg", TanggalMasuk: "10/01/2024" },
    { Beras: "Beras Premium", kategori: "50kg", TanggalMasuk: "10/01/2024" },
    { Beras: "Beras Premium", kategori: "50kg", TanggalMasuk: "10/01/2024" },
    { Beras: "Beras Premium", kategori: "50kg", TanggalMasuk: "10/01/2024" },
  ];

  return (
    <div className="bg-white w-[400px]  rounded-[10px] p-4 space-y-2 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FcExpired className="text-2xl" />
        <h1 className="text-[16px] font-semibold">Stok Lama (wajib diperiksa)</h1>
      </div>
      <p className="text-[12px] text-gray-500">
        Menampilkan stok yang sudah lama dari tanggal masuk sampai hari ini
      </p>

      {/* List Produk */}
      <div className="space-y-2 mt-2 overflow-y-scroll max-h-[250px] ">
        {dataDummy.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 text-[13px]"
          >
            <p className="font-medium w-[160px] text-[12px]">{item.Beras}</p>
            <p className="text-[12px] text-right">{item.kategori}</p>
            <p className="text-[12px] text-gray-600">{item.TanggalMasuk}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdukExpired;
