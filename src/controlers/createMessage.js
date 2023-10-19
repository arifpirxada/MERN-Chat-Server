const message = require("../models/message");
const recent = require("../models/recent");

const createMessage = async (data) => {
  try {
    const messageData = new message({
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
    });
    await messageData.save();

    // Save recent to reciever ->

    const exists = await recent.findOne({ uid: data.receiver });

    if (exists) {
      if (exists.recents.includes(data.sender)) {
        return;
      }

      exists.recents.push(data.sender);
      await exists.save();
      return
    }

    const recentData = new recent({
      uid: data.receiver,
      recents: [data.sender],
    });

    await recentData.save();
  } catch (e) {
    console.log("Error while saving message:", e);
  }
};

module.exports = createMessage;
