const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

let corsOptions = {
  origin : '*',
}  
app.use(cors(corsOptions));
//connect to mongodb
const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/status", (req, res) => {
  return res.status(200).json("Hello World!");
});

app.use("/api", require("./routes/dataRoutes"));
