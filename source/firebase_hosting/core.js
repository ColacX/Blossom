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
 */
function sigmoid_derivative(sigmoid_value) {
	return sigmoid_value * (1 - sigmoid_value);
}

// for (var i = -6; i < +6; i += 0.1) {
// 	console.log(i, sigmoid(i));
// }

// function sigmoid_derivative() {
// }

// var prediction;

// for (var i = 0; i < 50; i++) {
// 	prediction = predict();
// 	var prediction_error = answer - prediction;
// 	var prediction_delta = prediction_error * sigmoid_derivative(prediction);
// 	var weight_delta;
// 	var weight = weight + weight_delta;
// }

// console.log(prediction);

