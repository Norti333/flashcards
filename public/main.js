var digitalFlashApp = function () {
    var cards = []

    var getCards = function () {
        $.ajax({
            url: '/cards',
            type: 'get',
            error: function (err, status) {
                console.error(status)
            },
            success: function (data) {
                cards = data;
                renderCards();
            }
        })
    }

    var renderCards = function () {
        $('.cardList').empty()
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < cards.length; i++) {
            var newHTML = template(cards[i]);
            $('.cardList').append(newHTML);
        }
    }

    var addCard = function (newCard) {
        $.ajax({
            url: "/cards",
            type: "post",
            data: newCard,
            error: function (err, status) {
                console.error(status);
            },
            success: function (data) {
                cards.push(data);
                renderCards();

            }
        });
    }


    var deleteCard = function (cardId) {
        $.ajax({
            type: "DELETE",
            url: '/cards/' + cardId,
            success: function (data) {
                getCards()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };


    var findCardById = function (cardId) {
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


$('.show-cards').click(app.getCards)


$(".saveCard").click(function() {

    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();

    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard);

    $(this).siblings('.frontText').val('')
    $(this).siblings('.backText').val('');

})

<<<<<<< HEAD
$('.playArea').on("click", ".deleteCard", function() {
=======
$('.playArea').on("click", ".deleteCard", function () {
>>>>>>> 2cf795923eac65022364efdec401a9433664f371
    var cardId = $(this).closest(".card").data().id
    var card = app.findCardById(cardId)
    app.deleteCard(cardId)
})




<<<<<<< HEAD
$('.playArea').on("click", ".tryButton", function() {
=======
$('.playArea').on("click", ".tryButton", function () {
    debugger
>>>>>>> 2cf795923eac65022364efdec401a9433664f371
    var tryValue = $(this).siblings('.tryText').val();
    console.log(tryValue)
    var cardId = $(this).closest(".card").data().id
    console.log(cardId)
    var card = app.findCardById(cardId)
    var backText = card.back;
    if (tryValue == backText) {
        var response = "Well done!"
        $(this).siblings(".response").html(response)
    } else {
        var response = "Try again"
        $(this).siblings(".response").html(response)
    }
})