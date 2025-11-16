import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Kita perlu ini
import Card from "../../../components/Card/Card";
import GrafikBatang from "../../../components/Grafik/GrafikBatang";
import GrafikBulat from "../../../components/Grafik/GrafikBulat";
import In_Out from "../../../components/in-out/In_Out";
import ProdukExpired from "../../../components/Expired/ProdukExpired";

const Dasbor = () => {
  // 1. Buat state untuk menyimpan role user
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // 2. useEffect untuk membaca role dari localStorage saat komponen dimuat
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      console.error("Role tidak ditemukan, kembali ke login.");
      // Jika tidak ada role, paksa kembali ke halaman login
      navigate("/RoleLogin");
    }

    setUserRole(role);
  }, [navigate]); // Tambahkan navigate sebagai dependency

  // 3. Tampilkan loading sederhana sampai role selesai dibaca
  if (!userRole) {
    return <div className="px-10 py-5 text-center">Memuat dasbor...</div>;
  }

  // 4. (Opsional) Buat variabel untuk nama role yang lebih cantik
  const roleName = {
    Owner: "Pemilik",
    Kasir: "Kasir",
    Staff: "Staff Gudang",
  };

  // 5. Render komponen secara kondisional
  return (
    <div className=" px-10 ">
      <h1 className="text-center text-3xl font-bold mb-1">Dasbor Gudang</h1>
      <p className="text-center text-gray-600 text-[13px]">
        Monitoring dan Analisis Gudang (Role: {roleName[userRole] || userRole})
      </p>

      <div className="space-y-10 mt-5 flex flex-col justify-center items-center">
        {/* Card tampil untuk semua role, tapi kontennya diatur internal oleh prop 'role' */}
        <Card role={userRole} />

        {/* --- MULAI STRUKTUR LAYOUT PER ROLE --- */}

        {/* --- 1. TAMPILAN UNTUK OWNER --- */}
        {/* Owner melihat semua 4 komponen dalam 2 baris */}
        {userRole === "Owner" && (
          <>
            {/* Baris 1: Grafik Batang & Bulat */}
            <div className="flex justify-center items-start w-full gap-14">
              <GrafikBatang />
              <GrafikBulat />
            </div>
            {/* Baris 2: Expired & In/Out */}
            <div className="flex justify-center items-start w-full gap-9">
              <ProdukExpired />
              <In_Out role={userRole} />
            </div>
          </>
        )}

        {/* --- 2. TAMPILAN UNTUK KASIR --- */}
        {/* Kasir melihat 2 komponen (Grafik Batang & In/Out)  */}
        {userRole === "Cashier" && (
          <div className="flex justify-center items-start w-[1150px] gap-3">
            <GrafikBatang />
            <In_Out role={userRole} />
          </div>
        )}

        {/* --- 3. TAMPILAN UNTUK STAFF GUDANG --- */}
        {/* Staff melihat 3 komponen dalam 2 baris */}
        {userRole === "Staff" && (
          <>
            {/* Baris 1: Grafik Bulat (di tengah) */}
                
            <div className="flex justify-centeritems-start w-[1150px] gap-3">
               
                <ProdukExpired />
              <In_Out role={userRole} />
              <GrafikBulat />
            </div>
            {/* Baris 2: Expired & In/Out */}

           
           
          </>
        )}

        {/* --- AKHIR STRUKTUR LAYOUT --- */}
      </div>
    </div>
  );
};

export default Dasbor;
