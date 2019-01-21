var moveMatrices = new Object();
let i, j;

/* Nobi : contact direct entre deux pierres de même couleur
* [0, 1, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
const nobi1 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);
const nobi2 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [-1, 0, 0]
]);
const nobi3 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, -1]
]);
const nobi4 = math.matrix([
    [0, 1, 0],
    [-1, 1, 0],
    [0, 0, 0]
]);
const nobi5 = math.matrix([
    [0, 1, 0],
    [0, 1, -1],
    [0, 0, 0]
]);
const nobi6 = math.matrix([
    [-1, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);
const nobi7 = math.matrix([
    [0, 1, -1],
    [0, 1, 0],
    [0, 0, 0]
]);

const nobi8 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 1]
]);

const nobi9 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 0]
]);

const nobi10 = math.matrix([
    [-1, 1, -1],
    [0, 1, 0],
    [0, 0, 0]
]);

let nobis = [nobi1, nobi2, nobi3, nobi4, nobi5, nobi6, nobi7, nobi8, nobi9, nobi10];
moveMatrices["Nobi"] = new Array();

for (j = 0; j < nobis.length; j++) {
    moveMatrices["Nobi"].push(nobis[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < nobis.length; j++) {
        nobis[j] = rotateMatrix(nobis[j]);
        moveMatrices["Nobi"].push(nobis[j]);
    }
}

/* Tsuke : contact direct entre deux pierres de couleur opposée
* [0, -1, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
const tsuke1 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);

const tsuke2 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [0, 1, 0]
]);

const tsuke3 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [1, 0, 1]
]);

const tsuke4 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [1, 0, 0]
]);

const tsuke5 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, 1]
]);

const tsuke6 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, 1]
]);

const tsuke7 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [1, 0, -1]
]);

let tsukes = [tsuke1, tsuke2, tsuke3, tsuke4, tsuke5, tsuke6, tsuke7];
moveMatrices["Tsuke"] = new Array();

for (j = 0; j < tsukes.length; j++) {
    moveMatrices["Tsuke"].push(tsukes[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < tsukes.length; j++) {
        tsukes[j] = rotateMatrix(tsukes[j]);
        moveMatrices["Tsuke"].push(tsukes[j]);
    }
}

/* Kosumi : Extension en diagonale
* [1, 0, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
const kosumi1 = math.matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]);

const kosumi2 = math.matrix([
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 0]
]);

let kosumis = [kosumi1, kosumi2];
moveMatrices["Kosumi"] = new Array();

for (j = 0; j < kosumis.length; j++) {
    moveMatrices["Kosumi"].push(kosumis[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < kosumis.length; j++) {
        kosumis[j] = rotateMatrix(kosumis[j]);
        moveMatrices["Kosumi"].push(kosumis[j]);
    }
}

/* Kata : Approche pierre adverse en diagonale
* [1, 0, 0]
* [0, -1, 0]
* [0, 0, 0]
*/
const kata1 = math.matrix([
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]);

const kata2 = math.matrix([
    [-1, 0, 1],
    [0, 1, 0],
    [0, 0, 0]
]);

const kata3 = math.matrix([
    [1, 0, -1],
    [0, 1, 0],
    [0, 0, 0]
]);

const kata4 = math.matrix([
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]);

const kata5 = math.matrix([
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 1]
]);

const kata6 = math.matrix([
    [-1, 0, 1],
    [0, 1, 0],
    [0, 0, 1]
]);

const kata7 = math.matrix([
    [-1, 0, 1],
    [0, 1, 0],
    [0, 1, 0]
]);

const kata8 = math.matrix([
    [1, 0, -1],
    [0, 1, 0],
    [0, 1, 0]
]);

let katas = [kata1, kata2, kata3, kata4, kata5, kata6, kata7, kata8];
moveMatrices["Kata"] = new Array();

for (j = 0; j < katas.length; j++) {
    moveMatrices["Kata"].push(katas[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < katas.length; j++) {
        katas[j] = rotateMatrix(katas[j]);
        moveMatrices["Kata"].push(katas[j]);
    }
}

/* Hane : Attaque d'une pierre adverse par la diagonale
* [1, -1, 0]
* [0, 1, 0]
* [0, 0, 0]
*/
const hane1 = math.matrix([
    [1, -1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);

const hane2 = math.matrix([
    [0, -1, 1],
    [0, 1, 0],
    [0, 0, 0]
]);

const hane3 = math.matrix([
    [1, -1, 0],
    [0, 1, 1],
    [0, 0, 0]
]);

const hane4 = math.matrix([
    [0, -1, 1],
    [1, 1, 0],
    [0, 0, 0]
]);

const hane5 = math.matrix([
    [1, -1, 0],
    [-1, 1, 0],
    [0, 0, 0]
]);

const hane6 = math.matrix([
    [0, -1, 1],
    [0, 1, -1],
    [0, 0, 0]
]);

let hanes = [hane1, hane2, hane3, hane4, hane5, hane6];
moveMatrices["Hane"] = new Array();

for (j = 0; j < hanes.length; j++) {
    moveMatrices["Hane"].push(hanes[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < hanes.length; j++) {
        hanes[j] = rotateMatrix(hanes[j]);
        moveMatrices["Hane"].push(hanes[j]);
    }
}

/* Nozoki : Coup joué face au vide laissé par un tobi
* [-1, 0, -1]
* [0, 1, 0]
* [0, 0, 0]
*/
const nozoki1 = math.matrix([
    [-1, 0, -1],
    [0, 1, 0],
    [0, 0, 0]
]);

const nozoki2 = math.matrix([
    [-1, 0, -1],
    [0, 1, 0],
    [0, 1, 0]
]);

const nozoki3 = math.matrix([
    [-1, 0, -1],
    [0, 1, 0],
    [1, 0, 0]
]);

const nozoki4 = math.matrix([
    [-1, 0, -1],
    [0, 1, 0],
    [0, 0, 1]
]);

let nozokis = [nozoki1, nozoki2, nozoki3, nozoki4];
moveMatrices["Nozoki"] = new Array();

for (j = 0; j < nozokis.length; j++) {
    moveMatrices["Nozoki"].push(nozokis[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < nozokis.length; j++) {
        nozokis[j] = rotateMatrix(nozokis[j]);
        moveMatrices["Nozoki"].push(nozokis[j]);
    }
}

/* Coupe (non officiel) : coup séparant deux pierres ou chaines adverses
*/
const coupe1 = math.matrix([
    [1, 0, -1],
    [0, 1, 0],
    [-1, 0, 0]
]);

const coupe2 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1]
]);

const coupe3 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, 0]
]);

const coupe4 = math.matrix([
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, -1]
]);

const coupe5 = math.matrix([
    [1, -1, 0],
    [0, 1, 0],
    [0, 0, -1]
]);

const coupe6 = math.matrix([
    [0, -1, 1],
    [0, 1, 0],
    [-1, 0, 0]
]);

const coupe7 = math.matrix([
    [1, -1, 0],
    [0, 1, 0],
    [-1, 0, 0]
]);

const coupe8 = math.matrix([
    [0, -1, 1],
    [0, 1, 0],
    [0, 0, -1]
]);

const coupe9 = math.matrix([
    [1, 0, -1],
    [0, 1, 1],
    [-1, 0, 0]
]);

const coupe10 = math.matrix([
    [0, 1, 0],
    [-1, 1, -1],
    [0, 0, 0]
]);

const coupe11 = math.matrix([
    [1, 0, 1],
    [-1, 1, -1],
    [0, 0, 0]
]);

let coupes = [coupe1, coupe2, coupe3, coupe4, coupe5, coupe6, coupe7, coupe8, coupe9, coupe10, coupe11];
moveMatrices["Coupe"] = new Array();

for (j = 0; j < coupes.length; j++) {
    moveMatrices["Coupe"].push(coupes[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < coupes.length; j++) {
        coupes[j] = rotateMatrix(coupes[j]);
        moveMatrices["Coupe"].push(coupes[j]);
    }
}

/* Connect (non officiel) : coup connectant deux pierres amies ou plus
*/
const connect1 = math.matrix([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
]);

const connect2 = math.matrix([
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0]
]);

const connect3 = math.matrix([
    [0, -1, 0],
    [1, 1, 1],
    [0, 0, 0]
]);

let connects = [connect1, connect2, connect3];
moveMatrices["Connect"] = new Array();

for (j = 0; j < connects.length; j++) {
    moveMatrices["Connect"].push(connects[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < connects.length; j++) {
        connects[j] = rotateMatrix(connects[j]);
        moveMatrices["Connect"].push(connects[j]);
    }
}
