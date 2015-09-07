var audio:HTMLAudioElement = document.createElement("audio");

export interface Voice{
  src: string;
  name: string;
  index: number;
}

export class Playlist{
  constructor(control: Control, voices: Array<Voice>){
    control.startPlay(voices[5]);
  }
  next(){
    
  }
  prev(){
    
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

