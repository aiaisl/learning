/// <reference path="../_all.ts" />
var kuwo;
(function (kuwo) {
    var HomeRoute = (function () {
        function HomeRoute($routeProvider) {
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
        return HomeRoute;
    })();
    kuwo.HomeRoute = HomeRoute;
})(kuwo || (kuwo = {}));
