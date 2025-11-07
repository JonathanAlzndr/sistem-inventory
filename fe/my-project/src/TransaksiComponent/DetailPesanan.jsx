import React from "react";

function DetailPesanan({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dummyItems = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    nama: `Beras Premium ${i + 1}`,
    jumlah: `${i + 1}x`,
    harga: "Rp. 25.000",
    subtotal: `Rp. ${(25000 * (i + 1)).toLocaleString('id-ID')}`,
  }));

  console.log(dummyItems);
  
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-[471px] max-h-[90vh] text-black flex flex-col"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detail Pesanan
          </h2>
          <hr className="border-gray-200" />
        </div>

        {/* Konten Tengah */}
        <div className="px-6 pt-4 flex flex-col min-h-0 flex-1">
          {/* Info Transaksi */}
          <div className="flex-shrink-0">
            <div className="flex mb-5">
              <div>
                <p className=" font-medium text-gray-500 uppercase tracking-wider">
                  Nomor Transaksi
                </p>
                <p className="text-base font-semibold text-gray-900">
                  mdniencie
                </p>
                <div className="mt-2">
                  <p className=" font-medium text-gray-500 uppercase tracking-wider">
                    Nama Pemesan
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    ednence
                  </p>
                </div>
              </div>
              <div className="flex-1" />
              <div>
                <p className=" font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </p>
                <p className="text-base font-semibold text-gray-900">
                  10/11/25
                </p>
                <p className=" font-medium text-gray-500 uppercase tracking-wider mt-4">
                  Waktu
                </p>
                <p className="text-base font-semibold text-gray-900">
                  07:43
                </p>
              </div>
            </div>
            <hr className="border-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Daftar Item Pesanan
            </h3>
          </div>

          {/* Area Tabel Scroll */}
          <div className="w-full flex flex-col min-h-0 flex-1">
            {/* Header Tabel */}
            <div className="grid grid-cols-12 gap-x-2 bg-gray-100 py-2 px-3 rounded-t-md text-[11px]">
              <div className="col-span-5  font-semibold text-gray-600 uppercase">
                Nama Produk
              </div>
              <div className="col-span-2  font-semibold text-gray-600 uppercase">
                Jumlah
              </div>
              <div className="col-span-2  font-semibold text-gray-600 uppercase">
                Harga
              </div>
              <div className="col-span-3  font-semibold text-gray-600 uppercase text-right">
                Subtotal
              </div>
            </div>

            {/* Body Tabel (scrollable) */}
            <div className="border-l border-r border-b border-gray-300 overflow-y-auto flex-1c text-[11px]">
              {dummyItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 gap-x-3 py-3 px-3 border-t border-gray-300 items-center ${
                    index % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="col-span-5  text-gray-800">
                    {item.nama}
                  </div>
                  <div className="col-span-2  text-gray-800">
                    {item.jumlah}
                  </div>
                  <div className="col-span-2  text-gray-800">
                    {item.harga}
                  </div>
                  <div className="col-span-3  text-gray-800 font-medium text-right">
                    {item.subtotal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center border border-gray-300 p-4 rounded-md">
            <span className="text-base font-bold text-gray-900">
              Total Bayar
            </span>
            <span className="text-xl font-bold text-gray-900">
              cmvomrvo
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full hover:bg-gray-400 bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg mt-4 text-base transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPesanan;