/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/libs.d.ts" />

import Player = require("./js/player");
import Routes = require("./js/routes");
import fs = require("fs");
import path = require("path");
import remote = require("remote");
import IScroll = require('./js/lib/iscroll');
var myScroll:iScroll = new IScroll('.list-song-js-box', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true
	});

var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog:GitHubElectron.Dialog = remote.require("dialog");
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
class MainController {
  private scope: any; 
  private control: Player.Control;
  private playlist: Player.Playlist;
  private voices: Array<Player.Voice>;
  private loopMode: GitHubElectron.Menu;
  constructor($scope: ng.IScope, ngDialog: any) {
    var loopMode:GitHubElectron.Menu = new Menu();
     var resetChecked = function(item:GitHubElectron.MenuItemOptions){
        loopMode.items.forEach((a:GitHubElectron.MenuItemOptions, b)=>{
          a.checked = false;
        })
        item.checked = true;
     }

    loopMode.append(new MenuItem({
      label: '单曲播放',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.Single;
        }
      }
    ));

    loopMode.append(new MenuItem({
      label: '单曲循环',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.SingleCycle;
        }
      }
    ));

    loopMode.append(new MenuItem({
      label: '顺序播放',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.Order;
        }
      }
    ));

    loopMode.append(new MenuItem({
      label: '循环播放',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.Cycle;
        }
      }
    ));

    loopMode.append(new MenuItem({
      label: '随机播放',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.Random;
        }
      }
    ));

    loopMode.append(new MenuItem({
      label: '单曲播放',
      type: 'checkbox',
      click: (item)=> {
          resetChecked(item);
          this.playlist.switchMode = Player.SwitchMode.Single;
        }
      }
    ));
    loopMode.append(new MenuItem({ type: 'separator'}));
    loopMode.append(new MenuItem({
      label: '自动切换列表',
      enabled: false,
      click: function() {
        console.log('自动切换列表');
      }
    }
    ));
    this.loopMode = loopMode;
    this.scope = $scope;
    this.scope.login = function() {
      ngDialog.open({
        template: 'template/tpl/loginDialog.tpl',
        controller: ["$scope", "s", LoginController]
      });
    }
    Player.playerEventMessage.on("change", (s)=>{
      this.scope.currentPlayMusicIndex = s;
    })
    var musicPath: string = path.join("E:\\KwDownload\\song");
    this.scope = $scope;
    var __this = this;
    fs.readdir(musicPath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var voices: Array<Player.Voice> = [];
        data.forEach((name, index) => {
          voices.push({
            src: path.join(musicPath, name),
            name: name,
            index: index
          })
        })
        this.voices = voices;
        this.control = new Player.Control();
        this.playlist = new Player.Playlist(this.control, voices);
        this.initData();
        $scope.$watch(() => {
          return this.control.paused;
        }, (paused) => {
          this.scope.paused = paused;
        })
        this.registerEvent();
        myScroll.refresh();
      }
    });
  }

  initData() {
    var scope = this.scope;
    scope.$apply(() => {
      scope.voices = this.voices;
    })
  }
  
  changeLoop() {
    this.loopMode.popup(remote.getCurrentWindow());
  }

  registerEvent() {
    var scope = this.scope;
    scope.changeLoop = () =>{
      this.changeLoop();
    }
    scope.next = () => {
      this.playlist.next(true);
    }
    scope.prev = () => {
      this.playlist.prev();
    }
    scope.playOrPause = () => {

    }
    scope.pause = () => {
      this.control.pause();
    }
    scope.play = () => {
      this.control.play();
    }
    scope.addLocalMusic = ()=>{
			addLocalMusicMenu.popup(remote.getCurrentWindow());
		};
    scope.startPlay = (index: number) => {
      this.playlist.startPlay(index);
    }
    window.onbeforeunload = (e) => {
      fs.writeFile(path.join(__dirname, "pro"), this.control.currentTime, () => {
        console.log(1);
      })
      fs.writeFile(path.join(__dirname, "123"), this.playlist.currentVoiceIndex, () => {
        console.log(1);
      })
    };
    var a: HTMLElement = document.getElementById("redlin");
    var al: number = document.getElementById("lin").clientWidth;
    scope.jump = () => {
      var ev: MouseEvent = event;
      this.control.progress = ev.offsetX / al;
      a.style.width = this.control.progress + "%";
    }
    var s = () => {
      setTimeout(() => {
        a.style.width = this.control.progress + "%";
        s();
      }, 1000);
    }
    s();
  }
}
class LoginController {
  private scope: any;
  constructor($scope: ng.IScope, server: S) {
    this.scope = $scope;
    this.scope.user = {};
    this.scope.submit = () => {
      server.login(this.scope.user.name，this.scope.user.password).then(function(response) {
        console.log(response);

      })
      console.log(this.scope.user)
      return false;
    }
  }
}
var kuwo = angular.module('kuwo', ['ngRoute', 'ngDialog']);
kuwo.controller("MainController", ["$scope", "ngDialog", MainController]);
class MainConfig {
  constructor($routeProvider: ng.route.IRouteProvider) {
    var route = new Routes.Routes($routeProvider);
  }
}

class S {
  constructor($http: ng.IHttpService, $q: ng.IQService) {
    return {
      login: function(username: string, password: string) {
        return $http.post("http://localhost:3000/login", {
          username: username,
          password: password
        })
      }
    }
  }
}
kuwo.factory("s", ["$http", "$q", S])
kuwo.config(($routeProvider: ng.route.IRouteProvider) => { new MainConfig($routeProvider) });


var addLocalMusicMenu:GitHubElectron.Menu = new Menu();

addLocalMusicMenu.append(new MenuItem({ label: '自动扫描全盘音乐', click: function() {
	console.log('自动扫描全盘音乐');
} }));
addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲文件', click: function() {
	console.log('添加本地歌曲文件');
	dialog.showOpenDialog({
		title:"打开",
		filters: [
			{ name: '所有音频文件', extensions: ['mp3', 'ogg', 'wma'] },
		],
		properties:["multiSelections"]
	}, (fileName:string[])=>{
		console.log(fileName);
	})
} }));