angular.module("blossom").directive("viewportHome", [() => {
	return {
		restrict: "E",
		template: `
<div class="viewport home">
	<span ui-sref="login">home</span>
	<multi-layer-section></multi-layer-section>
	<complex-section></complex-section>
	<simple-section></simple-section>
	<sigmoid-section></sigmoid-section>
</div>
`,

		link: ($scope, $element, $attributes, $controller) => {
		}
	};
}]);