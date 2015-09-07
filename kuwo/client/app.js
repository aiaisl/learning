/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var MainController = (function () {
    function MainController($scope, ngDialog) {
        this.scope = $scope;
        this.scope.login = function () {
            ngDialog.open({
                template: 'template/tpl/loginDialog.tpl',
                controller: ["$scope", "s", LoginController]
            });
        };
    }
    return MainController;
})();
var LoginController = (function () {
    function LoginController($scope, server) {
        var _this = this;
        this.scope = $scope;
        this.scope.user = {};
        this.scope.submit = function () {
            server.login(_this.scope.user.name, _this.scope.user.password).then(function (response) {
                console.log(response);
            });
            console.log(_this.scope.user);
            return false;
        };
    }
    return LoginController;
})();
var kuwo = angular.module('kuwo', ['ngRoute', 'ngDialog']);
kuwo.controller("MainController", ["$scope", "ngDialog", MainController]);
var MainConfig = (function () {
    function MainConfig($routeProvider) {
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
            .when('/', {
            templateUrl: 'template/songs.html'
        })
            .otherwise({ redirectTo: '/' });
    }
    return MainConfig;
})();
var S = (function () {
    function S($http, $q) {
        return {
            login: function (username, password) {
                return $http.post("http://localhost:3000/login", {
                    username: username,
                    password: password
                });
            }
        };
    }
    return S;
})();
kuwo.factory("s", ["$http", "$q", S]);
kuwo.config(function ($routeProvider) { new MainConfig($routeProvider); });
