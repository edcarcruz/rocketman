console.log("JS linked!");

let gameEnded = false;
let stateIndex = 0; // Initialize the state index

const wordList = [
  "rocketman",
  "liftoff",
  "nasa",
  "astronomer",
  "moon",
  "space",
  "astronaut",
  "spaceflight",
  "lightyears",
  "elton",
  "planets",
];
let selectedWord = "";
let guessedWord = [];
let wrongLetters = [];
let attempts = 6;
let availableLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]; // All available letters

// Define an array of image paths for different states
const rocketmanImages = [
  "img/rocketman-0.png", // Initial state
  "img/rocketman-1.png", // 1 wrong guess
  "img/rocketman-2.png", // 2 wrong guesses
  "img/rocketman-3.png", // 3 wrong guesses
  "img/rocketman-4.png", // 4 wrong guesses
  "img/rocketman-5.png", // 5 wrong guesses
  "img/rocketman-6.png", // 6 wrong guesses
  "img/rocketman-winner.png", // Winning state
];

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
  document.getElementById("wrong-letters").textContent =
    wrongLetters.join(", ");
}

// Check if the game is won
function checkWin() {
  if (guessedWord.join("") === selectedWord) {
    const winMessage = document.getElementById("win-message");
    winMessage.classList.remove("hidden");

    // Change the background for when the player wins
    document.body.classList.remove("start-background");
    document.body.classList.add("win-background");

    // Set gameEnded to true
    gameEnded = true;

    // Set the state index to the winning state
    stateIndex = rocketmanImages.length - 1;
    updateRocketman(stateIndex); // Update the Rocketman image for winning
  }
}

// Check if the game is lost
function checkLose() {
  if (attempts === 0) {
    const loseMessage = document.getElementById("lose-message");
    const loseWord = document.getElementById("lose-word");
    loseWord.textContent = selectedWord; // Set the correct word
    loseMessage.classList.remove("hidden");

    // Set gameEnded to true
    gameEnded = true;
  }
}

// Handle a guess
function handleGuess(guess) {
  if (gameEnded) {
    return; // Do nothing if the game has ended
  }

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
      stateIndex++; // Increment the state index for wrong guesses
      updateRocketman(stateIndex); // Update the Rocketman image based on the state
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
function updateRocketman(stateIndex) {
  // Ensure that the stateIndex is within valid bounds
  if (stateIndex < 0) {
    stateIndex = 0;
  } else if (stateIndex >= rocketmanImages.length) {
    stateIndex = rocketmanImages.length - 1;
  }
  const rocketmanImage = document
    .getElementById("rocketman")
    .getElementsByTagName("img")[0];
  rocketmanImage.src = rocketmanImages[stateIndex];

  // Calculate remaining lives, ensuring it's never negative
  const livesLeft = Math.max(6 - stateIndex, 0);

  // Update the remaining lives display
  const livesLeftElement = document.getElementById("lives-left");
  livesLeftElement.textContent = `Lives left: ${livesLeft}`;
}

// Reset the game
function resetGame() {
  selectedWord = "";
  guessedWord = [];
  wrongLetters = [];
  attempts = 6;
  updateWordDisplay();
  updateWrongLetters();
  stateIndex = 0; // Reset the state index to initial state
  updateRocketman(stateIndex); // Update the Rocketman image for reset
  selectRandomWord();
  // Reset the background to the default
  document.body.classList.remove("win-background");
  document.body.classList.add("start-background");
  gameEnded = false;
}

document.getElementById("try-again-win").addEventListener("click", function () {
  // Hide the winning message
  document.getElementById("win-message").classList.add("hidden");

  // Reset the game
  resetGame();
});

document
  .getElementById("try-again-lose")
  .addEventListener("click", function () {
    // Hide the losing message
    document.getElementById("lose-message").classList.add("hidden");

    // Reset the game
    resetGame();
  });

const infoButton = document.getElementById("info-button");
const infoModal = document.getElementById("info-modal");
const closeButton = document.querySelector(".close");

infoButton.addEventListener("click", function () {
  infoModal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  infoModal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === infoModal) {
    infoModal.style.display = "none";
  }
});

// Initialize the game
selectRandomWord();
