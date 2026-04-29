const userId = localStorage.getItem("userId");

/* PAGE CHANGE */
function showPage(page, btn){

  document.querySelectorAll(".page").forEach(x=>{
    x.classList.remove("active");
  });

  document.querySelectorAll(".nav-item").forEach(x=>{
    x.classList.remove("active");
  });

  document.getElementById("page-"+page).classList.add("active");
  btn.classList.add("active");
}

/* ATTENDANCE */
fetch("/get-attendance",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({ userId:userId })
})
.then(res=>res.json())
.then(data=>{

  document.getElementById("attendanceBox").innerHTML = `
    <p>Attendance: <b>${data.percentage}%</b></p>
    <br>
    <p>Status:
    ${data.percentage >= 75 ? "Eligible ✅" : "Not Eligible ❌"}
    </p>
  `;
});

/* MARKS */
function loadMarks(){
fetch("/get-marks",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({ userId:userId })
})
.then(res=>res.json())
.then(data=>{

  let txt = "";

  data.forEach(x=>{
    txt += `<li>${x.subject} : ${x.marks}</li>`;
  });

  document.getElementById("marksList").innerHTML = txt;
});
}
loadMarks();

/* COMPLAINT */
function submitComplaint(){

let text = document.getElementById("complaintText").value.trim();

if(text===""){
  alert("Write complaint first");
  return;
}

fetch("/add-complaint",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({
    userId:userId,
    text:text
  })
})
.then(res=>res.json())
.then(data=>{
  alert(data.msg);
  document.getElementById("complaintText").value="";
});
}

/* ADD SKILL */
function addSkill(){

let offered = document.getElementById("skillOffered").value.trim();
let wanted = document.getElementById("skillWanted").value.trim();

if(offered==="" || wanted===""){
  alert("Fill all fields");
  return;
}

fetch("/add-skill",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({
    userId:userId,
    offered:offered,
    wanted:wanted
  })
})
.then(res=>res.json())
.then(data=>{
  alert(data.msg);
  loadSkills();

  document.getElementById("skillOffered").value="";
  document.getElementById("skillWanted").value="";
});
}

/* LOAD SKILLS */
function loadSkills(){

fetch("/skills")
.then(res=>res.json())
.then(data=>{

  let txt = "";

  data.forEach(x=>{
    txt += `<li>${x.offered} ➜ ${x.wanted}</li>`;
  });

  document.getElementById("skillList").innerHTML = txt;
});
}

loadSkills();