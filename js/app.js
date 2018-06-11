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

let openedCards = [];

let matchedCards = [];

let clickCount = 0;

let lastFlipped = 0;

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




// Initiate the game – assign random font backgrounds to the cards
function initGame() {
  shuffle(fonts);
  for (let i = 0; i < fronts.length; i++) {
    let front = fronts[i];
    let font = fonts[i];
    front.classList.add("" + font);
  }
}


// Flip the cards on click
function clickCard() {
   
	for (let i = 0; i < cards.length; i++){

  		let card = cards[i];


  		card.addEventListener('click', function (event) {
  		    event.preventDefault();
          const currentCard = this;
          const previousCard = openedCards[0];

// Prevent from clicking on the same card twice
          if (this.classList.contains("match")) {
            return;
          } 

          if (openedCards.length === 1) {
            card.classList.toggle('open'); 
            openedCards.push(this);

// Compare cards – if the front sides of both opened cards have the same classes, the cards match
            if (currentCard.querySelector('div.front').className === previousCard.querySelector('div.front').className) {
              // console.log("Matched");
              currentCard.classList.add('match');
              previousCard.classList.add('match');
              matchedCards.push(currentCard,previousCard);
              moves ++ ;
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
              moves ++ ;
          
          } else {   
            card.classList.toggle('open');      
            openedCards.push(currentCard);            
          }



// Lower the rating
          if (moves === 1) {
              movesCount.innerHTML = " " + moves + " Move";
          } else {
              movesCount.innerHTML = " " + moves + " Moves";
          }
          if (moves === 16) {
              stars.removeChild(star[0]);
          }

          else if (moves === 26) {
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


// Finish the game
function finishGame() {
  if (matchedCards.length === 16) {
    console.log("Win!!!");
  };
}


// Restart the game
function restartGame() { 
	restart.addEventListener('click', function (event) {
// Shuffle the fonts	and reassign them to the cards	
    shuffle(fonts);
	  	for (let i = 0; i < fronts.length; i++) {
		    let front = fronts[i];
		    let font = fonts[i];
		    let card = cards[i];
		   	front.classList.remove( "bodoni", "carol_gothic", "futura", "karolla", "pragmatica", "olga_script", "lazurski", "liberteen",);
		    card.classList.remove("open", "match");
		    front.classList.add("" + font);
	  	}
// Empty  the timer and rating
		timer.innerHTML = "0 m : 0 s";
		clearInterval(interval);
		clickCount = 0;
    moves = 0;
    movesCount.innerHTML = " " + moves + " Moves";
    openedCards = [];
    initGame();
	});

}


document.addEventListener('DOMContentLoaded', function () {
   initGame();
   clickCard();
   restartGame();
});
