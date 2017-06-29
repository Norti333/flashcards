var digitalFlashApp = function() {
    var cards = []

    // var errorHandler = function(err, status) {
    //     console.error(status);
    // }
    var getCards = function() {
        $.ajax({
            url: '/cards',
            type: 'get',
            error: function(err, status) {
                console.error(status)
            },
            success: function(data) {
                cards = data;
                renderCards();
            }
        })
    }

    // var getDeckofCards = function() {
    //     $.ajax({
    //         url: '/decks',
    //         type: 'get',
    //         error: function(err, status) {
    //             console.error(status)
    //         },
    //         success: function(data) {
    //             decks = data;
    //         }
    //     })
    // }


    var renderCards = function() {
        $('.cardList').empty()
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < cards.length; i++) {
            var newHTML = template(cards[i]);
            $('.cardList').append(newHTML);
            // renderCards(i)
        }
    }

    // var renderCards = function(deckIndex) {
    //     // $('.cardlist').empty;
    //     var source = $('#card-template').html();
    //     var template = Handlebars.compile(source);
    //     for (var i = 0; i < decks[deckIndex].cards.length; i++) {
    //         var newHTML = template(decks[deckIndex].cards[i]);
    //         $('.cardList').append(newHTML);
    //     }
    // }



    var addCard = function(newCard) {
            $.ajax({
                url: "/cards",
                type: "post",
                data: newCard,
                error: function(err, status) {
                    console.error(status);
                },
                success: function(data) {
                    cards.push(data);
                    renderCards();

                }
            });
        }
        // var addCard = function(newCard, deckId, deckIndex) {
        //     $.ajax({
        //         url: '/decks/' + deckId + '/cards',
        //         type: "post",
        //         data: newCard,
        //         error: function(err, status) {
        //             console.error(status)
        //         },
        //         success: function(data) {
        //             decks[deckIndex] = data;
        //             renderCards(deckIndex);
        //         }

    //     })

    // }

    var deleteCard = function(cardId) {
        $.ajax({
            type: "DELETE",
            url: '/cards/' + cardId,
            success: function(data) {
                getCards()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

    var findCardById = function(cardId) {
            for (var i = 0; i < cards.length; i++) {
                if (cards[i]._id == cardId) {
                    return cards[i];
                }
            }
        }
        // var deleteCard = function(deckId, cardId) {
        //     console.log(deckId)
        //     $.ajax({
        //         type: "DELETE",
        //         url: '/decks/' + deckId + '/cards/' + cardId,
        //         success: function(data) {
        //             console.log(data)
        //             getDecks()
        //         },
        //         error: function(jqXHR, textStatus, errorThrown) {
        //             console.log(textStatus);
        //         }
        //     });
        // };


    return {
        // addDeck: addDeck,
        addCard: addCard,
        getCards: getCards,
        // deleteDeck: deleteDeck,
        deleteCard: deleteCard,
        renderCards: renderCards,
        findCardById: findCardById

    }
}

var app = digitalFlashApp();
app.getCards();

// //add deck
// $('#addDeckSaveBtn').click(function() {
//     var deckName = $('#nameOfAddedDeck').val();
//     if (deckName == "") {
//         alert("Please give your deck a name.")
//     } else {
//         app.addDeck(deckName);
//     }
// })


//make 'add card' available
// var deckId;
// var deckIndex;
// $('.deckList').on("click", ".addCardBtn", function() {
//     deckId=$(this).closest('.deck').data().id
//     deckIndex=$(this).closest('.deck').index();
//     console.log(deckId)
//     console.log(deckIndex)
//     $('.addCardInputs').show()

// })

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
    console.log(newCard)
var cardId = app.findCardById(cardId);
    console.log(cardId)

    app.addCard(newCard);


})

//delete card
$('.playArea').on("click", ".deleteCard", function() {
    var cardId = app.findCardById(cardId);
    console.log(cardId)
    app.deleteCard(cardId)
})

//delete deck

// $('.deckList').on("click", ".deleteDeck", function() {

//     app.deleteDeck(deckId);

// })

//show deck of cards
// $('.deckList').on("click", ".deck", function() {
//     // app.renderCards(deckIndex);
// })

$('.cardList').on("click", ".tryButton", function() {
    var tryValue = $('.tryText').val();
    var cardId = $(this).closest(".card").data().id
    var card = app.findCardById(cardId)
    var backText=card.back;
        if (tryValue == backText) {
            $(this).siblings(".response").html("Well done!")
        } else { 
            $(this).siblings(".response").html("Try again")
        }
})
