import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

// Opsi statis untuk chart (styling)
// Kita pindahkan ke luar agar tidak di-render ulang
const chartOptions = {
  chart: {
    type: "donut",
    height: 350,
  },
  title: {
    align: "center",
    style: {
      fontFamily: "poppines",
      fontSize: "16px",
      color: "#111111",
      fontWeight: 600,
    },
  },
  // Anda bisa tambahkan lebih banyak warna di sini jika produk Anda banyak
  colors: ["#22c55e", "#60a5fa", "#facc15", "#f97316", "#ef4444", "#9333ea"],
  legend: {
    position: "bottom",
    labels: {
      colors: "#000000",
    },
  },
  dataLabels: {
    style: {
      colors: ["#fff"],
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Stok",
            color: "#000000",
            fontSize: "14px",
          },
        },
      },
    },
  },
};

export default function ChartBulat() {
  // 1. State untuk data dinamis, loading, dan error
  const [seriesData, setSeriesData] = useState([]);
  const [labelsData, setLabelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        };

        // Ambil SEMUA produk (limit tinggi)
        const res = await fetch(
          "http://127.0.0.1:5000/api/products/?limit=1000",
          fetchOptions
        );

        if (!res.ok) {
          throw new Error(`Gagal mengambil data: ${res.status}`);
        }

        const data = await res.json();

        if (data.productList) {
          // 3. Transformasi data API menjadi data yang dimengerti Chart
          const products = data.productList;

          // Buat array HANYA nama produk
          const labels = products.map(p => p.productName);
          // Buat array HANYA stok produk
          const series = products.map(p => p.currentStock);

          // 4. Simpan ke state
          setLabelsData(labels);
          setSeriesData(series);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []); // [] = Hanya berjalan sekali

  // 5. Tampilkan status loading atau error
  if (loading) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">Memuat data chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg bg-red-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <Chart
        // Gabungkan opsi statis dengan 'labels' dinamis
        options={{ ...chartOptions, labels: labelsData }}
        // Gunakan 'series' dinamis
        series={seriesData}
        type="donut"
        height={350}
      />
    </div>
  );
}