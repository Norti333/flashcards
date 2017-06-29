var digitalFlashApp = function() {
    var cards = []


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

    var renderCards = function() {
        $('.cardList').empty()
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < cards.length; i++) {
            var newHTML = template(cards[i]);
            $('.cardList').append(newHTML);
        }
    }

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


//add card

$(".saveCard").click(function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();

    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard);
})

//delete card
$('.playArea').on("click", ".deleteCard", function() {
    var cardId = $(this).closest(".card").data().id
    var card = app.findCardById(cardId)
    app.deleteCard(cardId)
})



//try card

$('.cardList').on("click", ".tryButton", function() {
    var tryValue = $(this).siblings('.tryText').val();
    console.log(tryValue)
    var cardId = $(this).closest(".card").data().id
    var card = app.findCardById(cardId)
    var backText = card.back;
    if (tryValue == backText) {
        $(this).siblings(".response").html("Well done!")
    } else {
        $(this).siblings(".response").html("Try again")
    }
})
