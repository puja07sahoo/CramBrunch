const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/crambrunch")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/student"));
app.use("/", require("./routes/teacher"));

app.listen(3000, ()=>{
  console.log("Server Running On Port 3000");
});