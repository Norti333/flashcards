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
                decks = data;
                renderDecks();
            }
        })
    }

    var getDeckofCards = function() {
        $.ajax({
            url: '/decks',
            type: 'get',
            error: function(err, status) {
                console.error(status)
            },
            success: function(data) {
                decks = data;
            }
        })
    }


    var renderDecks = function() {
        $('.deckList').empty()
        var source = $('#deck-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < decks.length; i++) {
            var newHTML = template(decks[i]);
            $('.deckList').append(newHTML);
            // renderCards(i)
        }
    }

    var renderCards = function(deckIndex) {
        // $('.cardlist').empty;
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < decks[deckIndex].cards.length; i++) {
            var newHTML = template(decks[deckIndex].cards[i]);
            $('.cardList').append(newHTML);
        }
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
                renderDecks();

            }
        });
    }
    var addCard = function(newCard, deckId, deckIndex) {
        $.ajax({
            url: '/decks/' + deckId + '/cards',
            type: "post",
            data: newCard,
            error: function(err, status) {
                console.error(status)
            },
            success: function(data) {
                decks[deckIndex] = data;
                renderCards(deckIndex);
            }

        })

    }

    var deleteDeck = function(deckId) {
        $.ajax({
            type: "DELETE",
            url: '/decks/' + deckId,
            success: function(data) {
                getDecks()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

    var deleteCard = function(deckId, cardId) {
        console.log(deckId)
        $.ajax({
            type: "DELETE",
            url: '/decks/' + deckId + '/cards/' + cardId,
            success: function(data) {
                console.log(data)
                getDecks()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };


    return {
        addDeck: addDeck,
        addCard: addCard,
        getDecks: getDecks,
        deleteDeck: deleteDeck,
        deleteCard: deleteCard,
        renderCards: renderCards

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


//make 'add card' available
var deckId;
var deckIndex;
$('.deckList').on("click", ".addCardBtn", function() {
    deckId=$(this).closest('.deck').data().id
    deckIndex=$(this).closest('.deck').index();
    console.log(deckId)
    console.log(deckIndex)
    $('.addCardInputs').show()

})

// add card

$(".saveCard").click(function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
    // var deckId = $(this).closest('.deck').data().id;
    // var deckIndex = $(this).closest('.deck').index();

    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard, deckId, deckIndex);
   

})

//delete card
$('.playArea').on("click", ".deleteCard", function() {
    var cardIndex = $(this).closest('.card').index()
    var cardId = $(this).closest('.card').data().id;
    console.log(deckId)
    console.log(cardId)
    // app.deleteCard(deckId, cardId)
})

//delete deck

$('.deckList').on("click", ".deleteDeck", function() {
    
    app.deleteDeck(deckId);

})

//show deck of cards
$('.deckList').on("click", ".deck", function() {
    // app.renderCards(deckIndex);
})
