// models/Vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: String,
  votes: [
    {
      option: String,
      count: { type: Number, default: 0 },
    },
  ],
  created: { type: Date, default: Date.now },
});

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;

// models/Recommendation.js
const recommendationSchema = new mongoose.Schema({
  name: String,
  description: String,
  votingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vote",
  },
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);
module.exports = Recommendation;
