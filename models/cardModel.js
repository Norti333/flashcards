var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var cardSchema = new Schema({
front: {type: String, required: true},
back: {type: String, required: true},
hint: String,
level: Number
// deck: {type:Schema.Types.ObjectId,ref:'deck'}
});

var Card = mongoose.model('card', cardSchema);

var card1= new Card({
front: "3 x 3",
back: "9",
hint: "count 3 3 times!",
level:1
});

var card2= new Card({
front: "4 x 4",
back: "16",
hint: "count 4 4 times!",
level:2
});

var card3= new Card({
front: "5 x 5",
back: "25",
hint: "count 5 5 times!",
level:2
});

var card4= new Card({
front: "6 x 6",
back: "36",
hint: "count 6 6 times!",
level:3
});

var card5= new Card({
front: "2 x 2",
back: "4",
hint: "count 2 2 times!",
level:2

});


// card1.save()
// card2.save()
// card3.save()
// card4.save()
// card5.save()
module.exports = Card;
