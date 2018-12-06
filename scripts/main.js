/* Main script */

var synth = new Tone.Synth().toMaster()

//set the transport to repeat
Tone.Transport.loopEnd = '1m' // 1 measure is the loop's length
Tone.Transport.loop = true

//start/stop the transport	
Tone.Transport.start();		
//Tone.Transport.stop()

$.get("test.sgf", function(response) {
    var sgf = SGFGrove.parse(response);
    var moveNumber = 1; // Next move number

    // Might be useful
    var boardMat = fillMatrix(sgf)
	console.log(boardMat);
	
	document.querySelector('#addMove').addEventListener('click', function(e){

		if (Object.keys(sgf[0][0][moveNumber])[0] == "B") {
			console.log("Black plays");
			Tone.Transport.schedule(triggerSynthBlack, moveNumber/2 % 4);
		} else {
			console.log("White plays");
			Tone.Transport.schedule(triggerSynthWhite, moveNumber/2 % 4);
		}

		moveNumber++;
	})

});

//this function is called right before the scheduled time
function triggerSynthBlack(time){
	//the time is the sample-accurate time of the event
	synth.triggerAttackRelease('C2', '8n', time)
}

function triggerSynthWhite(time){
	synth.triggerAttackRelease('C3', '8n', time)
}

function readMatrix(matrix) {
	var i, j;

	for (i = 0; i < matrix.size()[0]; i++) {
		for (j = 0; j < matrix.size()[1]; j++) {

			var value = matrix.get([i, j])

			//var time = i * matrix.size()[0] + j * matrix.size()[1]; 
			
			if (value == -1) {
				// do stuff if black
			} else if (value == 1) {
				// do stuff if white
			}
		}
	}
}

/* Fill a matrix representing the board : 
	* 0  : empty
	* -1 : black stone 
	* 1  : white stone 
*/
function fillMatrix(sgf) {

	sgf = sgf[0][0];
	//console.log(sgf);

	// Get the size of the board (usually 19)
	var size = sgf[0].SZ;
	console.log("Board size : " + size);

	// Get the total number of played moves
	var movesNumber = Object.keys(sgf).length - 1;
	console.log("Moves number: " + movesNumber);

	var boardMat = math.zeros(size, size);

	var i;

	// Start at 1 (0 contains game data) 
	for (i = 1; i <= movesNumber ; i++) {

		//console.log(sgf[i]);

		if (Object.keys(sgf[i])[0] == "B") {

			//console.log("Black plays");

			var coord = sgf[i].B;

			// Split coordinates in two
			var first = letterToNumber(coord.slice(0, 1)) -1;
			var second = letterToNumber(coord.slice(1, 2)) -1;
			//console.log("coordinates (" + coord + ") : " + first + ", " + second);

			// Modify the matrix
			boardMat.subset(math.index(second, first), -1);

		} else {
			//console.log("White plays");

			var coord = sgf[i].W;

			var first = letterToNumber(coord.slice(0, 1)) -1;
			var second = letterToNumber(coord.slice(1, 2)) -1;
			//console.log("coordoninates (" + coord + ") : " + first + ", " + second);

			boardMat.subset(math.index(second, first), 1);
		}
	}

	return boardMat;
}

// convert A to 1, Z to 26, AA to 27
function letterToNumber(string) {
    string = string.toUpperCase();
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', sum = 0, i;
    for (i = 0; i < string.length; i++) {
        sum += Math.pow(letters.length, i) * (letters.indexOf(string.substr(((i + 1) * -1), 1)) + 1);
    }
    return sum;
}