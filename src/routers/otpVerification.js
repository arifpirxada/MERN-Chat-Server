const express = require("express");
const router = new express.Router();
const user = require("../models/user");

router.patch("/api/otp-verification/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const suser = await user.updateOne({ _id: uid}, { $set: { otp: 1 }});

    if (!suser) {
        return res.status(400).json({ message: "Internal server error" });
    }

    res.status(200).json({message: "verified"});
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
