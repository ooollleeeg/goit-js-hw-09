import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;

    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const ms = convertMs(0);
    this.onTick(ms);
  }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const choosedTime = flatpickrExitDate.selectedDates[0];

      const deltaTime = choosedTime - currentTime;

      const time = convertMs(deltaTime);

      this.onTick(time);
      if (
        refs.dataDays.textContent === '00' &&
        refs.dataHours.textContent === '00' &&
        refs.dataMinutes.textContent === '00' &&
        refs.dataSeconds.textContent === '00'
      ) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isActive = false;

        this.onTick(time);
        Notify.success('Time is UP ');
      }
    }, 1000);
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.startBtn.disabled = true;

function updateClockface({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}
function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, '0');
  }
  return value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      Notify.success('Good choice :)');
    }
  },
};

const flatpickrExitDate = flatpickr('#datetime-picker', options);
