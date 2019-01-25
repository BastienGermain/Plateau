// create the network
const { Neuron, Layer, Network } = window.synaptic;

const nbInput = 2; // should be 361
const nbHidden = 3;

var inputLayer = new Layer(nbInput);
var hiddenLayer = new Layer(nbHidden);
var outputLayer = new Layer(1);

// Change squashing function to tanh and handle bias
inputLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

hiddenLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

outputLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
})

// Connect the layers
inputLayer.project(hiddenLayer, Layer.connectionType.ALL_TO_ALL);
hiddenLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

// Create network
var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

// Set the weights
let i, j;
const weightArray = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];

console.log("Input to hidden : ");
const startIdConnectionInput = nbInput + nbHidden + 1;

for (i = 0; i < nbInput; i++) {
	for (j = 0; j < nbHidden; j++) {
		const idConnection = j + startIdConnectionInput + i * nbHidden;
		const connection = inputLayer.list[i].connections.projected[idConnection];
		connection.weight = weightArray[j + i * nbHidden];
		console.log("Weigth from " + connection.from.ID + " to " + connection.to.ID + " = " + connection.weight);
	}
}

console.log("Hidden to output : ");
const startIdConnectionHidden = startIdConnectionInput + nbInput * nbHidden;

for (i = 0; i < nbHidden; i++) {
	const idConnection = startIdConnectionHidden + i;
	const connection = hiddenLayer.list[i].connections.projected[idConnection];
	console.log("Weigth from " + connection.from.ID + " to " + connection.to.ID + " = " + connection.weight);
}

// Train the network
const learningRate = .3;
for (i = 0; i < 20000; i++)
{
	// 0,0 => -1
	myNetwork.activate([0,0]);
	myNetwork.propagate(learningRate, [-1]);

	// 0,1 => 1
	myNetwork.activate([0,1]);
	myNetwork.propagate(learningRate, [1]);

	// 1,0 => 1
	myNetwork.activate([1,0]);
	myNetwork.propagate(learningRate, [1]);

	// 1,1 => -1
	myNetwork.activate([1,1]);
	myNetwork.propagate(learningRate, [-1]);
}

// after training export to JSON
var exported = myNetwork.toJSON();
var imported = Network.fromJSON(exported);
console.log(exported.connections);

// test the network
console.log(myNetwork.activate([0,0]));
console.log(myNetwork.activate([0,1]));
console.log(myNetwork.activate([1,0]));
console.log(myNetwork.activate([1,1]));

// test imported
console.log(imported.activate([0,0]));
console.log(imported.activate([0,1]));
console.log(imported.activate([1,0]));
console.log(imported.activate([1,1]));
