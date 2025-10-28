import React from "react";
import { MdOutlineShowChart } from "react-icons/md";
const GrafikBatang = () => {
  return (
    <div>
      <div className=" p-4 rounded-[10px] shadow-md w-[720px] h-[375px] bg-white">
        <div  className="flex item-center gap-1 ">
          <MdOutlineShowChart className="text-2xl text-red-600" />
          <h1 className="text-[16px]">Grafik Penjualan Bulanan</h1>
        </div>
        <p className="text-[12px] text-gray-500">
          Menampilkan tren penjualan beras setiap bulan dalam satu tahun
          terakhir,berdasarkan jenis beras{" "}
        </p>
      </div>
    </div>
  );
};

export default GrafikBatang;
