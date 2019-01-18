/* Matrix structure :
	* 0  : empty
	* -1 : black stone
	* 1  : white stone
*/

function getCurrentMatrix(dataObject, mat) {
    const x = dataObject["lastStonePosition"][0];
    const y = dataObject["lastStonePosition"][1];

    // AJOUTER LES COINS
    if (x == 0) {
        const currentMat = math.subset(mat, math.index([y - 1, y, y + 1], [x, x + 1]));
        const firstColumn = math.matrix([[0], [0], [0]]);
        return math.concat(firstColumn, currentMat);
    } else if (x == 18) {
        const currentMat = math.subset(mat, math.index([y - 1, y, y + 1], [x - 1, x]));
        const lastColumn = math.matrix([[0], [0], [0]]);
        return math.concat(currentMat, lastColumn);
    } else if (y == 0) {
        const currentMat = math.subset(mat, math.index([y, y + 1], [x - 1, x, x + 1]));
        const firstLine = math.matrix([[0, 0, 0]]);
        return math.concat(firstLine, currentMat, 0);
    } else if (y == 18) {
        const currentMat = math.subset(mat, math.index([y - 1, y], [x - 1, x, x + 1]));
        const lastLine = math.matrix([[0, 0, 0]]);
        return math.concat(currentMat, lastLine, 0);
    } else {
        return math.subset(mat, math.index([y - 1, y, y + 1], [x - 1, x, x + 1]));
    }
}

function rotateMatrix(mat) {
    let newMat = math.matrix([
        [mat.get([2, 0]), mat.get([1, 0]), mat.get([0, 0])],
        [mat.get([2, 1]), mat.get([1, 1]), mat.get([0, 1])],
        [mat.get([2, 2]), mat.get([1, 2]), mat.get([0, 2])]
    ]);
    return newMat;
}

function fillMatrix(boardMat, sgf, moveNumber) {

    if (Object.keys(sgf[moveNumber])[0] == "B") {
        const coord = sgf[moveNumber].B;
        return insertIntoMatrix(boardMat, coord, -1);

    } else {
        const coord = sgf[moveNumber].W;
        return insertIntoMatrix(boardMat, coord, 1);
    }
}

function emptyMatrix(boardMat, sgf, moveNumber) {
    let coord;
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        coord = sgf[moveNumber].B;
    } else {
        coord = sgf[moveNumber].W;
    }

    return insertIntoMatrix(boardMat, coord, 0);
}

// Fill entirely matrix from sgf
function fillFullMatrix(boardMat, sgf) {

    // Get the total number of played moves
	const movesNumber = Object.keys(sgf).length - 1;
	console.log("Moves number: " + movesNumber);

	// Start at 1 (0 contains game data)
	for (let i = 1; i <= movesNumber ; i++) {

		if (Object.keys(sgf[i])[0] == "B") {
			const coord = sgf[i].B;
            boardMat = insertIntoMatrix(boardMat, coord, -1);
		} else {
			const coord = sgf[i].W;
            boardMat = insertIntoMatrix(boardMat, coord, 1);
		}
	}

	return boardMat;
}

// à revoir ?
function readMatrix(matrix) {
	let i, j;

	for (i = 0; i < matrix.size()[0]; i++) {
		for (j = 0; j < matrix.size()[1]; j++) {

			let value = matrix.get([i, j]);

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

    const x = letterToNumber(coord.slice(0, 1)) -1;
    const y = letterToNumber(coord.slice(1, 2)) -1;

    boardMat.subset(math.index(y, x), color);
    return boardMat;
}

// convert A to 1, Z to 26, AA to 27
function letterToNumber(string) {
    string = string.toUpperCase();
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', sum = 0, i;
    for (i = 0; i < string.length; i++) {
        sum += Math.pow(letters.length, i) * (letters.indexOf(string.substr(((i + 1) * -1), 1)) + 1);
    }
    return sum;
}
