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
        var $mylist  = $(deck).find('.cardList')
        $mylist.empty();
        var source = $('#card-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < decks[deckIndex].cards.length; i++) {
            var newHTML = template(decks[deckIndex].cards[i]);
            $mylist.append(newHTML);
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
                decks[deckIndex]=data;
                renderCards(deckIndex);
                }
              
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

$('.deckList').on("click", ".addCardSaveBtn", function() {
    $(this).siblings('.addCardInputs').show()

})

// add card

$('.deckList').on("click", ".saveCard", function() {
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
    var deckId = $(this).closest('.deck').data().id;
    var deckIndex = $(this).closest('.deck').index();
    var newCard = {
        front: front,
        back: back
    }
    app.addCard(newCard, deckId, deckIndex);

})
