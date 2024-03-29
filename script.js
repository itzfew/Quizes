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

document.addEventListener("DOMContentLoaded", function() {
  const nextBtn = document.getElementById("nextBtn");
  const submitUsernameBtn = document.getElementById("submitUsernameBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const shareBtn = document.getElementById("shareBtn"); // Added share button

  nextBtn.addEventListener("click", nextQuestion);
  submitUsernameBtn.addEventListener("click", submitUsername);
  playAgainBtn.addEventListener("click", resetGame);
  shareBtn.addEventListener("click", shareQuiz); // Added event listener for share button

  startTimer(); // Start the timer before displaying the first question
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
  }
}

function showEndPage() {
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("usernameDiv").style.display = "block";
}

function resetGame() {
  currentQuestionIndex = 0;
  document.getElementById("nextBtn").style.display = "block";
  document.getElementById("usernameDiv").style.display = "none";
  document.getElementById("endPage").style.display = "none";
  displayQuestion();
}

let timerElement = document.getElementById('timer');
let timeLeft = 45;
let timerInterval; // Define timerInterval globally

// Function to start the timer
function startTimer() {
  updateTimer(); // Initial call to update timer immediately
  timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 10) {
    timerElement.style.backgroundColor = 'red'; // Change background color to red
  }
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    // Call function to handle time up (e.g., move to next question)
    nextQuestion();
  }
}

// Function to share the quiz
function shareQuiz() {
  if (navigator.share) {
    navigator.share({
      title: "Play NEET Quiz",
      text: "Check out this NEET Quiz and test your knowledge!",
      url: "https://your-website-url.com" // Replace with your website URL
    })
    .then(() => console.log("Shared successfully"))
    .catch(error => console.error("Error sharing:", error));
  } else {
    alert("Web Share API not supported in this browser.");
  }
}
