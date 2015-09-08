/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
var Routes = (function () {
    function Routes($routeProvider) {
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
    return Routes;
})();
exports.Routes = Routes;
