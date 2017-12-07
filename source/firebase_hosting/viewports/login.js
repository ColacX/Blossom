angular.module("blossom").directive("viewportLogin", [() => {
	return {
		restrict: "E",
		template: `
<div class="viewport login">
	<span ui-sref="home">login</span>
</div>
`,

		link: ($scope, $element, $attributes, $controller) => {
		}
	};
}]);