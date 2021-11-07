import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit',onFormSubmit)
refs.amount.addEventListener('change', onAmountChange);
refs.delay.addEventListener('change', onDelayChange);
refs.step.addEventListener('change', onStepChange);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }

  })
}


function onFormSubmit(evt) {
  evt.preventDefault();
  let currentDelay = Number(onDelayChange());
  let amountValue = Number(onAmountChange());
  let stepValue = Number(onStepChange());
  

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay}) => {
        setTimeout(() => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        }, currentDelay)
      })
      .catch(({position, delay}) => {
        setTimeout(() => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        },currentDelay)
    
      })
    currentDelay += stepValue;
    
  }
    
  
}


function onAmountChange() {
  return refs.amount.value;
}
function onDelayChange() {
  return refs.delay.value;
}
function onStepChange() {
  return refs.step.value;
}