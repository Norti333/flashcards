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
var Deck = require("./models/deckModel")
var Card = require("./models/cardModel")

//find deck

app.get('/decks', function(req, res) {
    // var deckId = req.params.deckId
    Deck.find(function(error, data) {
        if (error) throw error;
        res.send(data)
    })
})

//add deck

app.post('/decks', function(req, res) {
    Deck.create(req.body, function(error, data) {
        if (error) throw error;
        res.send(data)
    })
})

//add card

app.post('/decks/:deckId/cards', function(req, res) {
      var deckId = req.params.deckId
    Deck.findByIdAndUpdate(deckId, {$push: {"cards": req.body}},function(error, data) {
        if (error) throw error;
        res.send(data)
    })
});

//update deck

app.put('/decks/:deckId', function(req, res) {
    var deckId = req.params.deckId
    Deck.findByIdAndUpdate(req.body, { new: true }, function(error, data) {
        if (error) throw error;
        res.send(data)
    })
});






app.listen(3000, function() {
    console.log('Server up and running on port 3000 ;-)');
});
