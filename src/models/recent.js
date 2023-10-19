const mongoose = require("mongoose")

const recentSchema = new mongoose.Schema({
    uid: String,
    recents: Array
})

const recent = new mongoose.model("recent", recentSchema)

module.exports = recent