/*
* Board display and file loading
*/

var moveNum = 0, moves = 0, gotoMove = 0;
var jrecord = false, jnotifier;

function move(dir) { // dir=0 has special meaning "beginning"
    if(!jrecord) return; // disable movement until SGF loaded

    if(dir == 0) {
        jrecord.first();
        moveNum = 0;
    }
    while(dir < 0) {
        if(!jrecord.previous()) break;
        moveNum--;
        dir++;
    }
    while(dir > 0) {
        if(!jrecord.next()) break;
        moveNum++;
        dir--;
    }
    updateInfo();
}

function updateInfo() {
    var info = jrecord.getCurrentNode().info;
    $('#move').html(moveNum);
    $('#comments').html(info.comment ? info.comment.replace(/\n/g, '<br>') : '');
    $('#black_captures').html(info.captures[JGO.BLACK]);
    $('#white_captures').html(info.captures[JGO.WHITE]);
}

function getInfo() {
    return jrecord.getCurrentNode().info;
}

function updateGameInfo(info) {
    var html = "";

    if("black" in info) {
        html += "Black: <strong>" + info.black;
        if("blackRank" in info) html += ", " + info.blackRank;
        html += "</strong><br />";
    }

    if("white" in info) {
        html += "White: <strong>" + info.white;
        if("whiteRank" in info) html += ", " + info.whiteRank;
        html += "</strong><br />";
    }

    var additional = [["result", "Result"]];

    $.each(additional, function(i, tup) {
        if(tup[0] in info)
        html += tup[1] + ": <strong>" + info[tup[0]] + "</strong><br>";
    });

    $('#information').html(html);
}

function getParams() { // VERY simple query parameter parse
    var params = {}, url = window.location.toString();
    if(url.indexOf('?') !== -1) {
        url.substr(url.indexOf('?')+1).split('&').forEach(function(pair) {
            var pos = pair.indexOf('=');
            if(pos === -1) return; // skip if no equals sign
            params[pair.substr(0, pos)] = pair.substr(pos+1);
        });
    }
    return params;
}

$(document).ready(function() {
    // left/right arrow navigation
    /*$("body").keydown(function(e) {
        if(e.keyCode == 37) {
            move(-1);
        } else if(e.keyCode == 39) {
            move(1);
        }
    });*/

    var params = getParams(); // parse URL parameters
    var jboard = new JGO.Board(19, 19), jsetup; // hardcoded size

    if('board' in params && params.board in JGO.BOARD)
        jsetup = new JGO.Setup(jboard, JGO.BOARD[params.board]);
    else
        jsetup = new JGO.Setup(jboard, JGO.BOARD.medium);

    // we can use this to change the board to listen to
    notifier = jsetup.getNotifier();

    jsetup.create('board', function(canvas) {
        /*canvas.addListener('click', function(c) {
            if(c.i < 10) move(-1); // back
            if(c.i > 10) move(1); // forward
        });*/
    });

    if('hidemenu' in params) $('#menu').hide();
    if('hideinfo' in params) $('#infopane').hide();
    if('move' in params) gotoMove = parseInt(params.move);
});

// Load SGF for the board display
function loadSGF(sgf) {
    jrecord = JGO.sgf.load(sgf, true);

    if(typeof jrecord == 'string') {
        alert('Error loading SGF: ' + jrecord);
        return;
    }

    if(!(jrecord instanceof JGO.Record)) {
        alert('Empty SGF or multiple games in one SGF not supported!');
        return;
    }

    $('#moves').html(jrecord.normalize()-1); // longest sequence first
    notifier.changeBoard(jrecord.getBoard());
    updateGameInfo(jrecord.getRootNode().info);
    moveNum = 0;
    move(gotoMove); // also updates game info
    gotoMove = 0;
}

function loadFile() {
    var files = document.getElementById("file").files;

	if(!files || files.length == 0)
	   alert("File loading either not supported or no file selected!");

	var reader = new FileReader();
	reader.onload = function() {
        loadSGF(reader.result);
        beginSGF(reader.result);
    };
	reader.readAsText(files[0], "UTF-8");
}
