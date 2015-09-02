/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/express/express.d.ts" />
var express = require('express');
var app = express();
app.set('view engine', 'html');
app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});
app.post('/', function (req, res) {
    res.send("POSTｒｅｑｕｅｓｔ　ｔｏ　ｔｈｅ　ｈｏｍｅｐａｇｅ");
});
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});
app.use(express.static('public'));
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://" + host + ":" + port);
});
