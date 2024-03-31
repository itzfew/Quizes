const questions = [
  { 
    question: "Which hormone promotes internode/petiole elongation in deep water rice?",
    options: ["Kinetin", "Ethylene", "2, 4-D", "GA3"],
    correctAnswer: "Ethylene"
  },
  { 
    question: "Which of the following plants is monoecious?",
    options: ["Carica papaya", "Chara", "Marchantia polymorpha", "Cycas circinalis"],
    correctAnswer: "Chara"
  },
  { 
    question: "Which of the following stages of meiosis involves division of centromere?",
    options: ["Anaphase II", "Telophase", "Metaphase I", "Metaphase II"],
    correctAnswer: "Anaphase II"
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

  // Get previously selected options from localStorage or initialize an empty array
  let selectedOptions = JSON.parse(localStorage.getItem("selectedOptions")) || [];

  // Store the selected option for the current question
  selectedOptions[currentQuestion] = { question: current.question, selectedOption: answer };

  // Save the updated selected options back to localStorage
  localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  
  // Rest of the function code...
}
  
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
  resultElement.innerHTML = `Congratulations! Your score is ${score}/${questions.length * 4}
}

displayQuestion();
