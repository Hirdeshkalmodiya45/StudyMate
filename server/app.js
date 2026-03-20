const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("✅ Mongo Connected"))
  .catch(err => console.error(err));

app.options("*", cors()); // 🔥 Fix preflight

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const cron = require('node-cron');
const generatePaper = require('./controller/seedaplitude');

cron.schedule('30 13 * * *', async () => {
  await generatePaper();
});

const LearnerRouter = require('./routes/LearnerRouter');
const examRouter = require('./routes/examRouter');
const reasoningRoutes = require('./routes/reasoning');
const AptitudeRoutes = require('./routes/Aptitude');
const questionSetRoutes = require('./routes/testform');

app.use('/', LearnerRouter);
app.use('/exam', examRouter);
app.use('/api/aptitude', AptitudeRoutes);
app.use('/api/reasoning', reasoningRoutes);
app.use('/api/questionset', questionSetRoutes);

app.listen(3300, () => {
  console.log("🚀 Server running on PORT 3300");
});