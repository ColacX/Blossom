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

/**
 * Dot product
 */
function vector_dot(vector_a, vector_b) {
	if (vector_a.length != vector_b.length) throw "vector length does not match";

	var product = 0.0;
	for (var i = 0; i < vector_a.length; i++) {
		product += vector_a[i] * vector_b[i];
	}
	return product;
}

function vector_mul(vector_a, vector_b) {
	if (vector_a.length != vector_b.length) throw "vector length does not match";

	var result = [];
	for (var i = 0; i < vector_a.length; i++) {
		result.push(vector_a[i] * vector_b[i]);
	}
	return result;
}

function vector_add(vector_a, vector_b) {
	if (vector_a.length != vector_b.length) throw "vector length does not match";

	var result = [];
	for (var i = 0; i < vector_a.length; i++) {
		result.push(vector_a[i] + vector_b[i]);
	}
	return result;
}

function vector_add_value(vector, value) {
	var result = [];
	for (var i = 0; i < vector.length; i++) {
		result.push(vector[i] + value);
	}
	return result;
}

function vector_mul_value(vector, value) {
	var result = [];
	for (var i = 0; i < vector.length; i++) {
		result.push(vector[i] * value);
	}
	return result;
}

function noise() {
	return (Math.random() - 0.5) * 0.1;
}

function chartOptions() {
	return {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Iteration'
				},
				ticks: {
					maxTicksLimit: 21
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				}
			}]
		}
	};
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
				},
				options: chartOptions()
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
			var Y = 0;
			var W = 0.5;

			for (var i = 0; i < 10; i++) {
				var P = sigmoid(X * W);
				var E = Y - P;
				var D = E * sigmoid_derivative(P);
				W = W + X * D;

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
				},
				options: chartOptions()
			});
		}
	}
}]);

angular.module("blossom").directive("complexSection", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="section">
	<canvas></canvas>
</div>
`,
		link: function ($scope, $element, $attributes, $controller) {
			var context = $element.find("canvas")[0].getContext("2d");
			var label_data = [];
			var debug_data = [];
			var error_data = [[], []];
			var iterations = 10000;

			//todo add noise to inputs
			//https://www.quora.com/Why-is-it-important-to-add-noise-to-the-inputs-of-a-neural-network
			var A = [
				[0.0, 0.1, 0.1, 0.1],
				[1.0, 1.0, 1.0, 1.0]
			];
			var B = [0, 1];
			var W = [
				[0.5, 0.5, 0.5, 0.5]
			];

			for (var i = 0; i < iterations; i++) {
				if (i % (iterations / 10) == 0) {
					label_data.push(i);
				}

				for (var ie = 0; ie < 2; ie++) {
					var P = sigmoid(vector_dot(A[ie], W[0]));
					var E = B[ie] - P;
					W[0] = vector_add(W[0], vector_mul_value(A[ie], E * sigmoid_derivative(P)));

					if (i % (iterations / 10) == 0) {
						error_data[ie].push(E);
					}
				}
			}

			console.log(W);

			var chart = new Chart(context, {
				type: "line",
				data: {
					labels: label_data,
					datasets: [
						{
							label: 'Error0',
							data: error_data[0],
							backgroundColor: "#F86385",
							fill: false
						},
						{
							label: 'Error1',
							data: error_data[1],
							backgroundColor: "#5BBEBE",
							fill: false
						},
						{
							label: 'Debug',
							data: debug_data,
							backgroundColor: "#559BE9",
							fill: false
						}
					]
				},
				options: chartOptions()
			});
		}
	}
}]);
