import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosConfig";
import '../style/Transactions.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const query = useQuery();
  const navigate = useNavigate();
  const search = query.get("search") || "";
  const month = query.get("month") || 3; // Default to March
  const page = parseInt(query.get("page")) || 1;

  useEffect(() => {
    fetchTransactions();
  }, [search, month, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get("/api/transactions", {
        params: {
          search,
          month,
          page,
          perPage,
        },
      });
      console.log(response.data);
      setTransactions(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions", err);
    }
  };
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    navigate(`/transactions?search=${newSearch}&month=${month}&page=1`);
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    navigate(`/transactions?search=${search}&month=${newMonth}&page=1`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      navigate(
        `/transactions?search=${search}&month=${month}&page=${page + 1}`
      );
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      navigate(
        `/transactions?search=${search}&month=${month}&page=${page - 1}`
      );
    }
  };

  return (
    <div>
      <h1>Transaction List</h1>
      <div>
        <label>
          Select Month:
          <select value={month} onChange={handleMonthChange}>
            {[
              { value: '1', label: 'January' },
              { value: '2', label: 'February' },
              { value: '3', label: 'March' },
              { value: '4', label: 'April' },
              { value: '5', label: 'May' },
              { value: '6', label: 'June' },
              { value: '7', label: 'July' },
              { value: '8', label: 'August' },
              { value: '9', label: 'September' },
              { value: '10', label: 'October' },
              { value: '11', label: 'November' },
              { value: '12', label: 'December' },
            ].map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Search Transactions:
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title, description, or price"
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
