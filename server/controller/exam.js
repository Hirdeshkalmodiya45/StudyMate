const { QuestionSetModel } = require('../models/Question');

const getQuestions = async (req, res) => {
  try {
    console.log("Fetching question set...");
    const paper = await QuestionSetModel
      .findOne()
      .sort({ createdAt: -1 });
  
    if (!paper) {
      return res.status(404).json({ error: "No paper found" });
    }

    return res.status(200).json(paper);


  } catch (err) {
    console.error("Error fetching question set:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getQuestions };