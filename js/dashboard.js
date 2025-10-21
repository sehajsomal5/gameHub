console.log("dash js run... i hope");

// username cookie stuff
function setCookie(name,val,days){
  let d = new Date();
  d.setTime(d.getTime()+(days*24*60*60*1000));
  document.cookie = name+"="+val+";expires="+d.toUTCString()+";path=/";
}

function getCookie(n){
  let c = document.cookie.split(";");
  for(let i of c){
    let p = i.trim().split("=");
    if(p[0]===n) return p[1];
  }
  return "";
}

let uname = getCookie("username") || "Guest";
let unameTxt = document.getElementById("dashUserName");
if (unameTxt) unameTxt.textContent = uname;


// score stuff
let tBody = document.getElementById("scoreTable");
let btn = document.getElementById("addManual");
let inGame = document.getElementById("manualGame");
let inScore = document.getElementById("manualScore");
let clearBtn = document.getElementById("clearScoresBtn");

function getS(){
  return JSON.parse(localStorage.getItem("scores")) || [];
}
function saveS(x){
  localStorage.setItem("scores", JSON.stringify(x));
}

function render(){
  let data = getS();
  tBody.innerHTML = "";
  data.forEach((o,i)=>{
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.name}</td>
      <td>${o.score}</td>
      <td>
        <button onclick="editScr(${i})">edit</button>
        <button onclick="delScr(${i})">x</button>
      </td>
    `;
    tBody.appendChild(tr);
  })
}

window.editScr = function(i){
  let d = getS();
  let nw = prompt("new score for "+d[i].name, d[i].score);
  if(nw!==null){
    d[i].score = nw;
    saveS(d);
    render();
  }
}

window.delScr = function(i){
  let d = getS();
  if(confirm("delete?"+d[i].name)){
    d.splice(i,1);
    saveS(d);
    render();
  }
}

btn.addEventListener("click",()=>{
  if(!inGame.value || !inScore.value){
    alert("fill both pls");
    return;
  }
  let d = getS();
  d.push({name:inGame.value,score:inScore.value});
  saveS(d);
  render();
  inGame.value=""; inScore.value="";
});

// reset all scores
clearBtn.addEventListener("click",()=>{
  if(confirm("erase all???")){
    localStorage.removeItem("scores");
    render();
  }
});

render();
