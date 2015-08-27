/// <reference path="Validation.ts" />
import validation = require('./Validation');
export class ZipCodeValidator implements validation.StringValidator {
	regexp = /^[0-9]+$/;
	isAcceptable(s : string) {
		return s.length === 5 && this.regexp.test(s);
	}
}