/// <reference path="angular.d.ts" />
var AuthService = (function () {
    function AuthService() {
        this.buffer = [];
        this.pushToBuffer = function (config, deferred) {
            this.buffer.push({
                config: config,
                deferred: deferred
            });
        };
        this.$get = [
            '$rootScope', '$injector', function ($rootScope, $injector) {
                var $http;
                function retry(config, deferred) {
                    $http = $http || $injector.get('$http');
                    $http(config).then(function (response) {
                        deferred.resolve(response);
                    });
                }
                function retryAll() {
                    for (var i = 0; i < this.buffer.length; ++i) {
                        retry(this.buffer[i].config, this.buffer[i].deferred);
                    }
                    this.buffer = [];
                }
                return {
                    loginConfirmed: function () {
                        $rootScope.$broadcast('event:auth-loginConfirmed');
                        retryAll();
                    }
                };
            }
        ];
    }
    return AuthService;
})();
angular.module('http-auth-interceptor', [])
    .provider('authService', AuthService)
    .config(['$httpProvider', 'authServiceProvider', function ($httpProvider, authServiceProvider) {
        var interceptor = ['$rootScope', '$q', function ($rootScope, $q) {
                function success(response) {
                    return response;
                }
                function error(response) {
                    if (response.status === 401) {
                        var deferred = $q.defer();
                        authServiceProvider.pushToBuffer(response.config, deferred);
                        $rootScope.$broadcast('event:auth-loginRequired');
                        return deferred.promise;
                    }
                    return $q.reject(response);
                }
                return function (promise) {
                    return promise.then(success, error);
                };
            }];
        $httpProvider.interceptors.push(interceptor);
    }]);
var HttpAndRegularPromiseTests;
(function (HttpAndRegularPromiseTests) {
    var someController = function ($scope, $http, $q) {
        $http.get("http://somewhere/some/resource")
            .success(function (data) {
            $scope.person = data;
        });
        $http.get("http://somewhere/some/resource")
            .then(function (response) {
            $scope.person = response.data;
        });
        $http.get("http://somewhere/some/resource")
            .then(function (response) {
            $scope.person = response.data;
        });
        var aPromise = $q.when({ firstName: "Jack", lastName: "Sparrow" });
        aPromise.then(function (person) {
            $scope.person = person;
        });
        var bPromise = $q.when(42);
        bPromise.then(function (answer) {
            $scope.theAnswer = answer;
        });
        var cPromise = $q.when(["a", "b", "c"]);
        cPromise.then(function (letters) {
            $scope.letters = letters;
        });
        var dPromise = $q.when($q.when("ALBATROSS!"));
        dPromise.then(function (snack) {
            $scope.snack = snack;
        });
        var ePromise = $q.when();
        ePromise.then(function () {
            $scope.nothing = "really nothing";
        });
    };
    var anotherController = function ($scope, $http, $q) {
        var buildFooData = function () { return 42; };
        var doFoo = function (callback) {
            $http.get('/foo', buildFooData())
                .success(callback);
        };
        doFoo(function (data) { return console.log(data); });
    };
})(HttpAndRegularPromiseTests || (HttpAndRegularPromiseTests = {}));
var My;
(function (My) {
    var Namespace;
    (function (Namespace) {
        Namespace.x;
    })(Namespace = My.Namespace || (My.Namespace = {}));
})(My || (My = {}));
var mod = angular.module('tests', []);
mod.controller('name', function ($scope) { });
mod.controller('name', ['$scope', function ($scope) { }]);
mod.controller(My.Namespace);
mod.directive('name', function ($scope) { });
mod.directive('name', ['$scope', function ($scope) { }]);
mod.directive(My.Namespace);
mod.factory('name', function ($scope) { });
mod.factory('name', ['$scope', function ($scope) { }]);
mod.factory(My.Namespace);
mod.filter('name', function ($scope) { });
mod.filter('name', ['$scope', function ($scope) { }]);
mod.filter(My.Namespace);
mod.provider('name', function ($scope) { return { $get: function () { } }; });
mod.provider('name', TestProvider);
mod.provider('name', ['$scope', function ($scope) { }]);
mod.provider(My.Namespace);
mod.service('name', function ($scope) { });
mod.service('name', ['$scope', function ($scope) { }]);
mod.service(My.Namespace);
mod.constant('name', 23);
mod.constant('name', "23");
mod.constant(My.Namespace);
mod.value('name', 23);
mod.value('name', "23");
mod.value(My.Namespace);
mod.decorator('name', function ($scope) { });
mod.decorator('name', ['$scope', function ($scope) { }]);
var TestProvider = (function () {
    function TestProvider($scope) {
        this.$scope = $scope;
    }
    TestProvider.prototype.$get = function () {
    };
    return TestProvider;
})();
var foo;
foo.then(function (x) {
    return "asdf";
}).then(function (x) {
    x.length;
    return 123;
}).then(function (x) {
    x.toFixed();
    return;
}).then(function (x) {
    return { a: 123 };
}).then(function (x) {
    x.a = 123;
    var y;
    return y;
}).then(function (x) {
    x.toFixed();
});
var TestQ;
(function (TestQ) {
    var tResult;
    var promiseTResult;
    var $q;
    var promiseAny;
    {
        var result;
        result = new $q(function (resolve) { });
        result = new $q(function (resolve, reject) { });
        result = $q(function (resolve) { });
        result = $q(function (resolve, reject) { });
    }
    {
        var result;
        result = $q.all([promiseAny, promiseAny]);
    }
    {
        var result;
        result = $q.all([promiseAny, promiseAny]);
    }
    {
        var result;
        result = $q.all({ a: promiseAny, b: promiseAny });
    }
    {
        var result;
        result = $q.all({ a: promiseAny, b: promiseAny });
    }
    {
        var result;
        result = $q.defer();
    }
    {
        var result;
        result = $q.reject();
        result = $q.reject('');
    }
    {
        var result;
        result = $q.when();
    }
    {
        var result;
        result = $q.when(tResult);
        result = $q.when(promiseTResult);
    }
})(TestQ || (TestQ = {}));
var httpFoo;
httpFoo.then(function (x) {
    var innerPromise;
    return innerPromise;
}).then(function (x) {
    x.toFixed();
});
httpFoo.success(function (data, status, headers, config) {
    var h = headers("test");
    h.charAt(0);
    var hs = headers();
    hs["content-type"].charAt(1);
});
var TestDeferred;
(function (TestDeferred) {
    var any;
    var tResult;
    var deferred;
    {
        var result;
        result = deferred.resolve();
        result = deferred.resolve(tResult);
    }
    {
        var result;
        result = deferred.reject();
        result = deferred.reject(any);
    }
    {
        var result;
        result = deferred.notify();
        result = deferred.notify(any);
    }
    {
        var result;
        result = deferred.promise;
    }
})(TestDeferred || (TestDeferred = {}));
var TestPromise;
(function (TestPromise) {
    var result;
    var any;
    var tresult;
    var tresultPromise;
    var tother;
    var totherPromise;
    var promise;
    result = promise.then(function (result) { return any; });
    result = promise.then(function (result) { return any; }, function (any) { return any; });
    result = promise.then(function (result) { return any; }, function (any) { return any; }, function (any) { return any; });
    result = promise.then(function (result) { return result; });
    result = promise.then(function (result) { return result; }, function (any) { return any; });
    result = promise.then(function (result) { return result; }, function (any) { return any; }, function (any) { return any; });
    result = promise.then(function (result) { return tresultPromise; });
    result = promise.then(function (result) { return tresultPromise; }, function (any) { return any; });
    result = promise.then(function (result) { return tresultPromise; }, function (any) { return any; }, function (any) { return any; });
    result = promise.then(function (result) { return tother; });
    result = promise.then(function (result) { return tother; }, function (any) { return any; });
    result = promise.then(function (result) { return tother; }, function (any) { return any; }, function (any) { return any; });
    result = promise.then(function (result) { return totherPromise; });
    result = promise.then(function (result) { return totherPromise; }, function (any) { return any; });
    result = promise.then(function (result) { return totherPromise; }, function (any) { return any; }, function (any) { return any; });
    result = promise.catch(function (err) { return any; });
    result = promise.catch(function (err) { return tresult; });
    result = promise.catch(function (err) { return tother; });
    result = promise.finally(function () { return any; });
    result = promise.finally(function () { return tresult; });
    result = promise.finally(function () { return tother; });
})(TestPromise || (TestPromise = {}));
function test_angular_forEach() {
    var values = { name: 'misko', gender: 'male' };
    var log = [];
    angular.forEach(values, function (value, key) {
        this.push(key + ': ' + value);
    }, log);
}
var element = angular.element("div.myApp");
var scope = element.scope();
var isolateScope = element.isolateScope();
var TestTimeout;
(function (TestTimeout) {
    var fnTResult;
    var promiseAny;
    var $timeout;
    {
        var result;
        result = $timeout();
    }
    {
        var result;
        result = $timeout(1);
        result = $timeout(1, true);
    }
    {
        var result;
        result = $timeout(fnTResult);
        result = $timeout(fnTResult, 1);
        result = $timeout(fnTResult, 1, true);
        result = $timeout(fnTResult, 1, true, 1);
        result = $timeout(fnTResult, 1, true, 1, '');
        result = $timeout(fnTResult, 1, true, 1, '', true);
    }
    {
        var result;
        result = $timeout.cancel();
        result = $timeout.cancel(promiseAny);
    }
})(TestTimeout || (TestTimeout = {}));
function test_IAttributes(attributes) {
    return attributes;
}
test_IAttributes({
    $normalize: function (classVal) { },
    $addClass: function (classVal) { },
    $removeClass: function (classVal) { },
    $set: function (key, value) { },
    $observe: function (name, fn) {
        return fn;
    },
    $attr: {}
});
var SampleDirective = (function () {
    function SampleDirective() {
        this.restrict = 'A';
        this.name = 'doh';
    }
    SampleDirective.prototype.compile = function (templateElement) {
        return {
            post: this.link
        };
    };
    SampleDirective.instance = function () {
        return new SampleDirective();
    };
    SampleDirective.prototype.link = function (scope) {
    };
    return SampleDirective;
})();
var SampleDirective2 = (function () {
    function SampleDirective2() {
        this.restrict = 'EAC';
    }
    SampleDirective2.prototype.compile = function (templateElement) {
        return {
            pre: this.link
        };
    };
    SampleDirective2.instance = function () {
        return new SampleDirective2();
    };
    SampleDirective2.prototype.link = function (scope) {
    };
    return SampleDirective2;
})();
angular.module('SameplDirective', []).directive('sampleDirective', SampleDirective.instance).directive('sameplDirective2', SampleDirective2.instance);
angular.module('AnotherSampleDirective', []).directive('myDirective', ['$interpolate', '$q', function ($interpolate, $q) {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                $interpolate(attr['test'])(scope);
                $interpolate('', true)(scope);
                $interpolate('', true, 'html')(scope);
                $interpolate('', true, 'html', true)(scope);
                var defer = $q.defer();
                defer.reject();
                defer.resolve();
                defer.promise.then(function (d) {
                    return d;
                }).then(function () {
                    return null;
                }, function () {
                    return null;
                })
                    .catch(function () {
                    return null;
                })
                    .finally(function () {
                    return null;
                });
                var promise = new $q(function (resolve) {
                    resolve();
                });
                promise = new $q(function (resolve, reject) {
                    reject();
                    resolve(true);
                });
                promise = new $q(function (resolver, reject) {
                    resolver(true);
                    reject(false);
                });
            }
        };
    }]);
angular.module('docsSimpleDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .directive('myCustomer', function () {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
});
angular.module('docsTemplateUrlDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .directive('myCustomer', function () {
    return {
        templateUrl: 'my-customer.html'
    };
});
angular.module('docsRestrictDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .directive('myCustomer', function () {
    return {
        restrict: 'E',
        templateUrl: 'my-customer.html'
    };
});
angular.module('docsScopeProblemExample', [])
    .controller('NaomiController', ['$scope', function ($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .controller('IgorController', ['$scope', function ($scope) {
        $scope.customer = {
            name: 'Igor',
            address: '123 Somewhere'
        };
    }])
    .directive('myCustomer', function () {
    return {
        restrict: 'E',
        templateUrl: 'my-customer.html'
    };
});
angular.module('docsIsolateScopeDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
        $scope.igor = { name: 'Igor', address: '123 Somewhere' };
    }])
    .directive('myCustomer', function () {
    return {
        restrict: 'E',
        scope: {
            customerInfo: '=info'
        },
        templateUrl: 'my-customer-iso.html'
    };
});
angular.module('docsIsolationExample', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
        $scope.vojta = { name: 'Vojta', address: '3456 Somewhere Else' };
    }])
    .directive('myCustomer', function () {
    return {
        restrict: 'E',
        scope: {
            customerInfo: '=info'
        },
        templateUrl: 'my-customer-plus-vojta.html'
    };
});
angular.module('docsTimeDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    }])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {
        return {
            link: function (scope, element, attrs) {
                var format, timeoutId;
                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }
                scope.$watch(attrs['myCurrentTime'], function (value) {
                    format = value;
                    updateTime();
                });
                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });
                timeoutId = $interval(function () {
                    updateTime();
                }, 1000);
            }
        };
    }]);
angular.module('docsTransclusionDirective', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.name = 'Tobias';
    }])
    .directive('myDialog', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'my-dialog.html'
    };
});
angular.module('docsTransclusionExample', [])
    .controller('Controller', ['$scope', function ($scope) {
        $scope.name = 'Tobias';
    }])
    .directive('myDialog', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'my-dialog.html',
        link: function (scope, element) {
            scope['name'] = 'Jeff';
        }
    };
});
angular.module('docsIsoFnBindExample', [])
    .controller('Controller', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.name = 'Tobias';
        $scope.hideDialog = function () {
            $scope.dialogIsHidden = true;
            $timeout(function () {
                $scope.dialogIsHidden = false;
            }, 2000);
        };
    }])
    .directive('myDialog', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'close': '&onClose'
        },
        templateUrl: 'my-dialog-close.html'
    };
});
angular.module('dragModule', [])
    .directive('myDraggable', ['$document', function ($document) {
        return function (scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;
            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });
            element.on('mousedown', function (event) {
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });
            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }
            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        };
    }]);
angular.module('docsTabsExample', [])
    .directive('myTabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function ($scope) {
            var panes = $scope['panes'] = [];
            $scope['select'] = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };
            this.addPane = function (pane) {
                if (panes.length === 0) {
                    $scope['select'](pane);
                }
                panes.push(pane);
            };
        },
        templateUrl: 'my-tabs.html'
    };
})
    .directive('myPane', function () {
    return {
        require: '^myTabs',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        templateUrl: 'my-pane.html'
    };
});
angular.module('copyExample', [])
    .controller('ExampleController', ['$scope', function ($scope) {
        $scope.master = {};
        $scope.update = function (user) {
            $scope.master = angular.copy(user);
        };
        $scope.reset = function () {
            angular.copy($scope.master, $scope.user);
        };
        $scope.reset();
    }]);
var locationTests;
(function (locationTests) {
    var $location;
    var searchObject = $location.search();
    $location.search('foo', 'yipee');
    $location.search('foo', 5);
    $location.path() == '/a';
    $location.path('/foo');
    $location.absUrl() == 'http://example.com/foo';
    $location.search() == {};
    $location.search({ a: 'b', c: true });
    $location.absUrl() == 'http://example.com/foo?a=b&c';
    $location.path('/new').search('x=y');
    $location.url() == 'new?x=y';
    $location.absUrl() == 'http://example.com/new?x=y';
    $location.path() == '/new';
    $location.search() == { x: 'y' };
    $location.path('/foo/bar');
    $location.path() == '/foo/bar';
    $location.url() == '/foo/bar?x=y';
    $location.absUrl() == 'http://example.com/#!/foo/bar?x=y';
})(locationTests || (locationTests = {}));
function NgModelControllerTyping() {
    var ngModel;
    var $http;
    var $q;
    ngModel.$validators['validCharacters'] = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        return /[0-9]+/.test(value) &&
            /[a-z]+/.test(value) &&
            /[A-Z]+/.test(value) &&
            /\W+/.test(value);
    };
    ngModel.$asyncValidators['uniqueUsername'] = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        return $http.get('/api/users/' + value).
            then(function resolved() {
            return $q.reject('exists');
        }, function rejected() {
            return true;
        });
    };
}
