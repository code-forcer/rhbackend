require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const newsletterRoute = require('./routes/newsletter');  // Import the newsletter route
const contactRoute = require('./routes/contact');  // Import the contact route
const donateRoute = require('./routes/donate');
const registerRoute = require('./routes/register');  // Import the register route
const loginRoute = require('./routes/login');
const volunteerRoutes = require("./routes/volunteer");
const dashboardRoute = require('./routes/dashboard');

// Serve the 'uploads' folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





// Database
const mongoose = require("mongoose");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the NGO backend!");
});

// Routes Middleware
app.use("/volunteers", volunteerRoutes); // Mount the volunteer routes
// Use the newsletter route
app.use(newsletterRoute);
// Use the contact route
app.use(contactRoute);
app.use(donateRoute);
// Use the register route
app.use(registerRoute);  // Prefix all routes from register.js with /api
// Use the register route
app.use(loginRoute);  // Prefix all routes from register.js with /api
app.use(dashboardRoute);  // Prefix all routes from register.js with /api

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
