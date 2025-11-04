import React, { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import InputKategori from "./InputKategori";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const InputProduk = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center bg-white p-3 rounded-[10px] shadow-md w-full">
      {/* Tombol utama */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 justify-center items-center text-gray-700 font-medium"
      >
        Tambah Produk{" "}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp className="text-2xl transition-transform duration-300" />
        ) : (
          <MdOutlineKeyboardArrowDown className="text-2xl transition-transform duration-300" />
        )}
      </button>

      {/* Bagian dropdown input */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
        } w-full`}
      >
        <form className="gap-3 p-3 border-t space-y-5 border-gray-200">
          {/* Baris 1 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                placeholder="Masukkan nama produk"
                className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Harga Jual
              </label>
              <input
                type="number"
                placeholder="Masukkan harga jual"
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Tanggal Masuk
              </label>
              <input
                type="date"
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Baris 2 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <InputKategori />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Harga Beli
              </label>
              <input
                type="number"
                placeholder="Masukkan harga beli"
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Stok
              </label>
              <input
                type="number"
                placeholder="Jumlah stok"
                className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Upload Gambar */}
            <div className="flex flex-col w-[200px]">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Gambar Produk
              </label>
              <input
                type="file"
                id="uploadGambar"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="uploadGambar"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition"
              >
                Tambah Gambar
                <MdAddPhotoAlternate className="text-xl" />
              </label>
            </div>

            <div className="flex h-[45px] gap-4 w-[500px] mt-5">
              {/* Tombol batal*/}

              <button
                type="submit"
                className="bg-red-500 text-white  rounded-md hover:bg-blue-600 transition w-full mt-2"
              >
                Batal
              </button>
              {/* Tombol Simpan */}
              <button
                type="submit"
                className="bg-blue-500 text-white  rounded-md hover:bg-blue-600 transition w-full mt-2"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputProduk;
