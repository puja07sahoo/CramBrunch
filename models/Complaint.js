const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: String,
  text: String
});

module.exports = mongoose.model("Complaint", complaintSchema);