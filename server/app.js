const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); 

const allowedOrigins = [
  "http://localhost:5173",
  "https://study-mate-self.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const cron = require('node-cron');
const generatePaper = require('./controller/seedaplitude');

const LearnerRouter = require('./routes/LearnerRouter');
const examRouter = require('./routes/examRouter');
const reasoningRoutes = require('./routes/reasoning');
const AptitudeRoutes = require('./routes/Aptitude');
const questionSetRoutes = require('./routes/testform');

// CRON
cron.schedule('30 13 * * *', async () => {
  await generatePaper();
});

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("✅ Mongo Connected");

    app.use('/', LearnerRouter);
    app.use('/exam', examRouter);
    app.use('/api/aptitude', AptitudeRoutes);
    app.use('/api/reasoning', reasoningRoutes);
    app.use('/api/questionset', questionSetRoutes);

    const PORT = process.env.PORT || 3300;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });

  })
  .catch(err => {
    console.error("❌ DB Error:", err);
    process.exit(1);
  });