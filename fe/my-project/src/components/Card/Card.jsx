import React, { useEffect, useState } from "react";
import { BsFillBoxFill, BsExclamationLg } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

// URL API kamu
const API_URL = "http://127.0.0.1:5000/api/products?page=1&size=10&weight=5";

const Card = () => {
  const [data, setData] = useState({
    totalStok: 0,
    totalMasuk: 0,
    totalKeluar: 0,
    totalKritis: 0,
  });

  const token = localStorage.getItem("token"); // ambil token login kalau pakai JWT

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.productList) {
          // hitung total stok dari semua produk
          const totalStok = result.productList.reduce(
            (sum, item) => sum + (item.currentStock || 0),
            0
          );

          // misal stok kritis di bawah 10
          const totalKritis = result.productList.filter(
            (item) => item.currentStock < 10
          ).length;

          setData({
            totalStok,
            totalMasuk: 0, // nanti bisa diisi dari endpoint stok masuk
            totalKeluar: 0, // nanti bisa diisi dari endpoint stok keluar
            totalKritis,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data stok:", error);
      }
    };

    fetchStock();
  }, [token]);


  // daftar kartu (sama kayak dummy tapi pakai data dari API)
  const dataCards = [
    {
      title: "Total Stok Beras",
      value: data.totalStok,
      colorbg: "bg-[#1F91F5]/10",
      bgicon: "bg-[#1F91F5]",
      icon: <BsFillBoxFill className="text-4xl p-1 text-white" />,
    },
    {
      title: "Total Stok Masuk",
      value: data.totalMasuk,
      colorbg: "bg-[#36DC72]/10",
      bgicon: "bg-[#29DB6A]",
      icon: <FaArrowDown className="text-4xl p-1 text-white" />,
    },
    {
      title: "Total Stok Keluar",
      value: data.totalKeluar,
      colorbg: "bg-[#FE4524]/10",
      bgicon: "bg-[#FE4524]",
      icon: <FaArrowUp className="text-4xl p-1 text-white" />,
    },
    {
      title: "Total Stok Kritis",
      value: data.totalKritis,
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
