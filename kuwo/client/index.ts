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

kuwo.controller("LoaderController",["$scope", LoaderController]);

interface Song{
	id: number,
	title: string
}