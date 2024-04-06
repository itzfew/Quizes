let currentQuestion = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
    displayQuestion();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

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

    optionsElement.appendChild(button);
  });
}

function checkAnswer(answer, button) {
  const current = questions[currentQuestion];
  const feedbackElement = document.getElementById("feedback");

  if (answer === current.correctAnswer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "#00ff00"; // Green color
    button.style.backgroundColor = "#00ff00"; // Green color
    score += 4; // Add 4 marks for correct answer
  } else {
    feedbackElement.textContent = `This option is wrong. The correct answer is ${current.correctAnswer}.`;
    feedbackElement.style.color = "#ff0000"; // Red color
    button.style.backgroundColor = "#ff0000"; // Red color
    
    const correctButton = document.querySelector(`#options button:nth-child(${current.options.indexOf(current.correctAnswer) + 1})`);
    correctButton.style.backgroundColor = "#00ff00"; // Green color

    score -= 1; // Deduct 1 point for incorrect answer
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
      // Change button text to "Submit" when reaching the last question
      if (currentQuestion === questions.length - 1) {
        document.getElementById("nextButton").textContent = "Submit";
      }
    } else {
      showResult();
      // Hide the next button
      document.getElementById("nextButton").style.display = "none";
    }
  }, 10000); // 10 seconds timeout
}

function showResult() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Congratulations! Your score is ${score}/${questions.length * 4}`;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
    // Change button text to "Submit" when reaching the last question
    if (currentQuestion === questions.length - 1) {
      document.getElementById("nextButton").textContent = "Submit";
    }
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}

function submitQuiz() {
  // Calculate and display the result
  showResult();
  // Hide the next button
  document.getElementById("nextButton").style.display = "none";
}

fetchQuestions();
