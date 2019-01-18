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
    let sgf = SGFGrove.parse(file);
    let moveNumber = 1; // Next move number (start at 1, 0 contains game meta data)

    // Go directly to desired data
    sgf = sgf[0][0];

    // Get the size of the board (usually 19)
	const size = sgf[0].SZ;
	console.log("Board size : " + size);

    //boardMat = fillFullMatrix(boardMat, sgf);
    //console.log(boardMat);

	document.querySelector('#addMove').addEventListener('mousedown', function(e) {
        move(1);
		boardMat = fillMatrix(boardMat, sgf, moveNumber);
        getLastPlayer(sgf, moveNumber);
        getLastStonePosition(sgf, moveNumber);
        getStonesAround();
        data["stoneOnBoard"] += 1;
        data["whiteCaptures"] = getInfo().captures[JGO.WHITE];
        data["blackCaptures"] = getInfo().captures[JGO.BLACK];
        data["knownMove"] = checkKnownMoves(data, boardMat);
        data["lastMoveTime"] = sgf[moveNumber].C;
		moveNumber++;
	})
};

function getLastPlayer(sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        data["lastPlayer"] = "Black";
    } else {
        data["lastPlayer"] = "White";
    }
}

function getLastStonePosition(sgf, moveNumber) {
    let coord;

    if (Object.keys(sgf[moveNumber])[0] == "B") {
        coord = sgf[moveNumber].B;
    } else {
        coord = sgf[moveNumber].W;
    }

    const x = letterToNumber(coord.slice(0, 1)) -1;
    const y = letterToNumber(coord.slice(1, 2)) -1;

    data["lastStonePosition"] = [x, y];
}

function getStonesAround() {
    let whiteStonesAround = 0;
    let blackStonesAround = 0;

    const x = data["lastStonePosition"][0];
    const y = data["lastStonePosition"][1];

    let i, j;

    for (x == 0 ? i = 0 : i = x - 1; i <= (x == 18 ? x : x + 1); i++) {
        for (y == 0 ? j = 0 : j = y - 1; j <= (y == 18 ? y : y + 1); j++) {
            if (i != x || j != y) {
                const matValue = math.subset(boardMat, math.index(j, i));

                if (matValue == 1) {
                    whiteStonesAround++;
                } else if (matValue == -1) {
                    blackStonesAround++;
                }
            }
        }
    }

    data["stonesAround"] = whiteStonesAround + blackStonesAround;
    data["whiteStonesAround"] = whiteStonesAround;
    data["blackStonesAround"] = blackStonesAround;
}

// TO DO : Keima, Nozoki, Hane (plus tricky)
function checkKnownMoves(dataObject, mat) {


    const nobis = moveMatrices.Nobi;
    const currentMatrix = getCurrentMatrix(dataObject, mat);
    //console.log(currentMatrix);
    let i;
    //console.log(nobis)
    for (i = 0; i < nobis.length; i++) {
        //console.log(nobis[i]);
        //console.log(math.dotMultiply(-1, nobis[i]));
        if(math.deepEqual(currentMatrix, nobis[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, nobis[i]))) {
            console.log("Nobi des matrices");
        }
    }


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
            // affiner en fonction des pierres blanches alentours
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
    } else if (checkKogeima(dataObject, mat)) {
        console.log("Kogeima");
        return "Kogeima";
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

    for (x <= 1 ? i = 0 : i = x - 2; i <= (x >= 17 ? x : x + 2); i++) {
        for (y <= 1 ? j = 0 : j = y - 2; j <= (y >= 17 ? y : y + 2); j++) {
            if ((i == x || j == y) && (i == x - 2 || j == y - 2 || i == x + 2 || j  == y + 2)) {

                var matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                    isTobi = true;
                }

            }
        }
    }

    return isTobi;

}

/* Kogeima : Saut de cheval
* [1, 0, 0]
* [0, 0, 1]
* [0, 0, 0]
*/
function checkKogeima(dataObject, mat) {
    var isKogeima = false;
    var x = dataObject["lastStonePosition"][0];
    var y = dataObject["lastStonePosition"][1];
    //console.log("x, y " + x + ", " + y);

    for (x <= 2 ? i = 0 : i = x - 3; i <= (x >= 16 ? x : x + 3); i++) {
        for (y <= 2 ? j = 0 : j = y - 3; j <= (y >= 16 ? y : y + 3); j++) {

            if (
                (i == x - 2 && (j == y - 1 || j == y + 1)) ||
                (i == x + 2 && (j == y - 1 || j == y + 1)) ||
                (j == y - 2 && (i == x - 1 || i == x + 1)) ||
                (j == y + 2 && (i == x - 1 || i == x + 1))
            )  {

                //console.log("i, j " + i + ", " + j);
                var matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                    isKogeima = true;
                }
            }

        }
    }

    return isKogeima;

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
