// dao/voteDao.js
const Vote = require("../models/vote.js");

async function createVote(voteData) {
  const vote = new Vote(voteData);
  return await vote.save();
}

async function getVoteById(id) {
  return await Vote.findById(id).exec();
}

async function updateVote(id, voteData) {
  return await Vote.findByIdAndUpdate(
    id,
    { $set: voteData },
    { new: true }
  ).exec();
}

module.exports = {
  createVote,
  getVoteById,
  updateVote,
};
