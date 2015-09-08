/// <reference path='../_all.ts' />
var ipc = require('ipc');
var kuwo;
(function (kuwo) {
    var ListController = (function () {
        function ListController($scope, audio) {
            this.$scope = $scope;
            this.audio = audio;
            ipc.on("audio-ended", function (voice) {
                console.log(voice);
            });
            var path = require("path");
            var fs = require("fs");
            this.scope = $scope;
            $scope.vm = this;
            var musicPath = path.join("C:\\Users\\lsw\\OneDrive\\音乐");
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
                    audio.startPlay(voices[0]);
                    $scope.voices = voices;
                }
            });
        }
        return ListController;
    })();
    kuwo.ListController = ListController;
})(kuwo || (kuwo = {}));
/// <reference path='../_all.ts' />
var kuwo;
(function (kuwo) {
    'use strict';
    var MainController = (function () {
        function MainController($scope, audio) {
            this.$scope = $scope;
            this.audio = audio;
            this.scope = $scope;
            this.creteProgressLine(audio);
        }
        MainController.prototype.creteProgressLine = function (audio) {
            var progress = document.getElementById("redlin");
            var lineWidth = document.getElementById("lin").clientWidth;
            this.scope.jump = function () {
                var ev = event;
                audio.progress = ev.offsetX / lineWidth;
                progress.style.width = audio.progress + "%";
            };
            var s = function () {
                setTimeout(function () {
                    progress.style.width = audio.progress + "%";
                    s();
                }, 1000);
            };
            s();
        };
        return MainController;
    })();
    kuwo.MainController = MainController;
})(kuwo || (kuwo = {}));
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
/// <reference path='../_all.ts' />
var audio;
var ipc = require('ipc');
var kuwo;
(function (kuwo) {
    var Audio = (function () {
        function Audio() {
            var _this = this;
            audio = document.createElement("audio");
            audio.onended = function (ev) {
                ipc.emit("audio-ended", _this.voice);
            };
        }
        Audio.prototype.startPlay = function (voice) {
            audio.src = voice.src;
            audio.play();
            this.voice = voice;
        };
        Audio.prototype.play = function () {
            audio.play();
        };
        Audio.prototype.stop = function () {
            audio.pause();
        };
        Audio.prototype.pause = function () {
            audio.pause();
        };
        Object.defineProperty(Audio.prototype, "progress", {
            get: function () {
                return Math.floor(audio.currentTime / audio.duration * 10000) / 100;
            },
            set: function (setTime) {
                audio.currentTime = setTime * audio.duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Audio.prototype, "currentTime", {
            get: function () {
                return audio.currentTime;
            },
            set: function (setTime) {
                audio.currentTime = setTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Audio.prototype, "song", {
            get: function () {
                return audio;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Audio.prototype, "paused", {
            get: function () {
                return audio.paused;
            },
            enumerable: true,
            configurable: true
        });
        return Audio;
    })();
    kuwo.Audio = Audio;
})(kuwo || (kuwo = {}));
/// <reference path="_all.ts" />
var kuwo;
(function (kuwo_1) {
    var kuwo = angular.module('kuwo', ['ngRoute']);
    kuwo.controller('MainController', kuwo_1.MainController);
    kuwo.controller('ListController', kuwo_1.ListController);
    kuwo.config(function ($routeProvider) {
        new kuwo_1.HomeRoute($routeProvider);
    });
    kuwo.factory("audio", function () {
        var audio = new kuwo_1.Audio();
        return audio;
    });
})(kuwo || (kuwo = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/legacy/angular-route-1.2.d.ts" />
/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/libs.d.ts" />
/// <reference path='Controller/ListController.ts' />
/// <reference path='Controller/MainController.ts' />
/// <reference path='Route/HomeRoute.ts' />
/// <reference path='Models/Audio.ts' />
/// <reference path='Application.ts' /> 
//# sourceMappingURL=Application.js.map