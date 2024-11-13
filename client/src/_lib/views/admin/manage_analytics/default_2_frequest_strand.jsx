import React from "react";
import { Bar } from "react-chartjs-2";

const default_2_frequest_strand = ({ MostFrequestStrandBorrower }) => {
  const data = {
    labels: MostFrequestStrandBorrower.labels,
    datasets: [
      {
        label: "Most Frequent Strand Borrowed",
        data: MostFrequestStrandBorrower.frequency,
        backgroundColor: [
          "rgba(0, 100, 100, 0.8)", // Darker teal
          "rgba(200, 100, 20, 0.8)", // Darker orange
          "rgba(90, 50, 150, 0.8)", // Darker purple
          "rgba(150, 50, 70, 0.8)", // Darker red
          "rgba(30, 80, 180, 0.8)", // Darker blue
        ],
        borderColor: [
          "rgba(0, 100, 100, 1)",
          "rgba(200, 100, 20, 1)",
          "rgba(90, 50, 150, 1)",
          "rgba(150, 50, 70, 1)",
          "rgba(30, 80, 180, 1)",
        ],
        borderWidth: 1,
        color: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          // Legend text color
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Books Borrowed",
          // Y-axis title color
        },
        ticks: {
          // Y-axis labels color
        },
      },
      x: {
        title: {
          display: true,
          text: "Strand",
          // X-axis title color
        },
        ticks: {
          // X-axis labels color
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div
      style={{ width: "100%", height: "100%", margin: "10px auto" }}
      className="text-base-100 "
    >
      <Bar data={data} options={options} className="text-base-100" />{" "}
    </div>
  );
};

export default default_2_frequest_strand;
