var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);

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

app.use(express.static(rootPath + '/app'));

app.use('/api/mity', mityRouter);

app.get('*', function(req, res) {
    res.sendFile(rootPath + '/app/index.html');
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
