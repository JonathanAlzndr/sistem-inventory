import React, { useState, useEffect } from "react"; // 1. Import hook
import ListProduk from "./ListProduk";

const Pilih = ({ pilihStatus, setPilihStatus, cart, setCart }) => {
  // 2. Buat state untuk menampung daftar kategori (weights)
  const [categories, setCategories] = useState([]);

  // 3. Ambil data kategori dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // Tidak perlu fetch jika belum login

        // Panggil endpoint baru yang tadi kita buat
        const res = await fetch("http://127.0.0.1:5000/api/products/weights/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setCategories(data.weights || []); // Simpan hasilnya, misal: [5, 10, 50, 120]
        }
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };

    fetchCategories();
  }, []); // [] artinya hanya berjalan sekali saat komponen dimuat

  return (
    <div className="p-3 px-6  bg-white/80 rounded-[10px] shadow-md  w-[790px] h-[514px]">
      <header className=" flex justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Daftar Produk</h2>
          <p className="text-gray-400 text-[13px]">
            Pilih produk untuk pencatatan Transaksi
          </p>
        </div>

        {/* 4. Ubah <select> agar dinamis */}
<select
  value={pilihStatus}
  onChange={(e) => setPilihStatus(e.target.value)}
  className="p-1 border border-gray-300 bg-gray-50 w-[200px] h-[34px] rounded-[6px] focus:outline-none focus:ring focus:ring-blue-400"
>
  <option value="">Semua Kategori</option>

  {categories.map((weight) => (
    <option key={weight} value={String(weight)}>
      {weight} kg
    </option>
  ))}
</select>

      </header>
      <div className="mt-3  ">
        <ListProduk cart={cart} setCart={setCart} pilihStatus={pilihStatus} />
      </div>
    </div>
  );
};

export default Pilih;
