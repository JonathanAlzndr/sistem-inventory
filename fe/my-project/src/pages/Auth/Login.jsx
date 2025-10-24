import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gambar from "../../assets/gambar/dasbor.png";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  role berdasarkan email
    if (formData.email === "admin@mail.com") {
      navigate("/dashboard/admin");
    } else if (formData.email === "kasir@mail.com") {
      navigate("/dashboard/kasir");
    } else if (formData.email === "gudang@mail.com") {
      navigate("/dashboard/gudang");
    } else if (formData.email === "owner@mail.com") {
      navigate("/dashboard/owner");
    } else {
      alert(
        "Email tidak dikenali! Coba pakai admin@mail.com, kasir@mail.com, gudang@mail.com, atau owner@mail.com"
      );
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-white  ">
      <div className="w-[900px] h-[500px] flex    shadow-lg rounded-[10px]">
        {/* kotak kiri login */}
        <div className=" w-[450px] h-full p-10 py-23 ">
          <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col px-6 "
          >
            <div className="flex-col flex ">
              <label for="email" className="text-black/54">
                Email
              </label>
              <input
                type="email"
                name="email"
                className=" px-4 py-2 border border-[#CFCECE]  bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-col flex  ">
              <label for="email" className="text-black/54">
                Password
              </label>
              <input
                type="password"
                name="password"
                className=" px-4 py-2 border border-[#CFCECE]  bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
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
        {/* kotak kanan */}
        <div className="text-white text-center bg-linear-to-b from-[#16A34A] to-[#31E272] h-full w-[450px]  rounded-bl-[20px] rounded-tl-[20px] rounded-[10px]">
          <div className="flex flex-col justify-center items-center py-23">
            <h2 className="text-[24px] font-bold">
              Sistem Pencatatn berdasarkan
            </h2>
            <h1 className="text-[30px] font-semibold">CR.JAYA</h1>
            <img src={gambar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
