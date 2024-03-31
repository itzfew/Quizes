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

  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", function() {
      checkAnswer(option, button);
    });

    // Add a class to indicate the previously selected option
    if (localStorage.getItem("selectedOption") === option) {
      button.classList.add("selected");
    }

    optionsElement.appendChild(button);
  });
}

function checkAnswer(answer, button) {
  const current = questions[currentQuestion];
  const feedbackElement = document.getElementById("feedback");

  // Store the selected option in local storage
  localStorage.setItem("selectedOption", answer);
  
  // Disable all buttons after selecting an answer
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);

  // Highlight correct and incorrect options
  if (answer === current.correctAnswer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "#00ff00"; // Green color
    button.style.backgroundColor = "#00ff00"; // Green color
    score += 4; // Add 4 marks for correct answer
  } else {
    feedbackElement.textContent = `This option is wrong. The correct answer is ${current.correctAnswer}.`;
    feedbackElement.style.color = "#ff0000"; // Red color
    button.style.backgroundColor = "#ff0000"; // Red color
    
    // Highlight the correct option
    const correctButton = document.querySelector(`#options button:nth-child(${current.options.indexOf(current.correctAnswer) + 1})`);
    correctButton.style.backgroundColor = "#00ff00"; // Green color

    score -= 1; // Deduct 1 point for incorrect answer
  }

  // Move to the next question or show the result after 10 seconds
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }, 10000); // 10 seconds timeout

}
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    // Show a message or handle what to do when there are no more questions
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  } else {
    // Show a message or handle what to do when at the first question
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Congratulations! Your score is ${score}/${questions.length * 4}.<br><button onclick="playAgain()">Play Again</button><button onclick="seeMore()">See More</button>`;
}

function playAgain() {
  currentQuestion = 0; // Reset to the first question
  score = 0; // Reset score
  displayQuestion(); // Display the first question again
}

function seeMore() {
  window.location.href = "list.html"; // Navigate to list.html
}

displayQuestion();
