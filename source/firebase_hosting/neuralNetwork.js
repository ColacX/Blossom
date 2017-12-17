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

class Neuron {
	constructor() {
		this.output = 0.0;
		this.bias = 0;
		this.connections = [];
	}

	compute() {
		let sum = 0.0;

		for (var connection of this.connections) {
			sum += connection.neuron.output * connection.neuron.weight;
		}

		this.output = sigmoid(sum);
	}
}

class Connection {
	constructor(neuron, weight) {
		this.neuron = neuron;
		this.weight = weight;
	}
}

class Layer {
	constructor() {
		this.neurons = [];
	}
}

class InputLayer extends Layer {
}

class OutputLayer extends Layer {
}

class Set {
	constructor(input, ideal) {
		this.input = input;
		this.ideal = ideal;
	}
}

class Network {
	constructor() {
		this.layers = [];
	}

	async save() {
	}

	async load() {
		for (let li = 0; li < 2; li++) {
			let layer = new Layer();

			for (let ni = 0; ni < 2; ni++) {
				let neuron = new Neuron();
				layer.neurons.push(neuron);
			}

			this.layers.push(layer);
		}

		/**
		 * link all neurons layer by layer
		 * starting from the last one
		 */
		for (let li = this.layers.length - 1; li > 0; li--) {
			let layerA = this.layers[li - 1];
			let layerB = this.layers[li];

			for (let neuronB of layerB.neurons) {
				for (let neuronA of layerA.neurons) {
					neuronB.connections.push(new Connection(neuronA, 0.5));
				}
			}
		}
	}

	async train() {
	}

	async compute() {
		//forward propagation
		for (let layer of this.layers) {
			for (let neuron of layer.neurons) {
				neuron.compute();
			}
		}
	}
}

(async () => {
	let network = new Network();
	await network.load();
	await network.compute();
	console.log(network);
})();