var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var userController = require("./controllers/userControllers");
const { connect } = require("./configs/mongoConnection");
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

// setup swagger ui
swaggerController(app);

module.exports = app;
