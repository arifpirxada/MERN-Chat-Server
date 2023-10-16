const express = require("express")
const router = new express.Router;

router.get("/api/login", (req, res) => {
    res.send("welcome to my api")
});

module.exports = router
