/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

var startTime;

Tone.Transport.bpm.value = 120;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var randInt = 0;

var harmony = new Harmony();
var melody = new Melody();

var drum = new InstrumentSampler('drum');
var beat = new Beat(drum, tempo);

function updateHarmony()
{
	if (data["lastPlayer"]=="White")
	{
		if (harmony.relative != 1)
			harmony.relative = 1;
	}
	else
	{
		if (harmony.relative != 0)
			harmony.relative = 0;
	}

	let currentBeat = 0;
	let timeTmp = Tone.context.currentTime.toFixed(4) - startTime;

	while (timeTmp > T-0.1)
	{
		timeTmp-=T;
		currentBeat++;
	}

	if (currentBeat % 16 == 0)
	{
		randInt = getRandomInt(5);
	}

	switch (randInt)
	{
		case 0 :
			harmony.sequence0(currentBeat);
			break;

		case 1 :
			harmony.sequence1(currentBeat);
			break;

		case 2 :
			harmony.sequence2(currentBeat);
			break;

		case 3 :
			harmony.sequence3(currentBeat);
			break;

		case 4 :
			harmony.sequence4(currentBeat);
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


var start = 0;
$(document).ready(function() 
{
    document.querySelector('#addMove').addEventListener('mouseup', function(e) 
    {
        /* For Chrome : If an AudioContext is created prior to the document receiving a user gesture,
        * it will be created in the "suspended" state,
        * and you will need to call resume() after a user gesture is received.
        */
        if (Tone.context.state !== 'running') 
           	Tone.context.resume();

		if (start == 0) 
		{
			//updateHarmony();
			start = 1;
			startTime = Tone.context.currentTime.toFixed(4);
			beat.play(startTime);
			melody.start(startTime);
		}
    })
})
