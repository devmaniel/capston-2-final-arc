import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const default_frequent_class = ({MostYearStrandBorrower}) => {
  // Sample data for the pie chart
  const data = {
    labels: MostYearStrandBorrower.labels,
    datasets: [
      {
        label: "Frequent Classes",
        data: MostYearStrandBorrower.frequency, // Replace with your own dummy data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: "grey",
        borderWidth: 1,
        color: "white",
      },
    ],
  };

  return (
    <div style={{ margin: "10px auto", width: "300px", height: "300px" }}>
      <Pie data={data} width={300} height={300} />
    </div>
  );
};

export default default_frequent_class;
