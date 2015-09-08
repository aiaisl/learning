/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/q/q.d.ts" />

import fs = require("fs");
import q = require("q");
import path = require("path");

export class List{
	url:string = path.join(__dirname, "data/song-list.json");
	local():q.Promise<{}>{
		var defer = q.defer();
		fs.readFile(this.url, "utf8", function(err, data){
			if(err){
				defer.reject(err);
			}
			var data = JSON.parse(data);
			defer.resolve(data);
		})
		return defer.promise;
	}
}

export class Geci{
	url: string = path.join(__dirname, "data/geci");
}
