var stop = document.getElementById('stop');
var play = document.getElementById('play');
var music = document.getElementsByTagName("audio")[0];
import fs = require("fs");
import path = require("path");
export interface Song{
  src: string;
  name: string;
  index: number;
}
class Core{
  private audio: HTMLAudioElement;
  constructor {
    
  }
  this.audio = document.createElement("audio");
}
export class Contoler {
  private audio: HTMLAudioElement;
  public index: number;
  constructor(){
    this.audio = document.createElement("audio");
  }
  
  startPlay(song: Song){
    this.index = song.index;
    this.audio.src = song.src;
    this.audio.play();
  }
  
  play(){
    this.audio.play();
  }

  stop(){
    
  }

  pause(){
    this.audio.pause();
  }
  
  get progress(){
    return Math.floor(this.audio.currentTime/this.audio.duration * 10000)/100;
  }
  
  set progress(setTime){
    this.audio.currentTime = setTime * this.audio.duration;
  }
  
  get currentTime(){
    return this.audio.currentTime;
  }
  set currentTime(setTime){
    this.audio.currentTime = setTime;
  }
  
  get song(){
    return this.audio;
  }
}
var player:Player = new Player();
export class List {
  private songs:Array<Song>;
  private _currentPlayMusicIndex: number;
  private audio: HTMLAudioElement;
  private paused: boolean = false;
  get currentPlayMusicIndex():number{
    return this._currentPlayMusicIndex;
  }
  constructor(songs: Array<Song>){
    var index:number = parseFloat(fs.readFileSync(path.join(__dirname, "123"),"utf8"));
    var t:number = parseFloat(fs.readFileSync(path.join(__dirname, "pro"),"utf8"));
    if(index){
      player.startPlay(songs[index]);
      player.currentTime = t;
    } else{
      player.startPlay(songs[10]);
    }
    
  }
   
  play(index= this.currentPlayMusicIndex){
    if(this.audio.paused == false) {
      this._currentPlayMusicIndex = index;
      this.audio.src = this.songs[index].src;
    }
    this.audio.play();
  }
  next(){
    if(this.currentPlayMusicIndex< this.songs.length-1){
      this.play(this.currentPlayMusicIndex + 1);
    } else {
      console.log("现在播放的是最后一首歌");
    }
    
  }
  
  prev(){
    if(this.currentPlayMusicIndex>0){
      this.play(this.currentPlayMusicIndex - 1);
    } else {
      console.log("现在播放的是第一首歌");
    }
  }
}
var playlist:PlayList;
class MusicController{
  private scope: any;
  private index: number = 0;
  constructor($scope: ng.IScope){
    var musicPath:string = path.join("E:\\KwDownload\\song");
    this.scope = $scope;
    var __this = this;
    fs.readdir(musicPath, (err, data)=>{
      if(err){
        console.log(err);
      } else {
        
        var songs:Array<Song> = [];
        data.forEach((name,index) => {
          songs.push({
            src: path.join(musicPath, name),
            name: name,
            index: index
          })
        });
        playlist = new PlayList(songs);
        
        this.scope.currentPlayMusicIndex = 0;
        
        $scope.$apply(()=>{
          this.scope.songs = songs;
        })
        var a:HTMLElement = document.getElementById("redlin");
        var al:number = document.getElementById("lin").clientWidth;
        
        this.scope.jump = ()=>{
          var ev:MouseEvent = event;
          player.progress = ev.offsetX/al;
          a.style.width = player.progress + "%";
        }
        var s = ()=>{
          setTimeout(()=>{
            a.style.width = player.progress + "%";
            s();
          }, 1000);
        }
        s();
      }
    })
    this.scope.playASong = (index:number)=> {
      this.index = index;
      var name:string = this.scope.musicList[index];
      music.src = path.join(musicPath, name);
      music.play();
    }
    this.scope.next = ()=>{
       playlist.next();
    }
    this.scope.prev = ()=>{
      playlist.prev();
    }
    this.scope.pause = ()=> {
      player.pause();
    }
    this.scope.play = ()=> {
      player.play();
    }
  }
}
var kuwo = angular.module("kuwo", []);
kuwo.controller("MusicController",["$scope", MusicController]);


window.onbeforeunload = function(e) {
  fs.writeFile(path.join(__dirname,"pro"), player.currentTime, ()=>{
    console.log(1);
  })
  fs.writeFile(path.join(__dirname,"123"), player.index, ()=>{
    console.log(1);
  })
  console.log(player.progress);
  
  console.log('I do not want to be closed');

  // Unlike usual browsers, in which a string should be returned and the user is
  // prompted to confirm the page unload, Electron gives developers more options.
  // Returning empty string or false would prevent the unloading now.
  // You can also use the dialog API to let the user confirm closing the application.
};