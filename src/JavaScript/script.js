const tableTrickster = document.getElementById('tableTrickster');
const messageTrickster = document.getElementById('messageTrickster');
const buttonPlayTrickster = document.getElementById('playTrickster');
const counterTrickster = document.getElementById('counterTrickster');
const buttonMusicTrickster = document.getElementById('buttonMusicTrickster');
const musicTrickster = document.getElementById('musicTricksterBackground');

let cards = [];
let indexJoker = null;
let playable = false;
let turn = 1;
let musicActive = false;

const symbols = ['♥️', '♣️', '♦️', '♠️', '🃏'];

buttonMusicTrickster.addEventListener('click', () => {
  if (!musicActive) {
    musicTricksterBackground.play();
    musicActive = true;
    buttonMusicTrickster.textContent = '🔇 Mute';
  } else {
    musicTricksterBackground.pause();
    musicActive = false;
    buttonMusicTrickster.textContent = '🎵 Music';
  }
});

function updateCounterTrickster() {
  counterTrickster.textContent = `Round: ${turn} / 5`;
}

function createCards() {
  tableTrickster.innerHTML = '';
  cards = [];

  const deck = symbols.slice(0, 4);
  const positionJoker = Math.floor(Math.random() * 5);
  deck.splice(positionJoker, 0, '🃏');
  indexJoker = positionJoker;

  for (let i = 0; i < 5; i++) {
    const carta = document.createElement('div');
    carta.classList.add('card-trickster');
    carta.dataset.indice = i;

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const back = document.createElement('div');
    back.classList.add('back');

    const side = document.createElement('div');
    side.classList.add('side');
    side.textContent = deck[i];

    inner.appendChild(back);
    inner.appendChild(side);
    carta.appendChild(inner);
    tableTrickster.appendChild(carta);
    cards.push(carta);

    carta.addEventListener('click', () => selectCard(i));
  }
}

async function showJokerBefore() {
  messageTrickster.textContent = '👀 Look where is the Joker...';
  cards.forEach(c => c.classList.add('revealed'));
  await sleep(1500);
  cards.forEach(c => c.classList.remove('revealed'));
}

async function shuffleCards() {
  playable = false;
  messageTrickster.textContent = '🔄 Shuffling the cards...';

  for (let i = 0; i < 3; i++) {
    await visibleExchange(i);
  }

  messageTrickster.textContent = '👉 Choose a card';
  playable = true;
}

async function visibleExchange(vuelta) {
  const totalCards = 5;

  const a = Math.floor(Math.random() * totalCards);
  const b = Math.floor(Math.random() * totalCards);
  while (b === a) {
    b = Math.floor(Math.random() * totalCards);
  }
  const c1 = cards[a];
  const c2 = cards[b];

  const pos1 = c1.getBoundingClientRect();
  const pos2 = c2.getBoundingClientRect();

  const dx = pos2.left - pos1.left;

  c1.style.transition = 'transform 0.8s ease';
  c2.style.transition = 'transform 0.8s ease';

  c1.style.transform = `translateX(${dx}px) rotate(8deg)`;
  c2.style.transform = `translateX(${-dx}px) rotate(-8deg)`;

  await sleep(800);

  c1.style.transform = '';
  c2.style.transform = '';

  const temp = cards[a];
  cards[a] = cards[b];
  cards[b] = temp;

  if (indexJoker === a) indexJoker = b;
  else if (indexJoker === b) indexJoker = a;

  await sleep(400);
}

function selectCard(i) {
  if (!playable) return;
  playable = false;

  const cardseleccionada = cards[i];
  cardseleccionada.classList.add('revealed');

  setTimeout(() => {
    if (i === indexJoker) {
      messageTrickster.textContent = '🎉 ¡Correct! ¡You found the Joker! 🃏';
    } else {
      messageTrickster.textContent = '❌ Miss. The Joker was here 👉';
      cards[indexJoker].classList.add('revealed');
    }
    updateShift();
  }, 800);
}

function updateShift() {
  turn++;
  if (turn > 5) turn = 1;
  updateCounterTrickster();
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

buttonPlayTrickster.addEventListener('click', async () => {
  createCards();
  await showJokerBefore();
  await shuffleCards();
});

updateCounterTrickster();
createCards();
