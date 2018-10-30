const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "alfa", "build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/hello", (req, res) => {
  res.status(200).send({
    message: "Hello world"
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "alfa", "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening`));
