import React, { useState } from "react";
import CardTransaksi from "./CardTransaksi";
import FormCatat from "./FormCatat";
import { toast } from "react-toastify";

const Daftar = ({ cart, setCart, refreshTrigger, setRefreshTrigger }) => {
  const [showForm, setShowForm] = useState(false);

    // Hitung total harga dan total item
    const totalHarga = cart.reduce(
      (acc, item) => acc + (item.harga || 0) * (item.jumlah || 1),
      0
    );
    const totalItem = cart.reduce((acc, item) => acc + (item.jumlah || 0), 0);

const handleBukaForm = () => {
    if (cart.length === 0) {
      toast.warn("Keranjang masih kosong!"); // <-- Panggil toast
      return;
    }
    setShowForm(true);
  };

    return (
      <div className="bg-white/80 w-[418px]  rounded-[10px] shadow-md flex flex-col justify-between p-4 py-2">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Daftar Pesanan
          </h2>
          <p className="text-gray-400 text-[13px]">Produk yang di pilih</p>
        </div>

        {/* List Card */}
        <div className="mt-3 flex-1">
          <CardTransaksi cart={cart} setCart={setCart} />
        </div>

        {/* Total & tombol */}
        <div className="space-y-2 mt-3">
          <div className="text-[12px] ">
            <p>Total Pesanan:</p>
            <p className="text-[14px] font-semibold flex justify-between">
              Rp{totalHarga.toLocaleString()}{" "}
              <span className="font-medium">{totalItem}X</span>
            </p>
          </div>

          <div className="flex flex-col gap-1 text-white">
            <button
              onClick={handleBukaForm}
              className="bg-green-400 hover:bg-green-500 p-2 rounded-[7px]"
            >
              Catat
            </button>

            <FormCatat
              cart={cart}
              isOpen={showForm}
              setRefreshTrigger={setRefreshTrigger}
              refreshTrigger={refreshTrigger}
              onClose={() => setShowForm(false)}
              setCart={setCart}
            />
            <button
              onClick={() => setCart([])}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-[7px]"
            >
              Batal Pilih Produk
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Daftar;
