const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    pic: {
        type: String
    },
    token: {
        type: String
    },
    google: {
        type: Boolean
    },
    otp: {
        type: Number
    }
})

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const user = new mongoose.model("user", userSchema)

module.exports = user