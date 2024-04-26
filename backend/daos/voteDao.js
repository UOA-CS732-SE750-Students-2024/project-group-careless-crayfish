const Vote = require("../models/vote.js");

async function createVote(voteData) {
  return await Vote.create(voteData);
}

async function getVoteById(userId, voteId) {
  return await Vote.findOne({ userId, voteId });
}

async function getVotingResultsBy(userId, page, limit) {
  return await Vote.find({ userId })
    .skip(page * limit)
    .limit(limit)
    .exec();
}

// Add other CRUD operations as needed

module.exports = {
  getVotingResultsBy,
  createVote,
  getVoteById,
};
