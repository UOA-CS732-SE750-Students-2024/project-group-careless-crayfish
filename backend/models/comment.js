const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  type: Array,
  commentId: { type: String, required: true },
  voteId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  isAI: { type: Boolean },
  comment: { type: String, required: true },
  creationDate: { type: Date, required: true },
  lastModifiedDate: { type: Date, required: true },
  userAvatarUrl: { type: String },
  default: [],
});

commentSchema.index({ creationDate: -1 }); // create an index for getting comments backwards by creation date.

module.exports = mongoose.model("Comment", commentSchema);
