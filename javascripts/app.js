// Definition of necessary elements to interact with
const checkButton = document.querySelector('.btn-custom.check');
const restartButton = document.querySelector('.btn-custom.restart');
const gameInputContainer = document.querySelector('.gameInputContainer');
const scoreSpan = document.querySelector('.score');
const successModal = document.querySelector('#successModal');
const failModal = document.querySelector('#failModal');

// Game state variables
let wordToGuess = null;
let score = 0;

// Definition of Word Array
const words = ['გემი', 'მანქანა', 'დედა', 'ტელეფონი', 'ზარი', 'ქალაქი', 'სოფელი'];


/**
 * This function return random word from the 'words' array.
 * 
 * @returns string
 */
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);

    return words[randomIndex];
}

/**
 * This function replaces old inputBoxes with new ones
 * @param {number} length - specifies how many inputBoxes should be created
 */
function fillInputContainer(length) {
    gameInputContainer.replaceChildren(); // Removes old inputBoxes

    // Creates and appends inputBoxes in the gameInputContainer
    for (let i = 0; i < length; i++) {
        const inputBox = document.createElement('input');
        inputBox.setAttribute('type', 'text');
        inputBox.setAttribute('maxLength', '1');
        inputBox.classList.add('inputBox');
        gameInputContainer.appendChild(inputBox);
    }
}

/**
 * This helper function fills random inputBox with the correct letter.
 * @param {string} word - specifies current word to be guessed
 * @param {number} randomIndex - specifies which letter to take from supplied string
 */
function fillInputBox(word, randomIndex) {
    const inputBox = gameInputContainer.children[randomIndex];

    inputBox.classList.add('filled'); // This greys out inputBox
    inputBox.value = word[randomIndex];
    inputBox.disabled = true;
}

/**
 * This function uses fillInputBox helper function to place the hints.
 * @param {string} word - This is used as a guidance to randomly select letters and place hints accordingly.
 * @param {number} count - How many hints are to be placed
 */
function placeHints(word, count) {
    const usedIndexes = []; // This array is used to check for possible index duplication

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * word.length);

        // This conditional checks if function is placing first hint or generated random index
        // has not been used previously
        if (i === 0 || usedIndexes.indexOf(randomIndex) === -1) {
            fillInputBox(word, randomIndex);

            usedIndexes.push(randomIndex); // Current index is saved to the array for avoiding possible index duplication
        }
    }

    // This conditional checks, if filled inputBoxes cound is same to the supplied 'count' argument/
    if (count > gameInputContainer.querySelectorAll('.inputBox.filled').length) {
        // In case of missing filled inputBoxes, this code block executes and fills random
        // inputBoxes, until their count reaches supplied argument 'count'
        while (count > gameInputContainer.querySelectorAll('.inputBox.filled').length) {
            const randomIndex = Math.floor(Math.random() * word.length);

            // This conditional guards against the index duplication
            if (usedIndexes.indexOf(randomIndex) === -1) {
                fillInputBox(word, randomIndex);

                usedIndexes.push(randomIndex);
            }
        }
    }
}

/**
 * This function is used to get everything ready for the user to play the round
 * @param {boolean} keepScore - Tells the function to keep or reset the score (true: kept, false: reset)
 */
function prepareRound(keepScore) {
    wordToGuess = selectRandomWord();
    fillInputContainer(wordToGuess.length);

    // This conditional places different numbers of hints based on the word's length
    if (wordToGuess.length <= 5) {
        placeHints(wordToGuess, 2);
    }
    else {
        placeHints(wordToGuess, 3);
    }

    // This conditional effectively resets the score if keepScore argument is false
    if (!keepScore) {
        score = 0;
        scoreSpan.innerText = score;
    }
}
/** This is main method, where the game logic is written
 */
function playRound() {
    let resultWord = ''; // This string is used for storing word from inputBoxes
    
    // Retrieves letter from every inputBox and turns it into the word
    for (let i = 0; i < gameInputContainer.children.length; i++) {
        const inputBox = gameInputContainer.children[i];
        resultWord += inputBox.value;
    }

    if (resultWord === wordToGuess) {
        const modal = new bootstrap.Modal(successModal, { backdrop: true });
        modal.show();

        score++;
        scoreSpan.innerText = score;
        
        prepareRound(true); // Keeps the score
    }
    else {
        const modal = new bootstrap.Modal(failModal, { backdrop: true });
        modal.show();
    }
}

checkButton.addEventListener('click', playRound);
restartButton.addEventListener('click', () => {
    prepareRound(false);
}); // Effectively restarts round

scoreSpan.innerText = score; // Sets the score properly for startup

prepareRound(true); // It is called for the web application startup
