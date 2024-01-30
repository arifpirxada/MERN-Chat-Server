const express = require("express");
const app = express();
const { createServer } = require("http");

const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

require("./dbcon");

const cookieParser = require("cookie-parser");

app.use(express.static("./dist"))
app.use(cookieParser());
app.use(express.json());

// Routers
const loginRouter = require("./routers/login");
const signupRouter = require("./routers/signup");
const logoutRouter = require("./routers/logout");
const readUserRouter = require("./routers/read_user");
const updateUserRouter = require("./routers/update_user");
const auth = require("./middleware/auth");
const createMessage = require("./controlers/createMessage");
const readMessage = require("./routers/readMessage");
const createRecent = require("./routers/recentOper");
const otpVerification = require("./routers/otpVerification");

app.use(loginRouter);
app.use(signupRouter);
app.use(logoutRouter);
app.use(readUserRouter);
app.use(updateUserRouter);
app.use(readMessage);
app.use(createRecent);
app.use(otpVerification);

app.get("/api", (req, res) => {
  res.status(200).send("Hello world!");
});

app.get("/api/authorize", auth, (req, res) => {
  res.status(200).json({
    message: "logged in",
    userData: { uid: req.id, name: req.name, email: req.email, pic: req.pic, google: req.google, otp: req.otp},
  });
});

const users = [];

io.on("connection", (socket) => {
  socket.on("connectUser", (id) => {
    users[id] = socket.id;
  });
  socket.on("send message", (data) => {
    socket
      .to(users[data.receiver])
      .emit("receive message", { sender: data.sender, message: data.message });
    createMessage(data);
  });
  socket.on("disconnect", () => {
    // console.log("a user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening...; Port:${port}`);
});
