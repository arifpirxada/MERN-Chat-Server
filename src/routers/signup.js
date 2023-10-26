const express = require("express");
const router = new express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken")

router.post("/api/signup", async (req, res) => {
  try {
    // checking for existing user
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userData = new user({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    userData.token = jwt.sign({ id: userData._id.toString() }, process.env.JWT_SECRET_KEY)

    await userData.save();
    
    res.cookie("auth", userData.token, {
        expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict"
    })

    res.status(201).json({ message: "Insertion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.post("/api/google-signup", async (req, res) => {
  try {
    // checking for existing user
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {

      existingUser.token = jwt.sign({ id: existingUser._id.toString() }, process.env.JWT_SECRET_KEY)

      await existingUser.save();
      
      res.cookie("auth", existingUser.token, {
          expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          sameSite: "strict"
      })
      
      return res.status(400).json({ message: "Login successful" });
    }

    const userData = new user({
      name: req.body.name,
      email: req.body.email,
      pic: req.body.pic,
      google: true
    });

    userData.token = jwt.sign({ id: userData._id.toString() }, process.env.JWT_SECRET_KEY)

    await userData.save();
    
    res.cookie("auth", userData.token, {
        expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict"
    })

    res.status(201).json({ message: "Insertion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
