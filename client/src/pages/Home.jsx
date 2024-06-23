import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css'; // Import CSS file

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
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
    </div>
  );
};

export default Home;
