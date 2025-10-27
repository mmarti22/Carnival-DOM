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