const choices = ["Rock", "Paper", "Scissors"];

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function chooseRandom(choices) {
    return choices[Math.floor(Math.random()*choices.length)];
}

function getComputerChoice() {
    return chooseRandom(choices);
}

/**
 * 
 * @param {str} playerSelection 
 * @param {str} computerSelection 
 * @returns -1 if player lost, 1 if player won, 0 if tie
 */
function playRound(playerSelection, computerSelection) {
    //Tie
    if(playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        return 0;
    }
    //Player Wins
    if(playerSelection.toLowerCase() === 'rock' && computerSelection === choices[2]
      || playerSelection.toLowerCase() === 'paper' && computerSelection === choices[0]
      || playerSelection.toLowerCase() === 'scissors' && computerSelection === choices[1]
    ) {
        gamestate.round += 1;
        gamestate.playerWins += 1;
        return 1;
    }
    // COmputer Wins
    if(playerSelection.toLowerCase() === 'rock' && computerSelection === choices[1]
      || playerSelection.toLowerCase() === 'paper' && computerSelection === choices[2]
      || playerSelection.toLowerCase() === 'scissors' && computerSelection === choices[0]
    ) {
        gamestate.round += 1;
        gamestate.computerWins += 1;
        return -1;
    }
    return `${playerSelection} is invalid`;
}

// game will update only when click happens
function handleClick(clicked) {
    let computerChoice = getComputerChoice();
    let gameResult = playRound(clicked, computerChoice);
    updateDisplay(gameResult, clicked, computerChoice);
    
    if(isGameOver()) {
        promptReset();
        return;
    }
}

function promptReset() {
    buttonsRow.classList.remove("active");
    resetDiv.classList.add("active");
}

function resetGame() {
    buttonsRow.classList.add("active");
    resetDiv.classList.remove("active");
    gamestate.round = 0;
    gamestate.playerWins = 0;
    gamestate.computerWins = 0;
    updateDisplay();
}

function isGameOver() {
    if (gamestate.computerWins === 3 || gamestate.playerWins === 3) return true;
    return gamestate.round === 5;
}

function updateDisplay(gameResult, playerSelection, computerSelection) {
    computerP.textContent = computerSelection;
    playerP.textContent = playerSelection;
    computerScore.textContent = gamestate.computerWins;
    playerScore.textContent = gamestate.playerWins;
    if (gameResult === -1) {
        resultSpan.textContent = `You Lose! ${capitalize(playerSelection)} loses to ${computerSelection}`;
    }
    else if (gameResult === 1) {
        resultSpan.textContent = `You Win! ${capitalize(playerSelection)} beats ${computerSelection}`;
    }
    else if (gameResult === 0) {
        resultSpan.textContent = `Tie! ${computerSelection} ties with ${computerSelection}`;
    }
    else {
        // Default, used for reset
        resultSpan.textContent = "Best 3 out of 5, choose a button to start.";
    }
}

let resultNode = document.querySelector("#result");
let rockButton = document.querySelector("#rock");
let paperButton = document.querySelector("#paper");
let scissorsButton = document.querySelector("#scissors");
let resetDiv = document.querySelector(".reset");
let resetButton = document.querySelector("#resetButton");
let buttonsRow = document.querySelector(".buttons");
let computerP = document.querySelector("#computer");
let playerP = document.querySelector("#player");
let resultSpan = document.querySelector("#result");
let computerScore = document.querySelector("#computerScore");
let playerScore = document.querySelector("#playerScore");

let gamestate = {
    round : 0,
    playerWins: 0,
    computerWins: 0
}

rockButton.addEventListener('click', () => handleClick("rock"));
paperButton.addEventListener('click', () => handleClick("paper"));
scissorsButton.addEventListener('click', () => handleClick("scissors"));
resetButton.addEventListener('click', () => resetGame());