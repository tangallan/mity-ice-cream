var mongodb = require('mongodb');
var _ = require('lodash');

var mityController = function (MONGO_DB_URL, MITYS_FAVORITE_ICE_CREAM) {

    var getRandomIceCream = function () {

    }

    var populateFavoriteIceCream = function(req, res) {
        console.log('Populating Mity\'s favorite ice creams.');

        mongodb.connect(MONGO_DB_URL, function(dbErr, db) {
            if(dbErr) {
                console.log('ERROR connecting the MONGO DB');
                res.status(500).send(dbErr);
            }
            else {
                var collection = db.collection('mityFavoriteIceCream');
                collection.find().toArray(function(collectionErr, results) {
                    if(collectionErr) {
                        console.log('ERROR getting mity fav ice creams');
                        res.status(500).send(collectionErr);
                    }
                    else {
                        results.forEach(function (element, index, arr) {
                            _.remove(MITYS_FAVORITE_ICE_CREAM, element.name);
                        });

                        var iceCreamsToAdd = [];
                        MITYS_FAVORITE_ICE_CREAM.forEach(function(element, index, arr) {
                            var newIceCream = {
                                name : element
                            }
                            iceCreamsToAdd.push(newIceCream);
                        });

                        collection.insertMany(iceCreamsToAdd, function(insertManyErr, insertResults) {
                            if(err) {
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
    }

    return {
        getRandomIceCream : getRandomIceCream,
        populateFavoriteIceCream : populateFavoriteIceCream
    }
};

module.exports = mityController;
