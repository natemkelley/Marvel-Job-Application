var mongoose = require('mongoose');

var superheroSchema = new mongoose.Schema({
    url: String,
    caption: String
});

var villanSchema = new mongoose.Schema({
    name: String,
    image: String
});

mongoose.model('Villians', villanSchema);
