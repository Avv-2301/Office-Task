const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
require("dotenv").config();
const { userAuthToken } = require("./src/middlewares/User");

const userAuth = require("./src/routes/UserAuth");

const port = process.env.PORT || 8080;

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/v1/auth", userAuth);

const { connect } = require("./src/config/Database");
connect();

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running.... for focus app",
  });
});

const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
