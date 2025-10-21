//Variables
const url= "https://api.adviceslip.com/advice";

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

adviceBtn.addEventListener('click', getAdvice);

