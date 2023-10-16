const express = require("express")
const app = express();
const { createServer } = require("http");

const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const port = process.env.PORT || 3000;

app.use(express.json());

// Routers
const loginRouter = require("./routers/login")
const signupRouter = require("./routers/signup")
const logoutRouter = require("./routers/logout")

app.use(loginRouter)
app.use(signupRouter)
app.use(logoutRouter)

app.get("/api", (req, res) => {
  res.send("Hello world!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  
  socket.on("came", (msg) => {
    socket.broadcast.emit('message', msg)
  })
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening...; Port:${port}`);
});
