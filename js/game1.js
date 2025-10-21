const board = document.getElementById("board");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const xWinsEl = document.getElementById("xWins");
const oWinsEl = document.getElementById("oWins");
const drawsEl = document.getElementById("draws");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let xWins = 0, oWins = 0, draws = 0;

// Load previous scores
const saved = JSON.parse(localStorage.getItem("scores")) || [];
const tic = saved.find(s => s.name === "Tic Tac Toe");
if (tic) {
  const [x, o, d] = tic.score.split("|").map(v => v.split(":")[1].trim());
  xWins = +x; oWins = +o; draws = +d;
}
updateScoreboard();

function createBoard() {
  board.innerHTML = "";
  boardState.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = val;
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
  });
}
createBoard();

function makeMove(i) {
  if (boardState[i] || gameOver) return;
  boardState[i] = currentPlayer;
  createBoard();
  if (checkWinner(currentPlayer)) endGame(currentPlayer);
  else if (boardState.every(c => c)) endGame("Draw");
  else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(p) {
  const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return combos.some(c => c.every(i => boardState[i] === p));
}

function endGame(result) {
  gameOver = true;
  if (result === "X") { xWins++; messageEl.textContent = "🎉 Player X Wins!"; }
  else if (result === "O") { oWins++; messageEl.textContent = "🎉 Player O Wins!"; }
  else { draws++; messageEl.textContent = "🤝 It's a Draw!"; }
  updateScoreboard();
  saveScore();
}

function saveScore() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const val = `X:${xWins} | O:${oWins} | Draws:${draws}`;
  const exist = scores.find(s => s.name === "Tic Tac Toe");
  if (exist) exist.score = val; else scores.push({ name: "Tic Tac Toe", score: val });
  localStorage.setItem("scores", JSON.stringify(scores));
}

function updateScoreboard() {
  xWinsEl.textContent = xWins;
  oWinsEl.textContent = oWins;
  drawsEl.textContent = draws;
}

resetBtn.onclick = () => {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  messageEl.textContent = "Player X's turn";
  createBoard();
};
