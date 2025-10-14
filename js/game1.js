const board = document.getElementById("board");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

const xWinsEl = document.getElementById("xWins");
const oWinsEl = document.getElementById("oWins");
const drawsEl = document.getElementById("draws");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

const scores = JSON.parse(localStorage.getItem("tictactoeScores")) || {
  X: 0,
  O: 0,
  Draws: 0,
};

xWinsEl.textContent = scores.X;
oWinsEl.textContent = scores.O;
drawsEl.textContent = scores.Draws;

// Create board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);

  cell.addEventListener("click", () => makeMove(i));
}

function makeMove(index) {
  if (!isGameActive || cells[index]) return;

  cells[index] = currentPlayer;
  document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `🎉 Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScores();
    isGameActive = false;
    return;
  }

  if (cells.every((c) => c)) {
    message.textContent = "😐 It's a Draw!";
    scores.Draws++;
    updateScores();
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return combos.some(([a, b, c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function updateScores() {
  localStorage.setItem("tictactoeScores", JSON.stringify(scores));
  xWinsEl.textContent = scores.X;
  oWinsEl.textContent = scores.O;
  drawsEl.textContent = scores.Draws;
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  cells.fill(null);
  document.querySelectorAll(".cell").forEach((c) => (c.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
}
