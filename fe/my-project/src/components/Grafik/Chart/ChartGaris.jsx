import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const chartOptions = {
  chart: {
    type: "bar",
    height: 350
  },
  title: {
  
    align: "center",
    style: {
      fontFamily: "poppins",
      fontSize: "16px",
      color: "#111111",
      fontWeight: 600
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "60%"
    }
  },
  dataLabels: { enabled: false },
  legend: {
    position: "bottom",
    labels: { colors: "#000000" }
  },
  xaxis: {
    categories: ["4 Minggu Lalu", "3 Minggu Lalu", "2 Minggu Lalu", "Minggu Ini"]
  },
  tooltip: {
    y: {
      formatter: val => "Rp " + val.toLocaleString("id-ID")
    }
  },
  grid: { borderColor: "#f1f1f1" },
  colors: ["#22c55e", "#60a5fa", "#f97316", "#ef4444", "#9333ea"]
};

export default function GrafikStokBeras() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChartData = async () => {
      if (!token) {
        setError("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const fetchOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        // 1. Ambil produk
        const resProducts = await fetch(
          "http://127.0.0.1:5000/api/products/?limit=1000&offset=0",
          fetchOptions
        );
        if (!resProducts.ok) throw new Error("Gagal mengambil data produk");
        const dataProducts = await resProducts.json();

        const weightMap = new Map();
        dataProducts.productList.forEach(p => {
          weightMap.set(p.productName, p.weight);
        });

        // 2. List transaksi
        const resList = await fetch(
          "http://127.0.0.1:5000/api/transaction/?limit=1000",
          fetchOptions
        );
        if (!resList.ok) throw new Error("Gagal mengambil daftar transaksi");
        const dataList = await resList.json();

        const today = new Date();
        const last28Days = [];

        dataList.transactionList?.forEach(trx => {
          const date = new Date(trx.transactionDate);
          const diff = Math.ceil(Math.abs(today - date) / (1000 * 60 * 60 * 24));

          if (diff <= 28) {
            last28Days.push({ id: trx.transactionId, diff });
          }
        });

        if (last28Days.length === 0) {
          setSeries([]);
          setLoading(false);
          return;
        }

        // 3. Detail transaksi
        const detailPromises = last28Days.map(t =>
          fetch(`http://127.0.0.1:5000/api/transaction/${t.id}`, fetchOptions)
            .then(r => r.json())
        );

        const detailed = await Promise.all(detailPromises);

        // 4. Proses data
        const weeklyData = {};

        detailed.forEach((detail, idx) => {
          const diff = last28Days[idx].diff;

          let week;
          if (diff <= 7) week = 3;
          else if (diff <= 14) week = 2;
          else if (diff <= 21) week = 1;
          else week = 0;

          detail.items?.forEach(item => {
            const w = weightMap.get(item.productName);
            if (w === undefined) return;

            if (!weeklyData[w]) weeklyData[w] = [0, 0, 0, 0];

            weeklyData[w][week] += Number(item.subtotal);
          });
        });

        const finalSeries = Object.keys(weeklyData).map(weight => ({
          name: `${weight} kg`,
          data: weeklyData[weight]
        }));

        setSeries(finalSeries);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-[350px] items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Memuat data chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[350px] items-center justify-center bg-red-50 rounded-lg">
        <p className="text-red-600">Error. {error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
}
