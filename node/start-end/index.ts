/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/q/q.d.ts" />

import fs = require("fs");
import q = require("q");

var fsReadFile_deferd = function(file:string, encoding?: string):q.Promise<{}> {
	var deferred = q.defer();
	fs.readFile(file, encoding, function(error, result){
		if(error) {
			deferred.reject(error.toString());
		}
		deferred.resolve(result);
	});
	return deferred.promise;
}

fsReadFile_deferd('./index.js').then(function(result){
	console.log("invoke in deferd");
	console.log(result.toString());
}, function(error){
	console.log("invoke in deferd");
	console.log(error.toString());
});