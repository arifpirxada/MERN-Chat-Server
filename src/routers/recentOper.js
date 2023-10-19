const express = require("express");
const router = new express.Router();
const recent = require("../models/recent");
const user = require("../models/user");

router.post("/api/create-recent", async (req, res) => {
  try {
    const exists = await recent.findOne({ uid: req.body.uid });

    if (exists) {
      if (exists.recents.includes(req.body.recent)) {
        return res.status(200).json({ message: "Recent already exists" });
      }

      exists.recents.push(req.body.recent);
      await exists.save();
      return res.status(200).json({ message: "Updation successful" });
    }

    const recentData = new recent({
      uid: req.body.uid,
      recents: [req.body.recent],
    });

    await recentData.save();
    res.status(201).json({ message: "Insertion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

// Read Recents Here ->

router.get("/api/read-recent/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const userRecent = await recent.findOne({ uid: uid });

    if (!userRecent || !userRecent.recents || userRecent.recents.length === 0) {
      return res.status(200).json({message: "No recents found"});
    }
    const recentUsers = await user
      .find(
        {
          $or: userRecent.recents.map((element) => ({
            _id: element,
          })),
        },
        { name: 1, pic: 1 }
      )
      .sort({ _id: -1 });
    res.status(200).json(recentUsers);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.delete("/api/delete-recent", async (req, res) => {
  try {
    const userRecent = await recent.findOneAndUpdate(
      { uid: req.body.uid },
      { $pull: { recents: req.body.delId } }
    );
    res.status(200).json({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
