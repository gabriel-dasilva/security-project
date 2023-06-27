let hidden;
let actual;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21

let bankroll = 0;
let bet = 0; //Set bet to an arbitrary value,once
let dealerSum = 0;//set dealSum to an arbitrary value just for testing
let dealCards = [];
let playerCards = [];
let yourSum = 0;//set yourSum to an arbitrary value just for testing
let message = ""
let deckJson = '';
let username = '';

let overlay = null;
let gameInProgress = false;

const cardValues =  '{ "1":1 ,' +
                    '"2":2 ,' +
                    '"3":3 ,' +
                    '"4":4 ,' +
                    '"5":5 ,' +
                    '"6":6 ,' +
                    '"7":7 ,' +
                    '"8":8 ,' +
                    '"9":9 ,' +
                    '"10":10 ,' +
                    '"J":10 ,' +
                    '"Q":10 ,' +                    
                    '"K":10 }'; 

const chipSound = new Audio('../sound/sound.ogg');
window.onload = function () {
    getUsername();
    getUserBankRoll();
    buildDeck();
    shuffleDeck();
    startGame();    
    let chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            let chipValue = parseInt(chip.getAttribute('value'));
            if (chipValue > bankroll) {
                chip.style.display = 'none'; // This will hide the chip
                // or
                chip.disabled = true; // This will make the chip unclickable
            } else {
                // Normal chip click handling
                document.getElementById("placebet").disabled = false;
                bankroll -= chipValue;
                bet += chipValue;
                playSound();
                updateBetAndBankroll();
            }
        });
    });
}

function playSound() {
    chipSound.play();
}

function buildDeck() {

    //For testing purposes.Logic needs to be replaced by the fetch call.
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    //For testing purposes.Needs to be replaced by the fetch call
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    //For testing purposes.Logic needs to be replaced by the fetch call.
    gameInProgress = true;
    document.getElementById("placebet").addEventListener("click", placebet);
    document.getElementById("placebet").disabled = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
    hidden = deck.pop();
    actual = hidden;
    dealerSum = 0;
    yourSum = 0;

    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.src = "../images/cards/BACK.png";
    document.getElementById("dealer-cards").append(hiddenCardImg);
    document.getElementById("dealer-section").style.display = "none";
    let dealerCards = document.getElementById("dealer-cards");

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "../images/cards/" + card + ".png";
    dealCards.push(card);
    dealerSum = checkBust(dealCards)[1];
    cardImg.style.transform = `translateX(${-(dealerCards.childElementCount * 70)}px)`;
    dealerCards.append(cardImg);    

    document.getElementById("player-section").style.display = "none";
    let yourCards = document.getElementById("your-cards");
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        playerCards.push(card);
        cardImg.src = "../images/cards/" + card + ".png";        
        cardImg.style.transform = `translateX(${-(yourCards.childElementCount * 70)}px)`;
        yourCards.append(cardImg);
    }
    playerResult = checkBust(playerCards);
    yourSum = playerResult[1];
    canHit = playerResult[0];

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("new-game").addEventListener("click", newGame);
    document.getElementById("placebet").addEventListener("click", placebet);
    document.getElementById("deal").addEventListener("click", deal);
    updateBetAndBankroll();
}

let checkBust = (cards) => {
    const cardVals = JSON.parse(cardValues);
    let cardSum = 0;
    let numberOfAs = 0;
    let allowedToHit = false;

    if(cards != null){
        for(let i=0;i<cards.length;i++){
            let c = cards[i].charAt(0);
            let t = cards[i].charAt(1);
            if(c !== 'A'){
                if(t !== '0'){
                    cardSum += cardVals[c];
                }
                else{
                    cardSum += cardVals['10'];
                }
            }
            else if(c === 'A'){
                numberOfAs += 1;
            }
        }

        if(numberOfAs > 0){
            for(let i=0;i<numberOfAs;i++){
                if(cardSum + 11 > 21){
                    cardSum += 1;
                }
                else if(cardSum + 11 <= 21){
                    cardSum += 11;
                }
            }
        }
    }

    if(cardSum < 21){
        allowedToHit = true;
    }
    else{
        allowedToHit = false;
    }

    return [allowedToHit, cardSum];
}

function createCard(card, index) {
    let cardImg = document.createElement("img");
    cardImg.src = "../images/cards/" + card + ".png";
    cardImg.classList.add("card", "card-" + index);  // Add class name
    return cardImg;
}

function newGame() {
    //For testing purposes.Logic needs to be replaced by the fetch call.
    canHit = true;
    bet = 0;
    dealerSum = 0;
    yourSum = 0;
    dealCards = [];
    playerCards = [];

    //document.getElementById("new-game").classList.remove("animate");
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;    
    document.getElementById("chip-area").style.display = "block";
    document.getElementById("placebet").disabled = false;
    document.getElementById("placebet").style.display = "inline-block";
    document.getElementById("deal").style.display = "initial";
    document.getElementById("dealer-section").style.display = "none";
    document.getElementById("dealer-cards").innerHTML = '';
    document.getElementById("player-section").style.display = "none";
    document.getElementById("new-game").style.display = "none";
    document.getElementById("your-cards").innerHTML = '';
    document.getElementById("dealer-sum").innerText = '';
    document.getElementById("your-sum").innerText = '';
    document.getElementById("results").innerText = '';

    buildDeck();
    shuffleDeck();

    document.getElementById("placebet").removeEventListener("click", placebet);
    document.getElementById("deal").removeEventListener("click", deal);
    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("new-game").removeEventListener("click", newGame);

    startGame();
}

function hit() {
    canHit = checkBust(playerCards)[0];
    
    if (deck.length === 0) {
        buildDeck();
        shuffleDeck();
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    playerCards.push(card);
    cardImg.src = "../images/cards/" + card + ".png";

    let yourCards = document.getElementById("your-cards");
    if (yourCards.childElementCount !== 0) { // Check if it's not the first card
        cardImg.style.transform = `translateX(${-(yourCards.childElementCount * 70)}px)`;
    }
    yourCards.append(cardImg);

    canHit = checkBust(playerCards)[0];

    canHit = checkBust(playerCards)[0];
    yourSum = checkBust(playerCards)[1];

    if (!canHit) {
        stay();
    }
}

function runDealerLogic() {
    let dealerHit = true;

    while(dealerHit == true && dealerSum < 17 && canHit == true){
        let dealerCards = document.getElementById("dealer-cards");
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../images/cards/" + card + ".png";
        dealCards.push(card);
        cardImg.style.transform = `translateX(${-(dealerCards.childElementCount * 70)}px)`;
        dealerCards.append(cardImg);
        dealerResult = checkBust(dealCards);
        dealerHit = dealerResult[0];
        dealerSum = dealerResult[1];
    }

    if((dealerHit == true || yourSum === 21) && yourSum !== 21 && (dealerSum > yourSum || canHit == false)){
        displayResults('Dealer won');
        payPlayer(false);
    }
    else if((canHit == true || yourSum === 21) && (yourSum > dealerSum || dealerHit == false)){
        displayResults('Player won');
        payPlayer(true);
    }
    else{
        displayResults('Dealer won');
        payPlayer(false);
    }

    document.getElementById("hit").style.display = "none";
    document.getElementById("stay").style.display = "none";
}

function showOverlay() {
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "overlay";
        const img = document.createElement("img");
        img.src = "../images/slots.gif?x=" + Date.now();
        img.alt = "Slots Animation";
        overlay.appendChild(img);
        document.body.appendChild(overlay);
    }

    const img = overlay.querySelector("img");
    img.src = "../images/slots.gif?x=" + Date.now();

    overlay.style.pointerEvents = "auto";
    overlay.style.display = "block";
    document.getElementById("dealer-cards").style.display = "none";
    document.getElementById("your-cards").style.display = "none";
}

function placebet() {
    //For testing purposes.Logic needs to be replaced by the fetch call.
    //set bet to a dummy value,this will be replaced by the value retrieved from the backend
    
    bet = document.getElementById("bet").innerText;

    if (bet > 0) {
        document.getElementById("chip-area").style.display = "none";
        document.getElementById("placebet").disabled = true;
        document.getElementById("placebet").style.display = "none";
        document.getElementById("deal").disabled = false;        
    }
}

function deal() {
    document.getElementById("deal").disabled = true;
    document.getElementById("hit").disabled = false;
    document.getElementById("stay").disabled = false;

    document.getElementById("dealer-section").style.display = "block";
    document.getElementById("player-section").style.display = "block";
    document.getElementById("action-section").style.display = "block";
    document.getElementById("hit").style.display = "inline";
    document.getElementById("stay").style.display = "inline";
    document.getElementById("new-game").style.display = "none";
    document.getElementById("deal").style.display = "none";
}

function hideOverlay() {
    overlay.style.pointerEvents = "none"; // Disable pointer events on the overlay
    overlay.style.display = "none";
    document.getElementById("dealer-cards").style.display = "flex";
    document.getElementById("your-cards").style.display = "flex";
}

function stay() {
    //For testing purposes.Sensitive logic  needs to be replaced by the fetch call.

    gameInProgress = false;

    runDealerLogic();

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    showOverlay();
    setTimeout(hideOverlay, 2000);
    bet = 0;
    updateBetAndBankroll();
    let dealerCardsContainer = document.getElementById("dealer-cards");
    let playerCardsContainer = document.getElementById("your-cards");
    let resultsElement = document.getElementById("results");

    dealerCardsContainer.classList.add("stay");
    playerCardsContainer.classList.add("stay");

    setTimeout(() => {
        resultsElement.style.opacity = "1";
    }, 500);

    setTimeout(() => {
        startNewRound();
    }, 5000);
}

function startNewRound() {

    gameInProgress = true;
    let resultsElement = document.getElementById("results");

    //document.getElementById("new-game").classList.remove("animate");
    document.getElementById("hit").disabled = false;
    document.getElementById("stay").disabled = false;

    document.getElementById("dealer-cards").innerHTML = '';
    document.getElementById("your-cards").innerHTML = '';

    // Display the "New Round! Place your bets." message after 2 seconds
    setTimeout(() => {
        resultsElement.innerText = "New Round! Place your bets.";
        document.getElementById("new-game").style.display = "inline";
        resultsElement.style.opacity = "1";
    }, 2000);
}

function displayNewRoundMessage() {
    message = "New Round! Place your bets.";
    document.getElementById("results").innerText = message;    
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
}

function displayResults(message) {
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function updateBetAndBankroll() {
    document.getElementById("bet").innerText = bet;
    document.getElementById("bankroll").innerText = bankroll;
    if (bankroll <= 0 && !gameInProgress) {
        // Disable hit and stay buttons
        document.getElementById("hit").disabled = true;
        document.getElementById("stay").disabled = true;
        document.getElementById("new-game").classList.add("animate");
    }
}

function payPlayer(playerWon){
    if(playerWon){
        bankroll += 2* bet;
    }
    else if(!playerWon){
        bankroll -= bet;
    }
    
    updateUserBankRoll(bankroll);
}

async function getUserBankRoll(){

    const userBankroll = async (user) => {

      let response = await fetch('/blackjack/userBankRoll', {
        method: 'POST',
        body: JSON.stringify({ "username" : user }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      });

      const myJson = await response.json();
      return myJson;
    }

    const bank = await userBankroll(username);
    if(bank !== undefined){
        bankroll = bank;
        document.getElementById('bankroll').innerText = bankroll;        
    }
    else{
        bankroll = 1;
        document.getElementById('bankroll').innerText = 1;
    }
}

async function updateUserBankRoll(bankroll){
    let response = await fetch('/blackjack/userBankRoll/update', {
        method: 'POST',
        body: JSON.stringify({ "username" : username,
                                "bankroll" : bankroll }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      });

      if(response.status === 500){
        console.log("Error occurred in updating user bankroll");
      }
}

function getUsername() {
    username = document.cookie.split('=')[1];
}
