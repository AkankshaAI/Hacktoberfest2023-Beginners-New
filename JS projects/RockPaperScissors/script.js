let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let compScore = parseInt(localStorage.getItem("compScore")) || 0;

// Load scores from local storage when the page loads
window.addEventListener("load", () => {
  updateScores();
});

// Aliases of all needed tags for imporved readability.
const options = document.querySelectorAll(".option");
const optionsDiv = document.querySelector(".options");

const playerScoreElement = document.querySelector(".player-score");
const compScoreElement = document.querySelector(".computer-score");

const resetButton = document.querySelector(".reset");
const result = document.querySelector(".result");

const playerPicked = document.querySelector(".player-picked");
const computerPicked = document.querySelector(".computer-picked");

const gameResult = document.querySelector(".game-result");
const playAgain = document.querySelector(".play-again");
const finalJudgement = document.querySelector(".final-judgement");

const hurrayPage = document.querySelector(".hurray-page");
const mainPage = document.querySelector(".main-page");

const next = document.querySelector(".next");
const restartButton = document.querySelector(".restart");

const rules = document.querySelector(".rules");
const ruleBox = document.querySelector(".rule-box");
const cross = document.querySelector(".cross");

// Generate computer's choice
function computerOption() {
  const options = ["Rock", "Paper", "Scissors"];
  //from mdn docs
  const randomIndex = Math.floor(Math.random() * 2);
  return options[randomIndex];
}

//Get user choice
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // get player choice from id of image
    const playerChoice = e.currentTarget.querySelector("img")
    .getAttribute("id");

    match(playerChoice);
  });
});

// Update scores
function updateScores() {
  playerScoreElement.innerText = playerScore;
  compScoreElement.innerText = compScore;
}

// Determine the Winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } 
  else if(
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")) 
  {
    playerScore++;
    return "player";
  } 
  else {
    compScore++;
    return "computer";
  }
}

// Start the round
function match(playerChoice) {
  const computerChoice = computerOption();
  const winner = determineWinner(playerChoice, computerChoice);
  // Save scores to local storage after each round
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("compScore", compScore);
  updateScores();

  // toggle result and options
  optionsDiv.style.display = "none";
  result.style.display = "block";

  // final judgement
  if (winner === "computer") {
    finalJudgement.innerText = "YOU LOST";
    gameResult.innerText = "AGAINST PC";
    computerPicked.classList.add("green-bg");
    next.style.display = "none";
  } else if (winner === "player") {
    finalJudgement.innerText = "YOU WON";
    gameResult.innerText = "AGAINST PC";
    playerPicked.classList.add("green-bg");
    next.style.display = "block";
  } else {
    finalJudgement.innerText = "TIE UP";
    gameResult.innerText = "";
    next.style.display = "none";
  }

  // button text
  if (winner === "tie") {
    playAgain.innerText = "REPLAY";
  } else {
    playAgain.innerText = "PLAY AGAIN";
  }

  // display players choice
  playerPicked.src = `./assets/${playerChoice}.svg`;
  computerPicked.src = `./assets/${computerChoice}.svg`;

  // playagain button
  playAgain.addEventListener("click", () => {
    optionsDiv.style.display = "block";
    result.style.display = "none";
    computerPicked.classList.remove("green-bg");
    playerPicked.classList.remove("green-bg");
  });

  // next button
  next.addEventListener("click", () => {
    mainPage.style.display = "none";
    hurrayPage.style.display = "block";
    next.style.display = "none";
    //lose case then change the text in method 
    //if(playerScore < compScore)
  });

  // restart the game
  restartButton.addEventListener("click", () => {
    mainPage.style.display = "block";
    hurrayPage.style.display = "none";
    optionsDiv.style.display = "block";
    result.style.display = "none";
    playerPicked.classList.remove("green-bg");
  });
}

// toggle rules
rules.addEventListener("click", () => {
  ruleBox.style.display = "block";
});
cross.addEventListener("click", () => {
  ruleBox.style.display = "none";
});