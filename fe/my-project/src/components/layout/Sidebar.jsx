import { useAuth } from "../../context/JWTsimu";

const menus = {
  admin: ["Dashboard", "Kelola User", "Produk", "Transaksi", "Laporan"],
  kasir: ["Dashboard", "Transaksi", "Laporan"],
  gudang: ["Dashboard", "Produk", "Stok Masuk"],
  owner: ["Dashboard", "Laporan"],
};

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null; // kalau belum login

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4 capitalize">{user.role} Menu</h2>
      <ul>
        {menus[user.role].map((menu, i) => (
          <li key={i} className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">
            {menu}
          </li>
        ))}
      </ul>
    </aside>
  );
}
