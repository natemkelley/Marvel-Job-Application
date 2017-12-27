var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//model
var Superhero = mongoose.model('Superheroes');

//marvel api
var api = require('marvel-api');
var marvel = api.createClient({
    publicKey: '9ab75b5e12a45d538344a3c1e5b886f7',
    privateKey: '090e470a10409d9e70f332fd81820ba0eff26f95'
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Marvel Universe'
    });
});

router.delete('/superheroes/:superhero', function (req, res) {
    console.log("in Delete");
    req.character.remove();
    res.sendStatus(200);
});

router.get('/superheroes', function (req, res, next) {
    Superhero.find(function (err, character) {
        if (err) {
            return next(err);
        }
        res.json(character);
    });
});

router.post('/superheroes', function (req, res, next) {
    var superhero = new Superhero(req.body);
    superhero.save(function (err, superhero) {
        if (err) {
            return next(err);
        }
        res.json(superhero);
    });
    console.log(req.body);
});

router.get('/superheroes/:superhero', function (req, res) {
    console.log('super hero')

});

router.param('superhero', function (req, res, next, id) {
    var query = Superhero.findById(id);
    query.exec(function (err, superhero) {
        if (err) {
            return next(err);
        }
        if (!superhero) {
            return next(new Error("can't find superhero"));
        }
        req.character = superhero;
        return next();
    });
});

router.get('/marvel', function (req, res, next) {
    marvel.characters.findByName('spider-man', function (err, results) {
        if (err) {
            return console.error(err);
        }

        console.log(results);
        res.json(results);
    });


});

router.get('/marvelpr', function (req, res, next) {
    marvel.characters.findByName('spider-man')
        .then(function (response) {
            console.log('Found character ID', response.data[0].id);
            res.json(response);

        })
        .fail(console.error)
        .done();


});



module.exports = router;
