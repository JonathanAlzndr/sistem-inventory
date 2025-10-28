import React from "react";
import Header from "../../../componentLaporan/header";

// Ini adalah halaman yang akan muncul di dalam <Outlet />
export default function Laporan() {
  return (
    <div className="px-10 space-y-12">
      <div>
      <h2 className="text-3xl font-bold text-center mb-1">
        Laporan Inventaris Gudang
      </h2>
      <p className="text-gray-600 text-center text-[13px]">Monitoring dan Analisis Gudang</p>
      </div>
      <div className="w-full rounded-[10px] py-6 px-8 bg-white">
       <Header/>
        </div>
    </div>
  );
}
