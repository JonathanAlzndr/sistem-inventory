import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Dasbor" subtitle="Sistem Inventaris Gudang" />
        <main className="px-10 w-full py-6 flex-1 bg-[#F4F2F2] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
