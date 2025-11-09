import React from "react";
import ListProduk from "./ListProduk";


const Pilih = ({ pilihStatus, setPilihStatus, cart,setCart}) => {
  return (
    <div className="p-3 px-6  bg-white/80 rounded-[10px] shadow-md  w-[790px] h-[514px]">
      <header className=" flex justify-between">
        <div >
          <h2 className="text-lg font-semibold text-gray-700">Daftar Produk</h2>
          <p className="text-gray-400 text-[13px]">
            Pilih produk untuk pencatatan Transaksi
          </p>
        </div>
        <select
          value={pilihStatus}
          onChange={(e) => setPilihStatus(e.target.value)}
          className=" p-1 border border-gray-300 bg-gray-50 w-[200px] h-[34px]  rounded-[6px] focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="">Kategori</option>
          <option value="5">5 kg</option>
          <option value="10">10 kg</option>
          <option value="50">50 kg</option>
          <option value="120">120 kg</option>
        </select>
      </header>
      <div className="mt-3  " >
        <ListProduk  cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default Pilih;
