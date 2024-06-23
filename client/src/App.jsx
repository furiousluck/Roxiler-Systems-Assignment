import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import TransactionStatistics from "./pages/TransactionStatistics";
import TransactionBarChart from "./pages/TransactionBarChart";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/statistics" element={<TransactionStatistics />}></Route>
        <Route path="/barchart" element={<TransactionBarChart />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
