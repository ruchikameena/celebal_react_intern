const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI)
    .then((data) => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error(" DB connection error:", err.message);
    });
};

module.exports = connectDatabase;
