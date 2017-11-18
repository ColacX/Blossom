angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
	<div class="lineChart">
		<line-chart></line-chart>
	</div>
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);