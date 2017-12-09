angular.module("blossom", []);

angular.module("blossom").component("viewportRoot", {
	template: `
<div class="viewport root">
	<view-login ng-if="view == 'view-login'"></view-login>
	<view-home ng-if="view == 'view-home'"></view-home>
</div>
`,
	controller: ($scope) => {
		console.log(window.location);

		switch (window.location.hash) {
			case "#login":
				$scope.view = "view-login";
				break;
			case "#home":
				$scope.view = "view-home";
				break;
			default:
				$scope.view = "view-login";
		}

		console.log($scope);
	}
});