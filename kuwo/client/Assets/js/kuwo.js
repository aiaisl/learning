/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/q/q.d.ts" />
var fs = require("fs");
var q = require("q");
var path = require("path");
var List = (function () {
    function List() {
        this.url = path.join(__dirname, "data/song-list.json");
    }
    List.prototype.local = function () {
        var defer = q.defer();
        fs.readFile(this.url, "utf8", function (err, data) {
            if (err) {
                defer.reject(err);
            }
            var data = JSON.parse(data);
            defer.resolve(data);
        });
        return defer.promise;
    };
    return List;
})();
exports.List = List;
var Geci = (function () {
    function Geci() {
        this.url = path.join(__dirname, "data/geci");
    }
    return Geci;
})();
exports.Geci = Geci;
