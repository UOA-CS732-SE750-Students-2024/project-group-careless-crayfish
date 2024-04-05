const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  // TODO add other fields
});

module.exports = mongoose.model("User", userSchema);
