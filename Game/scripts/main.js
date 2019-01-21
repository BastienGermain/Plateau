/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

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

/*function waitForRightTime() {
  return new Promise(resolve => {
    function check() {
      if (Tone.context.currentTime.toFixed(2) % nbMesure == 0.00) {
        console.log('right time to update sound !');
        resolve();
      } else {
        window.setTimeout(check, 10);
      }
    }
    check();
  });
}
async function updateSound() {
    await waitForRightTime();
    if (data["lastPlayer"] == "Black") {
        event2.stop();
        event1.start();
    } else {
        event1.stop();
        event2.start();
    }
}*/


let start = 0;
$(document).ready(function() {
    document.querySelector('#addMove').addEventListener('mouseup', function(e) {
        /* For Chrome : If an AudioContext is created prior to the document receiving a user gesture,
        * it will be created in the "suspended" state,
        * and you will need to call resume() after a user gesture is received.
        */
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

		if (start == 0) {
			updateHarmony();
			//updateBassLine();
			start = 1;
			startTime = Tone.context.currentTime.toFixed(4);
		}
    })
})