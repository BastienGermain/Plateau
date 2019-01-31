// create the network
const { Neuron, Layer, Network } = window.synaptic;

var neuronNetwork;

const nbInput = 361;
const nbHidden1 = 200;
const nbHidden2 = 100;

var inputLayer = new Layer(nbInput);
var hidden1Layer = new Layer(nbHidden1);
var hidden2Layer = new Layer(nbHidden2);
var outputLayer = new Layer(1);

// Change squashing function to tanh and handle bias
inputLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

hidden1Layer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

hidden2Layer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

outputLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

// Connect the layers
inputLayer.project(hidden1Layer, Layer.connectionType.ALL_TO_ALL);
hidden1Layer.project(hidden2Layer, Layer.connectionType.ALL_TO_ALL);
hidden2Layer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

// Create network
var myNetwork = new Network({
	input: inputLayer,
	hidden: [hidden1Layer, hidden2Layer],
	output: outputLayer
});

var exported = myNetwork.toJSON();

let l, k;
let startSecondConnection = nbInput*nbHidden1;
let startThirdConnection = startSecondConnection + nbHidden1*nbHidden2;

$.getJSON("assets/json/WEIGHTS_1to2.json", function(json) {

	for (l = 0; l < nbInput; l++) {
		for (k = 0; k < nbHidden1; k++) {
			exported.connections[l * nbHidden1 + k].weight = json.WEIGHTS_1to2[l][k];
		}
	}

	$.getJSON("assets/json/WEIGHTS_2to3.json", function(json) {
		for (l = 0; l < nbHidden1; l++) {
			for (k = 0; k < nbHidden2; k++) {
				exported.connections[startSecondConnection + l * nbHidden2 + k].weight = json.WEIGHTS_2to3[l][k];
			}
		}

		$.getJSON("assets/json/WEIGHTS_3to4.json", function(json) {
			for (l = 0; l < nbHidden2; l++) {
				exported.connections[startThirdConnection + l].weight = json.WEIGHTS_3to4[l][0];
			}

			neuronNetwork = Network.fromJSON(exported);

		});
	});
});
