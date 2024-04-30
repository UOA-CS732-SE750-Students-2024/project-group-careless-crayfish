const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  voteId: { type: String, required: true },
  votingType: { type: String, required: true, enum: ["RESTAURANT"] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  candidates: {
    type: Array,
    votingItem1Id: String,
    description: String,
    required: true,
    pictureUrl: String,
    occurence: Int16Array,
    default: [],
  },
  comments: {
    userId: { type: String, required: true },
    isAI: { type: Boolean },
    comment: { type: String, required: true },
    default: [],
  },
});
voteSchema.index({ endDate: -1 }); // create an index for getting votes backwards by end date.

module.exports = mongoose.model("Vote", voteSchema);
