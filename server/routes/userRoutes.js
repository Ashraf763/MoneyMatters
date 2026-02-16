const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("hi", username, password);

    if (!username || !password) {
      return res.status(400).json("username or password should not be empty");
    }

    const existingUser = await User.findOne({ username });
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json("Username and Password required");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("Invaid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json("Invalid Credentials");
    }
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (err) {
    return res.status(500).send("server error", err);
    console.log(err);
  }
});

module.exports = router;
