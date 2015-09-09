/// <reference path="_all.ts" />
module kuwo {
	export var remote = require("remote");
	export var Menu = remote.require('menu');
	export var MenuItem = remote.require('menu-item');
	export var dialog:GitHubElectron.Dialog = remote.require("dialog");

	var kuwo = angular.module('kuwo', ['ngRoute']);
	kuwo.controller('MainController', MainController);
	kuwo.controller('ListController', ListController);
	kuwo.controller('ControlController', ControlController);
	kuwo.config(($routeProvider: ng.route.IRouteProvider) => {
		new HomeRoute($routeProvider)
	});
	
	kuwo.factory("audio", ()=>{
		var audio: Audio = new Audio();
		return audio;
	})
}