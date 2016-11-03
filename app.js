var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

var MITYS_FAVORITE_ICE_CREAM = [
    'Cookies n cream',
    'Black sesame',
    'Taro',
    'Peach',
    'Green tea',
    'Cookie butter'
];
var MONGO_DB_URL = 'mongodb://localhost/mityIceCreamApp';

var mityRouter = require('./src/routes/mityRoutes')(MONGO_DB_URL, MITYS_FAVORITE_ICE_CREAM);

app.use('/api/mity', mityRouter);

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(port, function(err) {
    if(err) {
        console.log('ERROR starting up app');
        console.log(err);
    }
    else {
        console.log('STARTED up app successfully at port ' + port);
    }
});
