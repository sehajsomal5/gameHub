const tableBody = document.getElementById("tableBody");
const resetBtn = document.getElementById("resetScores");

function loadScores() {
  tableBody.innerHTML = "";
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  if (scores.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="2">No scores yet! Play some games 🎮</td></tr>`;
    return;
  }
  scores.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.name}</td><td>${s.score}</td>`;
    tableBody.appendChild(tr);
  });
}

resetBtn.onclick = () => {
  if (confirm("Are you sure you want to reset all scores?")) {
    localStorage.removeItem("scores");
    loadScores();
  }
};

loadScores();
