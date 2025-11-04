import React from "react";
import Card from "../../../components/Card/Card";
import InputProduk from "../../../ProdukComponent/InputProduk";
import ProdukTabel from "../../../ProdukComponent/ProdukTabel";

const Produk = () => {
  return (
    <>
      <div className="space-y-10 w-full">
        <h1 className="text-center text-3xl font-bold mb-1">
          Pencatatan Produk
        </h1>
        <p className="text-center text-gray-600 text-[13px]">
          Monitoring dan Analisis Gudang
        </p>

        <InputProduk />
        <ProdukTabel />
      </div>
    </>
  );
};

export default Produk;
