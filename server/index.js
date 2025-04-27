const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const employeeModel = require("./models/employee");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password with bcrypt

    const newEmployee = await employeeModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({ message: "Registration successful", employee: newEmployee });
  } catch (err) {
    console.error("Error occurred while creating employee:", err);
    res.status(500).json({ message: "An error occurred while registering." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await employeeModel.findOne({ email: email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.json({ message: "Success" });   // <-- Sending exactly 'Success'
      } else {
        res.json({ message: "Incorrect password" });
      }
    } else {
      res.json({ message: "No record found for this email" });
    }
  } catch (err) {
    console.error("Error occurred during login:", err);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "An unexpected error occurred." });
});

// Start server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
