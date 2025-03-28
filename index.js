const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const PORT = 3000;
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("./public"));

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
});

app.get("/", (req, res) => {
  res.render("homePage");
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
