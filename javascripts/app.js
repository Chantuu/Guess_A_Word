// Definition of necessary elements to interact with
const checkButton = document.querySelector('.btn-custom.check');
const restartButton = document.querySelector('.btn-custom.restart');
const gameInputContainer = document.querySelector('.gameInputContainer');

// Definition of Word Array
const words = ['გემი', 'მანქანა', 'დედა', 'ტელეფონი', 'ზარი', 'ქალაქი', 'სოფელი'];


// This function return random word from the 'words' array
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);

    return words[randomIndex];
}

// This function replaces old inputBoxes with new ones, where their count is dictated by
// count propery
function fillInputContainer(length) {
    gameInputContainer.replaceChildren(); // Removes old inputBoxes

    // Creates and appends inputBoxes in the gameInputContainer
    for (let i = 0; i < length; i++) {
        const inputBox = document.createElement('input');
        inputBox.setAttribute('type', 'text');
        inputBox.classList.add('inputBox');
        gameInputContainer.appendChild(inputBox);
    }
}
