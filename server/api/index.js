const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const careerRoutes = require("../routes/careerRoutes");
const authRoutes= require("../routes/authRoutes")

dotenv.config();


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ error: "DB connection failed" });
  }
});




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/career", careerRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

