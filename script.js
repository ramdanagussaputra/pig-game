'use strict';

//////////// Element
const diceEl = document.querySelector('.dice');
const scoreEl = document.querySelectorAll('.score');
const btnRollEl = document.querySelector('.btn--roll');
const playerEl = document.querySelectorAll(`.player`);
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');
const currentScoreEl = document.querySelectorAll('.current-score');

//////////// Initial Condition
// Variable
let score, activePlayer, currentScore, isPlaying;

// Dice appearance
const diceAppearance = function (opacity) {
  diceEl.style.opacity = opacity;
};

// Current score function
const currentScoreFunc = function (score) {
  score === 0 ? (currentScore = score) : (currentScore += score);

  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

// Switch player function
const switchPlayer = function () {
  playerEl.forEach(el => {
    el.classList.toggle('player--active');
  });

  currentScoreFunc(0);

  activePlayer = activePlayer === 0 ? 1 : 0;
};

// display score
const displayActivePlayerScore = function () {
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];
};

// Initialization function
const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  isPlaying = true;

  playerEl.forEach(el => {
    el.classList.remove('player--winner');
    el.classList.remove('player--active');
  });

  playerEl[0].classList.add('player--active');

  scoreEl.forEach((el, i) => {
    el.textContent = 0;
  });

  currentScoreEl.forEach(el => {
    el.textContent = 0;
  });

  diceAppearance('0');
};

init();

//////////// User roll dice
btnRollEl.addEventListener('click', function () {
  if (isPlaying === false) return;

  // Generate random dice roll
  const diceVal = Math.trunc(Math.random() * 6) + 1;

  // Display dice roll
  diceEl.setAttribute('src', `dice-${diceVal}.png`);
  diceAppearance('100');

  // Check dice
  if (diceVal === 1) {
    currentScoreFunc(0);
    switchPlayer();
  } else {
    currentScoreFunc(diceVal);
  }
});

//////////// User hold score
btnHoldEl.addEventListener('click', function () {
  if (isPlaying === false) return;

  score[activePlayer] += currentScore;

  if (score[activePlayer] >= 100) {
    displayActivePlayerScore();

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    diceAppearance('0');

    isPlaying = false;
  } else {
    displayActivePlayerScore();
    switchPlayer();
  }
});

//////////// User reset game
btnNewEl.addEventListener('click', function () {
  init();
});
