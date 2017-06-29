var digitalFlashPlayApp = function () {
    var cards = []
    var counter = 0
    var errorHandler = function (err, status) {
        console.error(status);
    }

    var playCards = function () {
        $.ajax({
            url: '/cards',
            type: 'get',
            error: function (err, status) {
                console.error(status)
            },
            success: function (data) {
                cards = data;
                shuffleCards()
                renderCardsPlay()
            }
        })
    }


    var renderCardsPlay = function () {
        $('.cardList').empty();
        if (counter < cards.length) {
            var source = $('#render-card').html();
            var template = Handlebars.compile(source);
            var newHTML = template(cards[counter]);
            $('.cardList').append(newHTML);
            return counter = counter + 1;
        } else {
            $('.cardList').append('<h1>Game Over</h1>');
            return counter = 0

        }
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

    var findCardByIdPlay = function (cardId) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i]._id == cardId) {
                return cards[i];
            }
        }
    }

    return {
        renderCardsPlay: renderCardsPlay,
        playCards: playCards,
        findCardByIdPlay: findCardByIdPlay,
    };
};

var app = digitalFlashPlayApp()


$('.play').click(function(){
    app.playCards()
})

$(document).on('click', '.next-button', app.renderCardsPlay)


$(document).on("click", ".play-try", function () {
    var tryValue = $(this).siblings('.tryText').val();
    console.log(tryValue)
    var cardId = $(this).closest(".card").data().id
    console.log(cardId)
    var card = app.findCardByIdPlay(cardId)
    var backText = card.back;
    if (tryValue == backText) {
        $(this).siblings(".response").html("Well done!")
    } else {
        $(this).siblings(".response").html("Try again")
    }
})