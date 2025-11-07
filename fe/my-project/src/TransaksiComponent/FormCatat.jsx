import React from "react";

const FormCatat = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // popup belum muncul

  return (
    <div className="fixed  text-black inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[471px] h-[510px] p-5 flex flex-col space-y-3">
        {/* Header */}
        <h2 className="text-lg font-semibol mb-4 text-start">Pencatatan</h2>

        {/* Info Section */}
        <div className=" border rounded-[10px]  p-5  space-y-3">
          <div className="flex justify-between text-sm border-b h-8 text-gray-600">
            <span>Jumlah Pesanan</span>
            <span>3x</span>
          </div>
          <span>Total Pemesanan</span>
          <p className="text-center text-xl font-bold mt-3 text-gray-800">
            Rp. xxx.xxx.xxx
          </p>
        </div>

        {/* Form Input */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Nama Pemesan</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Masukkan nama pemesan"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1">Tanggal</label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1">Waktu</label>
              <input
                type="time"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex flex-col gap-2 mt-5">
          <button className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Simpan
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCatat;
