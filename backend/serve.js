const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Root route
app.get("/", (req, res) => {
    res.send("Sports Turf Booking API is Running");
});

// Profile routes (protected)
const profileRoutes = require("./routes/profileRoutes");   // <-- matches file name
app.use("/api", profileRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
