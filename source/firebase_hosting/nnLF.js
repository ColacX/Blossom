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

/**
 * inputs
 */
const i1 = 0.05;
const i2 = 0.10;

/**
 * ideal target outputs
 */
const target_o1 = 0.01;
const target_o2 = 0.99;

/**
 * weights
 */
const w1 = 0.15;
const w2 = 0.20;
const w3 = 0.25;
const w4 = 0.30;
const w5 = 0.40;
const w6 = 0.45;
const w7 = 0.50;
const w8 = 0.55;

/**
 * biases
 */
const b1 = 0.35;
const b2 = 0.60;

/**
 * misc constants
 */
const learningRate = 0.5;

let input1 = {};
let input2 = {};

let hidden1 = {};
let hidden2 = {};

let output1 = {};
let output2 = {};

let weight1 = {};
let weight2 = {};
let weight3 = {};
let weight4 = {};
let weight5 = {};
let weight6 = {};
let weight7 = {};
let weight8 = {};

let bias1 = b1;
let bias2 = b2;

weight1.value = w1;
weight2.value = w2;
weight3.value = w3;
weight4.value = w4;
weight5.value = w5;
weight6.value = w6;
weight7.value = w7;
weight8.value = w8;

input1.out = () => i1;
input2.out = () => i2;

//error derivative of total error
//change derivative of output change

output1.net = () => weight5.value * hidden1.out() + weight6.value * hidden2.out() + bias2;
output1.out = () => output1._out ? output1._out : output1._out = sigmoid(output1.net());
output1.error = () => output1.out() - target_o1;
output1.change = () => sigmoid_derivative(output1.out());

output2.net = () => weight7.value * hidden1.out() + weight8.value * hidden2.out() + bias2;
output2.out = () => output2._out ? output2._out : output2._out = sigmoid(output2.net());
output2.error = () => output2.out() - target_o2;
output2.change = () => sigmoid_derivative(output2.out());

hidden1.net = () => weight1.value * input1.out() + weight2.value * input2.out() + bias1;
hidden1.out = () => hidden1._out ? hidden1._out : hidden1._out = sigmoid(hidden1.net());
hidden1.error = () => output1.error() * output1.change() * weight5.value + output2.error() * output2.change() * weight7.value;
hidden1.change = () => sigmoid_derivative(hidden1.out());

hidden2.net = () => weight3.value * input1.out() + weight4.value * input2.out() + bias1;
hidden2.out = () => hidden2._out ? hidden2._out : hidden2._out = sigmoid(hidden2.net());
hidden2.error = () => output1.error() * output1.change() * weight6.value + output2.error() * output2.change() * weight8.value;
hidden2.change = () => sigmoid_derivative(hidden2.out());

weight1.net = () => input1.out();
weight1.error = () => hidden1.error() * hidden1.change() * weight1.net();
weight1.next = () => weight1.value - learningRate * weight1.error();

weight2.net = () => input2.out();
weight2.error = () => hidden1.error() * hidden1.change() * weight2.net();
weight2.next = () => weight2.value - learningRate * weight2.error();

weight3.net = () => input1.out();
weight3.error = () => hidden2.error() * hidden2.change() * weight3.net();
weight3.next = () => weight3.value - learningRate * weight3.error();

weight4.net = () => input2.out();
weight4.error = () => hidden2.error() * hidden2.change() * weight4.net();
weight4.next = () => weight4.value - learningRate * weight4.error();

weight5.net = () => hidden1.out();
weight5.error = () => output1.error() * output1.change() * weight5.net();
weight5.next = () => weight5.value - learningRate * weight5.error();

weight6.net = () => hidden2.out();
weight6.error = () => output1.error() * output1.change() * weight6.net();
weight6.next = () => weight6.value - learningRate * weight6.error();

weight7.net = () => hidden1.out();
weight7.error = () => output2.error() * output2.change() * weight7.net();
weight7.next = () => weight7.value - learningRate * weight7.error();

weight8.net = () => hidden2.out();
weight8.error = () => output2.error() * output2.change() * weight8.net();
weight8.next = () => weight8.value - learningRate * weight8.error();

console.log("nn.js");
console.log("next_w1", weight1.next());
console.log("next_w2", weight2.next());
console.log("next_w3", weight3.next());
console.log("next_w4", weight4.next());
console.log("next_w5", weight5.next());
console.log("next_w6", weight6.next());
console.log("next_w7", weight7.next());
console.log("next_w8", weight8.next());
