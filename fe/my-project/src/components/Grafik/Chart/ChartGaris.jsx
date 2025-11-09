import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

// Opsi (styling) untuk line chart
const chartOptions = {
  chart: {
    type: "line",
    height: 350,
    zoom: { enabled: false },
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
  dataLabels: { enabled: false },
  stroke: {
    width: 4,
    curve: "stepline",
  },
  legend: {
    position: "bottom",
    labels: {
      colors: "#000000",
    },
  },
  xaxis: {
    categories: ["4 Mgg Lalu", "3 Mgg Lalu", "2 Mgg Lalu", "Minggu Ini"],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " item";
      },
    },
  },
  grid: { borderColor: "#f1f1f1" },
  colors: ["#22c55e", "#f87171", "#60a5fa", "#f97316", "#ef4444", "#9333ea"],
};

export default function ChartGaris() {
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
      
      // --- PERBAIKAN DI SINI ---

      // 1. Ini HANYA berisi headers
      const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // 2. Ini adalah OPSI fetch, dengan 'credentials' di luar 'headers'
      const fetchOptions = {
        method: "GET",
        headers: commonHeaders,
        credentials: "include", // <-- Dipindahkan ke sini
      };
      
      // --------------------------

      try {
        // 3. Ambil DAFTAR transaksi (1000 terakhir)
        const resList = await fetch(
          "http://127.0.0.1:5000/api/transaction/?limit=1000",
          fetchOptions // <-- Gunakan fetchOptions
        );
        if (!resList.ok) throw new Error("Gagal mengambil daftar transaksi");
        const dataList = await resList.json();
        
        const today = new Date();
        const transactionsInLastMonth = [];

        // 4. Filter transaksi HANYA 4 minggu (28 hari) terakhir
        if (dataList.transactionList) {
          dataList.transactionList.forEach(trx => {
            const trxDate = new Date(trx.transactionDate);
            const diffTime = Math.abs(today - trxDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 28) {
              transactionsInLastMonth.push({
                id: trx.transactionId,
                date: trxDate,
                diffDays: diffDays
              });
            }
          });
        }

        if (transactionsInLastMonth.length === 0) {
            setLoading(false);
            setSeries([]); // Tidak ada data
            return;
        }

        // 5. Ambil DETAIL untuk setiap transaksi (Ini bagian yang lambat)
        const detailPromises = transactionsInLastMonth.map(trx =>
          fetch(`http://127.0.0.1:5000/api/transaction/${trx.id}`, 
            fetchOptions // <-- Gunakan fetchOptions juga di sini
          ).then(res => {
            if (!res.ok) throw new Error(`Detail fetch failed for ${trx.id}`);
            return res.json();
          })
        );

        const detailedTransactions = await Promise.all(detailPromises);

        // 6. Proses Data: Kelompokkan per produk dan per minggu
        const weeklyProductData = {}; 

        detailedTransactions.forEach((detailTrx, index) => {
          const originalTrx = transactionsInLastMonth[index];
          const diffDays = originalTrx.diffDays;
          
          let weekIndex;
          if (diffDays <= 7) weekIndex = 3;
          else if (diffDays <= 14) weekIndex = 2;
          else if (diffDays <= 21) weekIndex = 1;
          else if (diffDays <= 28) weekIndex = 0;
          else return; 

          if (detailTrx.items) {
            detailTrx.items.forEach(item => {
              const { productName, quantity } = item;
              
              if (!weeklyProductData[productName]) {
                weeklyProductData[productName] = [0, 0, 0, 0];
              }
              
              weeklyProductData[productName][weekIndex] += quantity;
            });
          }
        });

        // 7. Ubah data menjadi format series ApexCharts
        const finalSeries = Object.keys(weeklyProductData).map(productName => {
          return {
            name: productName,
            data: weeklyProductData[productName]
          };
        });

        setSeries(finalSeries);

      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [token]); 

  // Tampilkan status loading atau error
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

  // Tampilkan chart
  return (
    <div className="">
      <Chart
        options={chartOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}