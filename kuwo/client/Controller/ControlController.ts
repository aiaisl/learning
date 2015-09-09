/// <reference path='../_all.ts' />
module kuwo {
	export class ControlController {
		private scope;
		constructor(
			private audio: Audio,
			private $scope: ng.IScope
		){
			this.scope = $scope;
			this.scope.vm = this;
			this.creteProgressLine(audio);
		}
		
		pause() {
			this.audio.pause();
		}

		creteProgressLine(audio: Audio) {
			var progress: HTMLElement = document.getElementById("redlin");
			var lineWidth: number = document.getElementById("lin").clientWidth;
			this.scope.jump = () => {
				var ev: MouseEvent = event;
				audio.progress = ev.offsetX / lineWidth;
				progress.style.width = audio.progress + "%";
			}
			var s = () => {
				setTimeout(() => {
				progress.style.width = audio.progress + "%";
				s();
				}, 1000);
			}
			s();
		}
	}
}