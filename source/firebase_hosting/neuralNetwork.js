/**
 * layered neural network without circular loops
 * use layers to improve the computation efficiency
 * compute the cost functions per layer instead of per neuron
 * 
 * squared error function
 * purpose is learn and explain neural network for dummies step by step, refer to outer sites and wikipedia
 * visualize layer by layer include step by step neuron by neuron
 * do not try bigger networks since it is not very efficient
 * feed configuration and input with text, output text like Kattis
 * terminology
 * chain rule
 * squared error function
 * sigmoid function
 * activation function
 * neuron
 * network
 * layer
 * backward propagation
 * forward propagation
 * training
 * deltaIT deltaKnow deltazero company name?
 * https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/
 */

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

class Neuron {
	constructor() {
		this.output = 0.0;
		this.bias = 0;
		this.connections = [];
	}

	compute() {
		let sum = this.bias;

		for (let connection of this.connections) {
			sum += connection.neuron.output * connection.weight;
		}

		this.output = sigmoid(sum);
	}
}

class Connection { }
class Layer { }
class Set { }

class Network {
	constructor() {
	}

	async save() {
	}

	// async load() {
	// 	for (let li = 0; li < 2; li++) {
	// 		let layer = new Layer();

	// 		for (let ni = 0; ni < 2; ni++) {
	// 			let neuron = new Neuron();
	// 			layer.neurons.push(neuron);
	// 		}

	// 		this.layers.push(layer);
	// 	}

	// 	/**
	// 	 * link all neurons layer by layer
	// 	 * starting from the last one
	// 	 */
	// 	for (let li = this.layers.length - 1; li > 0; li--) {
	// 		let layerA = this.layers[li - 1];
	// 		let layerB = this.layers[li];

	// 		for (let neuronB of layerB.neurons) {
	// 			for (let neuronA of layerA.neurons) {
	// 				let connection = new Connection(neuronA, 0.5);
	// 				neuronB.connections.push(connection);
	// 			}
	// 		}
	// 	}
	// }

	async train(set) {
		//apply inputs from training set
		for (let i = 0; i < set.inputs.length; i++) {
			this.inputLayer.neurons[i].output = set.inputs[i];
		}

		//forward propagation
		for (let layer of this.hiddenLayers) {
			for (let neuron of layer.neurons) {
				neuron.compute();
			}
		}

		for (let neuron of this.outputLayer.neurons) {
			neuron.compute();
		}

		/**
		 * Calculate the total error using the squared error function
		 */
		let errorTotal = 0.0;

		for (let i = 0; i < set.inputs.length; i++) {
			let error = 0.5 * Math.pow(set.ideals[i] - this.outputLayer.neurons[i].output, 2);
			errorTotal += error;
		}

		console.log(errorTotal);

		//backward propagation
		for (let i = this.hiddenLayers.length - 1; i >= 0; i--) {
			let layer = this.hiddenLayers[i];

			for (let neuron of layer.neurons) {

			}
		}
	}
}

(async () => {
	let network = new Network();

	let i1 = new Neuron();
	let i2 = new Neuron();
	let h1 = new Neuron();
	let h2 = new Neuron();
	let o1 = new Neuron();
	let o2 = new Neuron();

	let b1 = 0.35;
	let b2 = 0.60;

	i1.name = "i1";
	i2.name = "i2";

	h1.name = "h1";
	h1.bias = b1;

	h2.name = "h2";
	h2.bias = b1;

	o1.name = "o1";
	o1.bias = b2;

	o2.name = "o2";
	o2.bias = b2;

	let w1 = new Connection();
	let w2 = new Connection();
	let w3 = new Connection();
	let w4 = new Connection();
	let w5 = new Connection();
	let w6 = new Connection();
	let w7 = new Connection();
	let w8 = new Connection();

	let inputLayer = new Layer();
	inputLayer.neurons = [i1, i2];
	network.inputLayer = inputLayer;

	let hiddenLayer = new Layer();
	hiddenLayer.neurons = [h1, h2];
	network.hiddenLayers = [hiddenLayer];

	let outputLayer = new Layer();
	outputLayer.neurons = [o1, o2];
	network.outputLayer = outputLayer;

	{
		w1.weight = 0.15;
		w1.neuron = i1;

		w2.weight = 0.20;
		w2.neuron = i2;

		h1.connections = [w1, w2];
	}

	{
		w3.weight = 0.25;
		w3.neuron = i1;

		w4.weight = 0.30;
		w4.neuron = i2;

		h2.connections = [w3, w4];
	}

	{
		w5.weight = 0.40;
		w5.neuron = h1;

		w6.weight = 0.45;
		w6.neuron = h2;

		o1.connections = [w5, w6];
	}

	{
		w7.weight = 0.50;
		w7.neuron = h1;

		w8.weight = 0.55;
		w8.neuron = h2;

		o2.connections = [w7, w8];
	}


	{
		let set = new Set();
		set.inputs = [0.05, 0.10];
		set.ideals = [0.01, 0.99];
		network.sets = [set];
	}

	console.log(network);
	await network.train(network.sets[0]);
	console.log(network);
})();
