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


/*const leftNobi = math.matrix([
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
]);
const rightNobi = math.matrix([
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
]);
const bottomNobi = math.matrix([
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0]
]);*/

const topNobis = [topNobi, topNobi1, topNobi2, topNobi3, topNobi4];
//moveMatrices["Nobi"] = [topNobi, topNobi1, topNobi2, leftNobi, rightNobi, bottomNobi];
