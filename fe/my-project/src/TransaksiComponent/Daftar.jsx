import React from "react";
import CardTransaksi from "./CardTransaksi";

const Daftar = () => {
  return (
    <div className="bg-white/80 w-[410px] rounded-[10px] shadow-md   p-4 py-2 ">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Daftar Pesanan</h2>
        <p className="text-gray-400 text-[13px]">Produk yang di pilih</p>
      </div>
      <div className="mt-3">
        <CardTransaksi />
      </div>
      {/* total besanan & button */}
      <div className="space-y-2">
<div className="text-[13px]  space-y-1 py-1 ">
<p>Total Pesanan:</p>
<p className="text-[15px] flex justify-between">Rp.260.000.00  <span className="font-medium">3X</span> </p>
</div>
<div className="flex flex-col gap-2 text-white">
  <button className="bg-green-400 p-1 rounded-[8px]">Catat</button>
  <button className="bg-red-500 p-1  rounded-[8px]">Batal Pilih Produk</button>
</div>

      </div>
    </div>
  );
};

export default Daftar;
