
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeModel = require("./models/employee"); 

const app = express();


app.use(cors()); 
app.use(bodyParser.json()); 


mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  employeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Login successful" });
        } else {
          res.json({ message: "Incorrect password" });
        }
      } else {
        res.json({ message: "No record found for this email" });
      }
    })
    .catch((err) => {
      console.error("Error occurred during login:", err);
      res.status(500).json({ message: "An error occurred during login" });
    });
});

app.post("/register", (req, res) => {
  console.log(req.body);

  employeeModel.create(req.body)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      console.error("Error occurred while creating employee:", err);
      res.status(500).json({ message: "An error occurred while registering." });
    });
});
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "An unexpected error occurred." });
});
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
