import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonRef = document.querySelector('button[data-start]')
console.log(buttonRef);
const inputRef = document.querySelector('input#datetime-picker');
const currentDay = Date.now();
console.log('currentDay', currentDay)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log('selectedDay', selectedDates[0].getTime());
      if (selectedDates[0].getTime() <= currentDay) {
          Notify.failure('Please choose a date in the future');
          buttonRef.setAttribute('disabled', 'disabled');
      } else {
          buttonRef.removeAttribute('disabled');
      }
      
      
  },
};

flatpickr(inputRef, options);