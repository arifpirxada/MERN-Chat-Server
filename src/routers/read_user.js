const express = require("express");
const router = new express.Router();
const user = require("../models/user");
const fs = require("fs");

router.get("/api/read-user/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const suser = await user.find({ _id: uid }, { name: 1, pic: 1 });
    res.status(200).json(suser);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/api/read-users/:skip", async (req, res) => {
  try {
    const skip = req.params.skip;
    const users = await user
      .find({}, { name: 1, pic: 1 })
      .skip(skip)
      .limit(20)
      .sort({ _id: -1 });
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/api/read-users-num", async (req, res) => {
  try {
    const users = await user.find().count();
    res.status(200).json({ num: users });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/api/search/:query/:skip", async (req, res) => {
  try {
    const query = req.params.query;
    const skip = req.params.skip;
    const users = await user
      .find({ name: { $regex: query, $options: "i" } }, { name: 1, pic: 1 })
      .skip(skip)
      .limit(20);
    const num = await user
      .find({ name: { $regex: query, $options: "i" } })
      .count();
    res.status(200).json([users, num]);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

// read user image

router.get("/api/read-user-img/:img", async (req, res) => {
  try {
    const img = req.params.img;
    const imgPath = `./src/img/users/${img}`;

    fs.access(imgPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "Image not found" });
      }
      const imageData = fs.createReadStream(imgPath);
      imageData.pipe(res);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
