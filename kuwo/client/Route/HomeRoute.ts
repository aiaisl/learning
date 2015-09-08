/// <reference path="../_all.ts" />

module kuwo {
	export class HomeRoute {
		constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
				.when('/live', {
					templateUrl: 'template/live.html'
				})
				.when('/lyric', {
					templateUrl: 'template/lyric.html'
				})
				.when('/songs', {
					templateUrl: 'template/songs.html'
				})
				.when('/download', {
					templateUrl: 'template/download.html'
				})
				.when('/player', {
					templateUrl: 'template/player.html'
				})
				.when('/', {
					templateUrl: 'template/songs.html'
				})
				.otherwise({ redirectTo: '/' });
		}
	}

}