const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sent: {
        type: [Object]
    },
    recieved: {
        type: [Object]
    }
})

const message = new mongoose.model("user", messageSchema)

module.exports = message