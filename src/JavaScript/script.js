const mesa = document.getElementById('mesa');
const mensaje = document.getElementById('mensaje');
const botonJugar = document.getElementById('jugar');
const contador = document.getElementById('contador');
const botonMusica = document.getElementById('botonMusica');
const musica = document.getElementById('musicaFondo');

let cartas = [];
let indiceJoker = null;
let jugable = false;
let turno = 1;
let musicaActiva = false;

const simbolos = ['♥️', '♣️', '♦️', '♠️', '🃏'];
botonMusica.addEventListener('click', () => {
  if (!musicaActiva) {
    musica.play();
    musicaActiva = true;
    botonMusica.textContent = '🔇 Mute';
  } else {
    musica.pause();
    musicaActiva = false;
    botonMusica.textContent = '🎵 Music';
  }
});
function actualizarContador() {
  contador.textContent = `Round: ${turno} / 5`;
}

function crearCartas() {
  mesa.innerHTML = '';
  cartas = [];

  const baraja = simbolos.slice(0, 4);
  const posicionJoker = Math.floor(Math.random() * 5);
  baraja.splice(posicionJoker, 0, '🃏');
  indiceJoker = posicionJoker;

  for (let i = 0; i < 5; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.indice = i;

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const dorso = document.createElement('div');
    dorso.classList.add('dorso');

    const cara = document.createElement('div');
    cara.classList.add('cara');
    cara.textContent = baraja[i];

    inner.appendChild(dorso);
    inner.appendChild(cara);
    carta.appendChild(inner);
    mesa.appendChild(carta);
    cartas.push(carta);

    carta.addEventListener('click', () => seleccionarCarta(i));
  }
}

async function mostrarJokerAntes() {
  mensaje.textContent = '👀 Look where is the Joker...';
  cartas.forEach(c => c.classList.add('revelada'));
  await sleep(1500);
  cartas.forEach(c => c.classList.remove('revelada'));
}

async function mezclarCartas() {
  jugable = false;
  mensaje.textContent = '🔄 Shuffling the cards...';

  for (let i = 0; i < 3; i++) {
    await intercambioVisible(i);
  }

  mensaje.textContent = '👉 Choose a card';
  jugable = true;
}

async function intercambioVisible(vuelta) {

  const a = vuelta % 2 === 0 ? 1 : 2;
  const b = a + 1;

  const c1 = cartas[a];
  const c2 = cartas[b];

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

  const temp = cartas[a];
  cartas[a] = cartas[b];
  cartas[b] = temp;

  if (indiceJoker === a) indiceJoker = b;
  else if (indiceJoker === b) indiceJoker = a;

  await sleep(400);
}

function seleccionarCarta(i) {
  if (!jugable) return;
  jugable = false;

  const cartaSeleccionada = cartas[i];
  cartaSeleccionada.classList.add('revelada');

  setTimeout(() => {
    if (i === indiceJoker) {
      mensaje.textContent = '🎉 ¡Correct! ¡You found the Joker! 🃏';
    } else {
      mensaje.textContent = '❌ Miss. The Joker was here 👉';
      cartas[indiceJoker].classList.add('revelada');
    }
    actualizarTurno();
  }, 800);
}

function actualizarTurno() {
  turno++;
  if (turno > 5) turno = 1;
  actualizarContador();
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

botonJugar.addEventListener('click', async () => {
  crearCartas();
  await mostrarJokerAntes();
  await mezclarCartas();
});

actualizarContador();
crearCartas();
