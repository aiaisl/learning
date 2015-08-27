export interface StringValidator {
	regexp : RegExp;
	isAcceptable(s: string) : boolean;
}