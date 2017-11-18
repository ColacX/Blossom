angular.module("blossom").directive("lineChart", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `<canvas></canvas>`,
		link: function ($scope, $element, $attributes, $controller) {
			var context = $element[0].getContext("2d");
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

			window.chart = chart;
		}
	}
}]);

