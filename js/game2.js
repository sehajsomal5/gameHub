const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cards = ["🍎", "🍎", "🍊", "🍊", "🍋", "🍋", "🍉", "🍉"];
let chosen = [], chosenIds = [];
let score = 0;

function createGrid() {
  grid.innerHTML = "";
  cards.sort(() => 0.5 - Math.random());
  cards.forEach((_, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(i, card));
    grid.appendChild(card);
  });
}

function flipCard(i, card) {
  if (chosenIds.includes(i) || chosen.length === 2) return;
  card.textContent = cards[i];
  chosen.push(cards[i]);
  chosenIds.push(i);

  if (chosen.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const allCards = document.querySelectorAll(".card");
  const [a, b] = chosenIds;
  if (chosen[0] === chosen[1]) {
    statusEl.textContent = "✅ Match!";
    score++;
    allCards[a].classList.add("matched");
    allCards[b].classList.add("matched");
  } else {
    statusEl.textContent = "❌ Try Again";
    allCards[a].textContent = allCards[b].textContent = "?";
  }
  scoreEl.textContent = score;
  chosen = [];
  chosenIds = [];

  if (document.querySelectorAll(".matched").length === cards.length) {
    statusEl.textContent = "🎉 You won the game!";
    saveMemoryScore(score);
  }
}

function saveMemoryScore(score) {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const exist = scores.find(s => s.name === "Memory Game");
  if (exist) exist.score = score;
  else scores.push({ name: "Memory Game", score });
  localStorage.setItem("scores", JSON.stringify(scores));
}

resetBtn.onclick = () => {
  score = 0;
  scoreEl.textContent = 0;
  statusEl.textContent = "";
  createGrid();
};

createGrid();
