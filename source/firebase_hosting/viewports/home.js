angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="viewport home">
	<sigmoid-section></sigmoid-section>
	<simple-section></simple-section>
</div>
`,

		link: function ($scope, $element, $attributes, $controller) {
		}
	};
}]);