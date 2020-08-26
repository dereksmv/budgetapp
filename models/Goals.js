const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GoalSchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },
  goal_number: {
    type: String,
    required: true
  },

  goal_title: {
    type: String,
    required: true
  },

  goal_desc: {
    type: String,
    required: true
  },
  goal_cost: {
    type: String,
    required: true
  },

  goal_saved: {
      type: String,
      required: false
  },

  image_url: {
    type: String,
    required: false
  }
});

module.exports = goals = mongoose.model("goals", GoalSchema);