import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const default_3_frequent_yr = ({ MostYearLevelBorrower }) => {
  // Sample data: you should replace this with your actual data
  const frequencyData = MostYearLevelBorrower.frequency || MostYearLevelBorrower.data;

  // Combine labels and frequency data to sort and filter
  const combinedData = MostYearLevelBorrower.labels.map((label, index) => ({
    label: label.length > 10 ? `${label.substring(0, 10)}...` : label,
    frequency: frequencyData[index],
  }));

  // Sort by frequency in descending order and select the top 8
  const topData = combinedData
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 8);

  // Extract labels and frequency data after sorting and slicing
  const truncatedLabels = topData.map((item) => item.label);
  const topFrequencies = topData.map((item) => item.frequency);

  const totalFrequency = topFrequencies.reduce((acc, val) => acc + val, 0);

  const data = {
    labels: truncatedLabels,
    datasets: [
      {
        label: "Strands",
        data: topFrequencies,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(83, 102, 255, 0.6)",
        ],
        borderColor: "grey",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / totalFrequency) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const percentage = ((value / totalFrequency) * 100).toFixed(2);
          return `${percentage}%`; // Display percentage on the pie chart
        },
        color: "#fff", // Label color
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
  };

  return (
    <div
      style={{ margin: "10px auto", width: "400px", height: "400px" }}
      className="text-white"
    >
      <Pie data={data} options={options} width={400} height={400} />
    </div>
  );
};

export default default_3_frequent_yr;
