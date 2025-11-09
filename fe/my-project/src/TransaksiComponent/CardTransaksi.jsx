import React from "react";
import GambarBeras from "../assets/gambar/beras.jpeg";

const CardTransaksi = ({ cart, setCart }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        Belum ada produk yang dipilih
      </div>
    );
  }

  // Update jumlah produk
  const updateQty = (productId, jumlahBaru) => {
    if (jumlahBaru < 1) jumlahBaru = 1;
    setCart(cart.map(item =>
      item.productId === productId ? { ...item, jumlah: jumlahBaru } : item
    ));
  };

  // Hapus produk dari cart
  const removeItem = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  return (
    <div className="overflow-y-scroll max-h-76 space-y-2">
      {cart.map((produk) => (
        <div
          key={produk.productId || produk.id}
          className="flex items-center rounded-[10px] h-[93px] w-full shadow bg-white relative"
        >
          {/* Gambar Produk */}
          <img
            src={produk.imgPath || produk.gambar || GambarBeras}
            alt={produk.nama || produk.productName}
            className="h-full w-[90px] object-cover"
          />

          {/* Isi Kartu */}
          <div className="flex flex-col space-y-2 justify-between p-2 px-4 w-full text-[11px]">
            {/* Bagian atas: Nama produk dan info kanan */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{produk.nama || produk.productName}</p>
                <p className="text-gray-500 text-[10px] leading-tight">
                  Rp{Number(produk.harga || produk.sellPrice || 0).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p>{produk.kategori || (produk.weight ? produk.weight + " kg" : "-")}</p>
              </div>
            </div>

            {/* Bagian bawah: Tombol Batal + Counter */}
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => removeItem(produk.productId || produk.id)}
                className="border rounded px-2 py-[2px] text-gray-600 hover:scale-95 bg-red-500 text-white transition"
              >
                Batal
              </button>

              <div className="flex items-center gap-2 text-gray-700">
                <button
                  onClick={() => updateQty(produk.productId || produk.id, produk.jumlah - 1)}
                  className="hover:border-2 rounded w-5 h-5 flex items-center justify-center hover:bg-gray-100"
                >
                  –
                </button>
                <span>{produk.jumlah}</span>
                <button
                  onClick={() => updateQty(produk.productId || produk.id, produk.jumlah + 1)}
                  className="hover:border rounded w-5 h-5 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTransaksi;
