var mongodb = require('mongodb');
var _ = require('lodash');

var mityController = function (MONGO_DB_URL, MITYS_FAVORITE_ICE_CREAM) {

    var getRandomIceCream = function(req, res) {
        mongodb.connect(MONGO_DB_URL, function(dbErr, db) {
            if(dbErr) {
                console.log('ERROR connecting to the MONGO DB');
                res.status(500).send(dbErr);
            }
            else {
                console.log('connected to mongodb successful');
                var collection = db.collection('mityFavoriteIceCream');

                collection.count(function(err, count) {
                    if(err) {
                        console.log('ERROR counting favorite ice creams');
                        res.status(500).send(err);
                    }
                    else {
                        console.log('total count of favorite ice creams: ' + count);

                        var randInd = Math.floor(Math.random() * count);
                        collection.findOne({}, { skip : randInd }, function(findOneError, iceCream) {
                            res.send(iceCream);

                            db.close();
                        });
                    }
                });
            }
        });
    };

    var populateFavoriteIceCream = function(req, res) {
        console.log('Populating Mity\'s favorite ice creams.');

        mongodb.connect(MONGO_DB_URL, function(dbErr, db) {
            if(dbErr) {
                console.log('ERROR connecting the MONGO DB');
                res.status(500).send(dbErr);
            }
            else {
                console.log('connected to mongodb successful');
                var collection = db.collection('mityFavoriteIceCream');
                collection.find().toArray(function(collectionErr, results) {
                    if(collectionErr) {
                        console.log('ERROR getting mity fav ice creams');
                        res.status(500).send(collectionErr);
                    }
                    else {
                        collection.remove();

                        var iceCreamsToAdd = [];
                        MITYS_FAVORITE_ICE_CREAM.forEach(function(element, index, arr) {
                            var newIceCream = {
                                name : element
                            };
                            iceCreamsToAdd.push(newIceCream);
                        });

                        console.log(iceCreamsToAdd.length);

                        collection.insertMany(iceCreamsToAdd, function(insertManyErr, insertResults) {
                            if(insertManyErr) {
                                console.log('ERROR inserting ice creams');
                                res.status(500).send(insertManyErr);
                            }
                            else {
                                res.send(insertResults);
                            }
                            db.close();
                        });

                    }
                });

            }
        });
    };

    return {
        getRandomIceCream : getRandomIceCream,
        populateFavoriteIceCream : populateFavoriteIceCream
    }
};

module.exports = mityController;
