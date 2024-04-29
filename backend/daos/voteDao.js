// dao/voteDao.js
const { ObjectId } = require("mongodb");
const Vote = require("../models/vote.js");

async function createVote(voteData) {
  console.log(Vote, "Vote");
  return await Vote.create(voteData);
}

async function getVoteById(id) {
  return await Vote.findById({
    _id: new ObjectId(id),
  }).exec();
}

async function updateVote(id, recommend) {
  console.log(recommend, "recommend");
  console.log(id, "id");
  return await Vote.findByIdAndUpdate(id, { recommend });
}

async function endVote(id, status) {
  console.log(status, "status");
  console.log(id, "id");
  return await Vote.findByIdAndUpdate(id, { status });
}
module.exports = {
  createVote,
  getVoteById,
  updateVote,
  endVote,
};
