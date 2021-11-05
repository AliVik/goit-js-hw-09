function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;
console.log(body)

startButton.addEventListener('click', onStartClick);
// stopButton.addEventListener('click', onStopClick);


function onStartClick() {
    body.style.backgroundColor = getRandomHexColor();
}