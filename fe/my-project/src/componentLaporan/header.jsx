import React from "react";
import { IoIosSearch } from "react-icons/io";
import BttnEkspor from "../kecilComponent/bttnEkspor";

const header = ({ pilihStatus, setPilihStatus, CariProduk, setCariProduk }) => {
  return (
    <>
      <div className="w-full flex gap-9 text-[14px]">
        <div className="border-gray-300 bg-gray-50 border p-1 rounded-[8px] flex items-center gap-1.5 w-[300px]">
          <IoIosSearch className="text-2xl" />
          <input
            value={CariProduk}
            onChange={(e) => setCariProduk(e.target.value)}
            className="px-2 w-full focus:outline-none "
            type="text"
            placeholder="Cari Produk..."
          />
        </div>
        <div className="flex gap-106 ">
          <select
            value={pilihStatus}
            onChange={(e) => setPilihStatus(e.target.value)}
            className=" p-1 border border-gray-300 bg-gray-50 w-[200px]   rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="Semua">Semua</option>
            <option value="Aman">Aman</option>
            <option value="Menipis">Menipis</option>
            <option value="Habis">Habis</option>
          </select>
          <BttnEkspor />
        </div>
      </div>
    </>
  );
};

export default header;
