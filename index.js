const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
const courseRoutes = require("./src/routes/courseRoutes");
const studentRoutes = require("./src/routes/studentRoutes");

app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
