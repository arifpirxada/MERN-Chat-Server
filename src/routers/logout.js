const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const user = require("../models/user")

router.get("/api/logout", auth, async (req, res) => {
    try {
        res.clearCookie("auth")
        await user.findByIdAndUpdate({ _id: req.id }, { $set: { token: "" } })
        res.status(200).json({ message: "Logout successful" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Internal server error" })
    }
})

module.exports = router