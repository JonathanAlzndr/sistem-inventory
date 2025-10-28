import React from "react";
import Card from "../../../components/Card/Card";
import GrafikBatang from "../../../components/Grafik/GrafikBatang";
import GrafikBulat from "../../../components/Grafik/GrafikBulat";
import In_Out from "../../../components/in-out/In_Out";
import ProdukExpired from "../../../components/Expired/ProdukExpired";

const Dasbor = () => {
  return (
    <div className=" px-10 ">
      <h1 className="text-center text-3xl font-bold mb-1">Dasbor Gudang</h1>
      <p className="text-center text-gray-600 text-[13px]">Monitoring dan Analisis Gudang</p>
      <div className="space-y-10">
        <Card />
        <div className="flex justify-center  w-full gap-14 ">
        <GrafikBatang />
        <GrafikBulat/>
        </div>
        <div className="flex gap-9">
        <ProdukExpired/>
        <In_Out/>
        </div>
      </div>
    </div>
  );
};

export default Dasbor;
