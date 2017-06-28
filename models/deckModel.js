var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var cardSchema = new Schema({
front: {type: String, required: true},
back: {type: String, required: true},
hint: String,
level: Number
// deck: {type:Schema.Types.ObjectId,ref:'deck'}
});


var deckSchema = new Schema({
name: {type: String, required: true},
cards:[cardSchema]
});
var Deck = mongoose.model('deck', deckSchema);
var newDeck= new Deck({
name: "newDeck"
})
newDeck.cards.push({front:"FrontText", back: "BackText"})
// newDeck.save(function(err,data){
//     if (err) {
//     console.error(err);
//   } else {
//     console.error(data);
//   }
// })


module.exports = Deck;
