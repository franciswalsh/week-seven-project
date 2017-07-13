const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  userId: {
    type: String,
    required: true,
    unique: false
  }
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
