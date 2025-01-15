const cardArray = [
  {
    id: 1,
    state: false,
    "back-image": "assets/powercard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
  {
    id: 2,
    state: false,
    "back-image": "assets/freedomCard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
  {
    id: 3,
    state: false,
    "back-image": "assets/happinessCard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
  {
    id: 4,
    state: false,
    "back-image": "assets/loveCard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
  {
    id: 5,
    state: false,
    "back-image": "assets/powertyCard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
  {
    id: 6,
    state: false,
    "back-image": "assets/wealthCard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
];

//Doubling
const doulbledCards = cardArray.map((card) => ({ ...card, id: card.id * 2 }));
let doubleObjectsArray = [...cardArray, ...doulbledCards];

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

const shuffeled = shuffleArray(doubleObjectsArray);

const cardsContainerElement = document.querySelector("#cards-container");

let flippedCards = [];
let matchedCards = [];
let flipCounter = 0;
let timer = null;
let timeElapsed = 0;

// Generating card elements
shuffeled.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardsContainerElement.appendChild(cardElement);

  card.cardElement = cardElement;

  cardElement.innerHTML = `
        <img class="front" src="${card["front-image"]}" alt="Card Front" />
        <img class="back" src="${card["back-image"]}" alt="Card Back" />
       `;
  cardElement.addEventListener("click", () => flipCards(card, cardElement));
});

console.log(shuffeled);

//Starting timer with the first click
function flipCards(card, cardElement) {
  if (!timer) {
    startTimer();
  }
  if (
    !cardElement.classList.contains("flipped") &&
    flippedCards.length < 2 &&
    !matchedCards.includes(card)
  ) {
    card.state = true;
    cardElement.classList.add("flipped");
    flippedCards.push(card);
    flipCounter++;
    updateFlipCounter();

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1["back-image"] === card2["back-image"]) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === shuffeled.length) {
      stopTimer();
      alert("Yay! You won!");
    }
  }

  const twoCardsRevealDuration = 700;
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.state = false;
      card.cardElement.classList.remove("flipped");
    });
    flippedCards = [];
  }, twoCardsRevealDuration);
}

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function updateFlipCounter() {
  document.querySelector(".flip-counter").innerText = `Flips: ${flipCounter}`;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  document.querySelector(".timer").innerText = `${String(minutes).padStart(
    2,
    "0"
  )}min ${String(seconds).padStart(2, "0")}sec`;
}
