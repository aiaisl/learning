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
			
		}

	}

}
