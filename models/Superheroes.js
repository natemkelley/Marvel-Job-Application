var mongoose = require('mongoose');

var superheroSchema = new mongoose.Schema({
    url: String,
    caption: String
});

mongoose.model('Superheroes', superheroSchema);
