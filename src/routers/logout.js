const express = require("express")
const router = new express.Router;

router.get("/api/logout", (req, res) => {
    res.send("welcome to logout api")
});

module.exports = router