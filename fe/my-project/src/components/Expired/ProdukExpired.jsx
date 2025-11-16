import React, { useEffect, useState } from "react";
import { FcExpired } from "react-icons/fc";

const ProdukExpired = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);

  useEffect(() => {
    const fetchExpired = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ada, silakan login ulang");
          return;
        }
        const res = await fetch(
          "http://127.0.0.1:5000/api/products/?limit=1000&offset=0",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (!data.productList) return;

        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
console.log(data)
        const filtered = data.productList.filter((item) => {
          const received = new Date(item.receivedDate);
          return received < sixMonthsAgo;
        });
  

        setExpiredProducts(filtered);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchExpired();
  }, []);

  return (
    <div className="bg-white w-[400px] rounded-[10px] p-4 space-y-2 shadow-md">
      <div className="flex items-center gap-2">
        <FcExpired className="text-2xl" />
        <h1 className="text-[16px] font-semibold">
          Stok Lama (wajib diperiksa)
        </h1>
      </div>

      <p className="text-[12px] text-gray-500">
        Menampilkan stok yang sudah lama dari tanggal masuk sampai hari ini
      </p>

      <div className="space-y-2 mt-2 overflow-y-scroll max-h-[250px]">
        {expiredProducts.length === 0 && (
          <p className="text-[12px] text-gray-400">Tidak ada stok lama</p>
        )}

        {expiredProducts.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-[13px]"
          >
            <p className="font-medium w-[120px] text-[12px]">
              {item.productName}
            </p>
            <p className="text-[12px] w-[60px]">{item.weight}kg</p>
            <p className="text-[12px] w-[60px]">{item.currentStock} Qty</p>
            <p className="text-[12px] text-gray-600">
              {new Date(item.receivedDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdukExpired;
