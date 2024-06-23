import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Make sure axiosInstance is properly configured
import '../style/Home.css';

const Home = () => {
  const [apiStatus, setApiStatus] = useState(null);
  const [checked, setChecked] = useState(false);

  const checkApiStatus = async () => {
    try {
      const response = await axiosInstance.get('/');
      if (response.status === 200) {
        setApiStatus('success');
      } else {
        setApiStatus('fail');
      }
    } catch (error) {
      setApiStatus('fail');
    }
    setChecked(true);
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <button onClick={checkApiStatus}>Check API Status</button>
      {checked && (
        apiStatus === 'success' ? (
          <nav>
            <ul>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <li>
                <Link to="/statistics">Statistics</Link>
              </li>
              <li>
                <Link to="/barchart">Bar Chart</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <p>API check failed. Please try again.</p>
        )
      )}
    </div>
  );
};

export default Home;
