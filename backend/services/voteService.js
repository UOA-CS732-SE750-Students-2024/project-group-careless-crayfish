// services/voteService.js
const voteDao = require("../daos/voteDao.js");

async function createVote(voteData) {
  console.log(voteData, "voteData");
  return await voteDao.createVote(voteData);
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
};
