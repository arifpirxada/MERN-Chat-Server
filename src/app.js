const express = require("express");
const app = express();
const { createServer } = require("http");

const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

require("./dbcon");

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

// Routers
const loginRouter = require("./routers/login");
const signupRouter = require("./routers/signup");
const logoutRouter = require("./routers/logout");
const readUserRouter = require("./routers/read_user");
const updateUserRouter = require("./routers/update_user");
const auth = require("./middleware/auth");

app.use(loginRouter);
app.use(signupRouter);
app.use(logoutRouter);
app.use(readUserRouter);
app.use(updateUserRouter);

app.get("/api", (req, res) => {
  res.status(200).send("Hello world!");
});

app.get("/api/authorize", auth, (req, res) => {
  res.status(200).json({ message: "logged in", userData: { uid: req.id, name: req.name, email: req.email, pic: req.pic } });
});

const connectedClients = {};

io.on("connection", (socket) => {
  socket.on("send message", (msg, uid) => {
    socket.join("652d644b705b175d96444e3b");
    socket.to("652d644b705b175d96444e3b").emit("recieve message", msg);
  });
  socket.on("disconnect", () => {
    // console.log("a user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening...; Port:${port}`);
});
