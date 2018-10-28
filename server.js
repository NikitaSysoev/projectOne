const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "alfa", "build")));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "alfa", "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening`));
