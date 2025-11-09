import React, { useState, useEffect } from "react";
import GambarBeras from "../assets/gambar/beras.jpeg";

const ListProduk = ({ cart, setCart }) => {
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ada, silakan login ulang");
          return;
        }
        
        const res = await fetch("http://127.0.0.1:5000/api/products/", {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error response:", errorText);
          throw new Error(`Gagal ambil data produk: ${res.status}`);
        }

        const data = await res.json();
        console.log("Data dari backend:", data);
        setProdukList(data.productList || []);
      } catch (err) {
        console.error("Error detail:", err);
        alert(`Error: ${err.message}`);
        setProdukList(
          Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            productName: "Pandan Wangi",
            weight: 5,
            sellPrice: 80000,
            imgPath: GambarBeras,
          }))
        );
      }
    };

    fetchProduk();
  }, []);

  const handleAddToCart = (produk) => {
    const existing = cart.find(item => item.productId === produk.productId || item.productId === produk.id);
    if (existing) {
      setCart(cart.map(item =>
        (item.productId === produk.productId || item.productId === produk.id)
          ? { ...item, jumlah: item.jumlah + 1 }
          : item
      ));
    } else {
      setCart([
  ...cart,
  {
    productId: produk.productId || produk.id,
    nama: produk.productName,
    harga: Number(produk.sellPrice),
    jumlah: 1,
    imgPath: produk.imgPath,    // tambahkan ini
    kategori: produk.weight + " kg", // tambahkan ini
  },
]);

    }
  };

  return (
    <div className="px-3 grid grid-cols-2 max-h-[400px] overflow-x-hidden overflow-y-scroll sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {produkList.map((produk, index) => (
        <div
          key={produk.productId || index}
          className="w-[141px] h-[165px] flex flex-col rounded-lg shadow bg-white"
        >
          <div className="h-1/2 flex items-center justify-center">
            <img
              src={produk.imgPath || GambarBeras}
              alt={produk.productName || "Produk"}
              className="object-contain h-full w-full"
            />
          </div>

          <div className="h-1/2 flex flex-col justify-between p-2 text-[8px]">
            <div className="flex justify-between">
              <section>
                <p className="text-gray-700">Nama</p>
                <p className="text-gray-700">Berat</p>
                <p className="text-gray-700">Harga</p>
              </section>
              <section className="text-right">
                <p className="text-gray-700">{produk.productName}</p>
                <p className="text-gray-700">{produk.weight} kg</p>
                <p className="text-gray-700">
                  Rp{Number(produk.sellPrice || 0).toLocaleString()}
                </p>
              </section>
            </div>
            <button
              onClick={() => handleAddToCart(produk)}
              className="mt-1 text-[8px] w-full p-1 rounded-[3px] bg-blue-400 hover:bg-blue-500 text-white"
            >
              Tambah Pesanan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProduk;
