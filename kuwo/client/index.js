var kuwoMing = require("./kuwo");
var kuwo = angular.module("kuwo", []);
var LoaderController = (function () {
    function LoaderController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.scope = $scope;
        this.init();
        this.scope.sayhi = function (key) {
            _this.scope.songs = _this.list[key].list;
        };
        this.scope.playSong = function (key) {
            console.log("\u5F53\u524D\u64AD\u653E\u7684\u97F3\u4E50\u662F" + _this.scope.songs[key].title);
        };
    }
    LoaderController.prototype.loaderAnimal = function () {
        var _this = this;
        this.scope.loader = false;
        setTimeout(function () {
            _this.$scope.$apply(function () {
                _this.scope.loader = false;
            });
        }, 2000);
    };
    LoaderController.prototype.init = function () {
        var _this = this;
        var List = new kuwoMing.List();
        List.local()
            .then(function (data) {
            _this.list = data;
            _this.scope.$apply(function () {
                _this.scope.songList = data;
                _this.scope.songs = data[0].list;
            });
        }, function (err) {
            console.log(err);
        });
    };
    return LoaderController;
})();
kuwo.controller("LoaderController", ["$scope", LoaderController]);
