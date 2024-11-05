"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function BaseChart({ chartData }) {

  // Check if chartData is defined and is an array
  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return <div>No data available</div>;
  }

  const labels = chartData.map((item) => item.date);
  const dataValues = chartData.map((item) => item.data);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Books Created",
        data: dataValues,
        backgroundColor: "white", // Set background color for bars
        borderColor: "white", // Set border color for bars
        borderWidth: 1, // Set border width for bars
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Set the color of the y-axis labels to white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Set the color of the grid lines to a semi-transparent white
        },
      },
      x: {
        ticks: {
          color: "white", // Set the color of the x-axis labels to white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Set the color of the grid lines to a semi-transparent white
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the color of the legend labels to white
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1 className="text-3xl px-2 pt-4 font-black text-white">Today Report</h1>
      <Bar data={data} options={options} className="base-chart-r px-2" />
    </div>
  );
}
