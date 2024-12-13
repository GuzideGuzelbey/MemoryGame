const cardArray = [
  {
    id: 1,
    name: "powerCard",
    state: false,
    "back-image": "assets/powercard.jpg",
    "front-image": "assets/cardpattern.jpg",
  },
];

const containerElement = document.querySelector("#container");
const gameTitleElement = document.createElement("h1");
gameTitleElement.classList.add("game-title");
gameTitleElement.innerHTML = "Memory Card Game";
containerElement.appendChild(gameTitleElement);

const cardsContainerElement = document.createElement("div");
cardsContainerElement.classList.add("cards-container");
containerElement.appendChild(cardsContainerElement);

// Generating card elements
cardArray.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardsContainerElement.appendChild(cardElement);

  cardElement.innerHTML = `
        <img class="front" src="${card["front-image"]}" alt="Card Front" />
        <img class="back" src="${card["back-image"]}" alt="Card Back" />
       `;
  cardElement.addEventListener("click", () => flipCards(card, cardElement));
});

function flipCards(card, cardElement) {
  card.state = !card.state;
  cardElement.classList.toggle("flipped", card.state);
}
