const cards = document.querySelectorAll(".card"); 
const popup = document.querySelector('.congrats');
const close = document.getElementById('close');
const reset = document.querySelector('.reset');
const replay = document.querySelector('.play-again');

let firstCardFlipped = false;
let secondCardFlipped = false;
let firstCard, secondCard;
let matchedPairs = 0;
let numMoves = 0;
let min = document.getElementById('minutes');
let sec = document.getElementById('seconds');
let tsec = 0;
let timer;

cards.forEach(card => card.addEventListener('click',flip));
//shuffle page upon reload
shuffle();


popup.style.display = "block"; 
//@description Flip a card
function flip(){
  //return if two cards have been flipped
  if (this === firstCard) return;
  if (secondCardFlipped) return;
  this.classList.toggle('flip'); 
  //startTimer after player makes first move
  if (numMoves === 1) startTimer();
  if (!firstCardFlipped) {
    firstCard = this;
    firstCardFlipped = true;
    numMoves++; document.querySelector('.num-moves').innerHTML = numMoves;
    return;
  }
	else if (firstCardFlipped) {
    secondCard = this;
    secondCardFlipped = true; 
    numMoves++; document.querySelector('.num-moves').innerHTML = numMoves;
    checkForMatch();
  }
}

//@description Determine if first card matches the second card
function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    setTimeout(function() {
      cancelPair();
      nextPair();
      matchedPairs++;
      //if all pairs have been matched, game is over
      if (matchedPairs === 8) gameOver();
      }, 750);   
  }
  else if (firstCard.dataset.framework !== secondCard.dataset.framework) {
    //disable the flip function of both cards
    setTimeout(function() {
      firstCard.classList.remove('flip'); 
      secondCard.classList.remove('flip'); 
      nextPair();
      }, 1000);
  } 
}

//@description Remove matched cards from game
function cancelPair() {
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
  //make matched cards disappear
  firstCard.style.display = secondCard.style.display = "none";
}

//@description Reset first and second cards 
function nextPair() {
  firstCard = secondCard = null;
  firstCardFlipped = secondCardFlipped = false;
}

//@description Shuffle the cards in the deck 
function shuffle() {
  let deck = document.querySelector('.deck');
  for (var i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
  }
}

//@description End the game 
function gameOver() {
  //stop timer
  clearInterval(timer);
  //update minutes and seconds on congrats modal
  document.querySelector(".totalMoves").innerHTML = numMoves;
  document.querySelector(".totalTime").innerHTML = min.innerHTML + ":" + sec.innerHTML;  
  //After one second, display congrats modal
  setTimeout(function() {
    popup.style.display = "block";
  }, 1000);
}

//@description Start the timer
function startTimer()
{
  timer = setInterval(function() {
    //increment the number of seconds
    ++tsec;
    //update seconds and minutes 
    //pass in seconds or minutes into counter(n) 
    sec.innerHTML = counter(tsec%60);
    min.innerHTML = counter(parseInt(tsec/60));   
    if (tsec === 3599) {
      //Alert and reload game if timer reaches 1 hour
      window.alert('Game timed out! Game will reload.'); 
      location.reload();
      }
    }, 1000);
}

//@description Return a string of length 2 
//@param {Number} n Number of seconds or minutes
function counter(n) {
  let str = n + "";
  if (str.length < 2) return "0" + str;
  return str;
}

// @description Close pop-up congrats screen on click of "x"
close.onclick = () => {
  popup.style.display = "none";
}

// @description Reload the page on click 
reset.onclick = () => {
  location.reload();
  return;
}
replay.onclick = () => {
  location.reload();
  return;
}
