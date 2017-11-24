angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
	<multi-layer-section></multi-layer-section>
	<complex-section></complex-section>
	<simple-section></simple-section>
	<sigmoid-section></sigmoid-section>
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);