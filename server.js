const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

let viewers = [];
let phone = null;

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "phone") {
      phone = ws;
    } else if (data.type === "viewer") {
      viewers.push(ws);
    }

    // forward signals
    if (data.target === "phone" && phone) {
      phone.send(JSON.stringify(data));
    } else if (data.target === "viewer") {
      viewers.forEach(v => v.send(JSON.stringify(data)));
    }
  });

  ws.on("close", () => {
    viewers = viewers.filter(v => v !== ws);
    if (phone === ws) phone = null;
  });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
