/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/libs.d.ts" />
var Player = require("./js/player");
var Routes = require("./js/routes");
var fs = require("fs");
var path = require("path");
var remote = require("remote");
var IScroll = require('./js/lib/iscroll');
var myScroll = new IScroll('.list-song-js-box', {
    scrollbars: true,
    mouseWheel: true,
    interactiveScrollbars: true,
    shrinkScrollbars: 'scale',
    fadeScrollbars: true
});
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog = remote.require("dialog");
//var bw = remote.require('browser-window');
//var win:GitHubElectron.BrowserWindow = new bw({ width: 800, height: 600 });
//var client_id = "000000004C15C1F3";
//var scope = "onedrive.readwrite";
//var redirect_uri = "https://login.live.com/oauth20_desktop.srf";
//
//win.loadUrl(`https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=token&redirect_uri=${redirect_uri}`);
//console.log(`https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=token&redirect_uri=${redirect_uri}`);
//
//win.on('did-get-redirect-request', function(){
//  console.log('1 '+win.webContents.getUrl());
//})
//setInterval(function(){
//  console.log('2 ' +win.webContents.getUrl());
//}, 1000)
var MainController = (function () {
    function MainController($scope, ngDialog) {
        var _this = this;
        var loopMode = new Menu();
        var resetChecked = function (item) {
            loopMode.items.forEach(function (a, b) {
                a.checked = false;
            });
            item.checked = true;
        };
        loopMode.append(new MenuItem({
            label: '单曲播放',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.Single;
            }
        }));
        loopMode.append(new MenuItem({
            label: '单曲循环',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.SingleCycle;
            }
        }));
        loopMode.append(new MenuItem({
            label: '顺序播放',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.Order;
            }
        }));
        loopMode.append(new MenuItem({
            label: '循环播放',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.Cycle;
            }
        }));
        loopMode.append(new MenuItem({
            label: '随机播放',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.Random;
            }
        }));
        loopMode.append(new MenuItem({
            label: '单曲播放',
            type: 'checkbox',
            click: function (item) {
                resetChecked(item);
                _this.playlist.switchMode = Player.SwitchMode.Single;
            }
        }));
        loopMode.append(new MenuItem({ type: 'separator' }));
        loopMode.append(new MenuItem({
            label: '自动切换列表',
            enabled: false,
            click: function () {
                console.log('自动切换列表');
            }
        }));
        this.loopMode = loopMode;
        this.scope = $scope;
        this.scope.login = function () {
            ngDialog.open({
                template: 'template/tpl/loginDialog.tpl',
                controller: ["$scope", "s", LoginController]
            });
        };
        Player.playerEventMessage.on("change", function (s) {
            _this.scope.currentPlayMusicIndex = s;
        });
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
                $scope.$watch(function () {
                    return _this.control.paused;
                }, function (paused) {
                    _this.scope.paused = paused;
                });
                _this.registerEvent();
                myScroll.refresh();
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
    MainController.prototype.changeLoop = function () {
        this.loopMode.popup(remote.getCurrentWindow());
    };
    MainController.prototype.registerEvent = function () {
        var _this = this;
        var scope = this.scope;
        scope.changeLoop = function () {
            _this.changeLoop();
        };
        scope.next = function () {
            _this.playlist.next(true);
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
        scope.addLocalMusic = function () {
            addLocalMusicMenu.popup(remote.getCurrentWindow());
        };
        scope.startPlay = function (index) {
            _this.playlist.startPlay(index);
        };
        window.onbeforeunload = function (e) {
            fs.writeFile(path.join(__dirname, "pro"), _this.control.currentTime, function () {
                console.log(1);
            });
            fs.writeFile(path.join(__dirname, "123"), _this.playlist.currentVoiceIndex, function () {
                console.log(1);
            });
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
        var route = new Routes.Routes($routeProvider);
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
