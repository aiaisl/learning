/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import Player = require("./player");
import fs = require("fs");
import path = require("path");

class MainController{
	private scope: any;
	private control: Player.Control;
	private playlist: Player.Playlist;
	private voices: Array<Player.Voice>;
  constructor($scope: ng.IScope, ngDialog:any) {
     this.scope = $scope;
     this.scope.login = function(){
      ngDialog.open({
        template: 'template/tpl/loginDialog.tpl',
        controller: ["$scope","s",LoginController]
      });
     }
		var musicPath: string = path.join("C:\\Users\\lsw\\OneDrive\\音乐");
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
        $scope.$watch(()=>{
          return this.control.paused;
        }, (paused)=>{
          this.scope.paused = paused;
        })
				this.registerEvent();
          window.onbeforeunload = (e)=> {
            fs.writeFile(path.join(__dirname,"pro"), this.control.currentTime, ()=>{
              console.log(1);
            })
            fs.writeFile(path.join(__dirname,"123"), this.playlist.currentVoiceIndex, ()=>{
              console.log(1);
            })
            
            console.log('I do not want to be closed');
          
            // Unlike usual browsers, in which a string should be returned and the user is
            // prompted to confirm the page unload, Electron gives developers more options.
            // Returning empty string or false would prevent the unloading now.
            // You can also use the dialog API to let the user confirm closing the application.
          };
			}
		});
	}

	initData() {
		var scope = this.scope;
		scope.$apply(() => {
			scope.voices = this.voices;
		})
	}

	registerEvent() {
		var scope = this.scope;
		scope.next = () => {
			this.playlist.next();
		}
		scope.prev = () => {
			this.playlist.prev();
		}
    scope.playOrPause = ()=>{
      
    }
		scope.pause = () => {
			this.control.pause();
		}
		scope.play = () => {
			this.control.play();
		}
		scope.startPlay = (index:number) => {
			this.playlist.startPlay(index);
		}
        var a:HTMLElement = document.getElementById("redlin");
        var al:number = document.getElementById("lin").clientWidth;
        scope.jump = ()=>{
          var ev:MouseEvent = event;
          this.control.progress = ev.offsetX/al;
          a.style.width = this.control.progress + "%";
        }
        var s = ()=>{
          setTimeout(()=>{
            a.style.width = this.control.progress + "%";
            s();
          }, 1000);
        }
        s();
	}
}
class LoginController{
  private scope: any;
  constructor($scope: ng.IScope, server:S) {
    this.scope = $scope;
    this.scope.user = {};
    this.scope.submit = ()=>{
      server.login(this.scope.user.name，this.scope.user.password).then(function(response){
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
  constructor($routeProvider:ng.route.IRouteProvider) {
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
}

class S{
  constructor($http:ng.IHttpService, $q: ng.IQService){
    return {
      login: function(username: string, password: string){
        return $http.post("http://localhost:3000/login", {
          username : username,
          password : password
        })
      }
    }
  }
}
kuwo.factory("s", ["$http","$q", S])
kuwo.config(($routeProvider:ng.route.IRouteProvider)=>{new MainConfig($routeProvider)});
