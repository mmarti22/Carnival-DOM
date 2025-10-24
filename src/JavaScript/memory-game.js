const COLOR_MAP = {
  red: "#E63946",
  blue: "#457B9D",
  green: "#2A9D8F",
  yellow: "#E9C46A",
  orange: "#F4A261",
  purple: "#9D4EDD",
};

const board = document.querySelector(".memory-game");
const cardsArray = [...Object.keys(COLOR_MAP), ...Object.keys(COLOR_MAP)].sort(
  () => Math.random() - 0.5
);

const animalsLevel1 = [ "rat", "dog", "dragon", "goat", "horse", "monkey" ];
let cardsLevel1 = [...animalsLevel1, ...animalsLevel1].sort(() => Math.random() - 0.5);
const animalsLevel2 = [ "rat", "dog", "dragon", "goat", "horse", "monkey", "tiger", "snake", "rabbit", "rooster", "ox", "pig" ];
let cardsLevel2 = [...animalsLevel2, ...animalsLevel2].sort(() => Math.random() - 0.5);
const animalsLevel3 = [ "rat", "dog", "dragon", "goat", "horse", "monkey", "tiger", "snake", "rabbit", "rooster", "ox", "pig", "cat", "elephant", "lion", "bear", "fox", "wolf" ];
let cardsLevel3 = [...animalsLevel3, ...animalsLevel3].sort(() => Math.random() - 0.5);
const levels = {
  1: cardsLevel1,
  2: cardsLevel2,
  3: cardsLevel3
};

cardsArray.forEach((key) => {
  const card = document.createElement("div");
  card.classList.add("memory-card");
  card.dataset.framework = key;

  const front = document.createElement("div");
  front.classList.add("front-face");
  front.style.backgroundColor = COLOR_MAP[key];

  const back = document.createElement("div");
  back.classList.add("back-face");
  back.style.backgroundColor = "#1C7CCC";

  card.appendChild(front);
  card.appendChild(back);
  board.appendChild(card);
});

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  incrementMoves();
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    streak++;
    addPointsForMatch();
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    disableCards();
    checkWinCondition();
  } else {
    streak = 0;
    penalizeFail();
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));

// SCORE

const gameboard = document.querySelector(".memory-game");

const hud = document.createElement("div");
hud.className = "hud";
hud.innerHTML = `
<div class="hud-item">Score: <strong id="score">0</strong></div>
<div class="hud-item">Moves: <strong id="moves">0</strong></div>
<div class="hud-item">Best score: <strong id="best">-</strong></div>
`;

gameboard.insertAdjacentElement("afterend", hud);

const scoreEl = document.getElementById("score");
const movesEl = document.getElementById("moves");
const bestEl = document.getElementById("best");

const LS_KEY = "memory_best_score";
const getBest = () => parseInt(localStorage.getItem(LS_KEY) || "0", 10);
const setBest = (v) => localStorage.setItem(LS_KEY, String(v));
bestEl.textContent = getBest() ? getBest() : "-";

let score = 0;
let moves = 0;
let streak = 0;
const MATCH_POINTS = 100;
const STREAK_BONUS = 25;
const FAIL_PENALTY = 20;

function addPointsForMatch() {
  const bonus = streak > 1 ? (streak - 1) * STREAK_BONUS : 0;
  score += MATCH_POINTS + bonus;
  updateHUD();
}

function penalizeFail() {
  score = Math.max(0, score - FAIL_PENALTY);
  updateHUD();
}

function incrementMoves() {
  moves++;
  updateHUD();
}

function updateHUD() {
  scoreEl.textContent = score;
  movesEl.textContent = moves;
}

function checkWinCondition() {
  const total = document.querySelectorAll(".memory-card").length;
  const done = document.querySelectorAll(".memory-card.matched").length;
  if (done === total) {
    const best = getBest();
    if (score > best) {
      setBest(score);
      bestEl.textContent = score;
    }

    showWinMessage();
  }
}

function showWinMessage() {
  const winMessage = document.getElementById('winMessage');
  winMessage.classList.add('show');

  setTimeout(() => {
    winMessage.classList.remove('show');
    location.reload();
  }, 4000);
}

