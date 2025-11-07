import React from "react";
import Pilih from "../../../TransaksiComponent/Pilih";
import Daftar from "../../../TransaksiComponent/Daftar";
import ContainerTabel from "../../../TransaksiComponent/ContainerTabel";

const Transaksi = () => {
  return (
    <>
      <div className="space-y-10 px-3">
        <div>
          <h2 className="text-3xl font-bold text-center mb-1">Transaksi</h2>
          <p className="text-gray-600 text-center text-[13px]">
            Monitoring dan Analisis Gudang
          </p>
        </div>
        <section className="flex gap-5 flex-col justify-center ">
          <div className="flex gap-5">
            <Pilih />
            <Daftar />
          </div>
          <ContainerTabel />
        </section>
      </div>
    </>
  );
};

export default Transaksi;
