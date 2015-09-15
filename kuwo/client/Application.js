/// <reference path='../_all.ts' />
var ipc = require('ipc');
var fs = require('fs');
var path = require('path');
var kuwo;
(function (kuwo) {
    var remote = require("remote");
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');
    var addLocalMusicMenu = new Menu();
    var myScroll = new iScroll('.list-song-js-box', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });
    ipc.on('playlist-add-new-voice', function () {
        myScroll.refresh();
    });
    addLocalMusicMenu.append(new MenuItem({ label: '自动扫描全盘音乐', click: function () {
            console.log('自动扫描全盘音乐');
        } }));
    addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲文件', click: function () {
            kuwo.dialog.showOpenDialog({
                title: "打开",
                filters: [
                    { name: '所有音频文件', extensions: ['mp3', 'ogg', 'wma'] },
                ],
                properties: ["multiSelections"]
            }, function (filePath) {
                ipc.emit('add-voice-files', filePath);
            });
        } }));
    addLocalMusicMenu.append(new MenuItem({
        label: "添加本地歌曲目录",
        click: function () {
            kuwo.dialog.showOpenDialog({
                title: "打开目录",
                properties: ["openDirectory"]
            }, function (dir) {
                if (dir) {
                    fs.readdir(dir[0], function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var result = [];
                            data.forEach(function (element) {
                                if (path.extname(element) == ".mp3") {
                                    result.push(path.join(dir[0], element));
                                }
                            });
                            ipc.emit('add-voice-files', result);
                        }
                    });
                }
            });
        }
    }));
    var listManagerMenu = new Menu();
    listManagerMenu.append(new MenuItem({
        label: "播放",
        click: function () {
            console.log(1);
        }
    }));
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        listManagerMenu.popup(remote.getCurrentWindow());
    }, false);
    var ListController = (function () {
        function ListController($scope, audio) {
            var _this = this;
            this.$scope = $scope;
            this.audio = audio;
            this.addLocalMusic = function () {
                addLocalMusicMenu.popup(remote.getCurrentWindow());
            };
            this.changeList = function (pl) {
                _this.playlist.change(pl);
                _this.scope.voices = _this.playlist.voices;
                _this.scope.pls = _this.playlist.pls;
                setTimeout(function () {
                    myScroll.refresh();
                });
            };
            this.startPlay = function (voice) {
                _this.audio.startPlay(voice);
            };
            this.createPlayList = function () {
                var newPl = {
                    name: "新建列表",
                    voices: []
                };
                _this.playlist.create(newPl);
            };
            this.scope = $scope;
            $scope.vm = this;
            this.playlist = new kuwo.PlayList();
            this.scope.voices = this.playlist.voices;
            this.registerIpc();
        }
        ListController.prototype.registerIpc = function () {
            var _this = this;
            ipc.on("audio-ended", function (voice) {
                var nextVoice = _this.playlist.getNextVoice(voice);
                if (nextVoice) {
                    _this.scope.$apply(function () {
                        _this.audio.startPlay(nextVoice);
                    });
                }
                else {
                    console.log("已经是最后一张图片了");
                }
            });
            ipc.on('add-voice-files', function (files) {
                if (!files) {
                    return false;
                }
                files.forEach(function (file) {
                    var filename = file.replace(/^.*[\\\/]/, '');
                    var v = {
                        src: file,
                        name: filename
                    };
                    _this.scope.$apply(function () {
                        _this.playlist.push(v);
                        _this.scope.voices = _this.playlist.voices;
                    });
                });
            });
            ipc.on('playlist-loaded', function () {
                _this.playlist.voices.forEach(function (voice) {
                    if (voice.on == true) {
                        _this.audio.startPlay(voice);
                    }
                });
                _this.scope.$apply(function () {
                    _this.scope.voices = _this.playlist.voices;
                    _this.scope.pls = _this.playlist.pls;
                    setTimeout(function () {
                        myScroll.refresh();
                    });
                });
            });
        };
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
        }
        return MainController;
    })();
    kuwo.MainController = MainController;
})(kuwo || (kuwo = {}));
/// <reference path='../_all.ts' />
var kuwo;
(function (kuwo) {
    var ControlController = (function () {
        function ControlController(audio, $scope) {
            this.audio = audio;
            this.$scope = $scope;
            this.scope = $scope;
            this.scope.vm = this;
            this.creteProgressLine(audio);
        }
        ControlController.prototype.pause = function () {
            this.audio.pause();
        };
        ControlController.prototype.next = function () {
            this.audio.next();
        };
        ControlController.prototype.creteProgressLine = function (audio) {
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
        return ControlController;
    })();
    kuwo.ControlController = ControlController;
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
            if (this.voice) {
                this.voice.on = false;
            }
            audio.src = voice.src;
            audio.play();
            voice.on = true;
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
        Audio.prototype.getVoice = function () {
            return this.voice;
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
/// <reference path='../_all.ts' />
var fs = require("fs");
var kuwo;
(function (kuwo) {
    var PlayList = (function () {
        function PlayList() {
            var _this = this;
            this.getPlayList(function () {
                ipc.emit('playlist-loaded');
                fs.readFile(path.join(__dirname, "./Data/data.json"), 'utf8', function (err, data) {
                    if (data) {
                        audio.currentTime = data;
                    }
                });
            });
            window.onbeforeunload = function (e) {
                fs.writeFile(path.join(__dirname, "./Data/data.json"), audio.currentTime, function () {
                    console.log(1);
                });
                fs.writeFile(path.join(__dirname, "./Data/song-list.json"), angular.toJson(_this.pls, true), function () {
                    console.log("saved");
                });
            };
        }
        PlayList.prototype.create = function (pl) {
            this.pls.push(pl);
        };
        PlayList.prototype.change = function (pl) {
            this.pls.forEach(function (element) {
                element.default = false;
            });
            pl.default = true;
            this.voices = pl.voices;
            ipc.emit('playlist-add-new-voice');
        };
        PlayList.prototype.push = function (voice) {
            if (!voice.index) {
                voice.index = this.voices.length;
            }
            var has = false;
            this.voices.forEach(function (v) {
                if (v.src == voice.src) {
                    has = true;
                    return false;
                }
            });
            if (has) {
                console.log("歌曲已经存在");
                return false;
            }
            this.voices.push(voice);
            setTimeout(function () {
                ipc.emit('playlist-add-new-voice');
            }, 100);
            this.save();
        };
        PlayList.prototype.getPlayList = function (callback) {
            var _this = this;
            fs.readFile("./Data/song-list.json", "utf-8", function (err, data) {
                if (err) {
                    data = "[]";
                }
                if (data == "") {
                    data = "[]";
                }
                try {
                    _this.pls = JSON.parse(data);
                }
                catch (e) {
                    _this.pls = [];
                }
                if (_this.pls.length == 0) {
                    var defaultPls = {
                        name: "默认列表",
                        voices: []
                    };
                    _this.pls.push(defaultPls);
                }
                _this.pls.forEach(function (element) {
                    if (element.default == true) {
                        _this.voices = element.voices;
                    }
                });
                if (!_this.voices) {
                    _this.voices = _this.pls[0].voices;
                }
                callback();
            });
        };
        PlayList.prototype.save = function (reload) {
            fs.writeFile("./Data/song-list.json", angular.toJson(this.pls, true), function () {
                console.log("saved");
            });
        };
        PlayList.prototype.getNextVoice = function (voice) {
            if (this.voices.indexOf(voice) + 1 < this.voices.length) {
                return this.voices[this.voices.indexOf(voice) + 1];
            }
            else {
                return false;
            }
        };
        return PlayList;
    })();
    kuwo.PlayList = PlayList;
})(kuwo || (kuwo = {}));
/// <reference path="_all.ts" />
var kuwo;
(function (kuwo_1) {
    kuwo_1.remote = require("remote");
    kuwo_1.Menu = kuwo_1.remote.require('menu');
    kuwo_1.MenuItem = kuwo_1.remote.require('menu-item');
    kuwo_1.dialog = kuwo_1.remote.require("dialog");
    var kuwo = angular.module('kuwo', ['ngRoute']);
    kuwo.controller('MainController', kuwo_1.MainController);
    kuwo.controller('ListController', kuwo_1.ListController);
    kuwo.controller('ControlController', kuwo_1.ControlController);
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
/// <reference path='Controller/ControlController.ts' />
/// <reference path='Route/HomeRoute.ts' />
/// <reference path='Models/Audio.ts' />
/// <reference path='Models/PlayList.ts' />
/// <reference path='Application.ts' /> 
