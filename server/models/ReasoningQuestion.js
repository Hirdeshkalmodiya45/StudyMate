const mongoose = require('mongoose');

const reasoningSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  explanation: String,
  topic: String,
  difficulty: String,
  lastUsed: { type: Date, default: null },
usageCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('ReasoningQuestion', reasoningSchema);