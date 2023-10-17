const express = require("express");
const router = new express.Router();
const fs = require("fs");
const user = require("../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./src/img/users",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("user-img");

router.patch("/api/update-user-img", async (req, res) => {
  try {
    upload(req, res, async (e) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ message: "Internal server error" });
      }

      if (req.file.size > 5242880) {
        fs.unlink(`./src/img/users/${req.file.filename}`, (e) => {
          if (e) {
            console.error("Error deleting the file");
          }
        });
        return res.status(400).json({ message: "Pic should be less than 5mb" });
      }

      const existingUser = await user.findOne({ _id: req.body.id });
      if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
      } else if (existingUser.pic) {
        fs.unlink(`./src/img/users/${existingUser.pic}`, (e) => {
          if (e) {
            console.error("Error deleting the file");
          }
        });
      }

      const contentTypeMap = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      if (!contentTypeMap.includes(req.file.mimetype.toLowerCase())) {
        res.status(400).json({ message: "Unsupported file type." });
        fs.unlink(`./src/img/users/${req.file.filename}`, (e) => {
          if (e) {
            console.error("Error deleting the file");
          }
        });
      }

      existingUser.pic = req.file.filename;

      await existingUser.save();
      res.status(200).json({ message: "Updation successful" });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
