/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

var startTime;

Tone.Transport.bpm.value = 120;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var harmony = new Harmony();

// MELODY ////////////////////////////////////////////

const melodyP1 = ambiance1.melodyP1;
const melodyP2 = ambiance1.melodyP2;

melodyP1.init();
melodyP2.init();

var melody = melodyP1;

// PONCTUAL MELODY ////////////////////////////////////////////

const punctualMelodyP1 = ambiance1.punctualMelodyP1;
const punctualMelodyP2 = ambiance1.punctualMelodyP2;

punctualMelodyP1.init();

punctualMelodyP2.init();

var punctualMelody = punctualMelodyP1;

// BEAT //////////////////////////////////////////////////////

const drum = new InstrumentSampler('drum');
var beat = new Beat(drum);

/////////////////////////////////////////////////////////////

var technoBeat = new Beat(drum, "techno");
var technoMelody = new Melody(Melody.ModesNames[0], 'cello');




function updateMelody()
{
	melody.stop();
	punctualMelody.stop();

	if (data["lastPlayer"]=="White"){
		melody = melodyP2;
		punctualMelody = punctualMelodyP2;
		//if (relativ != 0) relativ = 0;
	}
	else {
		melody = melodyP1;
		punctualMelody = punctualMelodyP1;
		//if (relativ != 1) relativ = 1;
	}

	melody.update();
	punctualMelody.update();
	
	melody.start();
	punctualMelody.start();

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


//recopiée dans musicAssets.js
/*
function waitForRightTime() {
  return new Promise(resolve => {
    function check() {

      if (Math.round(Tone.context.currentTime.toFixed(2)*60*100) % Math.round(Tone.Transport.bpm.value*100)  == 0.00) {
        console.log('right time to update sound !');
        console.log(Tone.context.currentTime.toFixed(2)*60);
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



//preparation ambianceDub
async function updateBassLine(phase){
await waitForRightTime();


	ambianceDub.bassLine.stop();

	if (phase==1){
		if (data["player"]=="White"){
			ambianceDub.bassLine = createBassLine("A3", 1);
		}
		else {
			ambianceDub.bassLine = createBassLine("A3", 0);	
		}
	}
	if (phase==2){
		//if (ambianceDub.beat != null){
		//	ambianceDub.beat.stop();
		//}
		ambianceDub.beat.play();
		if (data["player"]=="White"){
			ambianceDub.bassLine = createBassLine("A3", 1);
		}
		else {
			ambianceDub.bassLine = createBassLine("A3", 0);	
		}
	}
	if (phase==3){
		if (data["player"]=="White"){
			ambianceDub.bassLine = createBassLine("A3", 2);
		}
		else {
			ambianceDub.beat.play();
			ambianceDub.bassLine = createBassLine("A3", 3);	
		}
	}
	ambianceDub.bassLine.start();
	
	//window.setTimeout(updateBassLine, Tone.Time("4m").toMilliseconds());
}


var phase = 0;
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
			//updateBassLine();
			start = 1;
			phase = 1;
			startTime = Tone.context.currentTime.toFixed(4);
			
			//beat.play(startTime);
			//melody.start(startTime);
			//updateMelody();

			//beat.play(startTime);
			//melody.start(startTime);
			//punctualMelody.start(startTime);
			//updateMelody();

			beat.play(startTime);
			melody.start(startTime);
			punctualMelody.start(startTime);
			updateMelody();
			//updateHarmony();	//lance l'harmonie


			//Tone.Transport.bpm.value*=3;		//drum'n'bass ambiance
			//technoBeat.play();


			//ambianceDub.beat.play();
			//dubMelody.start();
			//updateBassLine(phase);
			//bassLineLow.start();
		}
		
		/*
		if (data["stoneOnBoard"]>4){
			phase=2;
		}
		if (data["stoneOnBoard"]>8){
			phase=3;
		}
	
		updateBassLine(phase);	*/
    })
})
