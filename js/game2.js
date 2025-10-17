// Load or initialize questions
let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [
  {
    question: "What does HTML stand for?",
    options: { A: "HyperText Markup Language", B: "HyperText Markdown Language", C: "Home Tool Markup Language", D: "Hyper Transfer Markup Language" },
    correct: "A",
  },
  {
    question: "Which language is used for styling web pages?",
    options: { A: "HTML", B: "JQuery", C: "CSS", D: "XML" },
    correct: "C",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: { A: "<js>", B: "<scripting>", C: "<script>", D: "<javascript>" },
    correct: "C",
  },
];

let current = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const form = document.getElementById("questionForm");
const list = document.getElementById("questionList");

function showQuestion() {
  let q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  for (let key in q.options) {
    let btn = document.createElement("button");
    btn.textContent = `${key}: ${q.options[key]}`;
    btn.onclick = () => checkAnswer(key);
    optionsEl.appendChild(btn);
  }
}

function checkAnswer(answer) {
  let correct = questions[current].correct;
  if (answer === correct) score++;
  current++;
  if (current < questions.length) showQuestion();
  else endQuiz();
}

function endQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  scoreContainer.style.display = "block";
  scoreEl.textContent = score;

  // Save to localStorage
  localStorage.setItem("lastQuizScore", score);
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  scoreContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
});

// CRUD Operations for Admin Section
function renderQuestionList() {
  list.innerHTML = "";
  questions.forEach((q, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${q.question}
      <div>
        <button onclick="editQuestion(${index})">✏️</button>
        <button onclick="deleteQuestion(${index})">🗑️</button>
      </div>`;
    list.appendChild(li);
  });
}

function saveQuestions() {
  localStorage.setItem("quizQuestions", JSON.stringify(questions));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newQ = {
    question: document.getElementById("newQuestion").value,
    options: {
      A: document.getElementById("optionA").value,
      B: document.getElementById("optionB").value,
      C: document.getElementById("optionC").value,
      D: document.getElementById("optionD").value,
    },
    correct: document.getElementById("correct").value.toUpperCase(),
  };
  questions.push(newQ);
  saveQuestions();
  renderQuestionList();
  form.reset();
});

function editQuestion(index) {
  const q = questions[index];
  document.getElementById("newQuestion").value = q.question;
  document.getElementById("optionA").value = q.options.A;
  document.getElementById("optionB").value = q.options.B;
  document.getElementById("optionC").value = q.options.C;
  document.getElementById("optionD").value = q.options.D;
  document.getElementById("correct").value = q.correct;

  deleteQuestion(index); // remove old before re-adding
}

function deleteQuestion(index) {
  questions.splice(index, 1);
  saveQuestions();
  renderQuestionList();
}

renderQuestionList();
showQuestion();
