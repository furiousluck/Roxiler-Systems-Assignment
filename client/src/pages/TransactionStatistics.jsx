import React from "react";
import axiosInstance from "../axiosConfig";
import { useState, useEffect } from "react";
import '../style/TransactionStatistics.css';

const TransactionStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState(3);
  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get(`/api/statistics`, {
        params: {
          month: month,
        },
      });
    //   console.log(response.data);
      setStatistics(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="statistics-container">
      <h1>Transaction Statistics</h1>
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
      <div className="statistics-boxes">
        <div className="statistics-box">
          <h2>Total Sale Amount</h2>
          <p>${statistics.totalSaleAmount || 0}</p>
        </div>
        <div className="statistics-box">
          <h2>Total Sold Items</h2>
          <p>{statistics.totalSoldItems || 0}</p>
        </div>
        <div className="statistics-box">
          <h2>Total Not Sold Items</h2>
          <p>{statistics.totalNotSoldItems || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
