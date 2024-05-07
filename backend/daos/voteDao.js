// dao/voteDao.js
const { ObjectId } = require("mongodb");
const Vote = require("../models/vote.js");

async function createVote({
  title,
  recommend,
  userId,
  startDate,
  endDate,
  status,
}) {
  const createdVote = await Vote.create({
    title,
    recommend,
    userId,
    startDate,
    endDate,
    status,
  });
  console.log(createdVote);

  return createdVote;
}

async function getVoteById(id) {
  console.log(id);
  return await Vote.findById(new ObjectId(id));
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

async function getAllVotes(userId) {
  return await Vote.find({ userId });
}
module.exports = {
  createVote,
  getVoteById,
  updateVote,
  endVote,
  getAllVotes,
};
