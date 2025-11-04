import React from "react";
import Chart from "react-apexcharts";

export default function ChartGaris() {
  const chartData = {
    series: [
      {
        name: "Membramo - Tolai",
        data: [120, 140, 130, 150, 170, 200, 190, 210, 220, 230, 250, 270],
      },
      {
        name: "Superwing - Kotamobago",
        data: [60, 70, 65, 80, 90, 100, 95, 105, 110, 120, 130, 140],
      },
      {
        name: "Dua Merpati",
        data: [30, 35, 40, 38, 45, 50, 48, 52, 55, 58, 60, 65],
      },
     
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: [4, 4, 4],
        curve: "smooth",
        dashArray: [0, 0, 0],
      },
     
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            " kg"
          );
        },
      },
      markers: {
        size: 0,
        hover: { sizeOffset: 6 },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " kg";
          },
        },
      },
      grid: { borderColor: "#f1f1f1" },
      colors: ["#22c55e", "#f87171", "#60a5fa"], // hijau, merah, biru
    },
  };

  return (
    <div className="">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}
