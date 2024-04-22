var express = require("express");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");

var userController = require("./controllers/userControllers");
var recommendationController = require("./controllers/recommendationController");
var voteController = require("./controllers/voteController");
const { connect } = require("./daos/mongodbClient");
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Setup connection pool of mongoose.
connect().then(() => {
  logger.info("Mongodb connection pool created.");

app.use("/api/users", userController);
app.use("/api/recommendation", recommendationController);
app.use("/api/vote", voteController);

  // setup swagger ui
  swaggerController(app);

  logger.info("server started successfully.");
});

module.exports = app;
