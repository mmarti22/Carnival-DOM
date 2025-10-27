
const weaponButtons = document.querySelectorAll('.weapon');
const playerScoreEl = document.querySelector('.player-score-value');
const computerScoreEl = document.querySelector('.computer-score-value');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultMessageEl = document.getElementById('result-message');
const resetBtn = document.getElementById('reset-btn');


let playerScore = 0;
let computerScore = 0;

const choiceImages = {
  rock: '/src/assets/img/rock.svg',
  paper: '/src/assets/img/paper.svg',
  scissor: '/src/assets/img/scissor.svg',
};


function getComputerChoice() {
  const options = ['rock', 'paper', 'scissor'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function getRoundResult(player, computer) {
  if (player === computer) return 'tie';

  const winsAgainst = {
    rock: 'scissor',
    paper: 'rock',
    scissor: 'paper',
  };

  return winsAgainst[player] === computer ? 'player' : 'computer';
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getRoundResult(playerChoice, computerChoice);

  playerChoiceEl.innerHTML = `<img src=${choiceImages[playerChoice]}>`;
  computerChoiceEl.innerHTML = `<img src=${choiceImages[computerChoice]}>`;

  if (result === 'player') {
    playerScore += 1;
    resultMessageEl.textContent = '¡You won the round!';
  } else if (result === 'computer') {
    computerScore += 1;
    resultMessageEl.textContent = 'CPU won the round';
  } else {
    resultMessageEl.textContent = 'It´s a tie.';
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

weaponButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    playRound(playerChoice);
  });
});

resetBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  playerChoiceEl.textContent = '?';
  computerChoiceEl.textContent = '🤖';
  resultMessageEl.textContent = 'Make your move!';
});
