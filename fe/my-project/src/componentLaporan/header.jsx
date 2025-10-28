import React from "react";
import { IoIosSearch } from "react-icons/io";
import { BiSolidFileExport } from "react-icons/bi";

const header = () => {
  return (
    <>
      <div className="w-full flex gap-9 text-[14px]">
        <div className="border-gray-300 bg-gray-50 border p-1 rounded-[8px] flex items-center gap-1.5 w-[300px]">
          <IoIosSearch className="text-2xl" />
          <input type="text" placeholder="Cari Produk..." />
        </div>
        <div className="flex gap-106 ">
              <select
            
                className=" p-1 border border-gray-300 bg-gray-50 w-[200px]   rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
              >
                 <option value="" req>Status</option>
                <option value="pemilik">Aman</option>
                <option value="kasir">Menipis</option>
                <option value="admin-gudang">Habis</option>
              </select>

              <div className=" p-1 border  rounded-[10px]  border-gray-300 bg-gray-50 w-[150px] gap-2 flex items-center justify-center ">
                Ekspor Data
                <BiSolidFileExport className="text-lg"/>
                </div>
        </div>
      </div>
    </>
  );
};

export default header;
