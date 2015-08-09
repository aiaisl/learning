electron.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partes/home.html',
			controller : 'MainController',
			resolve: {
				delay : function($rootScope) {
					$rootScope.pageTitle = "主页";
				}
			}
		})
		.when('/Menu', {
			templateUrl: 'partes/Menu.html',
			controller : 'MainController',
			resolve: {
				delay : function($rootScope) {
					$rootScope.pageTitle = "菜单";
				}
			}
		})
		.when('/Dialog', {
			templateUrl: 'partes/Dialog.html',
			controller : 'MainController',
			resolve: {
				delay : function($rootScope) {
					$rootScope.pageTitle = "Dialog";
				}
			}
		})
		.when('/Tray', {
			templateUrl: 'partes/Tray.html',
			controller : 'MainController',
			resolve: {
				delay : function($rootScope) {
					$rootScope.pageTitle = "Tray";
				}
			}
		})
}]);