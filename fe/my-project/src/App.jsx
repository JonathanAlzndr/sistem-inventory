import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import './App.css'
import AdminDashboard from "./pages/Dasboard/admin/AdminDashboard";
import KasirDashboard from "./pages/Dasboard/kasir/KasirDashboard";
import GudangDashboard from "./pages/Dasboard/gudang/GudangDashboard";
import OwnerDashboard from "./pages/Dasboard/owner/OwnerDashboard";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/kasir" element={<KasirDashboard />} />
      <Route path="/dashboard/gudang" element={<GudangDashboard />} />
      <Route path="/dashboard/owner" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
