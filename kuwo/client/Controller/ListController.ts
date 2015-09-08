/// <reference path='../_all.ts' />
var ipc = require('ipc');
module kuwo {
	export interface IListScope extends ng.IScope {
		vm: ListController;
		voices: Array<Voice>;
	}
	export class ListController {
		private scope;
		constructor(
			private $scope: IListScope,
			private audio: Audio
		){
			ipc.on("audio-ended", function(voice: Voice){
				console.log(voice);
				
			})
			var fs = require("fs");
			this.scope = $scope;
			$scope.vm = this;
			var musicPath: string = path.join("C:\\Users\\lsw\\OneDrive\\音乐");
			fs.readdir(musicPath, (err, data:Array<string>) =>{
				if(err){
					console.log(err);
				} else {
					var voices: Array<Voice> = [];
					data.forEach((name, index) => {
						voices.push({
						src: path.join(musicPath, name),
						name: name,
						index: index
						})
					})
					audio.startPlay(voices[0]);
					$scope.voices = voices;
				}
			})
		}
	}

}