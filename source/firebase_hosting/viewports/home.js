angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
	<div class="chart">
		<sigmoid-chart></sigmoid-chart>
	</div>
	<div class="chart">
		<prediction-chart></prediction-chart>
	</div>
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);