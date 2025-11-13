import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gambar from "../../assets/gambar/dasbor.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Loading from "../../kecilComponent/Loading";
import { toast } from 'react-toastify';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function KembaliRole() {
    navigate("/RoleLogin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const selectedRole = localStorage.getItem("role");

      // Validasi: cek apakah role akun sesuai dengan role yang dipilih
      if (selectedRole !== data.user_role && !res.ok) {
        toast.error("Username atau Password tidak Sesuai");
        return;
      }
      setIsLoading(true);
      toast.success("login berhasil")
      setTimeout(() => {
      

        localStorage.setItem("token", data.token);

        localStorage.setItem("role", data.user_role);
      
        navigate("/dasbor");
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan server!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
     
      <div className="w-[900px] h-[500px] flex shadow-lg rounded-[10px] relative">
        <Loading isLoading={isLoading} />
        <MdKeyboardArrowLeft
          onClick={KembaliRole}
          className="absolute top-4 left-4 text-[30px] text-gray-700 hover:scale-110 duration-150 hover:border-2 rounded-full"
        />
        <div className="w-[450px] h-full p-10 py-23">
          <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col px-6"
          >
            <div className="flex-col flex">
              <label htmlFor="username" className="text-black/54">
                Username
              </label>
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

            {/* input password + icon mata */}
            <div className="flex-col flex relative">
              <label htmlFor="password" className="text-black/54">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="px-4 py-2 border border-[#CFCECE] bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400 pr-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
