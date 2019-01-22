/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

var startTime;

Tone.Transport.bpm.value = 120;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var harmony = new Harmony();

var melodyP1 = new Melody(Melody.ModesNames[8], 'bass-electric', 'piano');
var melodyP2 = new Melody(Melody.ModesNames[3], 'cello', 'bassoon');

melodyP1.init();
melodyP2.init();

var melody = melodyP1;

const drum = new InstrumentSampler('drum');
var beat = new Beat(drum);

var technoBeat = new Beat(drum, techno=true);
var technoMelody = new Melody(Melody.ModesNames[0], 'cello');
/*
function updateBassLine(){
	bassLine = createBassLine(tonalite);
	bassLine.start();
}*/

function updateMelody()
{
	melody.stop();

	if (data["lastPlayer"]=="White"){
		melody = melodyP2;
		//if (relativ != 0) relativ = 0;
	}
	else {
		melody = melodyP1;
		//if (relativ != 1) relativ = 1;
	}

	melody.update();
	melody.start();

	window.setTimeout(updateMelody, Tone.Time("1m").toMilliseconds());
}

function updateTechnoMelody()
{
	technoMelody.stop();
	technoMelody.update();
	technoMelody.start();

	window.setTimeout(updateMelody, Tone.Time("1m").toMilliseconds());
}

function updateHarmony()
{
	harmony.randInt = getRandomInt(5);

	switch (harmony.randInt)
	{
		case 0 :
			harmony.sequence0();
			break;

		case 1 :
			harmony.sequence1();
			break;

		case 2 :
			harmony.sequence2();
			break;

		case 3 :
			harmony.sequence3();
			break;

		case 4 :
			harmony.sequence4();
			break;

		default:
			break;
	}

	window.setTimeout(updateHarmony, Tone.Time("4m").toMilliseconds());
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

		if (start == 0) {
			//updateBassLine();
			start = 1;
			startTime = Tone.context.currentTime.toFixed(4);
			
			//beat.play(startTime);
			//melody.start(startTime);
			//updateMelody();

			//updateHarmony();	//lance l'harmonie


			Tone.Transport.bpm.value*=3;
			technoBeat.play();
		}
    })
})