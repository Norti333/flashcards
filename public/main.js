var digitalFlashApp = function() {
    var cards = []

<<<<<<< HEAD

=======
>>>>>>> new-test
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

<<<<<<< HEAD
=======

>>>>>>> new-test
    var renderCards = function() {
        $('.cardList').empty()
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < cards.length; i++) {
            var newHTML = template(cards[i]);
            $('.cardList').append(newHTML);
        }
    }

<<<<<<< HEAD
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
=======
>>>>>>> new-test

            }
        });
    }

<<<<<<< HEAD
=======
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
>>>>>>> new-test

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
<<<<<<< HEAD
    }
=======

>>>>>>> new-test

    return {
        addCard: addCard,
        getCards: getCards,
        deleteCard: deleteCard,
        renderCards: renderCards,
        findCardById: findCardById

    }
}

var app = digitalFlashApp();
app.getCards();

<<<<<<< HEAD

//add card
=======
$('.show-cards').click(app.getCards)
>>>>>>> new-test

$(".saveCard").click(function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
<<<<<<< HEAD

=======
>>>>>>> new-test
    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard);
})

$('.playArea').on("click", ".deleteCard", function() {
    var cardId = $(this).closest(".card").data().id
    var card = app.findCardById(cardId)
    app.deleteCard(cardId)
})




$('.cardList').on("click", ".try-button", function() {
    var tryValue = $(this).siblings('.tryText').val();
    console.log(tryValue)
    var cardId = $(this).closest(".card").data().id
    console.log(cardId)
    var card = app.findCardById(cardId)
    var backText = card.back;
    if (tryValue == backText) {
        $(this).siblings(".response").html("Well done!")
    } else {
        $(this).siblings(".response").html("Try again")
    }
})
