const IMAGE_MAP = {
  rat: "/src/assets/img/rat.png",
  dog: "/src/assets/img/dog.png",
  dragon: "/src/assets/img/dragon.png",
  goat: "/src/assets/img/goat.png",
  horse: "/src/assets/img/horse.png",
  monkey: "/src/assets/img/monkey.png",
  rat: "/src/assets/img/rat.png",
  dog: "/src/assets/img/dog.png",
  dragon: "/src/assets/img/dragon.png",
  goat: "/src/assets/img/goat.png",
  horse: "/src/assets/img/horse.png",
  monkey: "/src/assets/img/monkey.png"
}

const board = document.querySelector('.memory-game');
const cardsArray = [...Object.keys(IMAGE_MAP), ...Object.keys(IMAGE_MAP)]
  .sort(() => Math.random() - 0.5);

cardsArray.forEach((key) => {
  const card = document.createElement('div');
  card.classList.add('memory-card');
  card.dataset.framework = key;

  const front = document.createElement('img');
  front.classList.add('front-face');
  front.src = IMAGE_MAP[key];
  front.alt = key;

  const back = document.createElement('img');
  back.classList.add('back-face');
  back.src = '/src/assets/img/carnival-logo.png';
  back.alt = 'carnival logo';

  card.appendChild(front);
  card.appendChild(back);
  board.appendChild(card);
});


const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));