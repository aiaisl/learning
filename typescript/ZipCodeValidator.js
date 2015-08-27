var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
        this.regexp = /^[0-9]+$/;
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && this.regexp.test(s);
    };
    return ZipCodeValidator;
})();
exports.ZipCodeValidator = ZipCodeValidator;
