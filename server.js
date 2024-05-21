// Import required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const { format } = require('date-fns');

console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
//const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
require("dotenv").config();

// Create an Express app
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.options("*", cors());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, this is your Dash app!");
});

// Use routes
app.use("/api/users", userRoutes);
//app.use('/api/auth', authRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Invoke the connectDB function
connectDB();

// Set the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
