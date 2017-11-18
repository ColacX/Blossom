angular.module("blossom", []);

/**
 * https://en.wikipedia.org/wiki/Sigmoid_function
 * S(x) = 1 / (1 + e^(-x))
 */
function sigmoid(value) {
	return 1 / (1 + Math.exp(-value));
}

/**
 * S'(x) = S(x)(1-S(x))
 * Math trick. You can reuse the sigmoid value to compute the derivative super fast
 */
function sigmoid_derivative(sigmoid_value) {
	return sigmoid_value * (1 - sigmoid_value);
}

angular.module("blossom").directive("sigmoidSection", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="section">
	<canvas></canvas>
</div>`,
		link: function ($scope, $element, $attributes, $controller) {
			var context = $element.find("canvas")[0].getContext("2d");
			var label_data = [];
			var sigmoid_data = [];
			var sigmoid_derivative_data = [];

			for (var x = -6; x < 6; x += 1) {
				label_data.push(x);

				var s = sigmoid(x);
				sigmoid_data.push(s);
				sigmoid_derivative_data.push(sigmoid_derivative(s));
			}

			var chart = new Chart(context, {
				type: "line",
				data: {
					labels: label_data,
					datasets: [{
						label: 'Sigmoid',
						data: sigmoid_data,
						backgroundColor: "#F86385",
						fill: false
					},
					{
						label: 'Sigmoid Derivative',
						data: sigmoid_derivative_data,
						backgroundColor: "#559BE9",
						fill: false
					}]
				}
			});
		}
	}
}]);

angular.module("blossom").directive("simpleSection", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="section">
	<span>X:{{X}} Y:{{Y}}</span>
	<canvas></canvas>
</div>
`,
		link: function ($scope, $element, $attributes, $controller) {
			var context = $element.find("canvas")[0].getContext("2d");
			var label_data = [];
			var prediction_data = [];
			var weight_data = [];
			var error_data = [];

			var X = 5.1;
			var Y = 29;
			var W = 0.5;
			$scope.X = X;
			$scope.Y = Y;

			for (var i = 0; i < 10; i++) {
				var P = sigmoid(X * W);
				var E = Y - P;
				var D = E * sigmoid_derivative(P);
				W = W + X * D;
				console.log(P, E, W);
				label_data.push(i);
				weight_data.push(W);
				prediction_data.push(P);
				error_data.push(E);
			}

			var chart = new Chart(context, {
				type: "line",
				data: {
					labels: label_data,
					datasets: [
						{
							label: 'Prediction',
							data: prediction_data,
							backgroundColor: "#5BBEBE",
							fill: false
						},
						{
							label: 'Weight',
							data: weight_data,
							backgroundColor: "#559BE9",
							fill: false
						},
						{
							label: 'Error',
							data: error_data,
							backgroundColor: "#F86385",
							fill: false
						}
					]
				}
			});
		}
	}
}]);
