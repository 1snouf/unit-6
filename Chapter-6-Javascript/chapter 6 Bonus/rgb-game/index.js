// RGB Color Guessing Game - JavaScript Implementation
// This file contains all the game logic and interactivity

// Game state variables
let score = 0;              // Player's current score
let lives = 3;              // Player's remaining lives
let targetColor = null;     // The RGB value player needs to guess
let colorOptions = [];      // Array of color options for current round
let gameActive = true;      // Flag to track if game is active

// DOM element references
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const rgbValueElement = document.getElementById('rgb-value');
const messageElement = document.getElementById('message');
const colorGridElement = document.getElementById('color-grid');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreElement = document.getElementById('final-score');
const resultMessageElement = document.getElementById('result-message');
const hintModal = document.getElementById('hint-modal');
const hintTextElement = document.getElementById('hint-text');

// Button references
const newGameBtn = document.getElementById('new-game-btn');
const hintBtn = document.getElementById('hint-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const closeHintBtn = document.getElementById('close-hint-btn');

/**
 * Initialize the game when page loads
 * Sets up event listeners and starts first round
 */
function initGame() {
    console.log('Initializing RGB Color Guessing Game...');
    
    // Add event listeners to buttons
    newGameBtn.addEventListener('click', startNewGame);
    hintBtn.addEventListener('click', showHint);
    playAgainBtn.addEventListener('click', startNewGame);
    closeHintBtn.addEventListener('click', closeHint);
    
    // Start the first game round
    startNewRound();
}

/**
 * Start a completely new game
 * Resets score and lives to initial values
 */
function startNewGame() {
    console.log('Starting new game...');
    
    // Reset game state
    score = 0;
    lives = 3;
    gameActive = true;
    
    // Update display
    updateDisplay();
    
    // Hide game over modal if visible
    gameOverModal.classList.add('hidden');
    
    // Start first round
    startNewRound();
    
    // Reset message
    showMessage('Click on the color that matches the RGB value above!', 'normal');
}

/**
 * Start a new round of the game
 * Generates new target color and color options
 */
function startNewRound() {
    console.log('Starting new round...');
    
    // Check if game should end
    if (lives <= 0) {
        endGame();
        return;
    }
    
    // Generate target color
    targetColor = generateRandomColor();
    console.log('Target color:', targetColor);
    
    // Generate color options (including correct answer)
    colorOptions = generateColorOptions(targetColor);
    console.log('Color options:', colorOptions);
    
    // Update display
    updateDisplay();
    renderColorOptions();
    
    // Enable hint button
    hintBtn.disabled = false;
    
    // Reset message
    showMessage('Click on the color that matches the RGB value above!', 'normal');
}

/**
 * Generate a random RGB color
 * @returns {string} RGB color string in format "rgb(r, g, b)"
 */
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);  // 0-255
    const g = Math.floor(Math.random() * 256);  // 0-255
    const b = Math.floor(Math.random() * 256);  // 0-255
    
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Generate an array of color options including the correct answer
 * @param {string} correctColor - The correct RGB color
 * @returns {Array} Array of color strings
 */
function generateColorOptions(correctColor) {
    const options = [correctColor];  // Start with correct answer
    
    // Generate additional random colors
    while (options.length < 3) {
        const randomColor = generateRandomColor();
        
        // Ensure no duplicate colors
        if (!options.includes(randomColor)) {
            options.push(randomColor);
        }
    }
    
    // Shuffle the array to randomize positions
    return shuffleArray(options);
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

/**
 * Render the color options in the UI
 */
function renderColorOptions() {
    // Clear existing options
    colorGridElement.innerHTML = '';
    
    // Create and add each color option
    colorOptions.forEach((color, index) => {
        const optionElement = createColorOption(color, index);
        colorGridElement.appendChild(optionElement);
    });
}

/**
 * Create a single color option element
 * @param {string} color - RGB color string
 * @param {number} index - Option index
 * @returns {HTMLElement} Color option element
 */
function createColorOption(color, index) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'color-option';
    optionDiv.dataset.color = color;
    
    // Create color swatch
    const swatchDiv = document.createElement('div');
    swatchDiv.className = 'color-swatch';
    swatchDiv.style.backgroundColor = color;
    
    // Create label
    const labelSpan = document.createElement('span');
    labelSpan.className = 'color-label';
    labelSpan.textContent = `Option ${index + 1}`;
    
    // Add click event listener
    optionDiv.addEventListener('click', () => handleColorChoice(color, optionDiv));
    
    // Assemble element
    optionDiv.appendChild(swatchDiv);
    optionDiv.appendChild(labelSpan);
    
    return optionDiv;
}

/**
 * Handle player's color choice
 * @param {string} selectedColor - The color the player clicked
 * @param {HTMLElement} optionElement - The clicked option element
 */
function handleColorChoice(selectedColor, optionElement) {
    if (!gameActive) return;
    
    console.log('Player selected:', selectedColor);
    console.log('Target color:', targetColor);
    
    // Disable all options to prevent multiple clicks
    disableAllOptions();
    
    // Check if answer is correct
    if (selectedColor === targetColor) {
        handleCorrectAnswer(optionElement);
    } else {
        handleIncorrectAnswer(optionElement);
    }
}

/**
 * Handle correct answer
 * @param {HTMLElement} optionElement - The correct option element
 */
function handleCorrectAnswer(optionElement) {
    console.log('Correct answer!');
    
    // Add visual feedback
    optionElement.classList.add('correct');
    
    // Update score
    score += 10;
    updateDisplay();
    
    // Show success message
    showMessage('🎉 Correct! Well done! +10 points', 'success');
    
    // Start new round after delay
    setTimeout(() => {
        startNewRound();
    }, 2000);
}

/**
 * Handle incorrect answer
 * @param {HTMLElement} optionElement - The incorrect option element
 */
function handleIncorrectAnswer(optionElement) {
    console.log('Incorrect answer!');
    
    // Add visual feedback
    optionElement.classList.add('incorrect');
    
    // Show correct answer
    showCorrectAnswer();
    
    // Lose a life
    lives--;
    updateDisplay();
    
    // Show error message
    showMessage(`❌ Wrong! You lost a life. ${lives} lives remaining.`, 'error');
    
    // Check if game should end
    if (lives <= 0) {
        setTimeout(() => {
            endGame();
        }, 2000);
    } else {
        // Start new round after delay
        setTimeout(() => {
            startNewRound();
        }, 2000);
    }
}

/**
 * Show the correct answer by highlighting it
 */
function showCorrectAnswer() {
    const options = document.querySelectorAll('.color-option');
    
    options.forEach(option => {
        if (option.dataset.color === targetColor) {
            option.classList.add('correct');
        }
    });
}

/**
 * Disable all color options to prevent further clicks
 */
function disableAllOptions() {
    const options = document.querySelectorAll('.color-option');
    options.forEach(option => {
        option.classList.add('disabled');
    });
}

/**
 * Show hint to the player
 * Costs 1 life to use
 */
function showHint() {
    if (!gameActive || lives <= 1) {
        showMessage('Not enough lives to use hint!', 'warning');
        return;
    }
    
    // Deduct life for using hint
    lives--;
    updateDisplay();
    
    // Parse RGB values
    const rgbValues = targetColor.match(/\d+/g);
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);
    
    // Generate hint based on color characteristics
    let hint = generateHint(r, g, b);
    
    // Display hint in modal
    hintTextElement.textContent = hint;
    hintModal.classList.remove('hidden');
    
    // Disable hint button for this round
    hintBtn.disabled = true;
    
    console.log('Hint shown, 1 life deducted');
}

/**
 * Generate a helpful hint based on RGB values
 * @param {number} r - Red value
 * @param {number} g - Green value  
 * @param {number} b - Blue value
 * @returns {string} Hint text
 */
function generateHint(r, g, b) {
    const hints = [];
    
    // Brightness hint
    const brightness = (r + g + b) / 3;
    if (brightness < 85) {
        hints.push('The color is quite dark');
    } else if (brightness > 170) {
        hints.push('The color is quite light');
    } else {
        hints.push('The color has medium brightness');
    }
    
    // Dominant color hint
    const max = Math.max(r, g, b);
    if (max === r) {
        hints.push('it has more red than other colors');
    } else if (max === g) {
        hints.push('it has more green than other colors');
    } else {
        hints.push('it has more blue than other colors');
    }
    
    // Specific value hint
    if (r > 200) hints.push('red value is very high');
    if (g > 200) hints.push('green value is very high');
    if (b > 200) hints.push('blue value is very high');
    
    return hints.join(', ') + '.';
}

/**
 * Close hint modal
 */
function closeHint() {
    hintModal.classList.add('hidden');
}

/**
 * End the game and show final score
 */
function endGame() {
    console.log('Game ended!');
    
    gameActive = false;
    
    // Calculate performance message
    let resultMessage = '';
    if (score >= 100) {
        resultMessage = '🏆 Excellent! You\'re a color master!';
    } else if (score >= 50) {
        resultMessage = '👏 Great job! You have a good eye for colors!';
    } else if (score >= 20) {
        resultMessage = '👍 Good effort! Keep practicing!';
    } else {
        resultMessage = '💪 Nice try! Practice makes perfect!';
    }
    
    // Update modal content
    finalScoreElement.textContent = score;
    resultMessageElement.textContent = resultMessage;
    
    // Show game over modal
    gameOverModal.classList.remove('hidden');
    
    // Show final message
    showMessage('Game Over! Check your final score.', 'normal');
}

/**
 * Update the score and lives display
 */
function updateDisplay() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    rgbValueElement.textContent = targetColor;
    
    // Update lives display color based on remaining lives
    if (lives === 1) {
        livesElement.style.color = '#e74c3c';
    } else if (lives === 2) {
        livesElement.style.color = '#f39c12';
    } else {
        livesElement.style.color = '#2c3e50';
    }
}

/**
 * Show a message to the player
 * @param {string} text - Message text
 * @param {string} type - Message type (normal, success, error, warning)
 */
function showMessage(text, type = 'normal') {
    messageElement.textContent = text;
    
    // Remove existing message classes
    messageElement.classList.remove('success', 'error', 'warning');
    
    // Add new message class
    if (type !== 'normal') {
        messageElement.classList.add(type);
    }
    
    console.log('Message:', text, 'Type:', type);
}

/**
 * Handle keyboard events for accessibility
 */
document.addEventListener('keydown', (event) => {
    // Press 'N' for new game
    if (event.key === 'n' || event.key === 'N') {
        startNewGame();
    }
    
    // Press 'H' for hint
    if (event.key === 'h' || event.key === 'H') {
        if (!hintBtn.disabled) {
            showHint();
        }
    }
    
    // Press 'Escape' to close modals
    if (event.key === 'Escape') {
        hintModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
    }
});

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRandomColor,
        generateColorOptions,
        shuffleArray,
        generateHint
    };
}