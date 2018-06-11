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


shuffle(fonts);

// Assign random font backgrounds to the cards
function initGame() {
  for (let i = 0; i < fronts.length; i++) {
    let front = fronts[i];
    let font = fonts[i];
    front.classList.add("" + font);
  }
}


// Add an event listener to cards
function clickCard() {
   
	for (let i = 0; i < cards.length; i++){

  		let card = cards[i];


  		card.addEventListener('click', function (event) {
  		    event.preventDefault();

          const currentCard = this;

          const previousCard = openedCards[0];

          if (this.classList.contains("match")) {
            return;
          } 



          if (openedCards.length === 1) {

            card.classList.toggle('open'); 

            openedCards.push(this);

// Compare cards – if the front sides of both opened cards have the same classes, the cards match
            if (currentCard.querySelector('div.front').className === previousCard.querySelector('div.front').className) {
              console.log("Matched");
              currentCard.classList.add('match');
              previousCard.classList.add('match');
              matchedCards.push(currentCard,previousCard);
              moves ++ ;
              finishGame();
            } else {             
              console.log("Doesn't match");
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


          clickCount++;

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


// function activateCards(cardA, cardB) {

//    cards.forEach(function(card) {
//      card.addEventListener('click', function() {
//         if(lastFlipped) {
//           compareCards(lastFlipped, card);
//         } else {
//           lastFlipped = card;
//         }  
//      }); 


//    } 
 
// }

// function compareCards() {

//   let cardAClass = openedCards[0].querySelector('div.front').className;

//   let cardBClass = openedCards[1].querySelector('div.front').className;

//   if (cardAClass === cardBClass) {
//         openedCards[0].classList.add('match');
//         openedCards[1].classList.add('match');

//   } else {
//     setTimeout(function () {
//         openedCards[0].classList.remove('open');
//         openedCards[1].classList.remove('open');
//     }, 500);

//     // openedCards.shift();
//     // openedCards.shift();
//   }

// }

function finishGame() {
  if (matchedCards.length === 16) {
    console.log("Win!!!");
  };
}


function restartGame() { 
	restart.addEventListener('click', function (event) {
		shuffle(fonts);
	
	  	for (let i = 0; i < fronts.length; i++) {
		    let front = fronts[i];
		    let font = fonts[i];
		    let card = cards[i];
		
		   	front.classList.remove( "bodoni", "carol_gothic", "futura", "karolla", "pragmatica", "olga_script", "lazurski", "liberteen",);
		    card.classList.remove("open", "match");

		    front.classList.add("" + font);
	  	}

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
   finishGame();
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
