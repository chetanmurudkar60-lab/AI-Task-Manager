const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: String,

  description: String,

  subtasks: [String],

  priority: String,

  timeline: Number,

  tools: [String],

  completed: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

module.exports =
  mongoose.model("Task", taskSchema);