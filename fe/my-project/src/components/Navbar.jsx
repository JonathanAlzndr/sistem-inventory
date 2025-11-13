import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Hanya ikon user yang dipakai
import { RxDashboard } from "react-icons/rx";
// Navbar ini sekarang menerima title dan subtitle
export default function Navbar({ title, subtitle }) {
  // Ambil role dari localStorage
  const role = localStorage.getItem("role");

  // Fungsi untuk menampilkan nama role 
  const getRoleName = () => {
    if (role === "Owner") return "Pemilik";
    if (role === "Cashier") return "Kasir";
    if (role === "Staff") return "Admin Gudang";
    return "Pengguna"; // Cadangan
  };

  return (
    <div className="w-full h-20 bg-white shadow flex items-center justify-between px-15 border-b-2 border-gray-200">
      {/* Kiri: Judul Halaman dan Sub-judul */}

      <div className="h-full flex justify-center items-center gap-3">
        <RxDashboard className="text-[25px] "   />
        <div className=" flex flex-col h-8">
          <h1 className="text-[24px] font-bold text-gray-800 leading-none ">{title}</h1>

          <p className="text-[11px]   text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Kanan: Info Pengguna (Role) */}
      <div className="flex items-center gap-3">
        <div className="text-l  border-l-1 pl-3 border-gray-400">
          <h2 className="text-md font-semibold text-gray-800">
            {getRoleName()}
          </h2>
          <p className="text-xs text-gray-500">Sistem Pencatatan</p>
        </div>
        <FaUserCircle className="text-gray-400 text-4xl" />
      </div>
    </div>
  );
}
