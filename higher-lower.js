const cardDiv = document.getElementById("card-image");
const apiPack = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const newCard = document.getElementById("more-button");
let deck ;
let cards = [];

const getPack = () => {
  anotherCard();

  fetch (apiPack)
  .then (res => res.json())
  .then((data) => {
    deck = data;
    callCard();
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
};

const callCard = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`)
  .then (res => res.json())
  .then((data) => {
    cards.push(data.cards[0]);
    createImage();
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
  cardDiv.innerHTML = cards;
};

const createImage = () => {
  let cardImage = document.createElement("img");
  cardImage.src = cards[0].image;
  cardDiv.appendChild(cardImage);
};

const anotherCard = () => {
  newCard.addEventListener("click", function() {
    callCard();
  });
};

getPack();
