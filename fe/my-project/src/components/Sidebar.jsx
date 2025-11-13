import React from "react";
// NavLink untuk navigasi, useNavigate untuk aksi logout
import { NavLink } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlineWarehouse } from "react-icons/md";

import { FaBoxOpen, FaCashRegister } from "react-icons/fa";
import KonfirLogut from "./KonfirLogut";

// ======================================================
// PUSAT KONTROL NAVIGASI
// ======================================================

const ALL_NAV_LINKS = {
  dasbor: {
    name: "Dasbor",
    path: "/dasbor",
    icon: <MdDashboard />,
    end: true,
  },

  laporan: {
    name: "Laporan",
    path: "/laporan",
    icon: <FaFileAlt />,
    end: false,
  },
  produk: {
    name: "Produk",
    path: "/produk",
    icon: <FaBoxOpen />,
    end: false,
  },
  transaksi: {
    name: "Transaksi",
    path: "/transaksi",
    icon: <FaCashRegister />,
    end: false,
  },
};

// Peta ini hanya memilih link mana yang mau ditampilkan
const ROLE_NAV_MAP = {
  Owner: [ALL_NAV_LINKS.dasbor, ALL_NAV_LINKS.laporan],
  Staff: [ALL_NAV_LINKS.dasbor, ALL_NAV_LINKS.produk],
  Cashier: [ALL_NAV_LINKS.dasbor, ALL_NAV_LINKS.transaksi],
  User: [ALL_NAV_LINKS.dasbor],
};

export default function Sidebar() {
 
  const role = localStorage.getItem("role");

  const navItemsToShow = ROLE_NAV_MAP[role] || ROLE_NAV_MAP.default;

  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 ${
      isActive ? "bg-green-500 text-white" : "" //
    }`;
  };

  return (
    <div className="w-[200px] bg-white text-black h-screen flex flex-col">
      {/* Logo */}
      <div className="h-20 flex gap-3   items-center justify-center text-2xl font-bold border-b  border-gray-300">
        <div className="bg-[#29DB6A] rounded-[10px] p-1 ">
          <MdOutlineWarehouse className="text-4xl text-white" />
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-gray-800 leading-none ">
            CR.JAYA
          </h1>
          <p className="text-[11px] font-medium   text-gray-500">
            Sistem Pencatatan
          </p>
        </div>
      </div>

      {/* Menu  */}
      <nav className="flex-1 mt-4 text-[#3E3A3A] font-normal ">
        {/* Mapping dari navItemsToShow (dinamis) */}
        {navItemsToShow.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={getNavLinkClass}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* "Keluar" sebagai <button> */}
        <KonfirLogut  />
      </nav>
    </div>
  );
}
