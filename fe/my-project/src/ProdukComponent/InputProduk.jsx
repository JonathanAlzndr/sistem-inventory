import React, { useState, useEffect } from "react";
import { MdAddPhotoAlternate, MdClose } from "react-icons/md";
import InputKategori from "./InputKategori";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { toast } from "react-toastify";

const InputProduk = ({
  editData,
  setProdukList,
  isOpen,
  setIsOpen,
  setEditData,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    receivedDate: "",
    weight: "",
    currentStock: "",
    sellPrice: "",
    purchasePrice: "",
    imgPath: "image.jpg", // default sesuai dokumentasi
    imgPreview: null,
  });

  useEffect(() => {
    if (editData) {
      setIsOpen(true);
      setFormData({
        productName: editData.productName || "",
        receivedDate: editData.receivedDate
          ? new Date(editData.receivedDate).toISOString().split("T")[0]
          : "",
        weight: editData.weight || "",
        currentStock: editData.currentStock || "",
        sellPrice: editData.sellPrice || "",
        purchasePrice: editData.purchasePrice || "",
        imgPath: editData.imgPath || "image.jpg",
        imgPreview: editData.imgPath || null,
      });
    }
  }, [editData]);

  // handle input biasa dan gambar (hanya preview)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      // hanya tampilkan preview, tidak dikirim ke backend
      setFormData({
        ...formData,
        imgPreview: preview,
        imgPath: file.name,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imgPreview: null, imgPath: "image.jpg" });
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      receivedDate: "",
      weight: "",
      currentStock: "",
      sellPrice: "",
      purchasePrice: "",
      imgPath: "image.jpg",
      imgPreview: null,
    });
  };

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
      return toast.warn("Semua field wajib diisi!");
    }

    try {
      const token = localStorage.getItem("token");
      const isEdit = !!editData;

      const payload = {
        productName: formData.productName,
        receivedDate: new Date(formData.receivedDate).toISOString(),
        weight: parseFloat(formData.weight),
        currentStock: parseInt(formData.currentStock),
        sellPrice: parseFloat(formData.sellPrice),
        purchasePrice: parseFloat(formData.purchasePrice),
        imgPath: formData.imgPath || "image.jpg",
      };

      let res;
      if (isEdit) {
        res = await fetch(
          `http://127.0.0.1:5000/api/products/${editData.productId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        res = await fetch("http://127.0.0.1:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(
          isEdit ? "Produk berhasil diubah!" : "Produk berhasil dibuat!"
        );
         setEditData(null);

        // update tabel frontend
        if (isEdit) {
          setProdukList((prev) =>
            prev.map((p) =>
              p.productId === editData.productId ? { ...p, ...payload } : p
            )
          );
        } else {
          setProdukList((prev) => [...prev, payload]);
        }

        handleReset();
        setIsOpen(false);
      } else {
        alert(data.msg || "Gagal menyimpan produk");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan server!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-3 rounded-[10px] shadow-md w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 justify-center items-center text-gray-700 font-medium"
      >
        {editData ? "Edit Produk" : "Tambah Produk"}{" "}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp className="text-2xl" />
        ) : (
          <MdOutlineKeyboardArrowDown className="text-2xl" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
        } w-full`}
      >
        <form
          onSubmit={handleSubmit}
          className="gap-3 p-3 border-t space-y-5 border-gray-200"
        >
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
                min="0"
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
                min="0"
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
                min="0"
                name="currentStock"
                value={formData.currentStock}
                onChange={handleChange}
                placeholder="Jumlah stok"
                className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

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

          <div className="flex h-[45px] gap-4 w-full mt-5">
            <button
              type="button"
              onClick={() => {
                handleReset();
                setIsOpen(false);
                setEditData(null);
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
