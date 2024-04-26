const Comment = require("../models/comment.js");

async function getCommentsBy(commentsData, page, limit) {
  const { userId, voteId } = commentsData;
  return await Comment.find({ userId, voteId })
    .sort({ creationDate: -1 })
    .skip(page * limit)
    .limit(limit)
    .exec();
}

async function getCommentsById(commentId) {
  return await Comment.findOne({ commentId });
}

async function createComment(commentData) {
  return await Comment.create(commentData);
}

async function getTotalNumRecords() {
  return await Comment.countDocuments({});
}
module.exports = {
  getCommentsBy,
  createComment,
  getCommentsById,
  getTotalNumRecords,
};
