const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recommend: [
    {
      detailIntroduction: { type: String, required: true },
      location: { type: String, required: true },
      name: { type: String, required: true },
      priceRange: { type: String, required: true },
      openHours: { type: Object, required: true },
      mapUrl: { type: String, required: true },
      imageUrl: { type: String, required: true },
      count: { type: Number, required: true, default: 0 },
      websiteUrl: { type: String, required: true },
    },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: Boolean },
  userId: { type: String, require: true },
});

voteSchema.index({ userId: 1 });

const Vote = mongoose.model("Vote", voteSchema, "votes");
module.exports = Vote;
