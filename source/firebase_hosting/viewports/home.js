angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);