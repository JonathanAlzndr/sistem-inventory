import React, { useState } from "react";

const DeleteKonfirmasi = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleConfirmClick = () => {
    // Kirim password ke fungsi onConfirm yang ada di parent
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Hapus</h3>
        <p className="text-sm text-gray-600">
          Untuk alasan keamanan, masukkan kata sandi Anda untuk menghapus
          transaksi ini.
        </p>

        {/* 1. Kolom Input */}
        <div>
          <label
            htmlFor="delete-password"
            className="block text-sm font-medium text-gray-700"
          >
            Kata Sandi
          </label>
          <input
            id="delete-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 2. Tombol Batal dan OK */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleConfirmClick}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteKonfirmasi;