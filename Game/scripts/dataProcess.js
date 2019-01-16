/*
* Get and process game data
*/

// data structure
var data = new Object();
data["lastPlayer"] = ""; // Values : "Black" or "White"
data["stoneOnBoard"] = 0; // Number of stone on the board
data["lastStonePosition"] = [0, 0]; // Range [0, 18]; 0,0 is top-left of goban
data["stonesAround"] = 0; // number of stones around the last played stone
data["whiteStonesAround"] = 0; // same with only white
data["blackStonesAround"] = 0; // same with only black


var boardMat = math.zeros(19, 19);

// Load SGF for matrix
//$.get("test.sgf", function(response) {
function beginSGF(file) {
    var sgf = SGFGrove.parse(file);
    var moveNumber = 1; // Next move number (start at 1, 0 contains game meta data)

    // Go directly to desired data
    sgf = sgf[0][0];

    // Get the size of the board (usually 19)
	var size = sgf[0].SZ;
	console.log("Board size : " + size);

    //boardMat = fillFullMatrix(boardMat, sgf);
    //console.log(boardMat);

	document.querySelector('#addMove').addEventListener('mousedown', function(e) {
		boardMat = fillMatrix(boardMat, sgf, moveNumber);
        data = getLastPlayer(data, sgf, moveNumber);
        data = getLastStonePosition(data, sgf, moveNumber);
        data = getStonesAround(data, boardMat);
        data["stoneOnBoard"] += 1;
		moveNumber++;
	})

    // To go back one move
    document.querySelector('#removeMove').addEventListener('click', function(e) {
        moveNumber--;
		boardMat = emptyMatrix(boardMat, sgf, moveNumber);
        data = getLastPlayer(data, sgf, moveNumber-1);
        data["stoneOnBoard"] -= 1;
	})
};

function getLastPlayer(dataObject, sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        dataObject["lastPlayer"] = "Black";
    } else {
        dataObject["lastPlayer"] = "White";
    }

    return dataObject;
}

function getLastStonePosition(dataObject, sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        var coord = sgf[moveNumber].B;
    } else {
        var coord = sgf[moveNumber].W;
    }

    var x = letterToNumber(coord.slice(0, 1)) -1;
    var y = letterToNumber(coord.slice(1, 2)) -1;

    dataObject["lastStonePosition"] = [x, y];

    return dataObject;
}

function getStonesAround(dataObject, boardMat) {
    var whiteStonesAround = 0;
    var blackStonesAround = 0;

    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    var i, j;

    for (x == 0 ? i = 0 : i = x - 1; i <= x + 1; i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= y + 1; j++) {
            if (i != x || j != y) {

                var matValue = math.subset(boardMat, math.index(j, i));

                if (matValue == 1) {
                    whiteStonesAround++;
                } else if (matValue == -1) {
                    blackStonesAround++;
                }
            }
        }
    }

    dataObject["stonesAround"] = whiteStonesAround + blackStonesAround;
    dataObject["whiteStonesAround"] = whiteStonesAround;
    dataObject["blackStonesAround"] = blackStonesAround;

    return dataObject;
}

function getData() {
    return data;
}

function printData() {
    console.log(data);
}

function printMatrix() {
    console.log(boardMat);
}
