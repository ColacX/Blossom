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

			/**
			 * Neurons should not have negative inputs and only fire in the positive range. 
			 * To train on 0 input values we should add a base value to the inputs
			 * TODO Noise should be added to the input to avoid over-fitting
			 */
			const BASE = 1;
			var A = [
				[0.0 + BASE, 1.0 + BASE, 0.0 + BASE, 0.0 + BASE],
				[1.0 + BASE, 1.0 + BASE, 1.0 + BASE, 0.0 + BASE]
			];

			/**
			 * The answer sheet must be 0 or 1
			 * Meaning yes or no 100%
			 */
			var B = [0, 1];

			/**
			 * Weights must be between 0 and 1
			 * Weights represent if the network should include the connection or not
			 */
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

					/** */
					W[0] = vector_add(W[0], vector_mul_value(A[ie], E * sigmoid_derivative(P)));

					if (i % (iterations / 10) == 0) {
						error_data[ie].push(E);
					}
				}
			}

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

angular.module("blossom").directive("multiLayerSection", [() => {
	return {
		restrict: "E",
		replace: true,
		template: `
<div class="section">
	<canvas></canvas>
</div>
`,
		link: function ($scope, $element, $attributes, $controller) {
			setTimeout(() => {
				var context = $element.find("canvas")[0].getContext("2d");
				var t = new Trainer();
				var chart = new Chart(context, {
					type: "line",
					data: t.chartData(),
					options: chartOptions()
				});
			}, 0);

			class Trainer {
				constructor() {
					this.ITERATIONS = 1;
					this.BASE = 1;

					this.sets = []; //List of training sets
					this.layerWeights = [];

					this.A_LENGTH = 4;
					this.B_LENGTH = 1;

					this.addSet([0, 0, 0, 0], [0]);
					this.addSet([1, 1, 1, 1], [1]);

					this.addNeuron(0);
					this.addNeuron(0);

					this.addNeuron(1);
				}

				startValue() {
					return 0.5;
				}

				layerLength(index) {
					if (index < 0) {
						return this.A_LENGTH;
					}

					return this.layerWeights[index].length;
				}

				addNeuron(layerIndex) {
					var weights = [];
					var length = this.layerLength(layerIndex - 1);

					for (var i = 0; i < length; i++) {
						weights.push(this.startValue());
					}

					if (!this.layerWeights[layerIndex]) this.layerWeights[layerIndex] = [];
					this.layerWeights[layerIndex].push(weights);
				}

				/**
				 * All training sets must have the same dimensions
				 */
				addSet(a, b) {
					if (a.length != this.A_LENGTH && b.length != this.B_LENGTH) throw "invalid dimensions";

					this.adjustInput(a);
					this.sets.push({
						a: a, //input data
						b: b //expected output data
					});
				}

				/**
				 * Adjust the input to avoid zero training
				 */
				adjustInput(input) {
					for (var i = 0; i < input.length; i++) {
						input[i] += this.BASE;
					}
				}

				getLayerValues(layerIndex) {
					if (layerIndex < 0) return set.a;
					return values[layerIndex];
				}

				computeLayer(layerIndex, layerResults) {
					var result = []; //TODO
					var inputs = layerResults[layerIndex];
					var neuronCount = this.layerWeights[layerIndex].length;
					//console.log("neuronCount", neuronCount);

					for (var i = 0; i < neuronCount; i++) {
						var weights = this.layerWeights[layerIndex][i];
						var P = sigmoid(vector_dot(inputs, weights));
						result.push(P); //TODO push P or binary 1 0?
					}

					layerResults.push(result); //TODO
				}

				updateLayer(layerIndex, layerResults) {
					console.log("updateLayers", layerIndex, layerResults[layerIndex], this.layerWeights[layerIndex]);
					var W = this.layerWeights[layerIndex];
					var R = layerResults[layerIndex];

					for (var i = 0; i < R.length; i++) {
						var weights = W[i];
						var P = R[i - 1];
						var E = R[i] - P;
						W[i] = vector_add(weights, vector_mul_value(weights, E * sigmoid_derivative(P)));
					}
				}

				trainSetOnce(set) {
					console.log("layerWeights", this.layerWeights);
					var layerResults = [set.a.slice()]; //TODO

					/**
					 * forward propagation
					 */
					for (var i = 0; i < this.layerWeights.length; i++) {
						this.computeLayer(i, layerResults);
					}

					/**
					 * backward propagation
					 */
					layerResults.push(set.b.slice()); //TODO
					console.log("layerResults", layerResults);

					for (var i = this.layerWeights.length - 1; i >= 0; i--) {
						this.updateLayer(i, layerResults);
					}

					console.log("layerWeights", this.layerWeights);

					/**
					 * compute the average error
					 */
					var error = 0;
					var finalLayer = layerResults[layerResults.length];
					for (var i = 0; i < set.b.length; i++) {
						error += set.b[i] - finalLayer[i];
					}
					return error;
				}

				isMilestone(i) {
					return i % (this.ITERATIONS / 10) == 0;
				}

				chartData() {
					var d = {};
					d.labels = [];
					d.datasets = [];

					for (var is = 0; is < this.sets.length; is++) {
						d.datasets.push({
							label: "Error" + is,
							data: [],
							backgroundColor: "#" + (Math.round(0xFFFFFF / this.sets.length) * is).toString(16),
							fill: false
						});
					};

					for (var i = 0; i < this.ITERATIONS; i++) {
						if (this.isMilestone(i)) {
							d.labels.push(i);
						}

						for (var is = 0; is < 1; is++) {
							var error = this.trainSetOnce(this.sets[is]);

							if (this.isMilestone(i)) {
								d.datasets[is].data.push(error);
							}
						}
					}

					console.log(d);
					return d;
				}
			}
		}
	}
}]);
