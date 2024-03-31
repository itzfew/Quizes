const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswerIndex: 0
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswerIndex: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElements = document.querySelectorAll(".option");
const endPage = document.getElementById("end-page");
const resultElement = document.getElementById("result");

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElements.forEach((optionElement, index) => {
    optionElement.textContent = currentQuestion.options[index];
    optionElement.classList.remove("correct", "incorrect");
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correctAnswerIndex) {
    optionsElements[selectedIndex].classList.add("correct");
    score += 4;
  } else {
    optionsElements[selectedIndex].classList.add("incorrect");
    optionsElements[currentQuestion.correctAnswerIndex].classList.add("correct");
    score -= 1;
  }
  disableOptions();
}

function disableOptions() {
  optionsElements.forEach(optionElement => {
    optionElement.style.pointerEvents = "none";
  });
}

function enableOptions() {
  optionsElements.forEach(optionElement => {
    optionElement.style.pointerEvents = "auto";
  });
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
    enableOptions();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
    enableOptions();
  } else {
    showResult();
  }
}

function showResult() {
  endPage.style.display = "block";
  questionElement.style.display = "none";
  document.getElementById("buttons-container").style.display = "none";
  resultElement.textContent = `Your score is ${score}/ ${questions.length * 4}`;
  if (score > (questions.length * 4) / 2) {
    resultElement.innerHTML += "<br>Congratulations!";
  } else {
    resultElement.innerHTML += "<br>Best of luck next time!";
  }
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.onclick = resetQuiz;
  endPage.appendChild(playAgainButton);
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  endPage.style.display = "none";
  questionElement.style.display = "block";
  document.getElementById("buttons-container").style.display = "block";
  displayQuestion();
}
displayQuestion();
