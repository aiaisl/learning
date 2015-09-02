/// <reference path="Validation.ts" />

import validation = require('./Validation');

export class LettersOnlyValidator implements validation.StringValidator {
	regexp = /^[A-Za-z]+$/;
	isAcceptable(s: string) {
		return this.regexp.test(s);
	}
}