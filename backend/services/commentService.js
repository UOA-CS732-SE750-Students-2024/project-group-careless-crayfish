const commentDao = require("../daos/commentDao");
const { randomUUID } = require("crypto");
const logger = require("../utils/logger.js");
const geminiQueryService = require("./geminiQueryService");
const userService = require("./userService.js");

async function getCommentsBy({ userId, voteId, commentId }, page, limit) {
  if (commentId) {
    logger.info(`Getting comments by commentId=${commentId}`);
    return [await commentDao.getCommentsById(commentId)];
  }
  logger.info(
    `getting comments by userId=${userId} voteId=${voteId} page=${page} limit=${limit}`
  );
  const comments = await commentDao.getCommentsBy(
    { userId, voteId, commentId },
    parseInt(page),
    parseInt(limit)
  );

  return comments;
}

async function createAIComment({ userId, voteId, comment }) {
  logger.info(
    `creating AI comment userId=${userId} voteId=${voteId} isAI=${false} comment=${comment}`
  );
  const aiComment = await geminiQueryService.getAIComment({
    userId,
    voteId,
    comment,
  });

  const currDate = new Date();
  const currUser = await userService.getUserById(userId);
  const comments = await commentDao.createComment({
    commentId: randomUUID(),
    voteId,
    userId,
    isAI: true,
    comment: `AI reply to ${currUser.userName}'s comment <${comment}>: ${aiComment}`,
    creationDate: currDate.toISOString(),
    lastModifiedDate: currDate.toISOString(),
    userAvatarUrl: "",
    userName: "Google Gemini",
  });
  return comments;
}
async function createComment({ userId, voteId, comment, isAI }) {
  if (isAI) {
    return createAIComment({ userId, voteId, comment });
  }
  logger.info(
    `creating comment userId=${userId} voteId=${voteId} isAI=${false} comment=${comment}`
  );

  const currDate = new Date();
  const currUser = await userService.getUserById(userId);

  const comments = await commentDao.createComment({
    commentId: randomUUID(),
    voteId,
    userId,
    isAI: false,
    comment,
    creationDate: currDate.toISOString(),
    lastModifiedDate: currDate.toISOString(),
    userAvatarUrl: currUser.imageUrl,
    userName: currUser.userName,
  });
  return comments;
}

async function getTotalNumRecords({ voteId }) {
  logger.info(`getting total num records for voteId=${voteId}`);
  const totalNumRecords = await commentDao.getTotalNumRecords({ voteId });
  logger.info(
    `got total number of records totalNumRecords = ${totalNumRecords}`
  );

  return totalNumRecords;
}

async function deleteComment(commentId) {
  logger.info(`deleting comment commentId=${commentId}`);
  const deletedComment = await commentDao.deleteComment(commentId);
  logger.info(`deleted comment commentId=${commentId}`);

  return deletedComment;
}
module.exports = {
  getCommentsBy,
  createComment,
  getTotalNumRecords,
  createAIComment,
  deleteComment,
};
