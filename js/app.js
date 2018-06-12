/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// A list that holds all of the fonts
const fonts = [
  'bodoni',
  'carol_gothic',
  'futura',
  'karolla',
  'pragmatica',
  'olga_script',
  'lazurski',
  'liberteen',
  'bodoni',
  'carol_gothic',
  'futura',
  'karolla',
  'pragmatica',
  'olga_script',
  'lazurski',
  'liberteen'
];

// Define variables
const cards = document.querySelectorAll('.card');

const fronts = document.querySelectorAll('.front');

const restart = document.querySelector('.restart');

const movesCount = document.querySelector('.moves');

let moves = 0;

let timer = document.querySelector('.timer');

timer.innerHTML = '0 m : 0 s';

let interval = 0;

let openedCards = [];

let matchedCards = [];

let clickCount = 0;

const stars = document.querySelector('.stars');

const star = document.querySelectorAll('.stars li');

const modal = document.querySelector('.modal-wrapper');

let results = document.querySelector('.results');

const playAgainButton = document.querySelector('.play-again');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(fonts);

// Initiate the game – assign random font backgrounds to the cards
function initGame () {
  for (let i = 0; i < fronts.length; i++) {
    let front = fronts[i];
    let font = fonts[i];
    front.classList.add('' + font);
  }
}

// Flip the cards on click
function clickCard () {
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    // Add an event listener
    card.addEventListener('click', function (event) {
      event.preventDefault();
      const currentCard = this;
      const previousCard = openedCards[0];

      // Prevent from clicking on the same card twice
      if (this.classList.contains('match')) {
        return;
      }

      if (currentCard === previousCard) {
        return;
      }

      if (openedCards.length === 1) {
        card.classList.toggle('open');
        openedCards.push(currentCard);

        // Compare cards – if the front sides of both opened cards have the same classes, the cards match
        if (currentCard.querySelector('div.front').className === previousCard.querySelector('div.front').className) {
          // console.log("Matched");
          currentCard.classList.add('match');
          previousCard.classList.add('match');
          matchedCards.push(currentCard, previousCard);
          moves++;
          finishGame();
        } else {
          // console.log("Don't match");
          // currentCard.classList.add('no-match');
          // previousCard.classList.add('no-match');

          // Close opened cards that don't match
          setTimeout(function () {
            currentCard.classList.remove('open');
            previousCard.classList.remove('open');
          }, 800);
        }
        openedCards = [];
        moves++;
      } else {
        card.classList.toggle('open');
        openedCards.push(currentCard);
      }

      // Lower the rating
      if (moves === 1) {
        movesCount.innerHTML = ' ' + moves + ' Move';
      } else {
        movesCount.innerHTML = ' ' + moves + ' Moves';
      }
      if (moves === 16 && stars.children.length == 3) {
        stars.removeChild(star[0]);
      } else if (moves === 26 && stars.children.length == 2) {
        stars.removeChild(star[1]);
      }

      // Start the timer on the first click
      clickCount++;
      if (clickCount === 1) {
        startTimer();
      }
    });
  }
}

// Start the timer function
function startTimer () {
  let seconds = 0,
    minutes = 0,
    hours = 0;

  interval = setInterval(function () {
    timer.innerHTML = minutes + ' m ' + ' : ' + seconds + ' s';
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes == 60) {
      hours++;
      minutes = 0;
    }
  }, 1000);
}

// Finish the game
function finishGame () {
  if (matchedCards.length === fonts.length) {
    results.innerHTML = "You've competed the game in " + moves + ' moves. It took you ' + timer.innerHTML + '.' + '<br>' + '<span>You rating is ' + stars.innerHTML + '</span>';
    modal.classList.add('show-modal');
    playAgain();
  }
}

// Reset the game
function resetGame () {
  // Shuffle the fonts  and reassign them to the cards
  shuffle(fonts);
  for (let i = 0; i < fronts.length; i++) {
    let front = fronts[i];
    let font = fonts[i];
    let card = cards[i];
    front.classList.remove('bodoni', 'carol_gothic', 'futura', 'karolla', 'pragmatica', 'olga_script', 'lazurski', 'liberteen');
    card.classList.remove('open', 'match');
    front.classList.add('' + font);
  }
  // Empty  the timer and rating
  timer.innerHTML = '0 m : 0 s';
  clearInterval(interval);
  clickCount = 0;
  moves = 0;
  movesCount.innerHTML = ' ' + moves + ' Moves';
  openedCards = [];
  matchedCards = [];
  initGame();
}

// Restart the game on click on the restart icon
function restartGame () {
  restart.addEventListener('click', function (event) {
    resetGame();
  });
}

// Close the modal and play again

function playAgain () {
  playAgainButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetGame();
    modal.classList.remove('show-modal');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initGame();
  clickCard();
  restartGame();
});
