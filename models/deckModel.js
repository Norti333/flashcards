var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var deckSchema = new Schema({
name: {type: String, required: true},
cards:[{type:Schema.Types.ObjectId,ref:'card'}]
});
var Deck = mongoose.model('deck', deckSchema);

var deck1= new Deck({
name: "Deck1",
cards: []
});

// deck1.save();
module.exports = Deck;
