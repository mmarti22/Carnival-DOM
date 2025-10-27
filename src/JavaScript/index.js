const buttonMusicTrickster = document.getElementById('buttonMusicTrickster');
const musicTrickster = document.getElementById('musicTricksterBackground');
const buttonMusicText = document.getElementById('buttonMusicText');

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

