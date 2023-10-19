const express = require("express");
const router = new express.Router();
const message = require("../models/message");

router.get("/api/read-msg/:uid/:selectedId", async (req, res) => {
  try {
    const uid = req.params.uid;
    const sid = req.params.selectedId;
    const msgs = await message
      .find({
        $and: [
          { $or: [{ sender: uid }, { receiver: uid }] },
          { $or: [{ sender: sid }, { receiver: sid }] },
        ],
      })
      .sort({ date: 1 });
    res.status(200).json(msgs);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
