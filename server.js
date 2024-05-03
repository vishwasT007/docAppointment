const express = require("express");
const colors = require("colors");
const morgan = require("morgan"); // Corrected typo
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev")); // Logging middleware

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my API"); // You can customize this response
});
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Define port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.bgCyan.white);
});
