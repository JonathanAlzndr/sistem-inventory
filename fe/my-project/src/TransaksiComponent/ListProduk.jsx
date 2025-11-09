import React from "react";
import GambarBeras from "../assets/gambar/beras.jpeg";

const ListProduk = () => {
   
  // Contoh data dummy (10 item sama semua)
  const produkList = Array.from({ length:15  }, (_, i) => ({
    id: i + 1,
    nama: "Pandan Wangi",
    kategori: "5 kg",
    harga: "Rp.80.000",
    gambar: GambarBeras,
  }));

  return (
    <div className=" px-3 grid grid-cols-2 max-h-[400px] overflow-x-hidden overflow-y-scroll sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {produkList.map((produk) => (
        <div
          key={produk.id}
          className="w-[141px] h-[165px] flex flex-col  rounded-lg shadow bg-white"
        >
          {/* Bagian Gambar */}
          <div className="h-1/2 flex items-center justify-center ">
            <img
              src={produk.gambar}
              alt={produk.nama}
              className="object-contain h-full w-full"
            />
          </div>

          {/* Bagian Deskripsi */}
          <div className="h-1/2 flex flex-col justify-between p-2 text-[8px]">
            <div className="flex justify-between">
              <section>
                <p className=" text-gray-700">Nama</p>
                <p className=" text-gray-700">Kategori</p>
                <p className=" text-gray-700">Harga</p>
              </section>
              <section className="text-right">
                <p className=" text-gray-700">{produk.nama}</p>
                <p className=" text-gray-700">{produk.kategori}</p>
                <p className=" text-gray-700">{produk.harga}</p>
              </section>
            </div>
            <button className="mt-1 text-[8px] w-full p-1 rounded-[3px] bg-blue-400 hover:bg-blue-500 text-white">
              Tambah Pesanan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProduk;
