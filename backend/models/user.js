const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

userSchema.index({ userId: 1 });


module.exports = mongoose.model("User", userSchema);
