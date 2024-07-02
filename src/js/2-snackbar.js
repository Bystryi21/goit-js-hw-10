import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const state = [...stateInputs].find(input => input.checked).value;
  createPromise(delay, state);
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
