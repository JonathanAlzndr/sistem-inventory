import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import "./App.css";

import KasirDashboard from "./pages/Dasboard/kasir/Kasir";
import GudangDashboard from "./pages/Dasboard/gudang/GudangDashboard";

import OwnerDashboard from "./pages/Dasboard/owner/OwnerDashboard";
import RoleLogin from "./pages/Auth/RoleLogin";
import LayoutDashborad from "./components/layout/DashboardLayout";

import Laporan from "./pages/Dasboard/Fitur/Laporan";
import Produk from "./pages/Dasboard/Fitur/Produk";
import Transaksi from "./pages/Dasboard/Fitur/Transaksi";
import Dasbor from "./pages/Dasboard/Fitur/Dasbor";


function App() {
  return (
         
    <Routes>
      {/* Route untuk Autentikasi (Tanpa Layout) */}
      <Route path="/" element={<Navigate to="/RoleLogin" />} />
      <Route path="/RoleLogin" element={<RoleLogin />} />
      <Route path="/Login" element={<Login />} />

      {/* Route untuk Dashboard (DENGAN Layout) */}
      <Route element={<LayoutDashborad />}>
        {/* Rute Dasbor per Role */}
        <Route path="/kasir" element={<KasirDashboard />} />
        <Route path="/gudang" element={<GudangDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />

        {/* --- DILENGKAPI --- */}

        <Route path="/Dasbor" element={<Dasbor />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/produk" element={<Produk />} />
  
          <Route path="/transaksi" element={<Transaksi />} />
       
      </Route>
    </Routes>
     
  );
}

export default App;
