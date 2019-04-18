/*
* Get and process game data
*/

// data structure
var data = new Object();
data["player"] = ""; // Values : "Black" or "White"
data["stoneOnBoard"] = 0; // Number of stone on the board
data["stonePosition"] = [0, 0]; // Range [0, 18]; 0,0 is top-left of goban
data["previousStonePosition"] = [0, 0];
data["stonesAround"] = 0; // number of stones around the last played stone
data["whiteStonesAround"] = 0; // same with only white
data["blackStonesAround"] = 0; // same with only black
data["whiteCaptures"] = 0; // number of black stones captured by white
data["blackCaptures"] = 0;
data["atariNumber"] = 0; //  number of atari situations on the board
data["whiteAtariNumber"] = 0; // number of white stones in atari
data["blackAtariNumber"] = 0;
data["stonesConnectionNumber"] = 0; // total number of connection between two same colors stones
data["knownMove"] = "" // Values : "Kata", "Tsuke", "Kosumi", "Nobi", "Hane", "Tobi", "Kogeima", "Nozoki", "Coupe", "Connect"
data["totalKnownMoves"] = 0
data["whiteKnownMoves"] = 0
data["blackKnownMoves"] = 0
data["moveTime"] = 0; // In seconds, after each move
data["previousMoveTime"] = 0;
data["totalWhiteTime"] = 0; // In seconds
data["totalBlackTime"] = 0;
data["cornerMove"] = "" // Values : "San-san", "Hoshi", "Komoku", "Takamoku", "Mokuhazushi"
data["globalInterpretation"] = 0; // [-1; 1]; -1 => avantage noir
data["decrescendoTime"] = 0; // In seconds, current time the player consume
data["playerSpeed"] = 0; // Based on last 10 moves time

let timeArraySGF = new Array();
const reducer = (accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10);

var boardMat = math.zeros(19, 19);

var lastData = new Object();

function updatePrevious() {
    lastData = JSON.parse(JSON.stringify(data));
}

function updateData(sgf, moveNumber) {
    getPlayer(sgf, moveNumber);
    if (data["stoneOnBoard"] != 0) {
        data["previousStonePosition"] = data["stonePosition"];
        data["previousMoveTime"] = data["moveTime"];
    }
    getStonePosition(sgf, moveNumber);
    getStonesAround();
    getConnectedStones(boardMat);
    data["stoneOnBoard"] += 1;
    data["whiteCaptures"] = getInfo().captures[JGO.WHITE];
    data["blackCaptures"] = getInfo().captures[JGO.BLACK];
    data["knownMove"] = checkKnownMoves(data, boardMat);
    if (data["knownMove"] != "") {
        data["totalKnownMoves"]++;
        if (data["player"] == "White") {
            data["whiteKnownMoves"]++;
        } else {
            data["blackKnownMoves"]++;
        }
    }
    data["globalInterpretation"] = neuronNetwork.activate(readMatrix(boardMat));
    data["moveTime"] = sgf[moveNumber].C;
    insertIntotimeArraySGF(data["moveTime"]);
    data["playerSpeed"] = timeArraySGF.reduce(reducer) / timeArraySGF.length;
    console.log(data["playerSpeed"]);
    checkAtari(boardMat);
    if (data["stonesAround"] == 0) {
       data["cornerMove"] = getCornerMove();
    } else {
       data["cornerMove"] = "";
    }
}

function insertIntotimeArraySGF(newTime) {
    if (timeArraySGF.length < 10) {
        timeArraySGF.push(newTime);
    } else {
        timeArraySGF.shift();
        timeArraySGF.push(newTime);
    }
}

// Load SGF for matrix
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

    let totalTime = 0;
	document.querySelector('#addMove').addEventListener('mousedown', function(e) {
        /*for (let i = 1; i < Object.keys(sgf).length; i++) {
            updatePrevious();
    		boardMat = fillMatrixSGF(boardMat, sgf, i);
            updateData(sgf, i);
            //console.log(data["moveTime"]);
            totalTime += Number(data["moveTime"]);
            console.log(totalTime);
        }*/
        updatePrevious();
        move(1);
		boardMat = fillMatrixSGF(boardMat, sgf, moveNumber);
        updateData(sgf, moveNumber);
		moveNumber++;
	})
};

function getPlayer(sgf, moveNumber) {
    if (Object.keys(sgf[moveNumber])[0] == "B") {
        data["player"] = "Black";
    } else {
        data["player"] = "White";
    }
}

function getStonePosition(sgf, moveNumber) {
    let coord;

    if (Object.keys(sgf[moveNumber])[0] == "B") {
        coord = sgf[moveNumber].B;
    } else {
        coord = sgf[moveNumber].W;
    }

    const x = letterToNumber(coord.slice(0, 1)) -1;
    const y = letterToNumber(coord.slice(1, 2)) -1;

    data["stonePosition"] = [x, y];
}

function getStonesAround() {
    let whiteStonesAround = 0;
    let blackStonesAround = 0;

    const x = data["stonePosition"][0];
    const y = data["stonePosition"][1];

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

function getConnectedStones(mat) {
    let stonesConnectionNumber = 0;
    let i, j;
    for (i = 0; i < 19; i++) {
        if (i != 18) {
            for (j = 0; j < 19; j++) {
                if (j != 0 && j != 18) {
                    // check droite droit-bas et bas gauche-bas
                    const player = mat.get([i, j]);
                    if (player != 0) {
                        if (player == mat.get([i, j + 1])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j + 1])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j - 1])) {
                            stonesConnectionNumber++;
                        }
                    }
                } else if (j == 0) {
                    // check droite droit-bas et bas
                    const player = mat.get([i, j]);
                    if (player != 0) {
                        if (player == mat.get([i, j + 1])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j + 1])) {
                            stonesConnectionNumber++;
                        }
                    }
                } else if (j == 18) {
                    // check que bas et gauche-bas
                    const player = mat.get([i, j]);
                    if (player != 0) {
                        if (player == mat.get([i + 1, j])) {
                            stonesConnectionNumber++;
                        }
                        if (player == mat.get([i + 1, j - 1])) {
                            stonesConnectionNumber++;
                        }
                    }
                }
            }
        } else {
            for (j = 0; j < 19; j++) {
                if (j != 18) {
                    // check que droite
                    const player = mat.get([i, j]);
                    if (player != 0) {
                        if (player == mat.get([i, j + 1])) {
                            stonesConnectionNumber++;
                        }
                    }
                }
            }
        }
    }
    data["stonesConnectionNumber"] = stonesConnectionNumber;
}


function checkKnownMoves(dataObject, mat) {
    const x = dataObject["stonePosition"][0];
    const y = dataObject["stonePosition"][1];
    const currentMatrix = getCurrentMatrix(mat, x, y);
    const nobis = moveMatrices.Nobi;
    const tsukes = moveMatrices.Tsuke;
    const kosumis = moveMatrices.Kosumi;
    const katas = moveMatrices.Kata;
    const hanes = moveMatrices.Hane;
    const nozokis = moveMatrices.Nozoki;
    const coupes = moveMatrices.Coupe;
    const connects = moveMatrices.Connect;

    let i;

    for (i = 0; i < nobis.length; i++) {
        if(math.deepEqual(currentMatrix, nobis[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, nobis[i]))) {
            console.log("Nobi");
            return "Nobi";
        }
    }

    for (i = 0; i < tsukes.length; i++) {
        if(math.deepEqual(currentMatrix, tsukes[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, tsukes[i]))) {
            console.log("Tsuke");
            return "Tsuke";
        }
    }

    for (i = 0; i < kosumis.length; i++) {
        if(math.deepEqual(currentMatrix, kosumis[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, kosumis[i]))) {
            console.log("Kosumi");
            return "Kosumi";
        }
    }

    for (i = 0; i < katas.length; i++) {
        if(math.deepEqual(currentMatrix, katas[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, katas[i]))) {
            console.log("Kata");
            return "Kata";
        }
    }

    for (i = 0; i < hanes.length; i++) {
        if(math.deepEqual(currentMatrix, hanes[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, hanes[i]))) {
            console.log("Hane");
            return "Hane";
        }
    }

    for (i = 0; i < nozokis.length; i++) {
        if(math.deepEqual(currentMatrix, nozokis[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, nozokis[i]))) {
            console.log("Nozoki");
            return "Nozoki";
        }
    }

    for (i = 0; i < coupes.length; i++) {
        if(math.deepEqual(currentMatrix, coupes[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, coupes[i]))) {
            console.log("Coupe");
            return "Coupe";
        }
    }

    for (i = 0; i < connects.length; i++) {
        if(math.deepEqual(currentMatrix, connects[i]) || math.deepEqual(currentMatrix, math.dotMultiply(-1, connects[i]))) {
            console.log("Connect");
            return "Connect";
        }
    }

    if (checkTobi(dataObject, mat)) {
        console.log("Tobi");
        return "Tobi";
    } else if (checkKogeima(dataObject, mat)) {
        console.log("Kogeima");
        return "Kogeima";
    }

    return "";

}

/* Tobi : Saut d'un espace
* [1, 0, 1]
* [0, 0, 0]
* [0, 0, 0]
*/
function checkTobi(dataObject, mat) {
    let isTobi = false;
    const x = dataObject["stonePosition"][0];
    const y = dataObject["stonePosition"][1];

    for (x <= 1 ? i = 0 : i = x - 2; i <= (x >= 17 ? x : x + 2); i++) {
        for (y <= 1 ? j = 0 : j = y - 2; j <= (y >= 17 ? y : y + 2); j++) {
            if ((i == x || j == y) && (i == x - 2 || j == y - 2 || i == x + 2 || j  == y + 2)) {

                const matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["player"] == "White" ? 1 : -1)) {
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
    let isKogeima = false;
    const x = dataObject["stonePosition"][0];
    const y = dataObject["stonePosition"][1];

    for (x <= 2 ? i = 0 : i = x - 3; i <= (x >= 16 ? x : x + 3); i++) {
        for (y <= 2 ? j = 0 : j = y - 3; j <= (y >= 16 ? y : y + 3); j++) {

            if (
                (i == x - 2 && (j == y - 1 || j == y + 1)) ||
                (i == x + 2 && (j == y - 1 || j == y + 1)) ||
                (j == y - 2 && (i == x - 1 || i == x + 1)) ||
                (j == y + 2 && (i == x - 1 || i == x + 1))
            ) {
                const matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["player"] == "White" ? 1 : -1)) {
                    isKogeima = true;
                }
            }

        }
    }

    return isKogeima;
}

function checkAtari(mat) {
    data["whiteAtariNumber"] = 0;
    data["blackAtariNumber"] = 0;
    let i, j;
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 19; j++) {
            const currentMat = getCurrentMatrix(mat, i, j);
            const sum = currentMat.get([0, 1]) + currentMat.get([1, 0]) + currentMat.get([2, 1]) + currentMat.get([1, 2]);
            if (sum == 3 || sum == -3) {
                if(currentMat.get([1, 1]) == 1) {
                    console.log("Atari");
                    data["whiteAtariNumber"] += 1;
                } else if (currentMat.get([1, 1]) == -1) {
                    console.log("Atari");
                    data["blackAtariNumber"] += 1;
                }
            }
        }
    }

    data["atariNumber"] = data["whiteAtariNumber"] + data["blackAtariNumber"];
}

function getCornerMove() {
    const x = data["stonePosition"][0];
    const y = data["stonePosition"][1];
    if (x == 2) {
        if (y == 2) {
            return "San-san";
        } else if (y == 3) {
            return "Komoku";
        } else if (y == 4) {
            return "Mokuhazushi";
        } else if (y == 14) {
            return "Mokuhazushi";
        } else if (y == 15) {
            return "Komoku";
        } else if (y == 16) {
            return "San-san";
        }
    } else if (x == 3) {
        if (y == 2) {
            return "Komoku";
        } else if (y == 3) {
            return "Hoshi";
        } else if (y == 4) {
            return "Takamoku";
        } else if (y == 14) {
            return "Takamoku";
        } else if (y == 15) {
            return "Hoshi";
        } else if (y == 16) {
            return "Komoku";
        }
    } else if (x == 4) {
        if (y == 2) {
            return "Mokuhazushi";
        } else if (y == 3) {
            return "Takamoku";
        } else if (y == 15) {
            return "Takamoku";
        } else if (y == 16) {
            return "Mokuhazushi";
        }
    } else if (x == 14) {
        if (y == 2) {
            return "Mokuhazushi";
        } else if (y == 3) {
            return "Takamoku";
        } else if (y == 15) {
            return "Takamoku";
        } else if (y == 16) {
            return "Mokuhazushi";
        }
    } else if (x == 15) {
        if (y == 2) {
            return "Komoku";
        } else if (y == 3) {
            return "Hoshi";
        } else if (y == 4) {
            return "Takamoku";
        }  else if (y == 14) {
            return "Takamoku";
        } else if (y == 15) {
            return "Hoshi";
        } else if (y == 16) {
            return "Komoku";
        }
    } else if (x == 16) {
        if (y == 2) {
            return "San-san";
        } else if (y == 3) {
            return "Komoku";
        } else if (y == 4) {
            return "Mokuhazushi";
        } else if (y == 14) {
            return "Mokuhazushi";
        } else if (y == 15) {
            return "Komoku";
        } else if (y == 16) {
            return "San-san";
        }
    } else {
        return "";
    }
}

function printData() {
    console.log(data);
}

function printMatrix() {
    console.log(boardMat);
}
