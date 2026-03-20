const express = require('express');
const router = express.Router();
const { QuestionSetModel } = require('../models/Question'); // adjust path as needed
const mongoose = require('mongoose');
require('dotenv').config();
// Middleware to validate ObjectId
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));



// Upload question set
router.post('/upload', async (req, res) => {
  const { paperCode, paperName, level, totalQuestions, questionSet } = req.body;
  console.log(req.body);
  // Basic validation
  if (!paperCode || !paperName || !level || !Array.isArray(questionSet)) {
    return res.status(400).json({ error: 'Missing required fields or invalid questionSet format' });
  }

  try {
    // Check for duplicate paperCode
    const existing = await QuestionSetModel.findOne({ paperCode });
    if (existing) {
      return res.status(409).json({ error: 'Paper code already exists' });
    }

    // Create and save
    const newSet = new QuestionSetModel({
      paperCode,
      paperName,
      level,
      totalQuestions,
      questionSet
    });

    await newSet.save();
    res.status(201).json({ message: 'Question set uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;