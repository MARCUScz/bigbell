import { increaseWinStreak, resetWinStreak, displayWinStreak } from './winstreak.js';

let selectedMode = "ALL"; // Default mode
let selectedLanguage = "en"; // Default language
let countriesAndCapitals = {}; // Object to hold the loaded data

// Function to load mode-specific data file
async function loadModeData(mode, language) {
    let data;
    if (language === "cz") {
        switch (mode) {
            case "ALL":
                data = await import('./cz_countries.js');
                break;
            case "USA":
                data = await import('./cz_usa.js');
                break;
            case "Europe":
                data = await import('./cz_europe.js');
                break;
            case "Asia":
                data = await import('./cz_asia.js');
                break;
            case "Africa":
                data = await import('./cz_africa.js');
                break;
            case "America":
                data = await import('./cz_america.js');
                break;
            case "easy":
                data = await import('./cz_easy.js');
                break;
            case "top25":
                data = await import('./cz_top25.js');
                break;
            default:
                data = await import('./czech.js'); // Default to Czech 'ALL'
        }
    } else {
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
                data = await import('./america.js');
                break;
            case "Czech":
                data = await import('./czech.js');
                break;
            case "easy":
                data = await import('./easy.js');
                break;
            case "top25":
                data = await import('./top25.js');
                break;
            default:
                data = await import('./countries.js'); // Default to 'ALL'
        }
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
    selectedLanguage = document.getElementById('languageSelect').value;
    console.log(`Mode: ${selectedMode}, Language: ${selectedLanguage}`); // Debugging output
    countriesAndCapitals = await loadModeData(selectedMode, selectedLanguage); // Load mode-specific data
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

// Function to handle key press event
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer(); // Call the checkAnswer function when Enter key is pressed
    }
}

// Ensure all DOM elements exist before adding event listeners
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('capitalInput').addEventListener('keypress', handleKeyPress);
    document.getElementById('modeSelect').addEventListener('change', handleModeChange);
    document.getElementById('languageSelect').addEventListener('change', handleModeChange);
    document.getElementById('submitBtn').addEventListener('click', checkAnswer);

    handleModeChange(); // Call handleModeChange() when the page loads to ensure that it displays a country from the initial mode
    displayWinStreak(); // Display initial win streak

    // Modal functionality
    const modal = document.getElementById('infoModal');
    const btn = document.getElementById('infoBtn');
    const span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
