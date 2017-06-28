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


    var renderDecks = function() {
        $('.deckList').empty()
        var source = $('#deck-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < decks.length; i++) {
            var newHTML = template(decks[i]);
            $('.deckList').append(newHTML);
            renderCards(i)
        }
    }

    var renderCards = function(deckIndex) {
        var deck = $(".deck")[deckIndex];
        var $cardlist = $(deck).closest('.sideColumn').siblings('.playArea').find('.cardList')
        $cardlist.empty();
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < decks[deckIndex].cards.length; i++) {
            var newHTML = template(decks[deckIndex].cards[i]);
            $cardlist.append(newHTML);
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
                console.log(data)
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
        deleteCard: deleteCard

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
var thisDeckId;
var thisDeckIndex;
$('.deckList').on("click", ".addCardBtn", function() {
    thisDeckId = $(this).closest('.deck').data().id
    thisDeckIndex = (this).closest('.deck').index
    $('.addCardInputs').show()

})

// add card

$(".saveCard").click(function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
    var deckId = thisDeckId;
    var deckIndex = thisDeckIndex;
    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard, deckId, deckIndex);
   

})

//delete card
$('.deckList').on("click", ".deleteCard", function() {
    var deckId = $(this).closest('.deck').data().id;
    var deckIndex = $(this).closest('.deck').index();
    var cardIndex = $(this).closest('.card').index()
    var cardId = $(this).closest('.card').data().id;
    app.deleteCard(deckId, cardId)
})

//delete deck

$('.deckList').on("click", ".deleteDeck", function() {
    var deckId = $(this).closest('.deck').data().id;
    var deckIndex = $(this).closest('.deck').index();
    app.deleteDeck(deckId);

})
