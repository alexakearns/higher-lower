const cardsContainer = document.getElementById("cards-container");
const apiPack = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const higherBtn = document.getElementById("higher");
const lowerBtn = document.getElementById("lower");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");
const gameLength = 5;
let deck;
let cards = [];
let cardNumbers = [];
let higherLower = "";
const cardValues = {
  "2" : 2,
  "3" : 3,
  "4" : 4,
  "5" : 5,
  "6" : 6,
  "7" : 7,
  "8" : 8,
  "9" : 9,
  "10" : 10,
  "JACK" : 11,
  "QUEEN" : 12,
  "KING" : 13,
  "ACE" : 14,
};

const getPack = () => {
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
    getCardValue(data.cards[0].value)
    createImage();
    if (higherLower !== "") {
      isHigherOrLower();
    }
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
};

const createImage = () => {
  let cardDiv = document.createElement("div");
  let cardImage = document.createElement("img");
  cardImage.src = cards[cards.length -1].image;
  cardsContainer.appendChild(cardDiv);
  cardDiv.appendChild(cardImage);
};

const getCardValue = (value) => {
  cardNumbers.push(cardValues[value])
}

const isHigherOrLower = () => {
  let numCards = cards.length;
  if (((higherLower === "higher") && (cardNumbers[numCards -1] >= cardNumbers[numCards -2])) 
      || ((higherLower === "lower") && (cardNumbers[numCards -1] <= cardNumbers[numCards -2]))){
  } else {
    result.innerHTML = "You Lose";
    showReset()
  }
  if (cards.length === gameLength) {
    showReset()
    result.innerHTML = "You Win";
  }
}

const showReset = () => {
  higherBtn.classList.add("display-none");
  lowerBtn.classList.add("display-none");
  resetBtn.classList.remove("display-none")
}

// const reset = () => {
//   cards = [];
//   higherLower = "";
//   getPack();
// }

const anotherCard = () => {
  higherBtn.addEventListener("click", function() {
    higherLower = "higher";
    callCard();
  });
  
  lowerBtn.addEventListener("click", function() {
    higherLower = "lower";
    callCard();
  });
  
  resetBtn.addEventListener("click", function() {
    reset();
  });
  
};
getPack();
anotherCard();
