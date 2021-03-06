// create the network
const { Neuron, Layer, Network } = window.synaptic;

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

let i;
let startSecondConnection = nbInput*nbHidden1;
let startThirdConnection = startSecondConnection + nbHidden1*nbHidden2;

// Input / hidden1 connection
for (i = 0; i < nbInput*nbHidden1; i++) {
	//exported.connections[i].weight = 0.1;
}

// Hidden1 / hidden2 connection
for (i = startSecondConnection; i < startSecondConnection + nbHidden1*nbHidden2; i++) {
	//exported.connections[i].weight = 0.1;
}

// Hidden2 / output connection
for (i = startThirdConnection; i < startThirdConnection + nbHidden2; i++) {
	//exported.connections[i].weight = 0.1;
}

//console.log(exported.connections);

var imported = Network.fromJSON(exported);

// test the network
console.log(imported.activate([readMatrix(boardMat)]));
