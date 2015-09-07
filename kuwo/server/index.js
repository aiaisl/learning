/// <reference path="../typings/express/express" />
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.send('Hello World');
});
function check(u, p) {
    var username = "aiaisl@outlook.com";
    var password = "password";
    if (u == username && p == password) {
        return true;
    }
}
app.post('/login', function (req, res) {
    if (typeof req.body != "undefined" && check(req.body.username, req.body.password)) {
        res.send("ok");
    }
    else {
        res.send("fail");
    }
});
app.listen(3000);
