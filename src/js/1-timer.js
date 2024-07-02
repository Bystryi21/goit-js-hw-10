// import flatpickr from 'flatpickr';

// import 'flatpickr/dist/flatpickr.min.css';
// import 'izitoast/dist/css/iziToast.min.css';
// //
// const inputForValue = document.querySelector('#datetime-picker');
// console.log(inputForValue);
// //
// const btnStart = document.querySelector('[data-start]');
// //
// const days = document.querySelector('[data-days]');
// //
// const hours = document.querySelector('[data-hours]');
// //
// const minutes = document.querySelector('[data-minutes]');
// //
// const seconds = document.querySelector('[data-seconds]');

// // Перевірити, чи користувач обрав майбутню дату.
// inputForValue.addEventListener('click', handleClick)
// if () {

// }
// //Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість у документації «Options» і використовуй його у своєму коді.
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// // функція для підрахунку часу
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// Оголошення змінної timerInterval
let timerInterval;

// Решта вашого коду тут
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Елементи DOM
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Перевірка, чи вибрана дата в майбутньому
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
flatpickr(datetimePicker, options);

// Функція форматування чисел з доданням ведучого нуля
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для розрахунку різниці часу і оновлення таймера
function updateTimer(endTime) {
  const total = Date.parse(endTime) - Date.now();
  if (total <= 0) {
    clearInterval(timerInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    startButton.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(total);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Почати таймер при натисканні кнопки "Start"
startButton.addEventListener('click', function () {
  startButton.disabled = true;
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i:S');
  if (!selectedDate) return;

  const now = new Date();
  if (selectedDate < now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
    return;
  }

  // Оновлення таймера кожну секунду
  updateTimer(selectedDate);
  timerInterval = setInterval(() => updateTimer(selectedDate), 1000);
});

// Функція для перетворення мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
