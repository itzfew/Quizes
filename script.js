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



let selectedOptions = []; // Array to store selected options

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

    // Add a class to indicate the selected option
    if (selectedOptions[currentQuestion] === option) {
      button.classList.add("selected");
    }

    optionsElement.appendChild(button);
  });

  // Show submit button on last question
  if (currentQuestion === questions.length - 1) {
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", calculateMarks);
    optionsElement.appendChild(submitButton);
  }
}

function checkAnswer(answer, button) {
  const current = questions[currentQuestion];
  const feedbackElement = document.getElementById("feedback");

  // Store the selected option
  selectedOptions[currentQuestion] = answer;

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

  // Move to the next question
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    }
  }, 1000);
}

function calculateMarks() {
  const resultElement = document.getElementById("result");
  const totalMarks = questions.length * 4;
  let obtainedMarks = 0;

  // Calculate obtained marks
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].correctAnswer === selectedOptions[i]) {
      obtainedMarks += 4;
    }
  }

  // Display the result
  const percentage = (obtainedMarks / totalMarks) * 100;
  resultElement.textContent = `Congratulations! Your score is ${obtainedMarks}/${totalMarks}. Percentage: ${percentage.toFixed(2)}%`;
}

displayQuestion();
