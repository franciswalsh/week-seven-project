const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    default: 0
  },
  activityId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;
