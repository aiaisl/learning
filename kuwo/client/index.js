/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog = remote.require("dialog");
var kuwoMing = require("./kuwo");
var kuwo = angular.module("kuwo", []);
var LoaderController = (function () {
    function LoaderController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.scope = $scope;
        this.init();
        this.scope.sayhi = function (key) {
            _this.scope.songs = _this.list[key].list;
        };
        this.scope.playSong = function (key) {
            console.log("\u5F53\u524D\u64AD\u653E\u7684\u97F3\u4E50\u662F" + _this.scope.songs[key].title);
        };
        this.scope.addLocalMusic = function () {
            addLocalMusicMenu.popup(remote.getCurrentWindow());
        };
    }
    LoaderController.prototype.loaderAnimal = function () {
        var _this = this;
        this.scope.loader = false;
        setTimeout(function () {
            _this.$scope.$apply(function () {
                _this.scope.loader = false;
            });
        }, 2000);
    };
    LoaderController.prototype.init = function () {
        var _this = this;
        var List = new kuwoMing.List();
        List.local()
            .then(function (data) {
            _this.list = data;
            _this.scope.$apply(function () {
                _this.scope.songList = data;
                _this.scope.songs = data[0].list;
            });
        }, function (err) {
            console.log(err);
        });
    };
    return LoaderController;
})();
var addLocalMusicMenu = new Menu();
addLocalMusicMenu.append(new MenuItem({ label: '自动扫描全盘音乐', click: function () {
        console.log('自动扫描全盘音乐');
    } }));
addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲文件', click: function () {
        console.log('添加本地歌曲文件');
        dialog.showOpenDialog({
            title: "打开",
            filters: [
                { name: '所有音频文件', extensions: ['mp3', 'ogg', 'wma'] },
            ],
            properties: ["multiSelections"]
        }, function (fileName) {
            console.log(fileName);
        });
    } }));
addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲目录', click: function () { console.log('添加本地歌曲目录'); } }));
kuwo.controller("LoaderController", ["$scope", LoaderController]);
