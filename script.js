 let totalMarks = 0;

function checkAnswer(option) {
    let correctAnswer = "Paris";
    let selectedAnswer = option.textContent.trim();
    let quizContainer = document.querySelector('.quiz-container');
    let resultContainer = document.querySelector('.result-container');
    let resultText = document.querySelector('.result');

    if (selectedAnswer === correctAnswer) {
        option.style.backgroundColor = 'green';
        option.style.color = 'white';
        totalMarks += 4;
        resultText.textContent = `Correct Answer! Total Marks: ${totalMarks}/4`;
    } else {
        option.style.backgroundColor = 'red';
        option.style.color = 'white';
        let correctOption = document.querySelector('.option:nth-child(1)');
        correctOption.style.backgroundColor = 'green';
        correctOption.style.color = 'white';
        totalMarks -= 1;
        resultText.textContent = `Incorrect Answer! Total Marks: ${totalMarks}/4`;
    }

    // Disable clicking on options after selection
    let options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);

    // Show result container
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

function playAgain() {
    let options = document.querySelectorAll('.option');
    options.forEach(opt => {
        opt.style.backgroundColor = '';
        opt.style.color = '';
        opt.onclick = () => checkAnswer(opt);
    });

    let resultContainer = document.querySelector('.result-container');
    let quizContainer = document.querySelector('.quiz-container');
    totalMarks = 0;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
}


let questions = [];
let currentQuestionIndex = 0;
let totalMarks = 0;

// Load questions from JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  let questionContainer = document.querySelector('.quiz-container');
  questionContainer.innerHTML = '';
  
  let currentQuestion = questions[currentQuestionIndex];
  
  let questionElement = document.createElement('div');
  questionElement.classList.add('question');
  questionElement.textContent = currentQuestion.question;
  questionContainer.appendChild(questionElement);
  
  let optionsContainer = document.createElement('div');
  optionsContainer.classList.add('options');
  currentQuestion.options.forEach(option => {
    let optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionElement.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(optionElement);
  });
  questionContainer.appendChild(optionsContainer);
  
  let buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');
  
  let prevButton = document.createElement('button');
  prevButton.classList.add('button', 'prev-question');
  prevButton.textContent = 'Previous';
  prevButton.onclick = prevQuestion;
  buttonsContainer.appendChild(prevButton);
  
  let nextButton = document.createElement('button');
  nextButton.classList.add('button', 'next-question');
  nextButton.textContent = 'Next';
  nextButton.onclick = nextQuestion;
  buttonsContainer.appendChild(nextButton);
  
  questionContainer.appendChild(buttonsContainer);
}

function checkAnswer(selectedAnswer) {
  let currentQuestion = questions[currentQuestionIndex];
  let correctAnswer = currentQuestion.correctAnswer;

  if (selectedAnswer === correctAnswer) {
    totalMarks += 4;
  } else {
    totalMarks -= 1;
  }
  
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }
  showQuestion();
}

function prevQuestion() {
  currentQuestionIndex--;
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = questions.length - 1;
  }
  showQuestion();
}
