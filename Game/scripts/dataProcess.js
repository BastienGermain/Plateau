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
data["whiteCaptures"] = 0; // number of black stones captured by white
data["blackCaptures"] = 0;
data["knownMove"] = "" // Values : "Kata", "Tsuke", "Kosumi", "Nobi", "Tobi"
data["lastMoveTime"] = 0.00; 


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
        move(1);
		boardMat = fillMatrix(boardMat, sgf, moveNumber);
        data = getLastPlayer(data, sgf, moveNumber);
        data = getLastStonePosition(data, sgf, moveNumber);
        data = getStonesAround(data, boardMat);
        data["stoneOnBoard"] += 1;
        data["whiteCaptures"] = getInfo().captures[JGO.WHITE];
        data["blackCaptures"] = getInfo().captures[JGO.BLACK];
        data["knownMove"] = checkKnownMoves(data, boardMat);
        data["lastMoveTime"] = sgf[moveNumber].C;
		moveNumber++;
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

function getStonesAround(dataObject, mat) {
    var whiteStonesAround = 0;
    var blackStonesAround = 0;

    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    var i, j;

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i != x || j != y) {
                var matValue = math.subset(mat, math.index(j, i));

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

// TO DO : Nozoki, Hane (plus tricky)
function checkKnownMoves(dataObject, mat) {
    if (dataObject["stonesAround"] != 0) {
        if (dataObject["lastPlayer"] == "White") {
            // affiner en fonction des pierres noires alentours
            if (dataObject["whiteStonesAround"] == 1) {
                if (checkNobi(dataObject, mat)) {
                    console.log("White : Nobi");
                    return "Nobi";
                } else if (checkKosumi(dataObject, mat)) {
                    console.log("White : Kosumi");
                    return "Kosumi";
                }
            } else if (dataObject["blackStonesAround"] == 1) {
                if (checkTsuke(dataObject, mat)) {
                    console.log("White : Tsuke");
                    return "Tsuke";
                } else if (checkKata(dataObject, mat)) {
                    console.log("White : Kata");
                    return "Kata";
                }
            }
        } else {
            if (dataObject["blackStonesAround"] == 1) {
                 if (checkNobi(dataObject, mat)) {
                    console.log("Black : Nobi");
                    return "Nobi";
                 } else if (checkKosumi(dataObject, mat)) {
                     console.log("Black : Kosumi");
                     return "Kosumi";
                 }
            } else if (dataObject["whiteStonesAround"] == 1) {
                if (checkTsuke(dataObject, mat)) {
                    console.log("Black : Tsuke");
                    return "Tsuke";
                } else if (checkKata(dataObject, mat)) {
                    console.log("Black : Kata");
                    return "Kata";
                }
            }
        }
    } else if (checkTobi(dataObject, mat)) {
        console.log("Tobi");
        return "Tobi";
    }

    return "";

}

/* Nobi : contact direct entre deux pierres de même couleur
* [0, 1, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
function checkNobi(dataObject, mat) {
    var isNobi = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i == x || j == y) {
                if (i != x || j != y) {
                    var matValue = math.subset(mat, math.index(j, i));
                    if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                        isNobi = true;
                    }
                }
            }
        }
    }

    return isNobi;
}

/* Tsuke : contact direct entre deux pierres de couleur opposée
* [0, -1, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
function checkTsuke(dataObject, mat) {
    var isTsuke = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i == x || j == y) {
                if (i != x || j != y) {
                    var matValue = math.subset(mat, math.index(j, i));
                    if (matValue == (dataObject["lastPlayer"] == "White" ? -1 : 1)) {
                        isTsuke = true;
                    }
                }
            }
        }
    }

    return isTsuke;
}

/* Kosumi : Extension en diagonale
* [1, 0, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
function checkKosumi(dataObject, mat) {
    var isKosumi = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i != x && j != y) {
                var matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                    isKosumi = true;
                }
            }
        }
    }

    return isKosumi;

}

/* Kata : Approche pierre adverse en diagonale
* [1, 0, 0]
* [0, -1, 0]
* [0, 0, 0]
*/
function checkKata(dataObject, mat) {
    var isKata = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i != x && j != y) {
                var matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? -1 : 1)) {
                    isKata = true;
                }
            }
        }
    }

    return isKata;

}

/* Tobi : Saut d'un espace
* [1, 0, 1]
* [0, 0, 0]
* [0, 0, 0]
*/
function checkTobi(dataObject, mat) {
    var isTobi = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];
    //console.log("x, y " + x + ", " + y);

    for (x <= 1 ? i = 0 : i = x - 2; i <= (x >= 17 ? x : x + 2); i++) {
        for (y <= 1 ? j = 0 : j = y - 2; j <= (y >= 17 ? y : y + 2); j++) {
            if ((i == x || j == y) && (i == x - 2 || j == y - 2 || i == x + 2 || j  == y + 2)) {

                //console.log("i, j " + i + ", " + j);
                var matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                    isTobi = true;
                }

            }
        }
    }

    return isTobi;

}

/*function getData() {
    return data;
}*/

function printData() {
    console.log(data);
}

function printMatrix() {
    console.log(boardMat);
}
