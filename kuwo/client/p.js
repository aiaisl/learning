/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var Player = require("./player");
var fs = require("fs");
var path = require("path");
var MusicController = (function () {
    function MusicController($scope) {
        var _this = this;
        var musicPath = path.join("E:\\KwDownload\\song");
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
                _this.registerEvent();
            }
        });
    }
    MusicController.prototype.initData = function () {
        var _this = this;
        var scope = this.scope;
        scope.$apply(function () {
            scope.voices = _this.voices;
        });
    };
    MusicController.prototype.registerEvent = function () {
        var _this = this;
        var scop = this.scope;
        scop.next = function () {
            _this.playlist.next();
        };
        scop.prev = function () {
            _this.playlist.prev();
        };
        scop.pause = function () {
            _this.control.pause();
        };
        scop.play = function () {
            _this.control.play();
        };
    };
    return MusicController;
})();
var kuwo = angular.module("kuwo", []);
kuwo.controller("MusicController", ["$scope", MusicController]);
