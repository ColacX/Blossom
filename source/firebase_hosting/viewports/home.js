angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
	<complex-section></complex-section>
	<simple-section></simple-section>
	<sigmoid-section></sigmoid-section>
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);