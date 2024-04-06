// highScore.js

// Function to retrieve and print high scores
function printHighscores() {
    // Retrieve scores from localStorage or initialize as an empty array
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    // Sort the scores in descending order
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    
    // Clear previous scores displayed
    let olEl = document.getElementById("highscores");
    olEl.innerHTML = "";
    
    // Print the sorted scores
    highscores.forEach(function (score) {
        let liTag = document.createElement("li");
        liTag.textContent = score.name + " - " + score.score;
        olEl.appendChild(liTag);
    });
}

// Function to clear high scores
function clearHighscores() {
    // Remove scores from localStorage
    window.localStorage.removeItem("highscores");
    // Reload the page to reflect the changes
    window.location.reload();
}

// Event listener for the clear button
document.getElementById("clear").onclick = clearHighscores;

// Call the function to print high scores when the page loads
printHighscores();
