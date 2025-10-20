// --- Cookies ---
function setCookie(name,value,days){
  const d=new Date(); d.setTime(d.getTime()+days*24*60*60*1000);
  document.cookie=`${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name){
  const cookies=document.cookie.split(';');
  for(let c of cookies){
    const [key,value]=c.trim().split('=');
    if(key===name) return value;
  }
  return "";
}

const usernameSpan=document.getElementById("username");
const nameInput=document.getElementById("nameInput");
const saveNameBtn=document.getElementById("saveName");
usernameSpan.textContent = getCookie("username")||"Guest";

saveNameBtn.addEventListener("click",()=>{
  const name=nameInput.value.trim();
  if(name){
    setCookie("username",name,7);
    usernameSpan.textContent=name;
    alert("Name saved!");
  }
});

// --- LocalStorage CRUD ---
const tableBody=document.getElementById("tableBody");
const addBtn=document.getElementById("addScore");

function getScores(){ return JSON.parse(localStorage.getItem("scores"))||[];}
function saveScores(scores){ localStorage.setItem("scores",JSON.stringify(scores));}

function renderTable() {
  const scores = getScores();
  tableBody.innerHTML = "";
  scores.forEach((s, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.score}</td>
      <td>
        <button onclick="editScore(${i})">Edit</button>
        <button onclick="deleteScore(${i})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


addBtn.addEventListener("click",()=>{
  const name=document.getElementById("gameName").value.trim();
  const score=document.getElementById("gameScore").value.trim();
  if(!name||!score) return alert("Please enter both fields!");
  const scores=getScores();
  scores.push({name,score});
  saveScores(scores);
  renderTable();
  document.getElementById("gameName").value="";
  document.getElementById("gameScore").value="";
});

function editScore(i){
  const scores=getScores();
  const newScore=prompt("Enter new score for "+scores[i].name,scores[i].score);
  if(newScore!==null){scores[i].score=newScore; saveScores(scores); renderTable();}
}

function deleteScore(i){
  const scores=getScores();
  if(confirm("Delete "+scores[i].name+"?")){ scores.splice(i,1); saveScores(scores); renderTable();}
}

// Initial render
renderTable();
