const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  date: {
    type: String,
    default: Date.now,
  },
});

const message = new mongoose.model("message", messageSchema);

module.exports = message;
