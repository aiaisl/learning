var audio:HTMLAudioElement = document.createElement("audio");
import fs = require("fs");
export interface Voice{
  src: string;
  name: string;
  index: number;
}
audio.paused

export class Playlist{
  private control:Control;
  private voices: Array<Voice>;
  public currentVoiceIndex: number;
  constructor(control: Control, voices: Array<Voice>){
    this.control = control;
    this.voices = voices;
    var index:number = parseFloat(fs.readFileSync(path.join(__dirname, "123"),"utf8"));
    var t:number = parseFloat(fs.readFileSync(path.join(__dirname, "pro"),"utf8"));
    if(index){
       this.startPlay(index);
       console.log(t);
       
       this.control.currentTime = t;
    } else{
      this.startPlay(10);
    }
    audio.onended = (ev)=>{
      this.next();
      
    }
  }
  next(){
    this.startPlay(++this.currentVoiceIndex)
  }
  prev(){
    this.startPlay(--this.currentVoiceIndex)
  }
  
  startPlay(index:number){
    this.currentVoiceIndex = index;
    this.control.startPlay(this.voices[index]);
  }
}

export class Control{
  private audio: HTMLAudioElement;
  public index: number;
  constructor(voice?: Voice){
    if(voice){
      this.startPlay(voice)
    }
  }
  
  startPlay(voice: Voice){
    audio.src = voice.src;
    audio.play();
  }
  
  play(){
    audio.play();
  }

  stop(){
    audio.pause();
  }
  
  pause(){
    audio.pause();
  }
  
  get progress(){
    return Math.floor(audio.currentTime/audio.duration * 10000)/100;
  }
  
  set progress(setTime){
    audio.currentTime = setTime * audio.duration;
  }
  
  get currentTime(){
    return audio.currentTime;
  }
  set currentTime(setTime){
    audio.currentTime = setTime;
  }
  
  get song(){
    return audio;
  }
  
  get paused():boolean{
    return audio.paused;
  }
}

