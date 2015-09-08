import fs = require("fs");
import events = require("events");
export var playerEventMessage = new events.EventEmitter();

var audio: HTMLAudioElement = document.createElement("audio");
export interface Voice {
  src: string;
  name: string;
  index: number;
}
export enum SwitchMode {
  Single,
  SingleCycle,
  Order,
  Cycle,
  Random
}

export class Playlist {
  private control: Control;
  private voices: Array<Voice>;
  public currentVoiceIndex: number;
  public switchMode: SwitchMode;
  constructor(control: Control, voices: Array<Voice>) {
    this.control = control;
    this.voices = voices;
    var index: number = parseFloat(fs.readFileSync(path.join(__dirname, "../123"), "utf8"));
    var t: number = parseFloat(fs.readFileSync(path.join(__dirname, "../pro"), "utf8"));
    if (index) {
      this.startPlay(index);
      console.log(t);

      this.control.currentTime = t;
    } else {
      this.startPlay(10);
    }
    audio.onended = (ev) => {
      this.next();

    }
  }
  next(control?:boolean, m?:string) {
    var mode:string;
    if(m != undefined){
      mode = m;
    } else {
      mode = SwitchMode[this.switchMode];
    }
    
    switch(mode){
      case "Random":{
        var newVoiceIndex = Math.floor(Math.random()*10);
        if(newVoiceIndex == this.currentVoiceIndex){
          this.next();
        } else {
          this.startPlay(newVoiceIndex);
        }
      }
      case "Order": {
        if(this.currentVoiceIndex < this.voices.length -1){
          this.startPlay(++this.currentVoiceIndex);
        } else {
          console.log("已经是最后一首了");
        }
      }
      case "Cycle":{
        if(this.currentVoiceIndex < this.voices.length -1){
          this.startPlay(++this.currentVoiceIndex);
        } else {
          this.startPlay(0);
        }
      }
      case "SingleCycle": {
        
      }
      case "Single": {
        if(this.currentVoiceIndex < this.voices.length -1){
          this.startPlay(++this.currentVoiceIndex);
        } else {
          this.startPlay(0);
        }
      }
    }
  }
  prev() {
    this.startPlay(--this.currentVoiceIndex)
  }

  startPlay(index: number) {
    playerEventMessage.emit("change", index);
    this.currentVoiceIndex = index;
    this.control.startPlay(this.voices[index]);
  }
}

export class Control {
  private audio: HTMLAudioElement;
  public index: number;
  constructor(voice?: Voice) {
    if (voice) {
      this.startPlay(voice)
    }
  }

  startPlay(voice: Voice) {
    audio.src = voice.src;
    audio.play();
  }

  play() {
    audio.play();
  }

  stop() {
    audio.pause();
  }

  pause() {
    audio.pause();
  }

  get progress() {
    return Math.floor(audio.currentTime / audio.duration * 10000) / 100;
  }

  set progress(setTime) {
    audio.currentTime = setTime * audio.duration;
  }

  get currentTime() {
    return audio.currentTime;
  }
  set currentTime(setTime) {
    audio.currentTime = setTime;
  }

  get song() {
    return audio;
  }

  get paused(): boolean {
    return audio.paused;
  }
}

