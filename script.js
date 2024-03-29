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

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.innerHTML = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll("#options button");

  options.forEach(option => {
    option.disabled = true;
    if (option.innerText === currentQuestion.correctAnswer) {
      option.classList.add("correct");
    } else if (option.innerText === selectedOption) {
      option.classList.add("wrong");
    }
  });
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
  } else {
    alert("Quiz finished!");
    currentQuestionIndex = 0; // Restart the quiz
    displayQuestion();
  }
}

displayQuestion();
