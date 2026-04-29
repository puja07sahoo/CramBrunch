const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");


/* ==========================
   MARK ATTENDANCE
========================== */
router.post("/mark-attendance", async (req, res) => {

  try {

    let { userId, percentage } = req.body;

    if (!userId || !percentage) {
      return res.json({
        msg: "Fill all fields"
      });
    }

    await Attendance.updateOne(
      { userId: userId },
      {
        $set: {
          percentage: percentage
        }
      },
      { upsert: true }
    );

    res.json({
      msg: "Attendance Saved Successfully"
    });

  } catch (error) {

    console.log(error);

    res.json({
      msg: "Attendance Failed"
    });

  }

});


/* ==========================
   UPLOAD MARKS
========================== */
router.post("/upload-marks", async (req, res) => {

  try {

    let { userId, subject, marks } = req.body;

    if (!userId || !subject || !marks) {
      return res.json({
        msg: "Fill all fields"
      });
    }

    await Marks.create({
      userId: userId,
      subject: subject,
      marks: marks
    });

    res.json({
      msg: "Marks Uploaded Successfully"
    });

  } catch (error) {

    console.log(error);

    res.json({
      msg: "Marks Upload Failed"
    });

  }

});


module.exports = router;