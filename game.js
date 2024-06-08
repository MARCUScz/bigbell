// game.js

import { increaseWinStreak, resetWinStreak, displayWinStreak } from './winstreak.js';

let selectedMode = "ALL"; // Default mode
let countriesAndCapitals = {}; // Object to hold the loaded data

// Function to load mode-specific data file
async function loadModeData(mode) {
    let data;
    switch (mode) {
        case "ALL":
            data = await import('./countries.js');
            break;
        case "USA":
            data = await import('./usa.js');
            break;
        case "Europe":
            data = await import('./europe.js');
            break;
        case "Asia":
            data = await import('./asia.js');
            break;
        case "Africa":
            data = await import('./africa.js');
            break;
        case "America":
            data = await import('./america.js'); // Load america.js for the "America" mode
            break;
        case "Czech":
            data = await import('./czech.js');
            break;
        case "easy":
            data = await import('./easy.js');
            break;
        // Add more cases for other modes
        default:
            data = await import('./countries.js'); // Default to 'ALL'
    }
    return data.default;
}

// Function to display a new country based on selected mode
async function displayCountry() {
    const countries = Object.keys(countriesAndCapitals);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    document.getElementById('countryName').textContent = randomCountry;
}

// Function to handle mode change
async function handleModeChange() {
    selectedMode = document.getElementById('modeSelect').value;
    countriesAndCapitals = await loadModeData(selectedMode); // Load mode-specific data
    resetWinStreak(); // Reset win streak when the mode changes
    await displayCountry(); // Display a new country after loading data
}

// Function to check the player's answer
async function checkAnswer() {
    const playerInput = document.getElementById('capitalInput').value.trim();
    const countryName = document.getElementById('countryName').textContent;
    const correctCapital = countriesAndCapitals[countryName];

    const feedbackElement = document.getElementById('feedback');
    if (playerInput.toLowerCase() === correctCapital.toLowerCase()) {
        feedbackElement.textContent = 'Correct!';
        increaseWinStreak(); // Increase win streak
    } else {
        feedbackElement.textContent = `Incorrect. The correct capital is ${correctCapital}`;
        resetWinStreak(); // Reset win streak
    }

    // Clear the input field after checking the answer
    document.getElementById('capitalInput').value = '';

    // Display a new country
    await displayCountry(); // Wait for the new country to be displayed
}

// Inside game.js

// Function to handle key press event
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer(); // Call the checkAnswer function when Enter key is pressed
    }
}

// Event listener for key press in the input field
document.getElementById('capitalInput').addEventListener('keypress', handleKeyPress);

// Event listener to navigate to the main page
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'bigbelly.html';
});

// Event listener for mode change
document.getElementById('modeSelect').addEventListener('change', handleModeChange);

// Event listener to check the player's answer when the submit button is clicked
document.getElementById('submitBtn').addEventListener('click', checkAnswer);

// Call handleModeChange() when the page loads to ensure that it displays a country from the initial mode
handleModeChange();
displayWinStreak(); // Display initial win streak

// Function to show the game section
function showGameSection() {
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('defaultSection').style.display = 'none';
}

// Function to show the default section
function showDefaultSection() {
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('defaultSection').style.display = 'block';
}

// Function to handle hash changes
function handleHashChange() {
    const hash = window.location.hash;
    if (hash === '#/game') {
        showGameSection();
    } else {
        showDefaultSection(); // Show default section if hash doesn't match
    }
}

// Event listener for hash changes
window.addEventListener('hashchange', handleHashChange);

// Initial check for hash when the page loads
handleHashChange();
