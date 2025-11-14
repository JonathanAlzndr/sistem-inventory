import React from "react";
import Header from "../../../componentLaporan/header";
import TableLaporan from "../../../componentLaporan/TableLaporan";
import { useState } from "react";

// Ini adalah halaman yang akan muncul di dalam <Outlet />
export default function Laporan() {
  const [pilihStatus, setPilihStatus] = useState("Semua");
  const [CariProduk, setCariProduk] = useState("");
    const [exportHandler, setExportHandler] = useState(null);

  return (
    <div className="px-10 space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-center mb-1">
          Laporan Pencatatan Total Stok Gudang
        </h2>
        <p className="text-gray-600 text-center text-[13px]">
          Monitoring dan Analisis Gudang
        </p>
      </div>
      <div
        className="max-w-full rounded-[10px] space-y-10
       py-6 px-8 bg-white"
      >
        <Header
        exportHandler={exportHandler}
        CariProduk={CariProduk}
        setCariProduk={setCariProduk}
          pilihStatus={pilihStatus}
          setPilihStatus={setPilihStatus}
        />
        <TableLaporan pilihStatus={pilihStatus}
        CariProduk={CariProduk}
         setExportHandler={setExportHandler} />
      </div>
    </div>
  );
}
