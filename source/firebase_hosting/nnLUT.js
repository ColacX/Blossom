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

const N = {};
const W = {};
const learningRate = 0.5;

function addNeuron(neuronId, bias) {
  N[neuronId] = {
    bias: bias,
    net: 0,
    out: 0,
    netList: [],
    outList: [],
    error: 0,
    computeError: () => {
      let sum = 0;
      for (let f of N[neuronId].outList) {
        sum += f();
      }
      return sum;
    }
  };
}

function addWeight(weightId, weightValue, nIn, nOut) {
  W[weightId] = { name: weightId, value: weightValue, error: 0 };
  let weight = W[weightId];
  let neuronIn = N[nIn];
  let neuronOut = N[nOut];

  neuronOut.netList.push(() => neuronIn.out * weight.value);
  // neuronIn.outList.push(() => {
  //   console.log(neuronOut.error, neuronOut.change, weight.value);
  //   return neuronOut.error * neuronOut.change * weight.value;
  // });
  neuronIn.outList.push(() => neuronOut.error * neuronOut.change * weight.value);

  W[weightId].computeError = () => neuronOut.error * neuronOut.change * neuronIn.out;
}

function computeNeuron(id) {
  let neuron = N[id];

  let sum = neuron.bias;
  for (let f of neuron.netList) {
    sum += f();
  }

  neuron.net = sum;
  neuron.out = sigmoid(neuron.net);
  neuron.change = sigmoid_derivative(neuron.out);
}

function computeNeuronError(neuron) {
  neuron.error = neuron.computeError();
}

function computeWeight(id) {
  let weight = W[id];
  weight.error = weight.computeError();
  weight.value = weight.value - learningRate * weight.error;
}

const bias1 = 0.35;
const bias2 = 0.60;

addNeuron("i1");
addNeuron("i2");
addNeuron("h1", bias1);
addNeuron("h2", bias1);
addNeuron("o1", bias2);
addNeuron("o2", bias2);

addWeight("w1", 0.15, "i1", "h1");
addWeight("w2", 0.20, "i2", "h1");
addWeight("w3", 0.25, "i1", "h2");
addWeight("w4", 0.30, "i2", "h2");
addWeight("w5", 0.40, "h1", "o1");
addWeight("w6", 0.45, "h2", "o1");
addWeight("w7", 0.50, "h1", "o2");
addWeight("w8", 0.55, "h2", "o2");

/**
 * forward
 */

N["i1"].out = 0.05;
N["i2"].out = 0.10;
computeNeuron("h1");
computeNeuron("h2");
computeNeuron("o1");
computeNeuron("o2");

/**
 * backward
 */

const target_o1 = 0.01;
const target_o2 = 0.99;
N["o1"].error = N["o1"].out - target_o1;
N["o2"].error = N["o2"].out - target_o2;

N["h1"].error = N["h1"].computeError();
N["h2"].error = N["h2"].computeError();

computeWeight("w8");
computeWeight("w7");
computeWeight("w6");
computeWeight("w5");
computeWeight("w4");
computeWeight("w3");
computeWeight("w2");
computeWeight("w1");

// console.log(N["h1"].out);
// console.log(N["h2"].out);
// console.log(N["o1"].out);
// console.log(N["o2"].out);

console.log(N["o1"].error);
console.log(N["o2"].error);
console.log(N["h1"].error);
console.log(N["h2"].error);

console.log(W["w8"].value);
console.log(W["w7"].value);
console.log(W["w6"].value);
console.log(W["w5"].value);
console.log(W["w4"].value);
console.log(W["w3"].value);
console.log(W["w2"].value);
console.log(W["w1"].value);