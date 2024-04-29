const Vote = require("../models/vote.js");

async function createVote(voteData) {
  return await Vote.create(voteData);
}

async function getVoteById(userId, voteId) {
  return await Vote.findOne({ userId, voteId });
}

async function getTotalNumRecords({ userId }) {
  return await Vote.countDocuments({ userId });
}

async function getVotesBy({ userId }, page, limit) {
  return await Vote.find({ userId })
    .skip(page * limit)
    .limit(limit)
    .exec();
}

// Add other CRUD operations as needed

module.exports = {
  getVotesBy,
  createVote,
  getVoteById,
  getTotalNumRecords,
};
