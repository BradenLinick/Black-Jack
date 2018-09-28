document.addEventListener('DOMContentLoaded', () => {
  // Create and shuffle a new deck of cards
  startGame();
});

document.getElementById("hit").addEventListener("click", hit);

let gameDeck = new Deck();
let i = 0;
let playerscore = 0;
let dealerscore = 0;

function getDeck() {
  const deck = new Deck();
  deck.shuffle();
  gameDeck = deck;
};

function getCard() {
  let currentCard = gameDeck.cards[i];
  i++;
  return currentCard;
}

function hit() {
  let card = getCard();
  displayCard(card);
  playerscore += cardScore(card.rank);
  document.getElementById("playerscore").innerHTML = `Score: ${playerscore}`;
  if (playerscore > 21) {
    gameFail();
  } else if (playerscore === 21) {
    blackJack();
  };
}

function displayCard(card) {
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML += (
    `<div class="card face-${card.rank}-of-${card.suit}"></div>`
  );
}

function displayDealerCard(card) {
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML += (
    `<div class="card face-${card.rank}-of-${card.suit}"></div>`
  );
}

function dealerHit() {
  let card = getCard();
  displayCard(card);
  dealerscore += cardScore(card.rank);
  document.getElementById("dealerscore").innerHTML = `Score: ${dealerscore}`;
  
}

function startGame() {
  getDeck();
  hit();
  hit();
}

function blackJack() {
  alert("You win. You hit 21. You are amazing.");
  playerscore = 0; 
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML = "";
  document.getElementById("playerscore").innerHTML = `Score: ${playerscore}`;
}

function gameFail() {
  alert(`You busted. Your score is ${playerscore}. You suck. Consider other games.`);
  playerscore = 0; 
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML = "";
  document.getElementById("playerscore").innerHTML = `Score: ${playerscore}`;
}

function cardScore(value) {
  switch (value) {
    case "ace": 
      return 11;
      break;
    case "king": 
      return 10;
      break;
    case "queen": 
      return 10;
      break;
    case "jack": 
      return 10;
      break;
    case "10": 
      return 10;
      break;
    case "9": 
      return 9;
      break;
    case "8": 
      return 8;
      break;
    case "7": 
      return 7;
      break;
    case "6": 
      return 6;
      break;
    case "5": 
      return 5;
      break;
    case "4": 
      return 4;
      break;
    case "3": 
      return 3;
      break;
    case "2": 
      return 2;
      break;
  }
}