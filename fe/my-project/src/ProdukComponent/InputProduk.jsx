import React, { useState, useEffect } from "react";
import { MdAddPhotoAlternate, MdClose } from "react-icons/md";
import InputKategori from "./InputKategori";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const InputProduk = ({ editData, setProdukList, produkList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    receivedDate: "",
    weight: "",
    currentStock: "",
    sellPrice: "",
    purchasePrice: "",
    imgFile: null,
    imgPreview: null,
  });

  useEffect(() => {
    if (editData) {
      setIsOpen(true); // buka form otomatis
      setFormData({
        productName: editData.productName || "",
        receivedDate: editData.receivedDate
          ? new Date(editData.receivedDate).toISOString().split("T")[0]
          : "",
        weight: editData.weight || "",
        currentStock: editData.currentStock || "",
        sellPrice: editData.sellPrice || "",
        purchasePrice: editData.purchasePrice || "",
        imgFile: null,
        imgPreview: editData.imgPath || null, // tampilkan gambar lama
      });
    }
  }, [editData]);

  const isEditMode = Boolean(editData);

  // Update state untuk input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setFormData({ ...formData, imgFile: file, imgPreview: preview });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Hapus gambar
  const handleRemoveImage = () => {
    setFormData({ ...formData, imgFile: null, imgPreview: null });
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      productName: "",
      receivedDate: "",
      weight: "",
      currentStock: "",
      sellPrice: "",
      purchasePrice: "",
      imgFile: null,
      imgPreview: null,
    });
  };

  // Submit form ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.receivedDate ||
      !formData.weight ||
      !formData.currentStock ||
      !formData.sellPrice ||
      !formData.purchasePrice
    ) {
      return alert("Semua field wajib diisi!");
    }

    try {
      const token = localStorage.getItem("token");
      const isEdit = !!editData; // true kalau lagi edit

      let res;
      if (isEdit) {
        // === UPDATE PRODUK ===
        const url = `http://127.0.0.1:5000/api/products/${editData.productId}`;
        res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productName: formData.productName,
            receivedDate: new Date(formData.receivedDate).toISOString(),
            weight: parseFloat(formData.weight),
            currentStock: parseInt(formData.currentStock),
            sellPrice: parseFloat(formData.sellPrice),
            purchasePrice: parseFloat(formData.purchasePrice),
            imgPath: editData.imgPath, // pakai gambar lama
          }),
        });
      } else {
        // === TAMBAH PRODUK BARU ===
        const form = new FormData();
        form.append("productName", formData.productName);
        form.append(
          "receivedDate",
          new Date(formData.receivedDate).toISOString()
        );
        form.append("weight", parseFloat(formData.weight));
        form.append("currentStock", parseInt(formData.currentStock));
        form.append("sellPrice", parseFloat(formData.sellPrice));
        form.append("purchasePrice", parseFloat(formData.purchasePrice));
        if (formData.imgFile) form.append("imgPath", formData.imgFile);
        else return alert("Silakan isi gambar produk!");

        res = await fetch("http://127.0.0.1:5000/api/products/", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert(isEdit ? "Produk berhasil diubah!" : "Produk berhasil dibuat!");

        // Update state list produk biar tabel auto-update
        if (isEdit) {
          setProdukList((prev) =>
            prev.map((p) =>
              p.productId === editData.productId
                ? { ...p, ...data.product } // ⬅️ gabung field lama + baru
                : p
            )
          );
        } else {
          setProdukList((prev) => [...prev, data.product]);
        }

        handleReset();
        setIsOpen(false);
      } else {
        alert(data.msg || "Gagal menyimpan produk");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan server!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-3 rounded-[10px] shadow-md w-full">
      {/* Tombol utama */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 justify-center items-center text-gray-700 font-medium"
      >
        {editData ? "Edit Produk" : "Tambah Produk"}{" "}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp className="text-2xl transition-transform duration-300" />
        ) : (
          <MdOutlineKeyboardArrowDown className="text-2xl transition-transform duration-300" />
        )}
      </button>

      {/* Bagian dropdown input */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
        } w-full`}
      >
        <form
          onSubmit={handleSubmit}
          className="gap-3 p-3 border-t space-y-5 border-gray-200"
        >
          {/* Baris 1 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Harga Jual
              </label>
              <input
                type="number"
                name="sellPrice"
                value={formData.sellPrice}
                onChange={handleChange}
                placeholder="Masukkan harga jual"
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Tanggal Masuk
              </label>
              <input
                type="date"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleChange}
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Baris 2 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <InputKategori value={formData.weight} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Harga Beli
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="Masukkan harga beli"
                className="border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Stok
              </label>
              <input
                type="number"
                name="currentStock"
                value={formData.currentStock}
                onChange={handleChange}
                placeholder="Jumlah stok"
                className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {/* Upload Gambar + Preview */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Gambar Produk
            </label>

            {formData.imgPreview && (
              <div className="relative w-40 h-40">
                <img
                  src={formData.imgPreview}
                  alt="preview"
                  className="object-cover w-full h-full rounded-md border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <MdClose />
                </button>
              </div>
            )}

            <input
              type="file"
              name="imgPath"
              id="uploadGambar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="uploadGambar"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition w-max"
            >
              Tambah Gambar
              <MdAddPhotoAlternate className="text-xl" />
            </label>
          </div>

          {/* Tombol Batal / Simpan */}
          <div className="flex h-[45px] gap-4 w-full mt-5">
            <button
              type="button"
              onClick={() => {
                handleReset(); // reset semua input
       
                setIsOpen(false); // tutup form ke mode tambah
              }}
              className="bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full mt-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full mt-2"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputProduk;
