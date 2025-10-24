//Variables
const url = "https://api.adviceslip.com/advice";

const adviceText = document.getElementById('adviceText');
const adviceBtn = document.getElementById('fortuneBtn');

async function getAdvice() {
    const res = await fetch(`${url}?timestamp=${Date.now()}`);
    const data = await res.json();
    const advice = data.slip.advice;
    console.log(advice)
    adviceText.innerText = advice;
}

getAdvice()
adviceBtn.addEventListener('click', () => {
    getAdvice()
    adviceText.classList.remove('animate');
    void adviceText.offsetWidth;
    adviceText.classList.add('animate');

});

//Music Button

const buttonMusicTrickster = document.getElementById('buttonMusicTrickster');
const musicTrickster = document.getElementById('musicTricksterBackground');
let musicActive = false;

buttonMusicTrickster.addEventListener('click', () => {
    if (!musicActive) {
        musicTricksterBackground.play();
        musicActive = true;
        buttonMusicTrickster.textContent = ':mute: Mute';
    } else {
        musicTricksterBackground.pause();
        musicActive = false;
        buttonMusicTrickster.textContent = ':musical_note: Music';
    }
});