import React from 'react'
import { BiSolidFileExport } from "react-icons/bi";

// 1. Terima 'props', dan ambil 'onClick' dari dalamnya
const BttnEkspor = ({ onClick }) => {
  return (
    <button
      // 2. Gunakan fungsi 'onClick' yang dikirim dari parent
      onClick={onClick}
      className=" hover:scale-102 duration-95 p-1 border rounded-[7px] bg-sky-700 border-gray-300 text-white text-[13px] w-[130px] gap-2 flex items-center justify-center "
    >
      Ekspor Data
      <BiSolidFileExport className="text-lg" />
    </button>
  )
}

// (Pastikan nama file dan nama komponen konsisten, 
//  sebaiknya 'BttnEkspor.js' dengan huruf kapital di awal)
export default BttnEkspor;