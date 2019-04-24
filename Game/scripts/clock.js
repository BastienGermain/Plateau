/* à faire : ajouter les heures */

let timer = null;
let isCurrentWhite = false;
let secW = 0;
let secB = 0;
let oldSecW = 0;
let oldSecB = 0;
let timeArrayPlay = new Array();

function pad (val) { return val > 9 ? val : "0" + val; }

function startClock() {
    timer = setInterval( function() {
        $("#secondsB").html(pad(++secB % 60));
        $("#minutesB").html(pad(parseInt(secB / 60, 10)));
        data["decrescendoTime"] = secB - oldSecB;
    }, 1000);
}

function switchTimer() {
    if (isCurrentWhite) {
        clearInterval(timer);
        isCurrentWhite = !isCurrentWhite;
        timer = setInterval( function() {
            $("#secondsB").html(pad(++secB % 60));
            $("#minutesB").html(pad(parseInt(secB / 60, 10)));
            data["decrescendoTime"] = secB - oldSecB;
        }, 1000);
        data["previousMoveTime"] = data["moveTime"];
        data["moveTime"] = secW - oldSecW;
        data["totalWhiteTime"] = secW;
        oldSecW = secW;
        insertIntotimeArrayPlay(data["moveTime"]);
        data["playerSpeed"] = timeArrayPlay.reduce(reducer) / timeArrayPlay.length;
        updateDisplayedData("Vitesse moyenne par coup : " + Number.parseFloat(data["playerSpeed"]).toPrecision(3) + " secondes");
    } else {
        clearInterval(timer);
        isCurrentWhite = !isCurrentWhite;
        timer = setInterval( function() {
            $("#secondsW").html(pad(++secW % 60));
            $("#minutesW").html(pad(parseInt(secW / 60, 10)));
            data["decrescendoTime"] = secW - oldSecW;
        }, 1000);
        data["previousMoveTime"] = data["moveTime"];
        data["moveTime"] = secB - oldSecB;
        data["totalBlackTime"] = secB;
        oldSecB = secB;
        insertIntotimeArrayPlay(data["moveTime"]);
        data["playerSpeed"] = timeArrayPlay.reduce(reducer) / timeArrayPlay.length;
        updateDisplayedData("Vitesse moyenne par coup : " + Number.parseFloat(data["playerSpeed"]).toPrecision(3) + " secondes");
    }
}

// Pas testé !
function insertIntotimeArrayPlay(newTime) {
    if (timeArrayPlay.length < 10) {
        timeArrayPlay.push(newTime);
    } else {
        timeArrayPlay.shift();
        timeArrayPlay.push(newTime);
    }

    console.log("array length : " + timeArrayPlay.length);
    console.log("array content : " + timeArrayPlay);
}
