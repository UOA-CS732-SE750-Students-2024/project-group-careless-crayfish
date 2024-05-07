// services/voteService.js
const voteDao = require("../daos/voteDao.js");
const logger = require("../utils/logger.js");

async function createVote({
  title,
  recommend,
  userId,
  startDate,
  endDate,
  status,
}) {
  return await voteDao.createVote({
    title,
    recommend,
    userId,
    startDate,
    endDate,
    status,
  });
}

async function getAllVotes(userId) {
  logger.info(`getting all votes for userId=${userId}`);
  return await voteDao.getAllVotes(userId);
}

async function getVote(id) {
  return await voteDao.getVoteById(id);
}

async function updateVote(id, recommend) {
  return await voteDao.updateVote(id, recommend);
}

async function endVote(id, status) {
  return await voteDao.endVote(id, status);
}
module.exports = {
  createVote,
  getVote,
  updateVote,
  endVote,
  getAllVotes,
};
