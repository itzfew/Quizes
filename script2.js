const questions = [
  { 
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    correctAnswer: "Paris"
  },
  { 
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Earth"],
    correctAnswer: "Mars"
  },
  { 
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
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
  });
}

function checkAnswer(answer, button) {
  const current = questions[currentQuestion];
  const feedbackElement = document.getElementById("feedback");
  
  // Disable all buttons after selecting an answer
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);

  // Highlight correct and incorrect options
  if (answer === current.correctAnswer) {
    feedbackElement.innerHTML = "Correct!";
    feedbackElement.style.color = "#00ff00"; // Green color
    button.style.backgroundColor = "#00ff00"; // Green color
    score++; // Increment score for correct answer
  } else {
    feedbackElement.innerHTML = "Incorrect!";
    feedbackElement.style.color = "#ff0000"; // Red color
    button.style.backgroundColor = "#ff0000"; // Red color
    
    // Highlight the correct option
    const correctButton = optionsElement.querySelector(`button:nth-child(${current.options.indexOf(current.correctAnswer) + 1})`);
    correctButton.style.backgroundColor = "#00ff00"; // Green color
  }

  // Move to the next question or show the result
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Congratulations! Your score is ${score}/${questions.length}.`;
}

displayQuestion();
