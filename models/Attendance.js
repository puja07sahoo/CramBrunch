const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: String,
  percentage: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema);