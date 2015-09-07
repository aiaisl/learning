/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

class MainController{
  private scope:any;
  constructor($scope: ng.IScope, ngDialog:any) {
     this.scope = $scope;
     this.scope.login = function(){
      ngDialog.open({
        template: 'template/tpl/loginDialog.tpl',
        controller: ["$scope","s",LoginController]
      });
     }
  }
}
class LoginController{
  private scope: any;
  constructor($scope: ng.IScope, server:S) {
    this.scope = $scope;
    this.scope.user = {};
    this.scope.submit = ()=>{
      server.login(this.scope.user.name，this.scope.user.password).then(function(response){
        console.log(response);
        
      })
      console.log(this.scope.user)
      return false;
    }
  }
}
var kuwo = angular.module('kuwo', ['ngRoute', 'ngDialog']);
kuwo.controller("MainController", ["$scope", "ngDialog", MainController]);
class MainConfig {
  constructor($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
			.when('/live', {
				templateUrl: 'template/live.html'
			})
			.when('/lyric', {
				templateUrl: 'template/lyric.html'
			})
      .when('/songs', {
        templateUrl: 'template/songs.html'
    	})
      .when('/download', {
        templateUrl: 'template/download.html'
    	})
      .when('/', {
        templateUrl: 'template/songs.html'
    	})
      .otherwise({ redirectTo: '/' });
  }
}
class S{
  constructor($http:ng.IHttpService, $q: ng.IQService){
    return {
      login: function(username: string, password: string){
        return $http.post("http://localhost:3000/login", {
          username : username,
          password : password
        })
      }
    }
  }
}
kuwo.factory("s", ["$http","$q", S])
kuwo.config(($routeProvider:ng.route.IRouteProvider)=>{new MainConfig($routeProvider)});
