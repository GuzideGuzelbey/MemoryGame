document.addEventListener("DOMContentLoaded", () => {
  doubleShuffleCards(); //calling the main function here
}); // makes the js run after the HTML structure is ready in the DOM to be able to manipulate or interact with them

function getData(callback) {
  fetch(
    "https://raw.githubusercontent.com/GuzideGuzelbey/GuzideGuzelbey.github.io/refs/heads/main/memorygame-data/data.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
}

//Shuffling (reference code: https://stackoverflow.com/a/12646864)
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function doubleShuffleGenerateCards() {
  getData(function (cardArray) {
    //Doubling
    const doubledCards = cardArray.map((card) => ({
      ...card,
      id: card.id * 2,
    }));
    const doubleObjectsArray = [...cardArray, ...doubledCards];
    const shuffledCards = shuffleArray(doubleObjectsArray); // shuffling doubled cards

    generateCards(shuffledCards);
  });
}

//Generate card elements
function generateCards(cards) {
  const cardsContainerElement = document.querySelector("#cards-container");
  cardsContainerElement.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardsContainerElement.appendChild(cardElement);

    card.cardElement = cardElement; // to keep sync DOM elemnt with the card object in js

    cardElement.innerHTML = `
        <img class="front" src="${card["front-image"]}" alt="Card Front" />
        <img class="back" src="${card["back-image"]}" alt="Card Back" />
       `;

    cardElement.classList.toggle("flipped", card.state); //state of the card in js and DOM will be sync
    cardElement.addEventListener("click", () => flipCards(card, cardElement));
  });
}

let flippedCards = [];
let matchedCards = [];
let flipCounter = 0;
let timer = null;
let timeElapsed = 0;

//Card flipping logic
function flipCards(card, cardElement) {
  // starting the timer with the first click
  if (!timer) {
    startTimer();
  }
  if (!card.state && flippedCards.length < 2 && !matchedCards.includes(card)) {
    card.state = true;
    cardElement.classList.toggle("flipped", card.state); // state of the card in js and DOM will be sync
    flippedCards.push(card);
    flipCounter++;
    updateFlipCounter();
    // Checking for a match if two cards are flipped
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Function checking matches for the two flipped cards
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1["back-image"] === card2["back-image"]) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === document.querySelectorAll(".card").length) {
      stopTimer();
      alert("Yay! You won!");
    }
  }

  const twoCardsRevealDuration = 700;
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.state = false;
      card.cardElement.classList.toggle("flipped", card.state); // state of the card in js and DOM will be sync
    });
    flippedCards = [];
  }, twoCardsRevealDuration);
}

// Timer functions:
function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay();
  }, 1000);
}
// inspiration: (https://eaj.no/how-to-make-a-countdown-timer-with-java-script)
function updateTimerDisplay() {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  document.querySelector(".timer").innerText = `${String(minutes).padStart(
    2,
    "0"
  )}min ${String(seconds).padStart(2, "0")}sec`;
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function updateFlipCounter() {
  document.querySelector(".flip-counter").innerText = `Flips: ${flipCounter}`;
}
