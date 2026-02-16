require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MONGODB"))
  .catch((e) => console.log("Error connecting to mongoDB", e));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
  console.log("connetct");
});

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("server started at PORT 5000"));
