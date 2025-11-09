import React from "react";
import BttnEkspor from "../kecilComponent/bttnEkspor";
import TabelTransaksi from "./TabelTransaksi";

const ContainerTabel = ({refreshTrigger}) => {
  return (
    <>
      <div className="bg-white shadow h-[449px] w-[1225px] p-4 px-6 rounded-[10px]">
        <header className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Daftar Transaksi
            </h2>
            <p className="text-gray-400 text-[13px]">
              Menampilkan daftar transaksi yang telah di catat
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <BttnEkspor />
          </div>
        </header>
        <main>
          <TabelTransaksi refreshTrigger={refreshTrigger} />
        </main>
      </div>
    </>
  );
};

export default ContainerTabel;
