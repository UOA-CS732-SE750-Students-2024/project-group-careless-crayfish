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
