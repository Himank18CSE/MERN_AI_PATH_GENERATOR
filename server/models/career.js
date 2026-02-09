const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
  {
    skills: [String],
    interests: [String],
    education: String,
    goal: String,
    suggestedCareer: String,
    reason: String,
    roadmap: [
      {
        step: String,
        description: String,
        timeframe: String,
        _id: false,
      },
    ],
    favorite: {
        type: Boolean,
        default: false,
      },
    

  });

module.exports = mongoose.model("Career", CareerSchema);
