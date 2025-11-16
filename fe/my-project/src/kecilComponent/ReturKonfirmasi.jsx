import React, { useState } from "react";

const ReturKonfirmasi = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md w-[300px]">
        <h3 className="text-lg font-semibold">Konfirmasi Retur</h3>
        <p className="text-sm text-gray-600 mt-2">
          Masukkan password untuk memproses retur.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mt-3 rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Batal
          </button>

          <button
            onClick={() => onConfirm(password)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Retur
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturKonfirmasi;
