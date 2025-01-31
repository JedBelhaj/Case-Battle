const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");
const { log } = require("console");

app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  log("User connected: ", socket.id);
});

io.on("disconnection");

server.listen(3001, () => {
  log("listening...");
});
