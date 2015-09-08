/// <reference path='../_all.ts' />

module kuwo {
	'use strict';

	export interface IMainScope extends ng.IScope {
		jump: Function;
	}

	export class MainController {
		private scope: IMainScope;
		constructor(
			private $scope: IMainScope,
			private audio: Audio
			) {
			this.scope = $scope;
			this.creteProgressLine(audio);
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
