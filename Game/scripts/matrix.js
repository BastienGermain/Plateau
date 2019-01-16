/* Matrix structure :
	* 0  : empty
	* -1 : black stone
	* 1  : white stone
*/

function fillMatrix(boardMat, sgf, moveNumber) {

    if (Object.keys(sgf[moveNumber])[0] == "B") {
        var coord = sgf[moveNumber].B;
        return insertIntoMatrix(boardMat, coord, -1);

    } else {
        var coord = sgf[moveNumber].W;
        return insertIntoMatrix(boardMat, coord, 1);
    }
}

function emptyMatrix(boardMat, sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        var coord = sgf[moveNumber].B;
    } else {
        var coord = sgf[moveNumber].W;
    }

    return insertIntoMatrix(boardMat, coord, 0);
}

// Fill entirely matrix from sgf
function fillFullMatrix(boardMat, sgf) {

    // Get the total number of played moves
	var movesNumber = Object.keys(sgf).length - 1;
	console.log("Moves number: " + movesNumber);

	// Start at 1 (0 contains game data)
	for (var i = 1; i <= movesNumber ; i++) {

		if (Object.keys(sgf[i])[0] == "B") {
			var coord = sgf[i].B;
            boardMat = insertIntoMatrix(boardMat, coord, -1);
		} else {
			var coord = sgf[i].W;
            boardMat = insertIntoMatrix(boardMat, coord, 1);
		}
	}

	return boardMat;
}

// à revoir ?
function readMatrix(matrix) {
	var i, j;

	for (i = 0; i < matrix.size()[0]; i++) {
		for (j = 0; j < matrix.size()[1]; j++) {

			var value = matrix.get([i, j]);

			//var time = i * matrix.size()[0] + j * matrix.size()[1];

			if (value == -1) {
				// do stuff if black
			} else if (value == 1) {
				// do stuff if white
			}
		}
	}
}

// color = 1 or -1
function insertIntoMatrix(boardMat, coord, color) {

    var x = letterToNumber(coord.slice(0, 1)) -1;
    var y = letterToNumber(coord.slice(1, 2)) -1;

    boardMat.subset(math.index(y, x), color);
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
