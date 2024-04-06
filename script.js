// script.js

// Function to fetch questions from a JSON file
async function fetchQuestions() {
  try {
    const response = await fetch('questions.json'); // Assuming the JSON file is named questions.json
    const data = await response.json();
    return data.questions; // Assuming the JSON structure has a key named "questions" containing the array of questions
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

// Get DOM elements
let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn = document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = 0;
let timerId;

// Start quiz and hide frontpage
async function quizStart() {
  const questions = await fetchQuestions();
  if (questions.length === 0) {
    console.error('No questions found.');
    return;
  }
  time = questions.length * 15;
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  let landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  setQuestions(questions); // Call setQuestions instead of getQuestion
}

// Modify setQuestions function to dynamically set questions and options
function setQuestions(questions) {
  let currentQuestion = questions[currentQuestionIndex];
  let promptEl = document.getElementById("question-words");
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function(choice, i) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

// Check for right answers and deduct time for wrong answer, go to next question
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    setQuestions(questions); // Call setQuestions instead of getQuestion
  }
}

// End quiz by hiding questions, stop timer and show final score
function quizEnd() {
  clearInterval(timerId);
  let endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  let finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Save score in local storage along with users' name
function saveHighscore() {
  let name = nameEl.value.trim();
  if (name !== "") {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    let newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    alert("Your Score has been Submitted");
  }
}

// Save users' score after pressing enter
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
    alert("Your Score has been Submitted");
  }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit
submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz
startBtn.onclick = quizStart;
