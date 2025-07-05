const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoute");
app.use("/api/v1", productRoutes);


module.exports = app;
