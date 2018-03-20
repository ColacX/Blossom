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

const W = [
  [[0.15, 0.20], [0.25, 0.30]],
  [[0.40, 0.45], [0.50, 0.55]]
];

//neuron
const N = [
  ['i1', 'i2'],
  ['h1', 'h2'],
  ['o1', 'o2']
]

//bias
const B = [
  [0.35, 0.35],
  [0.60, 0.60]
];

//output
const O = [
  [0, 0],
  [0, 0]
];

//error
const E = [
  [0, 0],
  [0, 0]
];

//change
const C = [
  [0, 0],
  [0, 0]
];

//question
const Q = [0.05, 0.10];

//answer
const A = [0.01, 0.99];

function computeNeuron(r, c) {
  let sum = B[r][c];

  for (let i = 0; i < W[r - 1][c].length; i++) {
    sum += O[r - 1][i] * W[r][c][i];
  }

  const out = sigmoid(sum);
  const change = sigmoid_derivative(out);
  O[r][c] = out;
  C[r][c] = change;

  console.log(out, change);
}

function computeOut(bias, inputs, weights) {
  let sum = bias;

  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
  }

  return sigmoid(sum);
}

function computeChange(out) {
  return sigmoid_derivative(out);
}

function computeError(errors, changes, weight) {
  for (let i = 0; i < ; i++) {
    sum += E[l][i] * C[l][i] * W[l][neuronIndex][i];
  }
  return sum;
}

function computeWeightError(neuronOutError, neuronOutChange, neuronInOut) {
}

function computeWeightNext() {
  // let weight = W[id];
  // weight.error = weight.computeError();
  // weight.value = weight.value - learningRate * weight.error;
}

{
  let out = computeOut(0.35, Q, W[0][0]);
  let change = computeChange(out);
  console.log(out, change);
  O[0][0] = out;
  C[0][0] = change;
}

{
  let out = computeOut(0.35, Q, W[0][1]);
  let change = computeChange(out);
  console.log(out, change);
  O[0][1] = out;
  C[0][1] = change;
}

{
  let out = computeOut(0.60, O[0], W[1][0]);
  let change = computeChange(out);
  console.log(out, change);
  O[1][0] = out;
  C[1][0] = change;
}

{
  let out = computeOut(0.60, O[0], W[1][1]);
  let change = computeChange(out);
  console.log(out, change);
  O[1][1] = out;
  C[1][1] = change;
}

E[1][0] = O[1][0] - A[0];
E[1][1] = O[1][1] - A[1];
E[0][0] = computeError(0, 0);
E[0][1] = computeError(0, 1);

console.log(E[1][0]);
console.log(E[1][1]);
console.log(E[0][0]);
console.log(E[0][1]);
let w8next = computeWeightNext();