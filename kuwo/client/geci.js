/// <reference path="../typings/node/node.d.ts" />
var fs = require("fs");
var path = require("path");
var file = path.join(__dirname, "data/geci/Westlife-When You're Looking Like That.lrc");
var geci = fs.readFileSync(file, "utf8");
var result = geci.split(/\[/);
console.log(result);
