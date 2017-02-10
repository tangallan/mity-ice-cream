var express = require('express');


var router = function (MONGO_DB_URL, MITYS_FAVORITE_ICE_CREAM) {
    var mityRouter = express.Router();
    var mityController = require('../controllers/mityController')(MONGO_DB_URL, MITYS_FAVORITE_ICE_CREAM);

    mityRouter.route('/geticecream')
        .get(mityController.getRandomIceCream);

    mityRouter.route('/populateicecrea')
        .post(mityController.populateFavoriteIceCream);

    return mityRouter;
};

module.exports = router;