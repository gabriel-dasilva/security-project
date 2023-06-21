
let hidden;
let actual;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21

let bankroll = 1000;
let bet = 0;//Set bet to an arbitrary value,once
let dealerSum = 10;//set dealSum to an arbitrary value just for testing
let yourSum = 11;//set yourSum to an arbitrary value just for testing

let overlay = null;
let gameInProgress = false;

const chipSound = new Audio('../sound/sound.ogg');
window.onload = function () {
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
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
    hidden = deck.pop();
    actual = hidden;

    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.src = "../images/cards/BACK.png";
    document.getElementById("dealer-cards").append(hiddenCardImg);

    let dealerCards = document.getElementById("dealer-cards");
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../images/cards/" + card + ".png";
        dealerSum += getValue(card);
        cardImg.style.transform = `translateX(${-(dealerCards.childElementCount * 70)}px)`;
        dealerCards.append(cardImg);
    }

    let yourCards = document.getElementById("your-cards");
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../images/cards/" + card + ".png";
        yourSum += getValue(card);
        cardImg.style.transform = `translateX(${-(yourCards.childElementCount * 70)}px)`;
        yourCards.append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("new-game").addEventListener("click", newGame);
    document.getElementById("placebet").addEventListener("click", placebet);
    document.getElementById("deal").addEventListener("click", deal);
    updateBetAndBankroll();
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
    bankroll = 1000;

    document.getElementById("new-game").classList.remove("animate");
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
    document.getElementById("placebet").disabled = false;
    document.getElementById("dealer-cards").innerHTML = '';
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
    if (!canHit) {
        return;
    }
    if (deck.length === 0) {
        buildDeck();
        shuffleDeck();
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "../images/cards/" + card + ".png";

    let yourCards = document.getElementById("your-cards");
    if (yourCards.childElementCount !== 0) { // Check if it's not the first card
        cardImg.style.transform = `translateX(${-(yourCards.childElementCount * 70)}px)`;
    }
    yourCards.append(cardImg);

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
    bet = 100;

    if (bet > 0) {

        document.getElementById("placebet").style.display = "none";
        document.getElementById("placebet").disabled = true;
        document.getElementById("deal").disabled = false;

    }
}

function deal() {
    document.getElementById("deal").disabled = true;
    document.getElementById("deal").style.display = "none";
    document.getElementById("hit").disabled = false;
    document.getElementById("stay").disabled = false;
    document.getElementById("deal").style.display = "none";

    document.getElementById("dealer-section").style.display = "block";
    document.getElementById("player-section").style.display = "block";
    document.getElementById("action-section").style.display = "block";

}

function hideOverlay() {
    overlay.style.pointerEvents = "none"; // Disable pointer events on the overlay
    overlay.style.display = "none";
    document.getElementById("dealer-cards").style.display = "flex";
    document.getElementById("your-cards").style.display = "flex";
}

function stay() {
    //For testing purposes.Sensitive logic  needs to be replaced by the fetch call.

    canHit = false;
    gameInProgress = false;

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    showOverlay();
    setTimeout(hideOverlay, 3000);
    document.getElementById("results").innerText = message;
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
    resultsElement.style.opacity = "0";


    document.getElementById("new-game").classList.remove("animate");
    document.getElementById("hit").disabled = false;
    document.getElementById("stay").disabled = false;

    document.getElementById("dealer-cards").innerHTML = '';
    document.getElementById("your-cards").innerHTML = '';
    document.getElementById("dealer-sum").innerText = '';
    document.getElementById("your-sum").innerText = '';

    buildDeck();
    shuffleDeck();

    // Display the "New Round! Place your bets." message after 2 seconds
    setTimeout(() => {
        resultsElement.innerText = "New Round! Place your bets.";
        resultsElement.style.opacity = "1";
    }, 2000);
}


function displayNewRoundMessage() {
    let message = "New Round! Place your bets.";
    document.getElementById("results").innerText = message;
}


function displayResults() {
    let message = "Display Message";

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

    return message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
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
