var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//model
var Villian = mongoose.model('Villians');

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

router.delete('/villians/:villian', function (req, res) {
    console.log("in Delete");
    req.character.remove();
    res.sendStatus(200);
});

router.get('/villians', function (req, res, next) {
    Villian.find(function (err, character) {
        if (err) {
            return next(err);
        }
        res.json(character);
    });
});

router.post('/villians', function (req, res, next) {
    var villian = new Villian(req.body);
    villian.save(function (err, villian) {
        if (err) {
            return next(err);
        }
        res.json(villian);
    });
    console.log(req.body);
});

router.get('/villians/:villian', function (req, res) {
    console.log('villian ')

});

router.param('villian', function (req, res, next, id) {
    var query = Villian.findById(id);
    query.exec(function (err, villian) {
        if (err) {
            return next(err);
        }
        if (!villian) {
            return next(new Error("can't find villian"));
        }
        req.character = villian;
        return next();
    });
});

router.post('/marvel', function (req, res, next) {
    var character = req.query.c;
    console.log('character= ' + character);

    if (character.length < 2) {
        character = 'spider-man';
    }

    marvel.characters.findByName(character, function (err, results) {
        var data = results.data;
        if (data.length == 1) {
            res.json(results);
        } else {
            var status = {
                status: 0,
                character: character
            }
            res.json(status);
        }
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
