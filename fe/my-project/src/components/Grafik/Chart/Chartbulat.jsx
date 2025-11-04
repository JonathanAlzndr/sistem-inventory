import React from "react";
import Chart from "react-apexcharts";
export default function ChartBulat() {
  const chartData = {
    series: [ 30, 15, 10],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      title: {
      
        align: "center",
        style: {
          fontFamily:"poppines",
          fontSize: "16px",
          color: "#111111",
          fontWeight: 600,
        },
      },
      labels: ["Dua Merpati", "Membramo - Tolai", "Superwing - Kotamobago"],
      colors: ["#22c55e", "#60a5fa", "#facc15", ], // hijau, biru, kuning, merah
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
    },
  };

  return (
    <div className="">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
}
