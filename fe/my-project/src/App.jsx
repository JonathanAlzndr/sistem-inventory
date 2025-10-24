import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import "./App.css";

import KasirDashboard from "./pages/Dasboard/kasir/KasirDashboard";
import GudangDashboard from "./pages/Dasboard/gudang/GudangDashboard";
import OwnerDashboard from "./pages/Dasboard/owner/OwnerDashboard";
import RoleLogin from "./pages/Auth/RoleLogin";
function App() {
  return (
    <Routes>
      <Route path="/Role" element={<RoleLogin />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/kasir" element={<KasirDashboard />} />
      <Route path="/gudang" element={<GudangDashboard />} />
      <Route path="/owner" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
