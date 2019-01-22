let start = 0;

var startTime;

Tone.Transport.start();

var randInt = 0;

function updateBassLine(){
	bassLine = createBassLine(tonalite);
	bassLine.start();
}

function updateHarmony()
{
	if (data["lastPlayer"]=="White"){
		harmonyInstrument = player2Instrument;
		//if (relativ != 0) relativ = 0;
	}
	else {
		harmonyInstrument = player1Instrument;
		//if (relativ != 1) relativ = 1;
	}
	//console.log("relativ =" + relativ);

	var currentBeat = 0;
	var timeTmp = Tone.context.currentTime.toFixed(4) - startTime;
	while (timeTmp > T-0.1)
	{
		timeTmp-=T;
		currentBeat++;
	}
	//console.log(currentBeat);
	if (currentBeat % 16 == 0)
	{
		randInt = getRandomInt(5);
	}

	switch (randInt)
	{
		case 0 :
			sequence0(currentBeat);
			break;

		case 1 :
			sequence1(currentBeat);
			break;

		case 2 :
			sequence2(currentBeat);
			break;

		case 3 :
			sequence3(currentBeat);
			break;

		case 4 :
			sequence4(currentBeat);
			break;

		default:
			break;
	}

	window.setTimeout(updateHarmony, 1000*T);
}

var updateCaptures = function (node) {
  document.getElementById('black-captures').innerText = node.info.captures[JGO.BLACK];
  document.getElementById('white-captures').innerText = node.info.captures[JGO.WHITE];
};
var jrecord = new JGO.Record(19);
var jboard = jrecord.jboard;
var jsetup = new JGO.Setup(jboard, JGO.BOARD.largeWalnut);
var player = JGO.WHITE; // next player
var ko = false, lastMove = false; // ko coordinate and last move coordinate
var lastHover = false, lastX = -1, lastY = -1; // hover helper vars

// Handle handicap
//jboard.setType(JGO.util.getHandicapCoordinates(jboard.width, 2), JGO.BLACK);

jsetup.setOptions({stars: {points:5}});
jsetup.create('board', function(canvas) {
  canvas.addListener('click', function(coord, ev) {
    var opponent = (player == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;

    if(ev.shiftKey) { // on shift do edit
      if(jboard.getMark(coord) == JGO.MARK.NONE)
        jboard.setMark(coord, JGO.MARK.SELECTED);
      else
        jboard.setMark(coord, JGO.MARK.NONE);

      return;
    }

    // clear hover away - it'll be replaced or then it will be an illegal move
    // in any case so no need to worry about putting it back afterwards
    if(lastHover)
      jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

    lastHover = false;

    var play = jboard.playMove(coord, player, ko);

    if(play.success) {
      node = jrecord.createNode(true);
      node.info.captures[player] += play.captures.length; // tally captures
      node.setType(coord, player); // play stone
      node.setType(play.captures, JGO.CLEAR); // clear opponent's stones

      if (play.captures.length != 0) {
          let i;
          for (i = 0; i < play.captures.length; i++) {
              data["stoneOnBoard"] -= 1;
              boardMat = insertIntoMatrixXY(boardMat, play.captures[i].i, play.captures[i].j, 0);
          }
      }

      boardMat = fillMatrixPlay(boardMat, player, coord.i, coord.j);
      if (player == 1) {
          data["player"] = "Black";
      } else {
          data["player"] = "White";
      }

	  if (data["stoneOnBoard"] != 0) {
		  data["previousStonePosition"] = data["stonePosition"];
	  }

      data["stonePosition"] = [coord.i, coord.j];
      getStonesAround();
      data["stoneOnBoard"] += 1;
      data["whiteCaptures"] = node.info.captures[2];
      data["blackCaptures"] = node.info.captures[1];
      data["knownMove"] = checkKnownMoves(data, boardMat);
      // ajouter le temps
      //data["lastMoveTime"] = sgf[moveNumber].C;
      checkAtari(boardMat);

      if(lastMove)
        node.setMark(lastMove, JGO.MARK.NONE); // clear previous mark
      if(ko)
        node.setMark(ko, JGO.MARK.NONE); // clear previous ko mark

      node.setMark(coord, JGO.MARK.CIRCLE); // mark move
      lastMove = coord;

      if(play.ko)
        node.setMark(play.ko, JGO.MARK.CIRCLE); // mark ko, too
      ko = play.ko;

      player = opponent;
      updateCaptures(node);


      if (Tone.context.state !== 'running') {
          Tone.context.resume();
      }

      if (start == 0) {
          //updateHarmony();
          //updateBassLine();
          start = 1;
          startTime = Tone.context.currentTime.toFixed(4);
      }

	  switchTimer();

    } else alert('Illegal move: ' + play.errorMsg);
  });

  canvas.addListener('mousemove', function(coord, ev) {
    if(coord.i == -1 || coord.j == -1 || (coord.i == lastX && coord.j == lastY))
      return;

    if(lastHover) // clear previous hover if there was one
      jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

    lastX = coord.i;
    lastY = coord.j;

    if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
      jboard.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
      lastHover = true;
    } else
      lastHover = false;
  });

  canvas.addListener('mouseout', function(ev) {
    if(lastHover)
      jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

    lastHover = false;
  });

});
