/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sqlite3/sqlite3.d.ts" />

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("my.sqlite");
db.serialize(function () {
    db.each("select rowid as id, info from lorem", function (err, row) {
        console.log(row.id + ": " + row.info);
    });
});
db.close();
