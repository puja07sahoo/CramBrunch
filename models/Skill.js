const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  userId: String,
  offered: String,
  wanted: String
});

module.exports = mongoose.model("Skill", skillSchema);