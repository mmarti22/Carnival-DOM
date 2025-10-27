
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
  piedra: 'images/piedra.png',
  papel: 'images/mano.png',
  tijera: 'images/tijeras.png',
};


function getComputerChoice() {
  const options = ['piedra', 'papel', 'tijera'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function getRoundResult(player, computer) {
  if (player === computer) return 'tie';

  const winsAgainst = {
    piedra: 'tijera',
    papel: 'piedra',
    tijera: 'papel',
  };

  return winsAgainst[player] === computer ? 'player' : 'computer';
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getRoundResult(playerChoice, computerChoice);

  playerChoiceEl.innerHTML = `<img src="${choiceImages[playerChoice]}" alt="${playerChoice}" />`;
  computerChoiceEl.innerHTML = `<img src="${choiceImages[computerChoice]}" alt="${computerChoice}" />`;

  if (result === 'player') {
    playerScore += 1;
    resultMessageEl.textContent = '¡Ganaste esta ronda!';
  } else if (result === 'computer') {
    computerScore += 1;
    resultMessageEl.textContent = 'El ordenador gana la ronda.';
  } else {
    resultMessageEl.textContent = 'Empate.';
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
  resultMessageEl.textContent = 'Haz tu jugada.';
});
