const express = require("express");
const router = new express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/api/login", async (req, res) => {
  try {
    // checking for existing user
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    existingUser.token = jwt.sign({ id: existingUser._id.toString() }, process.env.JWT_SECRET_KEY)

    await existingUser.save();
    
    res.cookie("auth", existingUser.token, {
        expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict"
    })

    res.status(200).json({ message: "login successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
