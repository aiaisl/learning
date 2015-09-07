/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var Player = require("./player");
var fs = require("fs");
var path = require("path");
var remote = require("remote");
var bw = remote.require('browser-window');
var win = new bw({ width: 800, height: 600 });
var client_id = "000000004C15C1F3";
var scope = "onedrive.readwrite";
var redirect_uri = "https://login.live.com/oauth20_desktop.srf";
win.loadUrl("https://login.live.com/oauth20_authorize.srf?client_id=" + client_id + "&scope=" + scope + "&response_type=token&redirect_uri=" + redirect_uri);
console.log("https://login.live.com/oauth20_authorize.srf?client_id=" + client_id + "&scope=" + scope + "&response_type=token&redirect_uri=" + redirect_uri);
win.on('age-title-updated', function () {
    console.log('1 ' + win.webContents.getUrl());
});
setInterval(function () {
    console.log('2 ' + win.webContents.getUrl());
}, 1000);
var MainController = (function () {
    function MainController($scope, ngDialog) {
        var _this = this;
        this.scope = $scope;
        this.scope.login = function () {
            ngDialog.open({
                template: 'template/tpl/loginDialog.tpl',
                controller: ["$scope", "s", LoginController]
            });
        };
        var musicPath = path.join("C:\\Users\\lsw\\OneDrive\\音乐");
        this.scope = $scope;
        var __this = this;
        fs.readdir(musicPath, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var voices = [];
                data.forEach(function (name, index) {
                    voices.push({
                        src: path.join(musicPath, name),
                        name: name,
                        index: index
                    });
                });
                _this.voices = voices;
                _this.control = new Player.Control();
                _this.playlist = new Player.Playlist(_this.control, voices);
                _this.initData();
                $scope.$watch(function () {
                    return _this.control.paused;
                }, function (paused) {
                    _this.scope.paused = paused;
                });
                _this.registerEvent();
                window.onbeforeunload = function (e) {
                    fs.writeFile(path.join(__dirname, "pro"), _this.control.currentTime, function () {
                        console.log(1);
                    });
                    fs.writeFile(path.join(__dirname, "123"), _this.playlist.currentVoiceIndex, function () {
                        console.log(1);
                    });
                    console.log('I do not want to be closed');
                    // Unlike usual browsers, in which a string should be returned and the user is
                    // prompted to confirm the page unload, Electron gives developers more options.
                    // Returning empty string or false would prevent the unloading now.
                    // You can also use the dialog API to let the user confirm closing the application.
                };
            }
        });
    }
    MainController.prototype.initData = function () {
        var _this = this;
        var scope = this.scope;
        scope.$apply(function () {
            scope.voices = _this.voices;
        });
    };
    MainController.prototype.registerEvent = function () {
        var _this = this;
        var scope = this.scope;
        scope.next = function () {
            _this.playlist.next();
        };
        scope.prev = function () {
            _this.playlist.prev();
        };
        scope.playOrPause = function () {
        };
        scope.pause = function () {
            _this.control.pause();
        };
        scope.play = function () {
            _this.control.play();
        };
        scope.startPlay = function (index) {
            _this.playlist.startPlay(index);
        };
        var a = document.getElementById("redlin");
        var al = document.getElementById("lin").clientWidth;
        scope.jump = function () {
            var ev = event;
            _this.control.progress = ev.offsetX / al;
            a.style.width = _this.control.progress + "%";
        };
        var s = function () {
            setTimeout(function () {
                a.style.width = _this.control.progress + "%";
                s();
            }, 1000);
        };
        s();
    };
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
            .when('/player', {
            templateUrl: 'template/player.html'
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
