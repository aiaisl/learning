/// <reference path='../_all.ts' />
var fs = require("fs");
module kuwo {
	export interface PL{
		name: string;
		voices: Array<Voice>;
		index?: number;
		default?: boolean;
		currentTime?: number;
	}
	export class PlayList {
		public pls: Array<PL>;
		public voices: Array<Voice>;
		constructor(){
			this.getPlayList(()=>{
				ipc.emit('playlist-loaded');
				fs.readFile(path.join(__dirname, "./Data/data.json"), 'utf8', function(err, data){
					if(data){
						audio.currentTime = data;
					}
				});
			});
			window.onbeforeunload = (e) => {
				fs.writeFile(path.join(__dirname, "./Data/data.json"), audio.currentTime, () => {
				console.log(1);
				})
					fs.writeFile(path.join(__dirname, "./Data/song-list.json"), angular.toJson(this.pls, true), function(){
						console.log("saved");
					});
			};
		}
		
		create(pl: PL){
			this.pls.push(pl);
		}
		
		change(pl: PL){
			this.pls.forEach(element => {
				element.default = false;
			});
			pl.default = true;
			this.voices = pl.voices;
			ipc.emit('playlist-add-new-voice');
		}
		
		push(voice: Voice){
			if(!voice.index){
				voice.index = this.voices.length;
			}
			var has:boolean = false;
			this.voices.forEach((v:Voice)=>{
				if(v.src == voice.src){
					has = true;
					return false;
				}
			})
			if(has){
				console.log("歌曲已经存在");
				
				return false;
			}
			this.voices.push(voice);
			setTimeout(function(){
				ipc.emit('playlist-add-new-voice');
			}, 100);
			this.save();
		}
		
		getPlayList(callback){
			fs.readFile("./Data/song-list.json","utf-8", (err, data)=>{
				if(err) {
					data = "[]";
				}
				if(data == "") {
					data = "[]";
				}
    			try{
        			this.pls = JSON.parse(data);
    			}catch(e){
        			this.pls = [];
    			}
				if(this.pls.length == 0){
					var defaultPls:PL = {
						name: "默认列表",
						voices: []
					}
					this.pls.push(defaultPls);
				}
				this.pls.forEach(element => {
					if(element.default == true){
						this.voices = element.voices;
					}
				});
				if(!this.voices){
					this.voices = this.pls[0].voices;
				}
				callback();
			})
		}
		
		save(reload?: boolean) {
			fs.writeFile("./Data/song-list.json", angular.toJson(this.pls, true), function(){
				console.log("saved");
			});
		}
		
		getNextVoice(voice: Voice): Voice|boolean{
			if(this.voices.indexOf(voice)+1<this.voices.length){
				return this.voices[this.voices.indexOf(voice) + 1];
			} else{
				return false;
			}
		}
	}
}