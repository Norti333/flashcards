var digitalFlashPlayApp = function () {
    var deck = ''
    var cards = []
    var counter = 0
    var errorHandler = function (err, status) {
        console.error(status);
    }
    /*
        var getSelectedDeck = function (deckId) {
            $.ajax({
                url: '/decks/' + deckId,
                type: "/get",
                error: errorHandler,
                success: function (data) {
                    //data = the deck that is equal to the id given
                    deck = data

                }
            })
        };
    */
    var getCards = function (deckId) {
        for (var i = 0; i < deck.cards.length; i++) {
            var cardId = deck.cards[i]
            $.ajax({
                url: '/cards/' + cardId,
                type: "/get",
                error: errorHandler,
                success: function (data) {
                    cards.push(data)
                }
            })
        }
        shuffleCards()
    };


    var renderCards = function () {
        $('.playBox').empty();
        var source = $('#').html();
        var template = Handlebars.compile(source);
        var newHTML = template(cards[counter]);
        $('.playBox').append(newHTML);
        return counter = counter + 1;
        // need to add an if when counter == cards.length
        // it will set a play over and reset counter
    }


    var shuffleCards = function () {
        var shuffleArray = [];
        var randCard = Math.floor(Math.random() * cards.length);
        while (cards.length > 0) {
            shuffleArray.push(cards[randCard]);
            cards.splice(randCard, 1);
            randCard = Math.floor(Math.random() * cards.length);
        }
        return cards = shuffleArray
    }

    return {
        getSelectedDeck: getSelectedDeck,
        renderCards: renderCards,
    };
};

var app = digitalFlashPlayApp


//getCards(deckId)
// rendercard()