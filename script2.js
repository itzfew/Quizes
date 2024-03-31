const questions = [
  { 
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    correctAnswer: "Paris",
    selectedOption: null
  },
  { 
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Earth"],
    correctAnswer: "Mars",
    selectedOption: null
  },
  { 
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    selectedOption: null
  }
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const current = questions[currentQuestion];

  questionElement.innerHTML = current.question;
  optionsElement.innerHTML = "";
  feedbackElement.innerHTML = "";

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.onclick = () => checkAnswer(option, button);
    optionsElement.appendChild(button);
    // Check if this option was previously selected
    if (current.selectedOption === option) {
      button.style.backgroundColor = "#555"; // Dark gray
    }
  });

  // Display correct answer if previously selected
  if (current.selectedOption && current.selectedOption !== current.correctAnswer) {
    const correctAnswerElement = document.createElement("p");
    correctAnswerElement.innerHTML = `Correct answer is ${current.correctAnswer}`;
    feedbackElement.appendChild(correctAnswerElement);
  }
}

function checkAnswer(answer, button) {
  const feedbackElement = document.getElementById("feedback");
  const current = questions[currentQuestion];
  
  // Disable all buttons after selecting an answer
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);

  if (answer === current.correctAnswer) {
    feedbackElement.innerHTML = "Correct!";
    feedbackElement.style.color = "#00ff00"; // Green color
    button.style.backgroundColor = "#00ff00"; // Green color
    score += 4;
  } else {
    feedbackElement.innerHTML = "Incorrect!";
    feedbackElement.style.color = "#ff0000"; // Red color
    button.style.backgroundColor = "#ff0000"; // Red color
    score -= 1;
  }

  current.selectedOption = answer;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Congratulations! Your score is ${score}.`;
}
displayQuestion();
