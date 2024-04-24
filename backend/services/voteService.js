// services/voteService.js
const voteDao = require("../daos/voteDao.js");

async function createVote(voteData) {
  return await voteDao.createVote(voteData);
}

async function getVote(id) {
  return await voteDao.getVoteById(id);
}

async function updateVote(id, voteData) {
  return await voteDao.updateVote(id, voteData);
}

module.exports = {
  createVote,
  getVote,
  updateVote,
};
