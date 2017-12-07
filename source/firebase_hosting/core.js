angular.module("blossom", ["ui.router"]);

/**
 * https://ui-router.github.io/
 * https://stackoverflow.com/questions/25655246/is-html5-mode-url-routing-with-angularjs-possible-when-in-local-file-based-apps
 * https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
 */
angular.module("blossom").config(["$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise("/login");
	$stateProvider
		.state("login", {
			url: "/login",
			template: "<viewport-login></viewport-login>"
		})
		.state("home", {
			url: "/home",
			template: "<viewport-home></viewport-home>"
		})
}]);