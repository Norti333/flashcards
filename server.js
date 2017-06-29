var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/digitalflashDB', function() {
    console.log("DB connection established!!!");
})


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var Card = require("./models/cardModel")

//find cards

app.get('/cards', function(req, res) {
    Card.find(function(error, data) {
        if (error) throw error;
        res.send(data)

    })
})

//add card

app.post('/cards', function(req, res) {
    Card.create(req.body, function(error, data) {
        if (error) throw error;
        res.send(data)
    })
})

//add card

// app.post('/decks/:deckId/cards', function(req, res) {
//       var deckId = req.params.deckId;
//     Deck.findByIdAndUpdate(deckId, {$push: {"cards": req.body}},{new:true}, function(error, data) {
//         if (error) throw error;
//         console.log(data)
//         res.send(data)
//     })
// });

//update deck

app.put('/cards/:cardId', function(req, res) {
    var cardId = req.params.cardId
    Card.findByIdAndUpdate(req.body, { new: true }, function(error, data) {
        if (error) throw error;
        res.send(data)
    })
});

//delete card

// app.delete('/decks/:deckId/cards/:cardId', function(req, res) {
    
//     var deckId = req.params.deckId
//     var cardId = req.params.cardId
    
//     Deck.findByIdAndUpdate(deckId,{$pull: {"cards": {_id: cardId}}},{new:true}, function (error, data) {
//     if (error) throw error;
//         res.send(data)
//     })
// })

// //delete deck

app.delete('/cards/:cardId', function (req, res) {
  var cardId= req.params.cardId;
  Card.findByIdAndRemove(cardId,function (error, data) {
    if (error) throw error;
      res.send(data);
    })
  })




app.listen(3000, function() {
    console.log('Server up and running on port 3000 ;-)');
});
