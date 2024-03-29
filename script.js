document.addEventListener("DOMContentLoaded", function() {
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

  const nextBtn = document.getElementById("nextBtn");
  const submitUsernameBtn = document.getElementById("submitUsernameBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");

  nextBtn.addEventListener("click", nextQuestion);
  submitUsernameBtn.addEventListener("click", submitUsername);
  playAgainBtn.addEventListener("click", resetGame);

  displayQuestion();

  let timerElement = document.getElementById('timer');
  let timerInterval;
  let timeLeft = 45;

  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 10) {
      timerElement.style.backgroundColor = 'red';
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 45;
    timerElement.textContent = timeLeft;
    timerElement.style.backgroundColor = 'white';
  }

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

    resetTimer(); // Reset timer when displaying a new question
    startTimer(); // Start timer for the new question
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
});
