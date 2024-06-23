const Data = require("../models/Data");
const axios = require("axios");

const getAllData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    console.log(response.data);
    await Data.deleteMany({});
    for (const item of data) {
      const {
        id,
        title,
        price,
        description,
        category,
        image,
        sold,
        dateOfSale,
      } = item;
      const newData = new Data({
        id,
        title,
        price,
        description,
        category,
        image,
        sold,
        dateOfSale,
      });
      await newData.save();
    }
    console.log("Data saved successfully");
    return res.json({ message: "Data saved successfully" });
  } catch (err) {
    console.log(err);
  }
};

const getTransactions = async (req, res) => {
  const { search = "", page = 1, perPage = 10, month } = req.query;
  const query = {};
  if (search) {
    const searchNumber = parseFloat(search);
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }]),
    ];
  }
  if (month) {
    const monthNum = parseInt(month, 10);
    if (monthNum >= 1 && monthNum <= 12) {
      query.$expr = { $eq: [{ $month: "$dateOfSale" }, monthNum] };
    } else {
      return res.status(400).json({ message: "Invalid month" });
    }
  }
  try {
    const transactions = await Data.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  console.log(month);
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }
  const monthNum = parseInt(month, 10);
  console.log(monthNum);
  if (monthNum < 1 || monthNum > 12) {
    return res.status(400).json({ message: "Invalid month" });
  }
  try {
    const matchMonth = { $month: "$dateOfSale" };

    // Total Sale Amount
    const totalSaleAmount = await Data.aggregate([
      {
        $match: {
          sold: true,
          $expr: { $eq: [matchMonth, monthNum] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    // Total Sold Items
    const totalSoldItems = await Data.countDocuments({
      sold: true,
      $expr: { $eq: [matchMonth, monthNum] },
    });

    // Total Not Sold Items
    const totalNotSoldItems = await Data.countDocuments({
      sold: false,
      $expr: { $eq: [matchMonth, monthNum] },
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const barChart = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }
  const monthNum = parseInt(month, 10);
  if (monthNum < 1 || monthNum > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }
  try {
    const matchMonth = { $month: "$dateOfSale" };
    const range = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: 50000 },
    ];
    const results = await Promise.all(
      range.map(async (range) => {
        const count = await Data.countDocuments({
          $expr: { $eq: [matchMonth, monthNum] },
          price: {
            $gte: range.min,
            $lt: range.max === Infinity ? Infinity : range.max,
          },
        });
        return { range: range.range, count };
      })
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const pieChart = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }
  const monthNum = parseInt(month, 10);
  if (monthNum < 1 || monthNum > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }
  try {
    const matchMonth = { $month: "$dateOfSale" };
    const categories = await Data.aggregate([
      { $match: { $expr: { $eq: [matchMonth, monthNum] } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const formattedCategories = categories.map((category) => ({
      category: category._id,
      count: category.count,
    }));
    res.json(formattedCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const allData = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }
  const monthNumber = parseInt(month, 10);
  if (monthNumber < 1 || monthNumber > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }
  try {
    const statisticsURL = `https://roxiler-systems-assignment-backend-blue.vercel.app/api/statistics?month=${month}`;
    const barChartURL = `https://roxiler-systems-assignment-backend-blue.vercel.app/api/bar-chart?month=${month}`;
    const pieChartURL = `https://roxiler-systems-assignment-backend-blue.vercel.app/api/pie-chart?month=${month}`;

    const [statisticsResponse, barChartResponse, pieChartResponse] =
      await Promise.all([
        fetch(statisticsURL),
        fetch(barChartURL),
        fetch(pieChartURL),
      ]);

    const statisticsData = await statisticsResponse.json();
    const barChartData = await barChartResponse.json();
    const pieChartData = await pieChartResponse.json();

    const combinedData = {
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
    };
    res.json(combinedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllData,
  getTransactions,
  getStatistics,
  barChart,
  pieChart,
  allData,
};
