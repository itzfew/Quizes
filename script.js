const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    correctAnswer: "Paris"
  },
  // Add more questions here
];

let currentQuestionIndex = 0;
let username = "";
let correctAnswers = 0;
let incorrectAnswers = 0;
let missedAnswers = 0;

document.addEventListener("DOMContentLoaded", function() {
  const nextBtn = document.getElementById("nextBtn");
  const submitUsernameBtn = document.getElementById("submitUsernameBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");

  nextBtn.addEventListener("click", nextQuestion);
  submitUsernameBtn.addEventListener("click", submitUsername);
  playAgainBtn.addEventListener("click", resetGame);

  displayQuestion();
});

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.innerHTML = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    correctAnswers += 4;
  } else if (selectedOption === "") {
    missedAnswers++;
  } else {
    incorrectAnswers--;
  }

  const options = document.querySelectorAll("#options button");
  options.forEach(option => {
    option.disabled = true;
    if (option.innerText === currentQuestion.correctAnswer) {
      option.classList.add("correct");
    } else if (option.innerText === selectedOption) {
      option.classList.add("wrong");
    }
  });

  if (currentQuestionIndex === questions.length - 1) {
    showEndPage();
  }
}

function nextQuestion() {
  const options = document.querySelectorAll("#options button");
  options.forEach(option => {
    option.disabled = false;
    option.classList.remove("correct", "wrong");
  });

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  }
}

function submitUsername() {
  const usernameInput = document.getElementById("usernameInput");
  username = usernameInput.value.trim();
  if (username !== "") {
    document.getElementById("usernameDiv").style.display = "none";
    document.getElementById("endPage").style.display = "block";
    displayResults();
  }
}

function showEndPage() {
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("usernameDiv").style.display = "block";
}

function displayResults() {
  const totalScore = correctAnswers + incorrectAnswers;
  document.getElementById("totalScore").textContent = totalScore;
  document.getElementById("username").textContent = username;
}

function resetGame() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  missedAnswers = 0;
  document.getElementById("nextBtn").style.display = "block";
  document.getElementById("usernameDiv").style.display = "none";
  document.getElementById("endPage").style.display = "none";
  displayQuestion();
}
