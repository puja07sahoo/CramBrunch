const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

/* MAIL SETUP */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crambrunch05@gmail.com",
    pass: "wgsm ifse pxma asrb"
  }
});


/* ===========================
   SIGNUP
=========================== */
router.post("/signup", async (req, res) => {

  try {

    let { role, userId, rollNo, email, phone, password } = req.body;

    let old = await User.findOne({
      $or: [
        { userId: userId },
        { email: email },
        { phone: phone }
      ]
    });

    if (old) {
      return res.json({ msg: "User already exists" });
    }

    await User.create({
      role,
      userId,
      rollNo,
      email,
      phone,
      password,
      otp: ""
    });

    res.json({ msg: "Signup Success" });

  } catch (error) {
    res.json({ msg: "Server Error" });
  }

});


/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {

  try {

    let { role, userId, rollNo, email, phone, password } = req.body;

    let user = await User.findOne({
      role,
      userId,
      rollNo,
      email,
      phone,
      password
    });

    if (user) {
      res.json({
        success: true,
        role: user.role
      });
    } else {
      res.json({
        success: false
      });
    }

  } catch (error) {
    res.json({ success: false });
  }

});


/* ===========================
   SEND OTP
=========================== */
router.post("/send-otp", async (req, res) => {

  try {

    let email = req.body.email.trim();

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "Email not registered" });
    }

    let otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.otp = otp;
    await user.save();

    await transporter.sendMail({
      from: "crambrunch05@gmail.com",
      to: email,
      subject: "CRAMBRUNCH OTP",
      text: "Your OTP is " + otp
    });

    res.json({
      msg: "OTP sent to your email"
    });

  } catch (error) {
    res.json({
      msg: "OTP sending failed"
    });
  }

});


/* ===========================
   VERIFY OTP + RESET PASSWORD
=========================== */
router.post("/verify-otp", async (req, res) => {

  try {

    let email = req.body.email.trim();
    let otp = req.body.otp.trim();
    let newPassword = req.body.newPassword.trim();

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({
        msg: "User not found"
      });
    }

    if (String(user.otp).trim() !== String(otp).trim()) {
      return res.json({
        msg: "Wrong OTP"
      });
    }

    user.password = newPassword;
    user.otp = "";
    await user.save();

    res.json({
      msg: "Password Updated"
    });

  } catch (error) {
    res.json({
      msg: "Server Error"
    });
  }

});

module.exports = router;