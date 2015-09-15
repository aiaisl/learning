/// <reference path='../_all.ts' />
var ipc = require('ipc');
var fs = require('fs');
var path = require('path');
module kuwo {
	var remote = require("remote");
	var Menu = remote.require('menu');
	var MenuItem = remote.require('menu-item');
	var addLocalMusicMenu:GitHubElectron.Menu = new Menu();
  	var myScroll:iScroll = new iScroll('.list-song-js-box', {
      scrollbars: true,
      mouseWheel: true,
      interactiveScrollbars: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true
    });
	ipc.on('playlist-add-new-voice', function(){
		myScroll.refresh();
	})
	addLocalMusicMenu.append(new MenuItem({ label: '自动扫描全盘音乐', click: function() {
		console.log('自动扫描全盘音乐');
	} }));
	addLocalMusicMenu.append(new MenuItem({ label: '添加本地歌曲文件', click: function() {
		dialog.showOpenDialog({
		title:"打开",
		filters: [
       		{ name: '所有音频文件', extensions: ['mp3', 'ogg', 'wma'] },
      	],
      	properties:["multiSelections"]
    	}, (filePath:string[])=>{
			ipc.emit('add-voice-files', filePath);
    	})
  	} }));
	addLocalMusicMenu.append(new MenuItem({
		label: "添加本地歌曲目录",
		click: function(){
			dialog.showOpenDialog({
				title: "打开目录",
				properties:["openDirectory"]
			}, (dir: string[])=>{
				if(dir){
					fs.readdir(dir[0], function(err, data:Array<string>){
						if(err){
							console.log(err);
						} else{
							var result: Array<string> = [];
							data.forEach(element => {
								if(path.extname(element) == ".mp3") {
									result.push(path.join(dir[0], element));
								}
							});
							ipc.emit('add-voice-files', result);
						}
					})
				}
				
			})
		}
	}))
	var listManagerMenu:GitHubElectron.Menu = new Menu();
	listManagerMenu.append(new MenuItem({
		label:"播放",
		click: function(){
			console.log(1);
			
		}
	}))
	window.addEventListener('contextmenu', function (e) {
		e.preventDefault();
		listManagerMenu.popup(remote.getCurrentWindow());
	}, false);
	export interface IListScope extends ng.IScope {
		vm: ListController;
		voices: Array<Voice>;
	}
	export class ListController {
		private scope;
		private playlist: PlayList;
		private playlists: Array<PlayList>;
		constructor(
			private $scope: IListScope,
			private audio: Audio
		){
			this.scope = $scope;
			$scope.vm = this;
			this.playlist = new PlayList();
			this.scope.voices = this.playlist.voices;
			this.registerIpc();
		}
		addLocalMusic = ()=>{
			addLocalMusicMenu.popup(remote.getCurrentWindow());
		}
		changeList = (pl)=> {
			this.playlist.change(pl);
			this.scope.voices = this.playlist.voices;
			this.scope.pls = this.playlist.pls;
			setTimeout(function(){
				myScroll.refresh();
			})
		}
		startPlay = (voice: Voice)=>{
			this.audio.startPlay(voice);
		};
		createPlayList = ()=> {
			var newPl:PL = {
				name:"新建列表",
				voices: []
			}
			this.playlist.create(newPl);
		}
		private registerIpc(){
			ipc.on("audio-ended", (voice: Voice)=>{
				var nextVoice = this.playlist.getNextVoice(voice);
				if(nextVoice){
					this.scope.$apply(()=>{
						this.audio.startPlay(nextVoice);
					})
				} else {
					console.log("已经是最后一张图片了");
				}

			})
			
			ipc.on('add-voice-files',(files: Array<String>)=>{
				if(!files){
					return false;
				}
				files.forEach((file:string)=>{
					var filename = file.replace(/^.*[\\\/]/, '');
					var v:Voice = {
						src: file,
						name: filename
					}
					this.scope.$apply(()=>{
						this.playlist.push(v);
						this.scope.voices = this.playlist.voices;
					});
				});
			});
			
			ipc.on('playlist-loaded', ()=>{
				this.playlist.voices.forEach((voice: Voice)=>{
					if(voice.on == true){
						this.audio.startPlay(voice);
					}
				})
				this.scope.$apply(()=>{
					this.scope.voices = this.playlist.voices;
					this.scope.pls = this.playlist.pls;
					setTimeout(function(){
						myScroll.refresh();
					})
				})
			})
		}
	}
}