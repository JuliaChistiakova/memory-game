/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const fonts = [
  "bodoni",
  "carol_gothic",
  "futura",
  "karolla",
  "pragmatica",
  "olga_script",
  "lazurski",
  "liberteen",
  "bodoni",
  "carol_gothic",
  "futura",
  "karolla",
  "pragmatica",
  "olga_script",
  "lazurski",
  "liberteen",
];

const cards = document.querySelectorAll('.card');

const fronts = document.querySelectorAll('.front');

const restart = document.querySelector('.restart');

const movesCount = document.querySelector('.moves');

let moves = 0;

let timer = document.querySelector('.timer');

timer.innerHTML = "0 m : 0 s";

let interval = 0;

let openCards = [];

let matchedCards = [];

let clickCount = 0;


const stars = document.querySelector('.stars'); 
const star = document.querySelectorAll('.stars li'); 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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

// Assign random font backgrounds to the cards
function initGame() {
  for (let i = 0; i < fronts.length; i++) {
    let front = fronts[i];
    let font = fonts[i];
    front.classList.add("" + font);
  }
}


// Rotate the cards on click
function clickCard() {
	for (let i = 0; i < cards.length; i++){
		let card = cards[i];
		card.addEventListener('click', function (event) {
		     event.preventDefault();
		     card.classList.toggle('open');

    clickCount++;



    moves ++ ;
    movesCount.innerHTML = " " + moves;

    if (moves === 16) {
    stars.removeChild(star[0]);
    }
    else if (moves === 26) {
    stars.removeChild(star[1]);
    }

    if (clickCount === 1) {
        startTimer();
      }

		});

	}
}



function startTimer() {

  let seconds = 0,
	    minutes = 0,
	    hours = 0;

  interval = setInterval(function() {
    timer.innerHTML = minutes + " m " + " : " + seconds + " s ";
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

function compareCards(cardA, cardB) {

}

function finishGame() {

}


function restartGame() { 
	restart.addEventListener('click', function (event) {
		shuffle(fonts);
	
	  	for (let i = 0; i < fronts.length; i++) {
		    let front = fronts[i];
		    let font = fonts[i];
		    let card = cards[i];
		
		   	front.classList.remove( "bodoni", "carol_gothic", "futura", "karolla", "pragmatica", "olga_script", "lazurski", "liberteen",);
		    card.classList.remove('open');

		    front.classList.add("" + font);
	  	}

		timer.innerHTML = "0 m : 0 s";
		clearInterval(interval);
		clickCount = 0;
    moves = 0;
    movesCount.innerHTML = " " + moves;

    initGame();
	});

}


document.addEventListener('DOMContentLoaded', function () {

   initGame();
   clickCard();
   restartGame() 



});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
