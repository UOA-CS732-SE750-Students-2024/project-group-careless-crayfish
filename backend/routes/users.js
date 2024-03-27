var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    data: "TODO implement this"
  });
});

module.exports = router;
