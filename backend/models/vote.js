const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recommend: [
    {
      detailIntroduction: { type: String, required: true },
      location: { type: String, required: true },
      name: { type: String, required: true },
      priceRange: { type: String, required: true },
      count: { type: Number, required: true, default: 0 },
    },
  ],
  expires: { type: String },
  status: { type: Boolean },
});
voteSchema.index({ endDate: -1 }); // create an index for getting votes backwards by end date.

const Vote = mongoose.model("Vote", voteSchema, "votes");
module.exports = Vote;
