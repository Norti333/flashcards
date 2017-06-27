var digitalFlashApp = function() {
    var decks = []

    // var errorHandler = function(err, status) {
    //     console.error(status);
    // }
    var getDecks = function() {
        $.ajax({
            url: '/decks',
            type: 'get',
            error: function(err, status) {
                console.error(status)
            },
            success: function(data) {
                decks = data
                for (var i = 0; i < decks.length; i++) {
                    var deck_name = decks[i].name
                }
                renderDecks(deck_name);
            }
        })
    }


    var renderDecks = function() {
        $('.deckList').empty()
        var source = $('#deck-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(decks);
        $('.deckList').append(newHTML);
    }

    var addDeck = function(deckName) {
        $.ajax({
            url: "/decks",
            type: "post",
            data: {
                name: deckName,
                cards: [],
            },
            error: function(err, status) {
                console.error(status);
            },
            success: function(data) {
                decks.push(data);
                for (var i = 0; i < decks.length; i++) {
                    var deck_name = decks[i].name;
                }
                renderDecks(deck_name);

                // data = deck id 
                // deck id will go to the add card page.
                //the id will be used to update the deck upon card creation
            }
        });
    }
    var addCard = function(front, back, deckId) {
        $.ajax({
            url: '/decks/' + deckId + '/cards',
            type: "post",
            data: {
                front: front,
                back: back
                // deckId: deckId
            },
            error: function(err, status) {
                console.error(status)
            },
            success: function(data) {
                    console.log(data)
                }
                // var cardId = data._id
                // $.ajax({
                //     // push card with id to deck.cards array
                //     url: '/decks/' + deckId,
                //     type: 'put',
                //     data: {
                //         card: cardId
                //             // deck_id: deckId,
                //     },
                //     error: function(err, status) {
                //         console.error(status)
                //     },
                //     success: function(data) {
                //         // card saved
                //     },
        })

    }




    return {
        addDeck: addDeck,
        addCard: addCard,
        getDecks: getDecks
    }
}

var app = digitalFlashApp();
app.getDecks();

//add deck
$('#addDeckSaveBtn').click(function() {
    var deckName = $('#nameOfAddedDeck').val();
    if (deckName == "") {
        alert("Please give your deck a name.")
    } else {
        app.addDeck(deckName);
    }
})

//get existing decks

// $('.showDeckButton').click(function() {
//     app.getDecks();
// })

//make 'add card' available

$('.deckList').on("click", ".addCard", function() {
    $(this).siblings('.addCardInputs').show()

})

// add card

$('.deckList').on("click", ".saveCardButton", function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
    var deckId = $(this).closest('.deck').data().id;
    app.addCard(front, back, deckId);

})

