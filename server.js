var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/digitalflashDB', function () {
  console.log("DB connection established!!!");
})

var Card = require("./models/cardModel")
var Deck = require("./models/deckModel")



var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.listen(8000, function () {
  console.log('Server up and running on port 3000 ;-)');
});