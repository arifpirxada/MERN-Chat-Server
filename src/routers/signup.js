const express = require("express")
const router = new express.Router;

router.get("/api/signup", (req, res) => {
    res.send("welcome to signup api")
});

module.exports = router