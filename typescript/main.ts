import validation = require('./validation');
import zip = require('./ZipCodeValidator');
import letters = require('./LettersOnlyValidator');

var strings = ['Hello', '98052', '101'];

var validators: {[s: string] : validation.StringValidator} = {};

validators['ZIP code'] = new zip.ZipCodeValidator();
validators['Letters only'] = new letters.LettersOnlyValidator();

strings.forEach(s => {
	for(var name in validators) {
		console.log('"' +　s + '"' + (validators[name].isAcceptable(s) ? 'maches ' : 'does not match ') + name);
	}
})
