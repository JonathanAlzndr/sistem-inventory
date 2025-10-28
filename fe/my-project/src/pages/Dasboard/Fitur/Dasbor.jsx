import React from "react";
import Card from "../../../components/Card/Card";
import GrafikBatang from "../../../components/Grafik/GrafikBatang";
import GrafikBulat from "../../../components/Grafik/GrafikBulat";

const Dasbor = () => {
  return (
    <div className="  ">
      <h1 className="text-center text-3xl font-bold">Dasbor Gudang</h1>
      <p className="text-center text-[13px]">Monitoring dan Analisis Gudang</p>
      <div className="space-y-10">
        <Card />
        <div className="flex justify-center  w-full gap-14 ">
        <GrafikBatang />
        <GrafikBulat/>
        </div>
      </div>
    </div>
  );
};

export default Dasbor;
