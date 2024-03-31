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
