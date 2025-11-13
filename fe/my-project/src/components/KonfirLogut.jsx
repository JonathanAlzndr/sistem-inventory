import React from "react";
import { useState } from "react";
import { BiSolidLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loading from "../kecilComponent/Loading";
const KonfirLogut = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/RoleLogin");
    }, 500);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 w-full text-left"
      >
        <BiSolidLogOut />
        <span>Keluar</span>
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <Loading isLoading={isLoading} />
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Logout</h2>
            <p className="text-gray-600 mb-6">
              Apakah kamu yakin ingin Keluar?
            </p>
            <div className="flex items-center justify-center gap-9">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KonfirLogut;
