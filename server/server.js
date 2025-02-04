const express = require("express");
require("dotenv").config();
const cors = require("cors"); // Import CORS
const db = require("./config/db"); 
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 5000;

app.use(cors()); // ✅ Enable CORS for all routes
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
