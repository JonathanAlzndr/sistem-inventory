import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gambar from "../../assets/gambar/dasbor.png";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role"); // role dari halaman RoleLogin

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi login
    const users = {
      "kasir": { username: "kasir1", password: "123" },
      "pemilik": { username: "pemilik1", password: "123" },
      "admin-gudang": { username: "gudang1", password: "123" }
    };

    if (!role || !users[role]) {
      return alert("Role tidak dikenali, pilih role dulu!");
    }

    const user = users[role];

    if (formData.username === user.username && formData.password === user.password) {
      // Simulasi token
      localStorage.setItem("token", "simulasi-jwt-token");
      localStorage.setItem("role", role);

      // redirect sesuai role
      if (role === "kasir") navigate("/dasbor");
      else if (role === "pemilik") navigate("/dasbor");
      else if (role === "admin-gudang") navigate("/dasbor");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[900px] h-[500px] flex shadow-lg rounded-[10px]">
        <div className="w-[450px] h-full p-10 py-23">
          <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col px-6">
            <div className="flex-col flex">
              <label htmlFor="username" className="text-black/54">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                className="px-4 py-2 border border-[#CFCECE] bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-col flex">
              <label htmlFor="password" className="text-black/54">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="px-4 py-2 border border-[#CFCECE] bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-3 w-[117px] bg-[#22BE5B] text-white py-2 rounded-[10px] hover:bg-blue-700 transition"
            >
              Masuk
              <FaArrowRightLong />
            </button>
          </form>
        </div>
        <div className="text-white text-center bg-linear-to-b from-[#16A34A] to-[#31E272] h-full w-[450px] rounded-bl-[20px] rounded-tl-[20px] rounded-[10px]">
          <div className="flex flex-col justify-center items-center py-23">
            <h2 className="text-[24px] font-bold">Sistem Pencatatan Beras</h2>
            <h1 className="text-[30px] font-semibold">CR.JAYA</h1>
            <img src={gambar} alt="Dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
}
