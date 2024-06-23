const express = require("express");
const router = express.Router();

const dataController = require("../controllers/dataController");
const {getAllData, getTransactions, getStatistics, barChart, pieChart, allData} = dataController;

router.route("/create-data").get(getAllData);
router.route("/transactions").get(getTransactions);
router.route("/statistics").get(getStatistics);
router.route("/bar-chart").get(barChart);
router.route("/pie-chart").get(pieChart);
router.route("/all-data").get(allData);

module.exports = router;

