/// <reference path="angular-route.d.ts" />
$routeProvider
    .when('/projects/:projectId/dashboard', {
    controller: 'I am a string',
    templateUrl: "So am I",
    caseInsensitiveMatch: true,
    reloadOnSearch: false
})
    .when('/projects/:projectId/dashboard2', {
    controller: function () {
    },
    template: function ($routeParams) {
        return "I return a string";
    }
})
    .when('/projects/:projectId/dashboard3', {
    controllerAs: 'I am a string',
    template: "Yup.  String"
})
    .when('/projects/:projectId/dashboard4', {
    controller: 'I am a string',
    templateUrl: function ($routeParams) {
        return "I return a string";
    }
})
    .otherwise({ redirectTo: '/' })
    .otherwise({ redirectTo: function ($routeParams, $locationPath, $locationSearch) { return ""; } });
var current;
current.locals['test-key'] = 'test-value';
