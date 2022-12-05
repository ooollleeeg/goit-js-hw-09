import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function callPromise(e) {
  e.preventDefault();
  let delayValue = Number(e.target.delay.value);
  let stepValue = Number(e.target.step.value);
  let amountValue = Number(e.target.amount.value);
  for (let i = 0; i < amountValue; i++) {
    createPromise(i + 1, delayValue)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delayValue += stepValue;
  }
}

form.addEventListener('submit', callPromise);
