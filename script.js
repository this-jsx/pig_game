'use strict';

// Элементы
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const winnerName = document.querySelector('.winner--name')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Глобальные переменные
let playing // состояние игры
let scores // массив очков
let currentScore // текущий счет
let activePlayer // активный (играющий) игрок

// Функции
// Переключение на другого игрока
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

// Сброс всех условий
const init = function() {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0 // текущий счет игрока 0
  current1El.textContent = 0 // текущий счет игрока 1
  score0El.textContent = 0 // состояние счета игрока 0
  score1El.textContent = 0 // состояние счета игрока 1

  diceEl.classList.add('hidden') // скрытие картинки
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
  winnerName.classList.add('hidden')
}
init()

// Отображение random dice
btnRoll.addEventListener('click', function () {
  if(playing) {
    
    // 1. генерация random number
    const randomDice = Math.floor(Math.random() * 6) + 1

    // 2. отображение
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${randomDice}.png`;

    // 3. проверка
    if(randomDice !== 1 ) {
      // добавление к текущему счету
      currentScore += randomDice;

      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // или переключение на другого игрока
      switchPlayer()
    }
  }
})

// Сохранение текущего счета
btnHold.addEventListener('click', function() {
  if(playing) {
    // -- 1 -- добавление текущих очков в массив
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // -- 2 -- проверка, если значение больше или равно 101
    if(scores[activePlayer] >= 101) {
      // в таком случае завершение игры
      winnerName.textContent = `Игрок ${activePlayer + 1} выиграл 🥳`
      winnerName.classList.remove('hidden')
      playing = false; // !!!!!!!!! игра останавливается !!!!!!!!!
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      currentScore = 0;
      diceEl.classList.add('hidden')
    } else {
      // либо переключение на другого игрока
      // -- 3 --
      switchPlayer()
    }
  }
})

// Возврат к начальному состоянию игры
btnNew.addEventListener('click', init)