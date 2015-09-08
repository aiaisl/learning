/// <reference path="_all.ts" />
module kuwo {
	var kuwo = angular.module('kuwo', ['ngRoute']);
	kuwo.controller('MainController', MainController);
	kuwo.controller('ListController', ListController);
	kuwo.config(($routeProvider: ng.route.IRouteProvider) => {
		new HomeRoute($routeProvider)
	});
	
	kuwo.factory("audio", ()=>{
		var audio: Audio = new Audio();
		return audio;
	})
}