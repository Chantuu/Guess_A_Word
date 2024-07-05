// Definition of necessary elements to interact with
const checkButton = document.querySelector('.btn-custom.check');
const restartButton = document.querySelector('.btn-custom.restart');
const gameInputContainer = document.querySelector('.gameInputContainer');
let wordToGuess = null;

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
        inputBox.setAttribute('maxLength', '1');
        inputBox.classList.add('inputBox');
        gameInputContainer.appendChild(inputBox);
    }
}

// This function places hints. It uses word function as a guidance to where place the hint and count to
// control how many hints should be placed
function placeHints(word, count) {
    const usedIndexes = []; // This array is used to check for possible index duplication

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * word.length);

        // This conditional checks if function is placing first hint or generated random index
        // has not been used previously
        if (i === 0 || usedIndexes.indexOf(randomIndex) === -1) {
            const inputBox = gameInputContainer.children[randomIndex];

            inputBox.classList.add('filled'); // This greys out inputBox
            inputBox.value = word[randomIndex];
            inputBox.toggleAttribute('disabled');

            usedIndexes.push(randomIndex); // Current index is saved to the array for avoiding possible index duplication
        }
    }
}

// This function is used to get everything ready for the user to play the round
function prepareRound() {
    wordToGuess = selectRandomWord();
    fillInputContainer(wordToGuess.length);

    // This conditional places different numbers of hints based on the word's length
    if (wordToGuess.length <= 5) {
        placeHints(wordToGuess, 1);
    }
    else {
        placeHints(wordToGuess, 2);
    }
}

// This is main method, where the game logic is written
function playRound() {
    let resultWord = ''; // This string is used for storing word from inputBoxes
    
    // Retrieves letter from every inputBox and turns it into the word
    for (let i = 0; i < gameInputContainer.children.length; i++) {
        const inputBox = gameInputContainer.children[i];
        resultWord += inputBox.value;
    }

    if (resultWord === wordToGuess) {
        alert("Congratulations! You successfully guessed the word!"); //TODO Announce win in modal element
        prepareRound();
    }
    else {
        alert('Incorrect word! Please try again!'); //TODO Announce fail in banner element
    }
}

checkButton.addEventListener('click', playRound);

prepareRound(); // It is called for the web application startup
