const commentDao = require("../daos/commentDao");
const { randomUUID } = require("crypto");
const logger = require("../utils/logger.js");
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

async function createComment({ userId, voteId, isAI, comment }) {
  logger.info(
    `creating comment userId=${userId} voteId=${voteId} isAI=${isAI} comment=${comment}`
  );
  const currDate = new Date();
  const comments = await commentDao.createComment({
    commentId: randomUUID(),
    voteId,
    userId,
    isAI,
    comment,
    creationDate: currDate.toISOString(),
    lastModifiedDate: currDate.toISOString(),
    userAvatarUrl: "",
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

module.exports = { getCommentsBy, createComment, getTotalNumRecords };
