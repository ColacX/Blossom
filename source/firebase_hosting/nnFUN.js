//https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

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

const Feature = [0.05, 0.10];
const Answer = [0.01, 0.99];
const LearningRate = 0.5;

const Neuron = [
  {
    name: 'i1',
    out: 0
  },
  {
    name: 'i2',
    out: 0
  },
  {
    name: 'h1',
    bias: 0.35,
    out: 0,
    error: 0,
    change: 0
  },
  {
    name: 'h2',
    bias: 0.35,
    out: 0,
    error: 0,
    change: 0
  },
  {
    name: 'o1',
    bias: 0.60,
    out: 0,
    error: 0,
    change: 0
  },
  {
    name: 'o2',
    bias: 0.60,
    out: 0,
    error: 0,
    change: 0
  }
];

const Edge = [
  {
    name: 'w1',
    weight: 0.15,
    error: 0,
  },
  {
    name: 'w2',
    value: 0.20,
    error: 0
  },
  {
    name: 'w3',
    value: 0.25,
    error: 0
  },
  {
    name: 'w4',
    value: 0.30,
    error: 0
  },
  {
    name: 'w5',
    value: 0.40,
    error: 0
  },
  {
    name: 'w6',
    value: 0.45,
    error: 0
  },
  {
    name: 'w7',
    value: 0.50,
    error: 0
  },
  {
    name: 'w8',
    value: 0.55,
    error: 0
  }
];

const Config = [2, 2, 2];

/**
 * computes the neuron output
 */
function computeNeuronOut(bias, nets, weights) {
  let sum = bias;
  for (let i = 0; i < nets.length; i++) {
    sum += nets[i].out * weights[i].value;
  }
  return sigmoid(sum);
}

/**
 * computes the neurons derivative change
 */
function computeNeuronChange(out) {
  return sigmoid_derivative(out);
}

/**
 * computes the neurons derivative error
 */
function computeNeuronError(neurons, weights) {
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += neurons[i].error * neurons[i].change * weights[i].value;
  }
  return sum;
}

/**
 * computes the weights derivative error
 */
function computeWeightError(neuronIn, neuronOut) {
  return neuronOut.error * neuronOut.change * neuronIn.out;
}

/**
 * computes the weights updated value
 */
function computeWeightValue(weight) {
  return weight.value - LearningRate * weight.error;
}

function computeForward() {

  /**
   * copy feature vector into first layer of neurons
   */
  for (let i = 0; i < Feature.length; i++) {
    Neuron[i].out = Feature[i];
  }

  /**
   * compute the other layers, skip the first layer
   */
  for (let ni = Config[0]; ni < Neuron.length; i++) {
    let neuron = Neuron[ni];
    let out = computeNeuronOut(neuron.bias, neuron.netEdges);
    let change = computeNeuronChange(out);
    neuron.out = out;
    neuron.change = change;
  }

  let offset = 0;

  for (let li = 1; li < Layer.length; li++) {
    for (let ni = 0; ni < Layer[li].length; ni++) {
      let neuron = Layer[li][ni];
      let count = Layer[li - 1].length;
      let out = computeNeuronOut(neuron.bias, Layer[li - 1], Edge.slice(offset, offset + count));
      let change = computeNeuronChange(out);
      neuron.out = out;
      neuron.change = change;
      offset += count;
    }
  }
}

computeForward();

{
  let neuron = Neuron[3];
  let out = computeNeuronOut(neuron.bias, Feature, [Weight[0], Weight[1]]);
  let change = computeNeuronChange(out);
  neuron.out = out;
  neuron.change = change;
}

// {
//   let neuron = Neuron[1];
//   let out = computeNeuronOut(neuron.bias, Feature, [Weight[2], Weight[3]]);
//   let change = computeNeuronChange(out);
//   neuron.out = out;
//   neuron.change = change;
// }

// {
//   let neuron = Neuron[2];
//   let out = computeNeuronOut(neuron.bias, [Neuron[0], Neuron[1]], [Weight[4], Weight[5]]);
//   let change = computeNeuronChange(out);
//   neuron.out = out;
//   neuron.change = change;
// }

// {
//   let neuron = Neuron[3];
//   let out = computeNeuronOut(neuron.bias, [Neuron[0], Neuron[1]], [Weight[6], Weight[7]]);
//   let change = computeNeuronChange(out);
//   neuron.out = out;
//   neuron.change = change;
// }

function computeBackward() {
  for (let ni = 0; ni < Answer.length; ni++) {
    let neuron = Layer[Layer.length - 1][ni];
    neuron.error = neuron.out - Answer[ni];
  }

  for (let li = Layer.length - 2; li => 0; li--) {
    for (let ni = 0; ni < Answer.length; ni++) {
      let neuron = Layer[li][ni];
      neuron.error = computeNeuronError(Layer[li + 1], Backward[?]);
    }
  }
}

computeBackward();

Neuron[2].error = Neuron[2].out - Answer[0];
Neuron[3].error = Neuron[3].out - Answer[1];
Neuron[0].error = computeNeuronError([Neuron[2], Neuron[3]], [Edge[4], Edge[6]]);
Neuron[1].error = computeNeuronError([Neuron[2], Neuron[3]], [Edge[5], Edge[7]]);

Edge[7].error = computeWeightError(Neuron[1], Neuron[3]);
Edge[7].weight = computeWeightValue(Edge[7]);

Edge[6].error = computeWeightError(Neuron[0], Neuron[3]);
Edge[6].weight = computeWeightValue(Edge[6]);

Edge[5].error = computeWeightError(Neuron[1], Neuron[2]);
Edge[5].weight = computeWeightValue(Edge[5]);

Edge[4].error = computeWeightError(Neuron[0], Neuron[2]);
Edge[4].weight = computeWeightValue(Edge[4]);

Edge[3].error = computeWeightError(Feature[1], Neuron[1]);
Edge[3].weight = computeWeightValue(Edge[3]);

Edge[2].error = computeWeightError(Feature[0], Neuron[1]);
Edge[2].weight = computeWeightValue(Edge[2]);

Edge[1].error = computeWeightError(Feature[1], Neuron[0]);
Edge[1].weight = computeWeightValue(Edge[1]);

Edge[0].error = computeWeightError(Feature[0], Neuron[0]);
Edge[0].weight = computeWeightValue(Edge[0]);

// console.log(Neuron[0].out);
// console.log(Neuron[1].out);
// console.log(Neuron[2].out);
// console.log(Neuron[3].out);

console.log(Neuron[0].error);
console.log(Neuron[1].error);
console.log(Neuron[2].error);
console.log(Neuron[3].error);

console.log(Edge[7].weight);
console.log(Edge[6].weight);
console.log(Edge[5].weight);
console.log(Edge[4].weight);
console.log(Edge[3].weight);
console.log(Edge[2].weight);
console.log(Edge[1].weight);
console.log(Edge[0].weight);
