var digitalFlashApp = function () {
    var decks = []

    var errorHandler = function (err, status) {
        console.error(status);
    }

    $.ajax({
        url: '/decks',
        type: 'get',
        error: errorHandler,
        success: function (data) {
            decks = data
            renderDecks()
        }
    })

    var renderDecks = function () {
        var source = $('#render-deck').html();
        var template = Handlebars.compile(source);
        var newHTML = template(decks);
        $('.deckSelector').append(newHTML);
    }

    var addDeck = function (deckName) {
        $.ajax({
            url: "/decks",
            type: "post",
            data: {
                name: deckName,
                cards: [],
            },
            error: errorHandler,
            success: function (data) {
                // data = deck id 
                // deck id will go to the add card page.
                //the id will be used to update the deck upon card creation
            }
        });
    }
    var addCard = function (front, back, deckId) {
        $.ajax({
            url: '/cards',
            type: "post",
            data: {
                front: front,
                back: back,
            },
            error: errorHandler,
            success: function (data) {
                // data = card _id
                $.ajax({
                    // push card to id to deck.cards array
                    url: '/decks',
                    type: 'put',
                    data: {
                        card_id: data,
                        deck_id: deckId,
                    },
                    error: errorHandler,
                    success: function (data) {
                        // card saved
                    },
                })

            }
        })
    }


    return {
        addDeck: addDeck,
        addCard: addCard,
    }
}

var app = digitalFlashApp




