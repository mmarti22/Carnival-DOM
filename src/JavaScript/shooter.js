(() => {
  const playerNameInput = document.getElementById("playerName");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const displayName = document.getElementById("displayName");
  const scoreEl = document.getElementById("score");
  const roundEl = document.getElementById("round");
  const timeEl = document.getElementById("time");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  const TOTAL_ROUNDS = 5;
  const ROUND_TIME = 30;
  const POINTS = 10;

  let playerName = "";
  let score = 0;
  let round = 1;
  let timeLeft = ROUND_TIME;
  let running = false;
  let timerInterval = null;

  const cross = { x: W / 2, y: H / 2 };
  let targets = [];

  // 🔹 Crear contenedor para mensajes modernos
  const messageBox = document.createElement("div");
  messageBox.style.position = "absolute";
  messageBox.style.top = "50%";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translate(-50%, -50%)";
  messageBox.style.padding = "12px 20px";
  messageBox.style.borderRadius = "8px";
  messageBox.style.background = "rgba(0, 234, 255, 0.1)";
  messageBox.style.color = "#00eaff";
  messageBox.style.fontWeight = "bold";
  messageBox.style.textShadow = "0 0 10px #00eaff";
  messageBox.style.fontSize = "1.2rem";
  messageBox.style.opacity = "0";
  messageBox.style.transition = "opacity 0.4s ease";
  messageBox.style.pointerEvents = "none";
  messageBox.style.zIndex = "10";
  canvas.parentElement.appendChild(messageBox);

  function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.opacity = "1";
    setTimeout(() => (messageBox.style.opacity = "0"), 1500);
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createTargets(n = 4) {
    targets = [];
    for (let i = 0; i < n; i++) {
      const r = rand(15, 25);
      targets.push({
        x: rand(r, W - r),
        y: rand(r + 20, H - r - 20),
        vx: rand(-2, 2),
        vy: rand(-1.5, 1.5),
        r,
        alive: true
      });
    }
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endRound();
    }, 1000);
  }
  function stopTimer() { if (timerInterval) clearInterval(timerInterval); }

  function startRound() {
    running = true;
    timeLeft = ROUND_TIME;
    timeEl.textContent = timeLeft;
    roundEl.textContent = round;
    createTargets(4 + round);
    showMessage(`🎯 Ronda ${round} iniciada`);
    startTimer();
  }

  function endRound() {
    running = false;
    stopTimer();
    showMessage(`🏁 Fin de la ronda ${round}`);
    round++;
    if (round > TOTAL_ROUNDS) {
      setTimeout(() => {
        showMessage(`🎉 ¡Juego terminado, ${playerName}! Puntuación final: ${score}`);
        resetAll();
      }, 1800);
    } else {
      setTimeout(() => startRound(), 2000);
    }
  }

  function resetAll() {
    running = false;
    score = 0;
    round = 1;
    timeLeft = ROUND_TIME;
    stopTimer();
    displayName.textContent = "—";
    scoreEl.textContent = score;
    roundEl.textContent = round;
    timeEl.textContent = timeLeft;
    createTargets();
    draw();
  }

  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    cross.x = e.clientX - rect.left;
    cross.y = e.clientY - rect.top;
  });

  canvas.addEventListener("click", e => {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (const t of targets) {
      if (!t.alive) continue;
      const dist = Math.hypot(x - t.x, y - t.y);
      if (dist <= t.r) {
        t.alive = false;
        score += POINTS;
        scoreEl.textContent = score;
        showMessage(`💥 +${POINTS} puntos`);
        return;
      }
    }
  });

  playerNameInput.addEventListener("input", e => {
    startBtn.disabled = e.target.value.trim().length === 0;
  });

  startBtn.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (!playerName) return;
    displayName.textContent = playerName;
    score = 0; scoreEl.textContent = 0;
    round = 1; roundEl.textContent = 1;
    startRound();
  });

  resetBtn.addEventListener("click", () => {
    playerNameInput.value = "";
    startBtn.disabled = true;
    resetAll();
  });

  // 🔁 Animación principal
  let last = performance.now();
  function loop(now) {
    const dt = (now - last) / 160;
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function update(dt) {
    if (!running) return;
    for (const t of targets) {
      if (!t.alive) continue;
      t.x += t.vx * dt;
      t.y += t.vy * dt;
      if (t.x < t.r || t.x > W - t.r) t.vx *= -1;
      if (t.y < t.r || t.y > H - t.r) t.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const t of targets) {
      if (!t.alive) continue;
      const grd = ctx.createRadialGradient(t.x, t.y, 5, t.x, t.y, t.r);
      grd.addColorStop(0, "#fff");
      grd.addColorStop(1, "#ff4fb2");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    drawCrosshair();
  }

  function drawCrosshair() {
    const x = cross.x, y = cross.y;
    ctx.save();
    ctx.strokeStyle = "rgba(0,234,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x - 6, y);
    ctx.moveTo(x + 6, y);
    ctx.lineTo(x + 20, y);
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x, y - 6);
    ctx.moveTo(x, y + 6);
    ctx.lineTo(x, y + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }

  createTargets();
  draw();
  requestAnimationFrame(loop);
})();

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