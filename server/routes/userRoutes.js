const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "User Logged in Successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// get current user

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user }); // Use req.body.user
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.send({ success: true, message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});


module.exports = router;
