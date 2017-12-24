//https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/comment-page-10/#comment-24776

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

let i1 = 0.05;
let i2 = 0.10;
let h1;
let h2;
let target_o1 = 0.01;
let target_o2 = 0.99;

let w1 = 0.15;
let w2 = 0.20;
let w3 = 0.25;
let w4 = 0.30;
let w5 = 0.40;
let w6 = 0.45;
let w7 = 0.50;
let w8 = 0.55;

let b1 = 0.35;
let b2 = 0.60;

let net_h1 = w1 * i1 + w2 * i2 + b1 * 1;
let out_h1 = sigmoid(net_h1);

let net_h2 = w3 * i1 + w4 * i2 + b1 * 1;
let out_h2 = sigmoid(net_h2);

let net_o1 = w5 * out_h1 + w6 * out_h2 + b2 * 1;
let out_o1 = sigmoid(net_o1);

let net_o2 = w7 * out_h1 + w8 * out_h2 + b2 * 1;
let out_o2 = sigmoid(net_o2);

let e_o1 = 0.5 * (target_o1 - out_o1) * (target_o1 - out_o1);
let e_o2 = 0.5 * (target_o2 - out_o2) * (target_o2 - out_o2);
let e_total = e_o1 + e_o2;

let learningRate = 0.5;

/**
 * When we take the partial derivative of the total error with respect to out_o1
 * The quantity out_o2 disappear because it does not affect it
 */
let e_total_gradient_out_o1 = out_o1 - target_o1;
let out_o1_gradient_net_o1 = sigmoid_derivative(out_o1);

let net_o1_gradient_w5 = out_h1;
let e_total_gradient_w5 = e_total_gradient_out_o1 * out_o1_gradient_net_o1 * net_o1_gradient_w5;
let delta_w5 = w5 - learningRate * e_total_gradient_w5;

let net_o1_gradient_w6 = out_h2;
let e_total_gradient_w6 = e_total_gradient_out_o1 * out_o1_gradient_net_o1 * net_o1_gradient_w6;
let delta_w6 = w6 - learningRate * e_total_gradient_w6;

/**
 * When we take the partial derivative of the total error with respect to out_o2
 * The quantity out_o1 disappear because it does not affect it
 */
let e_total_gradient_out_o2 = out_o2 - target_o2;
let out_o2_gradient_net_o2 = sigmoid_derivative(out_o2);

let net_o2_gradient_w7 = out_h1;
let e_total_gradient_w7 = e_total_gradient_out_o2 * out_o2_gradient_net_o2 * net_o2_gradient_w7;
let delta_w7 = w7 - learningRate * e_total_gradient_w7;

let net_o2_gradient_w8 = out_h2;
let e_total_gradient_w8 = e_total_gradient_out_o2 * out_o2_gradient_net_o2 * net_o2_gradient_w8;
let delta_w8 = w8 - learningRate * e_total_gradient_w8;

/**
 * Next layer
 * We are going to use a similar process as we did for the output layer,
 * but slightly different to account for the fact that
 * the output of each hidden layer neuron contributes to the output of multiple output neurons
 */
let e_o1_gradient_net_o1 = e_total_gradient_out_o1 * out_o1_gradient_net_o1;
let net_o1_gradient_out_h1 = w5;
let e_o1_gradient_out_h1 = e_o1_gradient_net_o1 * net_o1_gradient_out_h1;

let e_o2_gradient_net_o2 = e_total_gradient_out_o2 * out_o2_gradient_net_o2;
let net_o2_gradient_out_h1 = w7;
let e_o2_gradient_out_h1 = e_o2_gradient_net_o2 * net_o2_gradient_out_h1;

let e_total_gradient_out_h1 = e_o1_gradient_out_h1 + e_o2_gradient_out_h1;
let out_h1_gradient_net_h1 = sigmoid_derivative(out_h1);

let net_h1_gradient_w1 = i1;
let e_total_gradient_w1 = e_total_gradient_out_h1 * out_h1_gradient_net_h1 * net_h1_gradient_w1;
let delta_w1 = w1 - learningRate * e_total_gradient_w1;

let net_h1_gradient_w2 = i2;
let e_total_gradient_w2 = e_total_gradient_out_h1 * out_h1_gradient_net_h1 * net_h1_gradient_w2;
let delta_w2 = w2 - learningRate * e_total_gradient_w2;

/**
 * h2
 */
let net_o1_gradient_out_h2 = w6;
let e_o1_gradient_out_h2 = e_o1_gradient_net_o1 * net_o1_gradient_out_h2;

let net_o2_gradient_out_h2 = w8;
let e_o2_gradient_out_h2 = e_o2_gradient_net_o2 * net_o2_gradient_out_h2;

let e_total_gradient_out_h2 = e_o1_gradient_out_h2 + e_o2_gradient_out_h2;
let out_h2_gradient_net_h2 = sigmoid_derivative(out_h2);

let net_h2_gradient_w3 = i1;
let e_total_gradient_w3 = e_total_gradient_out_h2 * out_h2_gradient_net_h2 * net_h2_gradient_w3;
let delta_w3 = w3 - learningRate * e_total_gradient_w3;

let net_h2_gradient_w4 = i2;
let e_total_gradient_w4 = e_total_gradient_out_h2 * out_h2_gradient_net_h2 * net_h2_gradient_w4;
let delta_w4 = w4 - learningRate * e_total_gradient_w4;