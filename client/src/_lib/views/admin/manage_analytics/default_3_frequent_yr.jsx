import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const default_3_frequent_yr = ({ MostYearLevelBorrower }) => {
  // Sample data: you should replace this with your actual data
  const data = {
    labels: MostYearLevelBorrower.labels,
    datasets: [
      {
        label: "Strands",
        data: MostYearLevelBorrower.frequency, // Replace with your actual frequency data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: "grey",
        borderWidth: 1,
        color: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{ margin: "10px auto", width: "300px", height: "300px" }}
      className="text-white"
    >
      <Pie data={data} options={options} width={300} height={300} />
    </div>
  );
};

export default default_3_frequent_yr;
