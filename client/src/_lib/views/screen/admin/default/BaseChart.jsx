"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { MdWidthFull } from "react-icons/md";

export default function BaseChart({ chartData }) {
  const [viewMode, setViewMode] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState("");

  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return <div className="text-[#333333] w-full">No data available</div>;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
  const days = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);

  // Convert selectedDate string to a Date object
  const selectedDateObj = new Date(selectedDate);

  // Filter chartData based on selected year, month, or day as needed
  const filteredData = chartData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === selectedDateObj.getFullYear() &&
      (viewMode !== "monthly" ||
        itemDate.getMonth() === selectedDateObj.getMonth()) &&
      (viewMode !== "daily" || itemDate.getDate() === selectedDateObj.getDate())
    );
  });

  const labels =
    viewMode === "monthly" ? months : viewMode === "weekly" ? weeks : days;
  const dataValues = labels.map((label, index) => {
    const dataPoint = filteredData.find((item) => {
      const itemDate = new Date(item.date);
      if (viewMode === "monthly") return itemDate.getMonth() === index;
      if (viewMode === "weekly") return item.week === index + 1;
      if (viewMode === "daily") return itemDate.getDate() === index + 1;
      return false;
    });
    return dataPoint ? dataPoint.data : 0;
  });

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: `Total Books Added ${viewMode === "monthly" ? "Monthly" : viewMode === "weekly" ? "Weekly" : "Daily"}`,
        data: dataValues,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: colors,
        borderWidth: 2,
        fill: false,
        tension: 0.4, 
        
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Books Added",
          color: "#333333",
          font: { size: 12 },
          MdWidthFull
        },
        ticks: { color: "black" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
      x: {
        title: {
          display: true,
          text:
            viewMode === "monthly"
              ? "Months"
              : viewMode === "weekly"
                ? "Weeks"
                : "Days",
          color: "#333333",
          font: { size: 12 },
        },
        ticks: { color: "black" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "black" },
      },
    },
  };

  return (
    <div className=" px-4 py-4 bg-white w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-bold text-[#333333] mb-4">
          Monthly Books Added Overview
        </h3>
        <div className="flex items-center mb-4">
          <label className="mr-4 font-medium text-[#333333]">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={() =>
              setViewMode(
                viewMode === "monthly"
                  ? "weekly"
                  : viewMode === "weekly"
                    ? "daily"
                    : "monthly"
              )
            }
            className="ml-4 px-4 py-1 border rounded bg-blue-500 text-white"
          >
            Switch to{" "}
            {viewMode === "monthly"
              ? "Weekly"
              : viewMode === "weekly"
                ? "Daily"
                : "Monthly"}{" "}
            View
          </button>
        </div>
      </div>

      <div className="relative w-full ">
        <Line data={data} options={options} className="w-full" />
      </div>
    </div>
  );
}
