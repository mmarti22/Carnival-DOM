const COLOR_MAP = {
  red: "#E63946",
  blue: "#457B9D",
  green: "#2A9D8F",
  yellow: "#E9C46A",
  pink: "#502e38ff",
  purple: "#9D4EDD",
};

const board = document.querySelector(".memory-game");
const cardsArray = [...Object.keys(COLOR_MAP), ...Object.keys(COLOR_MAP)].sort(
  () => Math.random() - 0.5
);

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
    if (!startTime) startTimer();
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

const gameboard = document.querySelector(".memory-game");

const hud = document.createElement("div");
hud.className = "hud";
hud.innerHTML = `
<div class="hud-item">Score: <strong id="score">0</strong></div>
<div class="hud-item">Moves: <strong id="moves">0</strong></div>
<div class="hud-item">Time: <strong id="time">00:00</strong></div>
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

let startTime = null;
let timerInterval = null;

function startTimer() {
  if (timerInterval) return; 
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  document.getElementById("time").textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

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
    stopTimer();
    showWinMessage();
  }
}

function showWinMessage() {
  const winMessage = document.getElementById("winMessage");
  winMessage.classList.add("show");

  setTimeout(() => {
    winMessage.classList.remove("show");
    location.reload();
  }, 4000);
}


//Music Button

const buttonMusicTrickster = document.getElementById('buttonMusicTrickster');
const musicTrickster = document.getElementById('musicTricksterBackground');
const buttonMusicText = document.getElementById('buttonMusicText');

let musicActive = false;

buttonMusicTrickster.addEventListener('click', () => {
  if (!musicActive) {
    musicActive = true;
    musicTrickster.play();
    buttonMusicText.textContent = 'Stop';
    buttonMusicTrickster.removeAttribute('id')
    buttonMusicTrickster.classList.add('buttonTrickster');

  } else {
    musicTrickster.pause();
    musicActive = false;
    buttonMusicText.textContent = 'Play';
    buttonMusicTrickster.classList.remove('buttonTrickster');
    buttonMusicTrickster.classList.add('buttonMusicTrickster');
  }
});

document.getElementById("musicTricksterBackground").volume = 0.4;

const form = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");
const savedName = localStorage.getItem("playerName");
  if (savedName) {
  form.style.display = "none";
  greeting.textContent = `Welcome, ${savedName}!`;
  greeting.style.fontSize = "22px";
  greeting.style.color = "#F1E2B7";
  greeting.style.fontFamily = '"Suez One", serif';
  greeting.style.marginRight = "30px";
  greeting.style.marginTop = "10px";
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameInput.value.trim(); 
  if (name) {
    localStorage.setItem("playerName", name);
    form.style.display = "none";
    greeting.textContent = `Welcome, ${name}!`;
    greeting.style.fontSize = "22px";
    greeting.style.color = "#F1E2B7";
    greeting.style.fontFamily = '"Suez One", serif';
    greeting.style.marginRight = "30px";
    greeting.style.marginTop = "10px";
  } else {
    alert("Please enter your name!");
  }
});