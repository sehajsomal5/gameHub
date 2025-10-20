const board = document.getElementById("board");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const xWinsEl = document.getElementById("xWins");
const oWinsEl = document.getElementById("oWins");
const drawsEl = document.getElementById("draws");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let xWins = 0;
let oWins = 0;
let draws = 0;

// Initialize scoreboard from localStorage
const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
const ticScore = savedScores.find(s => s.name === "Tic Tac Toe");
if(ticScore) {
  const parts = ticScore.score.split("|");
  xWins = parseInt(parts[0].split(":")[1].trim());
  oWins = parseInt(parts[1].split(":")[1].trim());
  draws = parseInt(parts[2].split(":")[1].trim());
}
updateScoreboard();

function createBoard() {
  board.innerHTML = "";
  boardState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => makeMove(index));
    board.appendChild(div);
  });
}

function makeMove(index) {
  if(boardState[index] !== "" || gameOver) return;
  boardState[index] = currentPlayer;
  createBoard();
  if(checkWinner(currentPlayer)) endGame(currentPlayer);
  else if(boardState.every(c => c !== "")) endGame("Draw");
  else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => boardState[i] === player));
}

function endGame(result) {
  gameOver = true;
  if(result === "X") {
    messageEl.textContent = "Player X won!";
    xWins++;
  } else if(result === "O") {
    messageEl.textContent = "Player O won!";
    oWins++;
  } else {
    messageEl.textContent = "It's a draw!";
    draws++;
  }
  updateScoreboard();
  saveTicTacToeScore();
}

function updateScoreboard() {
  xWinsEl.textContent = xWins;
  oWinsEl.textContent = oWins;
  drawsEl.textContent = draws;
}

function saveTicTacToeScore() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const scoreText = `X:${xWins} | O:${oWins} | Draws:${draws}`;
  const existing = scores.find(s => s.name === "Tic Tac Toe");
  if(existing) existing.score = scoreText;
  else scores.push({ name: "Tic Tac Toe", score: scoreText });
  localStorage.setItem("scores", JSON.stringify(scores));
}

resetBtn.addEventListener("click", () => {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  messageEl.textContent = "Player X's turn";
  createBoard();
});

createBoard();
