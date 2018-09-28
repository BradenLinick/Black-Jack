document.addEventListener('DOMContentLoaded', () => {
  // Create and shuffle a new deck of cards
  clear();
});

document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stand").addEventListener("click", stand);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("bet-btn").addEventListener("click", betty);
document.getElementById("clear").addEventListener("click", clear);

let gameDeck = new Deck();
let i = 0;
let playerscore = 0;
let dealerscore = 0;
let playerBank = 500;
let bet = 0;

function clear() { //new game
  playerscore = 0;
  dealerscore = 0;
  document.getElementById("playerscore").innerHTML = `Score: ${playerscore}`;
  document.getElementById("dealerscore").innerHTML = `Score: ${dealerscore}`;
  let cardDiv = document.getElementById("cards");
  cardDiv.innerHTML = "";
  let dealercards = document.getElementById("dealercards");
  dealercards.innerHTML = "";
  document.getElementById("bet-btn").style.visibility = "visible";
  document.getElementById("bankAccount").innerHTML = (`Bank Account: $${playerBank}`)
  document.getElementById("bet-inp").value = "";
}

function betty() {
  let currentBet = document.getElementById("bet-inp").value;
  bet = currentBet;
  playerBank = playerBank - bet;
  document.getElementById("bankAccount").innerHTML = (
    `Bank Account: $${playerBank}`
  );
};

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
  playerWin();
  alert("nice");
}

function reset() { //deal
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
  document.getElementById("bet-btn").style.visibility = "hidden";
  document.getElementById("bankAccount").innerHTML = (`Bank Account: $${playerBank}`)
  document.getElementById("bet-inp").value = "";
  startGame();
}

function playerWin() {
  playerBank += (bet*2)
}

function blackJack() { //player win
  playerWin();
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