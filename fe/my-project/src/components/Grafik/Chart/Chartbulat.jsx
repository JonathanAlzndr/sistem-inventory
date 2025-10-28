import React from "react";
import Chart from "react-apexcharts";

export default function DistribusiStokChart() {
  const chartData = {
    series: [45, 30, 15, 10],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      title: {
        text: "Distribusi Stok Beras per Jenis",
        align: "center",
        style: {
          fontSize: "16px",
          color: "#111111",
          fontWeight: 600,
        },
      },
      labels: ["Beras Premium", "Beras Medium", "Beras Merah", "Beras Hitam"],
      colors: ["#22c55e", "#60a5fa", "#facc15", "#ef4444"], // hijau, biru, kuning, merah
      legend: {
        position: "bottom",
        labels: {
          colors: "#000000",
        },
      },
      dataLabels: {
        style: {
          colors: ["#000000"],
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
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-[600px] mx-auto">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
}
