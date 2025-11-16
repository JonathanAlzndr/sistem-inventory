import { useState, useEffect } from "react";

// Ambil semua weight untuk dropdown
export function useWeightFilter() {
  const [weightList, setWeightList] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState("");

  const fetchWeightList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://127.0.0.1:5000/api/products/weights/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWeightList(data.weights || []);
      }
    } catch (err) {
      console.error("Gagal ambil weight:", err);
    }
  };

  useEffect(() => {
    fetchWeightList();
  }, []);

  return {
    weightList,
    selectedWeight,
    setSelectedWeight,
  };
}

// Ambil produk sesuai filter weight
export function useProdukFiltered(selectedWeight) {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduk = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      let url = "http://127.0.0.1:5000/api/products/?limit=1000&offset=0";

      if (selectedWeight) {
        url += `&weight=${selectedWeight}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal fetch produk");

      const data = await res.json();
      setProdukList(data.productList || []);
    } catch (err) {
      console.error("Fetch produk error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, [selectedWeight]);

  return {
    produkList,
    setProdukList,
    loading,
    fetchProduk,
  };
}
