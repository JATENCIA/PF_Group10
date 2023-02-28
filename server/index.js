const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const router = require("./src/Routes/Index");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(morgan("dev"));
app.use("/", router);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to PF server group 10");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
