import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gambar from "../../assets/gambar/dasbor.png";
import { FaArrowRightLong } from "react-icons/fa6";
import Loading from "../../kecilComponent/Loading";
import { toast } from "react-toastify";

const RoleLogin = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const HandleNext = () => {
    if (!role) return toast.info("Pilih role dulu!");
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("role", role);
      navigate("/Login");
    }, 500);
  
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-white  ">
      <div className="w-[900px] h-[500px] flex    shadow-lg rounded-[10px]">
        {/* kotak kiri login */}
        <Loading isLoading={isLoading} />
        <div className=" w-[450px] h-full p-10 py-23 ">
          <h2 className="text-2xl font-bold text-center mb-8">Pilih Role</h2>
          <form className="space-y-8 flex flex-col px-6 ">
            <div className="flex-col flex ">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className=" px-4 py-2 border border-[#CFCECE]  bg-[#ECEAEA] rounded-[10px] focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">-Pilih role-</option>
                <option value="Owner">Pemilik</option>
                <option value="Cashier">Kasir</option>
                <option value="Staff">Admin Gudang</option>
              </select>
            </div>

            <button
              onClick={HandleNext}
              type="button"
              className="flex justify-center items-center gap-3 w-[117px] bg-[#22BE5B] text-white py-2 rounded-[10px] hover:bg-blue-700 transition"
            >
              Login
              <FaArrowRightLong />
            </button>
          </form>
        </div>
        {/* kotak kanan */}
        <div className="text-white text-center bg-linear-to-b from-[#16A34A] to-[#31E272] h-full w-[450px]  rounded-bl-[20px] rounded-tl-[20px] rounded-[10px]">
          <div className="flex flex-col justify-center items-center py-23">
            <h2 className="text-[24px] font-bold">
              Sistem Manajemen Inventaris
            </h2>
            <h1 className="text-[30px] font-semibold">CR.JAYA</h1>
            <img src={gambar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleLogin;
