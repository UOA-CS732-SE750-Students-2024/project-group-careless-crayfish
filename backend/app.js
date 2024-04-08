var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var userController = require("./controllers/userControllers");
var recommendationController = require("./controllers/recommendationController");
const { connect } = require("./daos/mongoConnection");
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// Setup connection pool of mongoose.
connect();

app.use("/api/users", userController);
app.use("/api/recommendation", recommendationController);

// setup swagger ui
swaggerController(app);

module.exports = app;
