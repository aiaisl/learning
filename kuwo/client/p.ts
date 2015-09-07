/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import Player = require("./player");

import fs = require("fs");
import path = require("path");

class MusicController{
	private scope: any;
	private control: Player.Control;
	private playlist: Player.Playlist;
	private voices: Array<Player.Voice>;
	constructor($scope: ng.IScope){
		var musicPath:string = path.join("E:\\KwDownload\\song");
		this.scope = $scope;
		var __this = this;
		fs.readdir(musicPath, (err, data)=>{
			if(err){
				console.log(err);
			} else {
				var voices:Array<Player.Voice> = [];
				data.forEach((name,index) => {
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
				this.registerEvent();
			}
		});
	}
	
	initData() {
		var scope = this.scope;
		scope.$apply(()=>{
			scope.voices = this.voices;
		})
	}
	
	registerEvent(){
		var scop = this.scope;
		scop.next = ()=>{
			this.playlist.next();
		}
		scop.prev = ()=>{
			this.playlist.prev();
		}
		scop.pause = ()=> {
			this.control.pause();
		}
		scop.play = ()=> {
			this.control.play();
		}
	}
}
var kuwo = angular.module("kuwo", []);
kuwo.controller("MusicController",["$scope", MusicController]);