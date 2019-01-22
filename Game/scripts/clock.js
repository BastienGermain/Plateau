let timer = null;
let isCurrentWhite = true;
let secW = 0;
let secB = 0;
let oldSecW = 0;
let oldSecB = 0;

function pad (val) { return val > 9 ? val : "0" + val; }

$(document).ready(function() {
    timer = setInterval( function(){
        $("#secondsW").html(pad(++secW % 60));
        $("#minutesW").html(pad(parseInt(secW / 60, 10)));
    }, 1000);
})

function switchTimer() {
    if (isCurrentWhite) {
        clearInterval(timer);
        isCurrentWhite = !isCurrentWhite;
        timer = setInterval( function(){
            $("#secondsB").html(pad(++secB % 60));
            $("#minutesB").html(pad(parseInt(secB / 60, 10)));
        }, 1000);
        data["previousMoveTime"] = data["moveTime"];
        data["moveTime"] = secW - oldSecW;
        oldSecW = secW;
    } else {
        clearInterval(timer);
        isCurrentWhite = !isCurrentWhite;
        timer = setInterval( function(){
            $("#secondsW").html(pad(++secW % 60));
            $("#minutesW").html(pad(parseInt(secW / 60, 10)));
        }, 1000);
        data["previousMoveTime"] = data["moveTime"];
        data["moveTime"] = secB - oldSecB;
        oldSecB = secB;
    }
}
