import React from "react";


const InfoKonfirmasi = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onClose} // Panggil fungsi onClose saat Batal
            className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm} // Panggil fungsi onConfirm saat Yakin
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            Yakin
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoKonfirmasi ;