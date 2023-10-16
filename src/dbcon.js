const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("Connection unsuccessful", e);
  });
