/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog:GitHubElectron.Dialog = remote.require("dialog");

import kuwoMing = require("./kuwo");
var kuwo = angular.module("kuwo", []);
class LoaderController{
	scope: any;
	list: Array<{}>;
	constructor(
		private $scope: ng.IScope
	) {
		this.scope = $scope;
		//this.loaderAnimal();
		this.init();
		this.scope.sayhi = (key:number)=>{
			this.scope.songs = this.list[key].list;
		}

		this.scope.playSong = (key:number)=>{
			console.log(`当前播放的音乐是${this.scope.songs[key].title}`);
		}
		this.scope.addLocalMusic = ()=>{
			addLocalMusicMenu.popup(remote.getCurrentWindow());
		};
	}

	loaderAnimal(){
		this.scope.loader = false;
		setTimeout(()=>{
			this.$scope.$apply(()=>{
				this.scope.loader = false;
			})
		}, 2000);
	}

	init(){
		var List = new kuwoMing.List();
		List.local()
		.then((data:Array<{}>)=>{
			this.list = data;
			this.scope.$apply(()=>{
				this.scope.songList = data;
				this.scope.songs = data[0].list;
			})
		},(err)=>{
			console.log(err);
		})
	}
}

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
addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲目录', click: function() { console.log('添加本地歌曲目录'); } }));


kuwo.controller("LoaderController",["$scope", LoaderController]);

interface Song{
	id: number,
	title: string
}
