import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import "./App.css";

// --- PERBAIKAN DI SINI ---
// 1. Typo: Nama file komponen biasanya PascalCase (KasirDashboard.jsx)
// 2. Typo: Nama file 'kasir' diubah ke 'KasirDashboard' (asumsi)
import KasirDashboard from "./pages/Dasboard/kasir/Kasir"; 
import GudangDashboard from "./pages/Dasboard/gudang/GudangDashboard";
// 3. Typo: Tanda slash ganda '//' dihapus
import OwnerDashboard from "./pages/Dasboard/owner/OwnerDashboard"; 
import RoleLogin from "./pages/Auth/RoleLogin";
import LayoutDashborad from "./components/layout/DashboardLayout";

// --- DILENGKAPI ---
// 4. Impor halaman lain yang ada di sidebar
import Laporan from "./pages/Dasboard/Fitur/Produk";
import Produk from "./pages/Dasboard/Fitur/Produk";
import Transaksi from "./pages/Dasboard/Fitur/Transaksi";
import Dasbor from "./pages/Dasboard/Fitur/Dasbor";


function App() {
  return (
    <Routes>
      {/* Route untuk Autentikasi (Tanpa Layout) */}
      <Route path="/" element={<Navigate to="/RoleLogin"  />} />
      <Route path="/RoleLogin" element={<RoleLogin />} />
      <Route path="/Login" element={<Login />} />

      {/* Route untuk Dashboard (DENGAN Layout) */}
      <Route element={<LayoutDashborad />}>
        {/* Rute Dasbor per Role */}
        <Route path="/kasir" element={<KasirDashboard />} />
        <Route path="/gudang" element={<GudangDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        
        {/* --- DILENGKAPI --- */}
        {/* 5. Daftarkan rute lain dari sidebar di sini */}
          <Route path="/Dasbor" element={<Dasbor />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/transaksi" element={<Transaksi />} />

      </Route>
    </Routes>
  );
}

export default App;

