import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonRef = document.querySelector('button[data-start]')
const inputRef = document.querySelector('input#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const startTime = Date.now();


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log('selectedDay: ', selectedDates[0]);
      
      if (selectedDates[0].getTime() > startTime) {
          buttonRef.removeAttribute('disabled');
          buttonRef.addEventListener('click', () => {
              buttonRef.setAttribute('disabled', 'disabled');
              inputRef.setAttribute('disabled', 'disabled');
            const timerInterval = setInterval(() => {
                  const currentTime = Date.now();
                  const timeDiffer = selectedDates[0].getTime() - currentTime;
                  const timeToSelectedDate = convertMs(timeDiffer);
                  console.log(timeToSelectedDate);
                  updateClockInterface(timeToSelectedDate);
                  if (timeDiffer === 0) {
                      clearInterval(timerInterval);
                  }
              }, 1000)
             
          });
      } else {
          Notify.failure('Please choose a date in the future');
          buttonRef.setAttribute('disabled', 'disabled');
      }
     
  },
};

buttonRef.setAttribute('disabled', 'disabled');
flatpickr(inputRef, options);

function updateClockInterface({days,hours,minutes,seconds}) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;

}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
