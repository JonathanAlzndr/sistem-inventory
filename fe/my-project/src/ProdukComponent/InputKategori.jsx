import React, { useState } from "react";

const InputKategori = () => {
  const [kategori, setKategori] = useState("");
  const kategoriList = ["5 kg", "10 kg", "25 kg", "50 kg"];

  return (
    <div className="flex flex-col">
      <label htmlFor="kategori" className="text-sm mb-1 font-medium text-gray-600">
        Kategori Beras
      </label>

      <input
        list="kategoriList"
        id="kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        placeholder="Ketik atau pilih kategori..."
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <datalist id="kategoriList">
        {kategoriList.map((item, i) => (
          <option key={i} value={item} />
        ))}
      </datalist>
    </div>
  );
};

export default InputKategori;
