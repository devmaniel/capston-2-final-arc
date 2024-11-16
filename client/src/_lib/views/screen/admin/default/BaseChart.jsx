"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function BaseChart({ chartData }) {
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return (
      <div className="text-[#333333] text-xl font-medium">
        No data available
      </div>
    );
  }

  const allLabels = chartData.map((item) => item.date); // Full dates
  const allDataValues = chartData.map((item) => item.data); // Data values

  const monthNames = [
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

  // Define colors for each month
  const monthColors = [
    "#FF5733", // January - Red
    "#FFBD33", // February - Yellow
    "#75FF33", // March - Green
    "#33FFF3", // April - Cyan
    "#3380FF", // May - Blue
    "#9B33FF", // June - Purple
    "#FF33A8", // July - Pink
    "#FF8C33", // August - Orange
    "#FFC133", // September - Amber
    "#D3FF33", // October - Lime
    "#33FF57", // November - Bright Green
    "#33FFDA", // December - Teal
  ];
  const defaultColor = monthColors[12]; // Use the last index as the default color

  // Filter data by selected month
  const filteredData =
    selectedMonth !== null
      ? chartData.filter(
          (item) => new Date(item.date).getMonth() === selectedMonth
        )
      : chartData;

  const filteredLabels = filteredData.map((item) => item.date);
  const filteredValues = filteredData.map((item) => item.data);

  // Choose color based on selected month
  const currentColor =
    selectedMonth !== null ? monthColors[selectedMonth] : "#3498db"; // Default color for all months

  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Total Books Added",
        data: filteredValues,
        borderColor: currentColor,
        backgroundColor: currentColor + "33", // Add transparency for background
        borderWidth: 3,
        pointBackgroundColor: currentColor,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hiding the default legend for custom buttons
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full px-6 py-6">
      <h3 className="font-bold text-[#333333] mb-4">
        Monthly Books Added Overview
      </h3>

      {/* Month Selector Dropdown */}
      <div className="mb-4">
        <select
          onChange={(e) =>
            setSelectedMonth(
              e.target.value === "null" ? null : Number(e.target.value)
            )
          }
          className="w-full px-4 py-2 rounded border border-gray-300"
        >
          <option value="null">All Months</option>
          {monthNames.map((month, index) => (
            <option
              key={month}
              value={index}
              style={{ color: monthColors[index] }}
            >
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <Line
        data={data}
        options={options}
        className="base-chart-r px-4 w-full"
      />

      {/* Selected Month */}
      <div className="text-center mt-4">
        <span className="font-bold">Selected Month:</span>{" "}
        {selectedMonth !== null ? (
          <span style={{ color: currentColor }}>
            {monthNames[selectedMonth]}
          </span>
        ) : (
          "All Months"
        )}
      </div>

      {/* Display Color */}
      {selectedMonth !== null && (
        <div className="mt-2 text-center">
          <span
            className="inline-block w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: currentColor }}
          ></span>
          <span>{monthNames[selectedMonth]} Color</span>
        </div>
      )}
    </div>
  );
}
