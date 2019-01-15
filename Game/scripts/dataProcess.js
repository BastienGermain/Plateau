/*
* Get and process game data
*/

// data structure
var data = new Object();
data["lastPlayer"] = ""; // Values : "Black" or "White"
data["stoneNumber"] = 0;

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

	document.querySelector('#addMove').addEventListener('click', function(e) {

		boardMat = fillMatrix(boardMat, sgf, moveNumber);
        data = getLastPlayer(data, sgf, moveNumber);
        data["stoneNumber"] += 1;
		moveNumber++;
	})
};

function getLastPlayer(dataObject, sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        console.log("Black plays");
        dataObject["lastPlayer"] = "Black";
    } else {
        console.log("White plays");
        dataObject["lastPlayer"] = "White";
    }

    return dataObject;
}

function getData() {
    return data;
}

function printMatrix() {
    console.log(boardMat);
}
