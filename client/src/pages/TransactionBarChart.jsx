import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../axiosConfig"; // Import the Axios instance
import "../style/TransactionBarChart.css"; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState("3"); // Default to March

  useEffect(() => {
    fetchChartData();
  }, [month]);

  const fetchChartData = async () => {
    try {
      const response = await axiosInstance.get("/api/bar-chart", {
        params: {
          month: month,
        },
      });
      const data = response.data;
      console.log(data);
      const labels = data.map((item) => item.range);
      const values = data.map((item) => item.count);

      // Log the processed chart data
      console.log("Chart labels:", labels);
      console.log("Chart values:", values);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Number of Items",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching chart data", err);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="chart-container">
      <h1>Transactions Bar Chart</h1>
      <div className="filter-container">
        <label>
          Select Month:
          <select value={month} onChange={handleMonthChange}>
            {[
              { value: "1", label: "January" },
              { value: "2", label: "February" },
              { value: "3", label: "March" },
              { value: "4", label: "April" },
              { value: "5", label: "May" },
              { value: "6", label: "June" },
              { value: "7", label: "July" },
              { value: "8", label: "August" },
              { value: "9", label: "September" },
              { value: "10", label: "October" },
              { value: "11", label: "November" },
              { value: "12", label: "December" },
            ].map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Transactions by Price Range",
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: function (value) {
                    return Number.isInteger(value) ? value : "";
                  },
                  precision: 0, // Ensure ticks are rounded to integers
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TransactionBarChart;
