import React, { useEffect, useState } from "react";
import { BsFillBoxFill, BsExclamationLg } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

// Helper untuk mengecek apakah tanggal (dari API) adalah hari ini
const isToday = (dateString) => {
  if (!dateString) return false;
  const apiDate = new Date(dateString);
  const today = new Date();
  
  return apiDate.getDate() === today.getDate() &&
         apiDate.getMonth() === today.getMonth() &&
         apiDate.getFullYear() === today.getFullYear();
};

const Card = () => {
  const [data, setData] = useState({
    totalStok: 0,
    totalMasuk: 0,
    totalKeluar: 0,
    totalKritis: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        console.error("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // --- PERBAIKAN DI SINI ---

      // 1. Ini HANYA berisi headers
      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // 2. Ini adalah OPSI fetch, dengan 'credentials' di luar 'headers'
      const fetchOptions = {
        method: "GET",
        headers: commonHeaders,
        credentials: "include", // <-- Dipindahkan ke sini (di luar headers)
      };

      // --------------------------

      // 3. Siapkan 2 API request menggunakan 'fetchOptions'
      const fetchTotalStock = fetch("http://127.0.0.1:5000/api/products/?limit=1000", fetchOptions);
      const fetchTransactions = fetch("http://127.0.0.1:5000/api/transaction/", fetchOptions);

      try {
        // ... (Sisa kode Anda untuk Promise.all, .json(), dan setData sudah benar) ...
        
        const [resStock, resTrans] = await Promise.all([
          fetchTotalStock,
          fetchTransactions
        ]);

        if (!resStock.ok || !resTrans.ok) {
          throw new Error('Gagal mengambil data dari server');
        }

        const dataStock = await resStock.json();
        const dataTrans = await resTrans.json();

        let totalStok = 0;
        let totalKritis = 0;
        let totalMasuk = 0;

        if (dataStock.productList) {
          dataStock.productList.forEach(p => {
            totalStok += (p.currentStock || 0);
            if (p.currentStock <= 5) {
              totalKritis += 1;
            }
            if (isToday(p.receivedDate)) {
              totalMasuk += (p.currentStock || 0);
            }
          });
        }

        let totalKeluar = 0;
        if (dataTrans.transactionList) {
          dataTrans.transactionList.forEach(t => {
            if (isToday(t.transactionDate)) {
              totalKeluar += (t.totalItems || 0);
            }
          });
        }

        setData({
          totalStok,
          totalMasuk,
          totalKeluar,
          totalKritis
        });

      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);


  // ... (Sisa kode JSX untuk 'dataCards' dan 'return' Anda sudah benar) ...
  // ... Tidak perlu diubah ...
  
  const dataCards = [
    {
      title: "Total Stok Beras",
      value: loading ? "..." : data.totalStok,
      colorbg: "bg-[#1F91F5]/10",
      bgicon: "bg-[#1F91F5]",
      icon: <BsFillBoxFill className="text-4xl p-1 text-white" />,
    },
    {
      title: "Stok Masuk (Hari Ini)",
      value: loading ? "..." : data.totalMasuk,
      colorbg: "bg-[#36DC72]/10",
      bgicon: "bg-[#29DB6A]",
      icon: <FaArrowDown className="text-4xl p-1 text-white" />,
    },
    {
      title: "Stok Keluar (Hari Ini)",
      value: loading ? "..." : data.totalKeluar,
      colorbg: "bg-[#FE4524]/10",
      bgicon: "bg-[#FE4524]",
      icon: <FaArrowUp className="text-4xl p-1 text-white" />,
    },
    {
      title: "Total Stok Kritis",
      value: loading ? "..." : data.totalKritis,
      colorbg: "bg-[#F9315A]/10",
      bgicon: "bg-[#F9315A]",
      icon: <BsExclamationLg className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="flex w-full justify-center space-x-13">
      {dataCards.map((item, index) => (
        <div
          key={index}
          className={`hover:scale-103 duration-300 shadow-[0_5px_8px_rgba(0,0,0,0.25)] ${item.colorbg} rounded-[10px] w-[249px] h-[108px] mt-10 flex justify-center items-center gap-4`}
        >
          <div>
            <p>{item.title}</p>
            <h1 className="text-3xl font-bold">{item.value}</h1>
          </div>
          <div className={`rounded-[10px] ${item.bgicon} p-2`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;