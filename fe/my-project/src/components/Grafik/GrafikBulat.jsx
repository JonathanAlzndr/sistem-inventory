import React from "react";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import ChartBulat from "./Chart/Chartbulat";
const GrafikBulat = () => {
  return (
    <div>
      <div className=" p-4 space-y-1 rounded-[10px] shadow-md bg-white w-full h-[458px] ">
        <div className="flex item-center gap-4 ">
          <BiSolidPieChartAlt2 className="text-2xl text-red-600" />
          <h1 className="text-[16px]">Grafik Penjualan Bulanan</h1>
        </div>
        <p className="text-[12px] text-gray-500">Menampilkan persentase stok beras berdasarkan jenis yang tersedia di gudang.</p>
    <ChartBulat/>
      </div>
    </div>
  );
};

export default GrafikBulat;
