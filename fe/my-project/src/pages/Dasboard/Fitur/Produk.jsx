import React from "react";
import Card from "../../../components/Card/Card";
import InputProduk from "../../../ProdukComponent/InputProduk";
import ProdukTabel from "../../../ProdukComponent/ProdukTabel";
import { useState,useEffect } from "react";

const Produk = () => {
  const [editData, setEditData] = useState(null);
  const [produkList, setProdukList] = useState([]);
   const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProduk = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/api/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      const data = await res.json();
      setProdukList(data.productList || []);
    };
    fetchProduk();
  }, []);

  return (
    <>
      <div className="space-y-10 w-full">
        <h1 className="text-center text-3xl font-bold mb-1">
          Pencatatan Produk
        </h1>
        <p className="text-center text-gray-600 text-[13px]">
          Monitoring dan Analisis Gudang
        </p>

        <InputProduk
        isOpen={isOpen}
         setIsOpen={setIsOpen}
          editData={editData}
          setEditData={setEditData}
          produkList={produkList}
          setProdukList={setProdukList}
        />
        <ProdukTabel
        setIsOpen={setIsOpen}
        isOpen={isOpen}
          produkList={produkList}
          setProdukList={setProdukList}
          setEditData={setEditData}
        />
      </div>
    </>
  );
};

export default Produk;
