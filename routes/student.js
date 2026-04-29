const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Complaint = require("../models/Complaint");
const Skill = require("../models/Skill");
const Marks = require("../models/Marks");

/* GET ATTENDANCE */
router.post("/get-attendance", async (req,res)=>{
  try{
    let data = await Attendance.findOne({ userId:req.body.userId });
    res.json(data || { percentage:0 });
  }catch{
    res.json({ percentage:0 });
  }
});

/* GET MARKS */
router.post("/get-marks", async (req,res)=>{
  try{
    let data = await Marks.find({ userId:req.body.userId });
    res.json(data);
  }catch{
    res.json([]);
  }
});

/* ADD COMPLAINT */
router.post("/add-complaint", async (req,res)=>{
  try{
    await Complaint.create({
      userId:req.body.userId,
      text:req.body.text
    });

    res.json({ msg:"Complaint submitted successfully" });
  }catch{
    res.json({ msg:"Complaint failed" });
  }
});

/* ADD SKILL */
router.post("/add-skill", async (req,res)=>{
  try{
    await Skill.create({
      userId:req.body.userId,
      offered:req.body.offered,
      wanted:req.body.wanted
    });

    res.json({ msg:"Skill Added Successfully" });
  }catch{
    res.json({ msg:"Skill failed" });
  }
});

/* GET SKILLS */
router.get("/skills", async (req,res)=>{
  try{
    let data = await Skill.find();
    res.json(data);
  }catch{
    res.json([]);
  }
});

module.exports = router;