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
data["knownMove"] = "" // Values : "Kata", "Tsuke", "Kosumi", "Nobi", "Hane", "Tobi", "Kogeima", "Nozoki", "Coupe", "Connect"
data["lastMoveTime"] = 0; // In seconds
data["atariNumber"] = 0; //  number of atari situations on the board


var boardMat = math.zeros(19, 19);

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

	document.querySelector('#addMove').addEventListener('mousedown', function(e) {
        move(1);
		boardMat = fillMatrixSGF(boardMat, sgf, moveNumber);
        getLastPlayer(sgf, moveNumber);
        getLastStonePosition(sgf, moveNumber);
        getStonesAround();
        data["stoneOnBoard"] += 1;
        data["whiteCaptures"] = getInfo().captures[JGO.WHITE];
        data["blackCaptures"] = getInfo().captures[JGO.BLACK];
        data["knownMove"] = checkKnownMoves(data, boardMat);
        data["lastMoveTime"] = sgf[moveNumber].C;
        checkAtari(boardMat);
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


function checkKnownMoves(dataObject, mat) {
    const x = dataObject["lastStonePosition"][0];
    const y = dataObject["lastStonePosition"][1];
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
    const x = dataObject["lastStonePosition"][0];
    const y = dataObject["lastStonePosition"][1];

    for (x <= 1 ? i = 0 : i = x - 2; i <= (x >= 17 ? x : x + 2); i++) {
        for (y <= 1 ? j = 0 : j = y - 2; j <= (y >= 17 ? y : y + 2); j++) {
            if ((i == x || j == y) && (i == x - 2 || j == y - 2 || i == x + 2 || j  == y + 2)) {

                const matValue = math.subset(mat, math.index(j, i));
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
    let isKogeima = false;
    const x = dataObject["lastStonePosition"][0];
    const y = dataObject["lastStonePosition"][1];

    for (x <= 2 ? i = 0 : i = x - 3; i <= (x >= 16 ? x : x + 3); i++) {
        for (y <= 2 ? j = 0 : j = y - 3; j <= (y >= 16 ? y : y + 3); j++) {

            if (
                (i == x - 2 && (j == y - 1 || j == y + 1)) ||
                (i == x + 2 && (j == y - 1 || j == y + 1)) ||
                (j == y - 2 && (i == x - 1 || i == x + 1)) ||
                (j == y + 2 && (i == x - 1 || i == x + 1))
            ) {
                const matValue = math.subset(mat, math.index(j, i));
                if (matValue == (dataObject["lastPlayer"] == "White" ? 1 : -1)) {
                    isKogeima = true;
                }
            }

        }
    }

    return isKogeima;
}

function checkAtari(mat) {
    data["atariNumber"] = 0;
    let i, j;
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 19; j++) {
            const currentMat = getCurrentMatrix(mat, i, j);
            const sum = currentMat.get([0, 1]) + currentMat.get([1, 0]) + currentMat.get([2, 1]) + currentMat.get([1, 2]);
            if (sum == 3 || sum == -3) {
                if(currentMat.get([1, 1]) != 0) {
                    console.log("Atari");
                    data["atariNumber"] += 1;
                }
            }
        }
    }
}

function printData() {
    console.log(data);
}

function printMatrix() {
    console.log(boardMat);
}
