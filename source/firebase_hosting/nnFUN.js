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

const Feature = [
  {
    out: 0.05
  },
  {
    out: 0.10
  }
];
const Answer = [0.01, 0.99];
const Bias1 = 0.35;
const Bias2 = 0.60;
const LearningRate = 0.5;

const Neuron = [
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

const Weight = [
  {
    name: 'w1',
    value: 0.15,
    error: 0
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

Layer = [
  [

  ],
  [],
  [],
];

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

function computeNeurons() {


  for (let i = 1; i < Neuron.length; i++) {
    let neuron = Neuron[i];
  }
}

computeNeurons();

{
  let neuron = Neuron[0];
  let out = computeNeuronOut(Neuron[0].bias, Feature, [Weight[0], Weight[1]]);
  let change = computeNeuronChange(out);
  Neuron[0].out = out;
  Neuron[0].change = change;
}

{
  let neuron = Neuron[1];
  let out = computeNeuronOut(neuron.bias, Feature, [Weight[2], Weight[3]]);
  let change = computeNeuronChange(out);
  neuron.out = out;
  neuron.change = change;
}

{
  let neuron = Neuron[2];
  let out = computeNeuronOut(neuron.bias, [Neuron[0], Neuron[1]], [Weight[4], Weight[5]]);
  let change = computeNeuronChange(out);
  neuron.out = out;
  neuron.change = change;
}

{
  let neuron = Neuron[3];
  let out = computeNeuronOut(neuron.bias, [Neuron[0], Neuron[1]], [Weight[6], Weight[7]]);
  let change = computeNeuronChange(out);
  neuron.out = out;
  neuron.change = change;
}

Neuron[2].error = Neuron[2].out - Answer[0];
Neuron[3].error = Neuron[3].out - Answer[1];
Neuron[0].error = computeNeuronError([Neuron[2], Neuron[3]], [Weight[4], Weight[6]]);
Neuron[1].error = computeNeuronError([Neuron[2], Neuron[3]], [Weight[5], Weight[7]]);

Weight[7].error = computeWeightError(Neuron[1], Neuron[3]);
Weight[7].value = computeWeightValue(Weight[7]);

Weight[6].error = computeWeightError(Neuron[0], Neuron[3]);
Weight[6].value = computeWeightValue(Weight[6]);

Weight[5].error = computeWeightError(Neuron[1], Neuron[2]);
Weight[5].value = computeWeightValue(Weight[5]);

Weight[4].error = computeWeightError(Neuron[0], Neuron[2]);
Weight[4].value = computeWeightValue(Weight[4]);

Weight[3].error = computeWeightError(Feature[1], Neuron[1]);
Weight[3].value = computeWeightValue(Weight[3]);

Weight[2].error = computeWeightError(Feature[0], Neuron[1]);
Weight[2].value = computeWeightValue(Weight[2]);

Weight[1].error = computeWeightError(Feature[1], Neuron[0]);
Weight[1].value = computeWeightValue(Weight[1]);

Weight[0].error = computeWeightError(Feature[0], Neuron[0]);
Weight[0].value = computeWeightValue(Weight[0]);

// console.log(Neuron[0].out);
// console.log(Neuron[1].out);
// console.log(Neuron[2].out);
// console.log(Neuron[3].out);

// console.log(Neuron[0].error);
// console.log(Neuron[1].error);
// console.log(Neuron[2].error);
// console.log(Neuron[3].error);

console.log(Weight[7].value);
console.log(Weight[6].value);
console.log(Weight[5].value);
console.log(Weight[4].value);
console.log(Weight[3].value);
console.log(Weight[2].value);
console.log(Weight[1].value);
console.log(Weight[0].value);
