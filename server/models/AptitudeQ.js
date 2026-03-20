const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  explanation: String,
  category: String,
  difficulty: String,
  lastUsed: { type: Date, default: null },
usageCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("AptitudeQuestion", aptitudeSchema);