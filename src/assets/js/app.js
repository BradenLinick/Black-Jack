document.addEventListener('DOMContentLoaded', () => {
  // Create and shuffle a new deck of cards
  startGame();
});

document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stand").addEventListener("click", stand);
document.getElementById("reset").addEventListener("click", reset);

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

function stand() {
  document.getElementById("rev").classList.remove("face-revers");
  document.getElementById("rev").classList.remove("card");
  while (dealerscore < playerscore && dealerscore < 22) {
  dealerHit();
  } 
  if (dealerscore < 22) {
    dealerWin();
  } else {
    noBJwin();
  }
}

function hit() {  //test
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
  let dealerCards = document.getElementById("dealercards");
  dealerCards.innerHTML += (
    `<div class="card face-${card.rank}-of-${card.suit}"></div>`
  );
}

function dealerHit() {
  let card = getCard();
  displayDealerCard(card);
  dealerscore += cardScore(card.rank);
  document.getElementById("dealerscore").innerHTML = `Score: ${dealerscore}`;
}

function startGame() {
  getDeck();
  hit();
  hit();
  dealerHit();
}

function dealerWin() {
  alert(`The dealer wins. He hit ${dealerscore}. He is amazing.`);
}

function noBJwin() {
  alert("nice");
}

function reset() {
  playerscore = 0;
  dealerscore = 0;
  document.getElementById("playerscore").innerHTML = `Score: ${playerscore}`;
  document.getElementById("dealerscore").innerHTML = `Score: ${dealerscore}`;
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML = "";
  let dealercards = document.getElementById("dealercards");
  dealercards.innerHTML = (
    `<div id="rev" class="card face-revers"></div>`
  );
  startGame();
}

function blackJack() { //player win
  alert("You win. You hit 21. You are amazing.");
}

function gameFail() { //player loses
  alert(`You busted. Your score is ${playerscore}. You suck. Consider other games.`);
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