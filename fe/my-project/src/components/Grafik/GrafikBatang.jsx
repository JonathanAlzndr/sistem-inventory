import React from "react";
import { MdOutlineShowChart } from "react-icons/md";
import ChartGaris from "./Chart/ChartGaris";
const GrafikBatang = () => {
  return (
    <div>
      <div className=" space-y-2 p-4 rounded-[10px] shadow-md w-full h-[458px] bg-white">
        <div  className="flex item-center gap-1 ">
          <MdOutlineShowChart className="text-2xl text-red-600" />
          <h1 className="text-[16px]">Grafik Pengeluaran Stok Mingguan</h1>
        </div>
        <p className="text-[12px] text-gray-500">
          Menampilkan tren pengeluaran stok beras setiap Mingguan dalam satu Bulan
          terakhir,berdasarkan jenis beras{" "}
        </p>
        <ChartGaris/>
      </div>
    </div>
  );
};

export default GrafikBatang;
