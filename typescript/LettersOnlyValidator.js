/// <reference path="Validation.ts" />
var LettersOnlyValidator = (function () {
    function LettersOnlyValidator() {
        this.regexp = /^[A-Za-z]+$/;
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        return this.regexp.test(s);
    };
    return LettersOnlyValidator;
})();
exports.LettersOnlyValidator = LettersOnlyValidator;
