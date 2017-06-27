$('.addCardButton').click(function() {
    console.log("here")
    var front = $(this).siblings('.frontText').val();
    var back = $(this).siblings('.backText').val();
    console.log(front)
    console.log(back)
    // var deckId = $(this).closest('deck-containor').data().id;
    app.addCard(front, back);
})