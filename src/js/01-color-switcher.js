const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

let timer = null;
refs.startButton.addEventListener('click', changeColor);
refs.stopButton.addEventListener('click', stopChangeColor);
refs.stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeColor() {
  timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
}

function stopChangeColor() {
  clearInterval(timer);
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
  //   refs.body.style.backgroundColor = '#ffffff';
}
