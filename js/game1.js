// human-style js for tic tac toe
// a few logs, not too neat - that's intentional :)

// DOM refs
const boardEl = document.getElementById('board');
const msgEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const clearScoresBtn = document.getElementById('clearScores');
const xWinsEl = document.getElementById('xWins');
const oWinsEl = document.getElementById('oWins');
const drawsEl = document.getElementById('draws');

let state = ["","","","","","","","",""]; // 0..8
let current = "X";
let done = false;

// rough load from storage - simple format storing object "Tic Tac Toe" as "X:1|O:0|D:2"
function loadScores(){
  let list = JSON.parse(localStorage.getItem('scores') || '[]');
  let rec = list.find(r=>r.name==='Tic Tac Toe');
  if(rec && rec.score){
    try{
      
      let parts = rec.score.split('|').map(s=>s.trim());
      let x = parts[0].split(':')[1] || 0;
      let o = parts[1].split(':')[1] || 0;
      let d = parts[2].split(':')[1] || 0;
      xWinsEl.textContent = parseInt(x);
      oWinsEl.textContent = parseInt(o);
      drawsEl.textContent = parseInt(d);
    }catch(e){
      console.log("score parse error", e);
    }
  }
}
loadScores();

// render board cells
function render(){
  boardEl.innerHTML = '';
  for(let i=0;i<9;i++){
    let div = document.createElement('div');
    div.className = 'cell';
    div.dataset.index = i;
    div.textContent = state[i];
    div.addEventListener('click', ()=>onCell(i));
    boardEl.appendChild(div);
  }
  msgEl.textContent = done ? "Round finished" : `Player ${current}'s turn`;
}

// click handler
function onCell(i){
  console.log("click on", i, "state", state[i]);
  if(done) return;            // game finished
  if(state[i]) return;        // already filled
  state[i] = current;
  // quick check
  if(checkWin(current)){
    done = true;
    msgEl.textContent = `Player ${current} wins!`;
    updateAndSave(current);
  } else if(state.every(s=>s)){
    done = true;
    msgEl.textContent = "It's a draw!";
    updateAndSave("D");
  } else {
    current = (current === "X") ? "O" : "X";
    msgEl.textContent = `Player ${current}'s turn`;
  }
  render();
}

// win check
function checkWin(p){
  const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let j=0;j<combos.length;j++){
    let [a,b,c] = combos[j];
    if(state[a]===p && state[b]===p && state[c]===p) return true;
  }
  return false;
}

// update scores and save
function updateAndSave(res){
  // read old
  let list = JSON.parse(localStorage.getItem('scores') || '[]');
  let rec = list.find(r=>r.name==='Tic Tac Toe');
  let x = parseInt(xWinsEl.textContent) || 0;
  let o = parseInt(oWinsEl.textContent) || 0;
  let d = parseInt(drawsEl.textContent) || 0;

  if(res === "X") x++;
  else if(res === "O") o++;
  else d++;

  // reflect in UI
  xWinsEl.textContent = x; oWinsEl.textContent = o; drawsEl.textContent = d;

  // save back in the student-friendly string format
  const scoreStr = `X:${x} | O:${o} | Draws:${d}`;
  if(rec) rec.score = scoreStr;
  else list.push({ name: 'Tic Tac Toe', score: scoreStr });
  try{
    localStorage.setItem('scores', JSON.stringify(list));
    console.log("scores saved", scoreStr);
  }catch(e){
    console.log("save error", e);
  }
}

// reset board
resetBtn.addEventListener('click', ()=>{
  state = ["","","","","","","","",""];
  current = "X";
  done = false;
  msgEl.textContent = `Player X's turn`;
  render();
});

// clear stored score 
clearScoresBtn.addEventListener('click', ()=>{
  if(!confirm("Clear Tic Tac Toe scores?")) return;
  let list = JSON.parse(localStorage.getItem('scores') || '[]');
  list = list.filter(r=>r.name!=='Tic Tac Toe');
  localStorage.setItem('scores', JSON.stringify(list));
  xWinsEl.textContent = '0'; oWinsEl.textContent='0'; drawsEl.textContent='0';
  console.log("cleared tic tac toe scores");
});

// initial render
render();
