const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

role:String,
userId:String,
rollNo:String,
email:String,
phone:String,
password:String,
otp:String

});

module.exports = mongoose.model("User",userSchema);