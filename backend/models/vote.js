const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recommend: [
    {
      description: { type: String, required: true },
      location: { type: String, required: true },
      name: { type: String, required: true },
      priceRange: { type: String, required: true },
      count: { type: Number, required: true, default: 0 },
    },
  ],
  expires: { type: String },
  status: { type: Boolean },
});

const Vote = mongoose.model("Vote", voteSchema, "votes");
module.exports = Vote;

// // models/Recommendation.js
// const recommendationSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   votingId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vote",
//   },
// });

// const Recommendation = mongoose.model("Recommendation", recommendationSchema);
// module.exports = Recommendation;
