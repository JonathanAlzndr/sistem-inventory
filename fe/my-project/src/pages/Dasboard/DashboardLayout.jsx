import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../context/JWTsimu";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  if (!user) return <p className="p-6">Silakan login dulu...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
