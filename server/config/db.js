const mongoose = require("mongoose");
require("dotenv").config();

// Properly connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// Event listeners for debugging
db.on("connected", () => {
    console.log("Database connected successfully");
});

db.on("error", (err) => {
    console.error("Database connection failed", err);
});

module.exports = db;
