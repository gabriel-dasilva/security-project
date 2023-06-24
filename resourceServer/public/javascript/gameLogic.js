const cardDeck = [
    '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
    '1D', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
    '1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
    '1S', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'
];

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

// This method generates a random card based on the remaining cards in the deck
// depending on which cards have already been played on the board
let getHitCard = (currentCards) => {
    let tempDeck = [];
    let deckSize = cardDeck.length;

    if(currentCards != null && currentCards.length > 0){
        let currCardsSet = new Set(currentCards);

        tempDeck = cardDeck.filter((card) => {
            return !currCardsSet.has(card);
        })

        deckSize = deckSize - currentCards.length;
    }

    if(tempDeck == null || tempDeck.length == 0){
        tempDeck = cardDeck;
    }

    let cardNumber = Math.floor(Math.random() * deckSize);
    return tempDeck[cardNumber];
}

// check if player or dealer is bust or not and returns their score
let checkBust = (cards) => {
    const cardVals = JSON.parse(cardValues);
    let cardSum = 0;
    let numberOfAs = 0;
    let isBust = false;

    if(cards != null){
        for(let i=0;i<cards.length;i++){
            let c = cards[i].charAt(0);
            if(c != 'A'){
                cardSum += cardVals[c];
            }
            else if(c == 'A'){
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

    if(cardSum <= 21){
        isBust = false;
    }
    else{
        isBust = true;
    }

    return [isBust, cardSum];
}