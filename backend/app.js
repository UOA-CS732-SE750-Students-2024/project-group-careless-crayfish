var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var userRoutes = require("./routes/userRoutes");
const { connect } = require("./configs/mongoConnection");
const swagger = require("./routes/swagger");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// Setup connection pool of mongoose.
connect();

app.use("/api/users", userRoutes);

// setup swagger ui
swagger(app);

module.exports = app;
