angular.module("blossom", []);

angular.module("blossom").directive("viewRouter", [() => {
	return {
		restrict: "A",
		template: `
<div class="viewRouter viewport">
	<view-login ng-if="viewRouter.view == 'view-login'"></view-login>
	<view-home ng-if="viewRouter.view == 'view-home'"></view-home>
</div>
`,
		link: ($scope, $element, $attributes, $controller) => {
			console.log("asds");
			function ViewRouter() {
				var self = this;

				self.switch = (hashRoute) => {
					switch (hashRoute) {
						case "#login":
							self.view = "view-login";
							break;
						case "#home":
							self.view = "view-home";
							break;
						default:
							self.view = "view-login";
					}
				};

				self.switch(window.location.hash);
			}

			$scope.viewRouter = new ViewRouter();
			console.log($scope);
		}
	}
}]);

angular.module("blossom").directive("vLink", [() => {
	return {
		restrict: "A",
		link: ($scope, $element, $attributes, $controller) => {
			$element.on("click", ($event) => {
				//$scope.viewRouter.switch($attributes["vLink"]);
				console.log($scope);
			});
		}
	};
}]);