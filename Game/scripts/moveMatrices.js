var moveMatrices = new Object();

const topNobi = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);
const topNobi1 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [-1, 0, 0]
]);
const topNobi2 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, -1]
]);
const topNobi3 = math.matrix([
    [0, 1, 0],
    [-1, 1, 0],
    [0, 0, 0]
]);
const topNobi4 = math.matrix([
    [0, 1, 0],
    [0, 1, -1],
    [0, 0, 0]
]);
const topNobi5 = math.matrix([
    [-1, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
]);
const topNobi6 = math.matrix([
    [0, 1, -1],
    [0, 1, 0],
    [0, 0, 0]
]);
// à voir pour le tsuke !
const topNobi7 = math.matrix([
    [0, 1, 0],
    [0, 1, 0],
    [0, -1, 0]
]);

let nobis = [topNobi, topNobi1, topNobi2, topNobi3, topNobi4, topNobi5, topNobi6, topNobi7];
moveMatrices["Nobi"] = new Array();

let i, j;

for (j = 0; j < nobis.length; j++) {
    moveMatrices["Nobi"].push(nobis[j]);
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < nobis.length; j++) {
        nobis[j] = rotateMatrix(nobis[j]);
        moveMatrices["Nobi"].push(nobis[j]);
    }
}

console.log(moveMatrices["Nobi"]);
