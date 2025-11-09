import React from "react";
import GambarBeras from "../assets/gambar/beras.jpeg";

const CardTransaksi = () => {
  // Contoh data dummy (10 item sama semua)
  const produkList = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    nama: "Pandan Wangi",
    kategori: "5 kg",
    harga: "Rp.80.000",
    gambar: GambarBeras,
  }));

  return (
    <>
    <div className=" overflow-y-scroll max-h-76 space-y-2  ">
      {produkList.map((produk) => (
        <div
          key={produk.id}
          className="flex items-center rounded-[10px] h-[93px] w-full shadow bg-white    "
        >
          {/* Gambar Produk */}
          <img
            src={produk.gambar}
            alt={produk.nama}
            className="h-full w-[90px] object-cover"
          />

          {/* Isi Kartu */}
          <div className="flex flex-col space-y-2 justify-between p-2 px-4 w-full text-[11px]">
            {/* Bagian atas: Nama produk dan info kanan */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{produk.nama}</p>
                <p className="text-gray-500 text-[10px] leading-tight">
                  {produk.harga}
                </p>
              </div>
              <div className="text-right">
                <p>{produk.kategori}</p>
              </div>
            </div>

            {/* Bagian bawah: Tombol Transaksi + Counter */}
            <div className="flex justify-between items-center mt-1">
              <button className="border border-gray-400 rounded px-2 py-[2px] text-gray-600 hover:bg-gray-100 transition">
                Transaksi
              </button>

              <div className="flex items-center gap-2 text-gray-700">
                <button className=" hover:border rounded w-5 h-5 flex items-center justify-center hover:bg-gray-100">
                  –
                </button>
                <span>1</span>
                <button className="hover:border rounded w-5 h-5 flex items-center justify-center hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default CardTransaksi;
