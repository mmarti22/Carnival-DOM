//Music Button

const buttonMusicTrickster = document.getElementById('buttonMusicTrickster');
const musicTrickster = document.getElementById('musicTricksterBackground');
let musicActive = false;

buttonMusicTrickster.addEventListener('click', () => {
    if (!musicActive) {
        musicTricksterBackground.play();
        musicActive = true;
        buttonMusicTrickster.textContent = 'Stop';
    } else {
        musicTricksterBackground.pause();
        musicActive = false;
        buttonMusicTrickster.textContent = 'Play';
    }
});