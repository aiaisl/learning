/// <reference path='../_all.ts' />
var audio: HTMLAudioElement;
var ipc = require('ipc');
module kuwo {
	export interface Voice {
		src: string;
		name: string;
		index: number;
	}

	export class Audio {
		private voice: Voice;
		constructor() {
			audio = document.createElement("audio");
			audio.onended = (ev) => {
				ipc.emit("audio-ended", this.voice);
			}
		}

		startPlay(voice: Voice) {
			audio.src = voice.src;
			audio.play();
			this.voice = voice;
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
}