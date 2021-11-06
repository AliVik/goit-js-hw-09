function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;
let timeInterval = null;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);


function onStartClick() {
    timeInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    this.setAttribute('disabled', 'disabled');
    if (stopButton.hasAttribute('disabled')) {
        stopButton.removeAttribute('disabled');
    }
}

function onStopClick() {
    startButton.removeAttribute('disabled');
    clearInterval(timeInterval);
    this.setAttribute('disabled', 'disabled');
}