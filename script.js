console.log("JS linked!");
const wordList = ["rocketman", "liftoff", "nasa", "astronomer", "moon", "space", "astronaut"];
let selectedWord = "";
let guessedWord = [];
let wrongLetters = [];
let attempts = 6;

const availableLetters = "abcdefghijklmnopqrstuvwxyz"; // All available letters

// Select a random word from the list
function selectRandomWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    updateWordDisplay();
}

// Update the word display with guessed letters
function updateWordDisplay() {
    document.getElementById("word-display").textContent = guessedWord.join(" ");
}

// Update the wrong letters display
function updateWrongLetters() {
    document.getElementById("wrong-letters").textContent = wrongLetters.join(", ");
}

// Check if the game is won
function checkWin() {
    if (guessedWord.join("") === selectedWord) {
        alert("Congratulations! You've won!");
        resetGame();
    }
}

// Check if the game is lost
function checkLose() {
    if (attempts === 0) {
        alert(`Sorry, you've lost. The word was "${selectedWord}"`);
        resetGame();
    }
}

// Handle a guess
function handleGuess(guess) {
    if (!/[a-z]/.test(guess)) {
        return;
    }

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
        updateWordDisplay();
        checkWin();
    } else {
        if (!wrongLetters.includes(guess)) {
            wrongLetters.push(guess);
            updateWrongLetters();
            attempts--;
            updateRocketman();
            checkLose();
        }
    }
}

// Function to create keyboard buttons
function createLetterButtons() {
    const letterButtonsContainer = document.getElementById("keyboard");
    for (let letter of availableLetters) {
        const letterButton = document.createElement("button");
        letterButton.textContent = letter;
        letterButton.addEventListener("click", () => handleGuess(letter));
        letterButtonsContainer.appendChild(letterButton);
    }
}

// Initialize the game
selectRandomWord();
createLetterButtons();

// Update the rocketman display
function updateRocketman() {
    const rocketmanImage = document.getElementById("rocketman").getElementsByTagName("img")[0];
    rocketmanImage.src = `img/rocketman-${6 - attempts}.png`;
}

// Reset the game
function resetGame() {
    selectedWord = "";
    guessedWord = [];
    wrongLetters = [];
    attempts = 6;
    updateWordDisplay();
    updateWrongLetters();
    updateRocketman();
    selectRandomWord();
}

// Initialize the game
selectRandomWord();
