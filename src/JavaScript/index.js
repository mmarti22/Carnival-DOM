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

