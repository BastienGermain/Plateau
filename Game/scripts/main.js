/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

var startTime;

tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

//var harmony = new Harmony();

// MELODY ////////////////////////////////////////////
/*
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
*/


// BEAT //////////////////////////////////////////////////////

var beat = new Beat();

/////////////////////////////////////////////////////////////

//var technoBeat = new Beat("techno");
//var technoTheme = new Theme(Theme.ModesNames[0], 'cello');

async function updateTheme()
{
	console.log(Tone.Transport.bpm.value);
	melody.stopBase();

	// Set of instrument used according to the player currently playing

	if (data["player"] == "White")
		melody = melodyP2;
	else 
		melody = melodyP1;


	melody.startBase();

	window.setTimeout(updateMelody, Tone.Time("1m").toMilliseconds());
}

/*

function updateTechnoMelody()
{
	technoMelody.stopBase();
	technoMelody.updateArpeggio();
	technoMelody.startBase();

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

//preparation ambianceDub
async function updateBassLine(phase)
{
	await waitForRightTime();

	//ambianceDub.bassLine.stop();

	//les règles pour les != phases
	if (phase==1){
		//Tone.Transport.bpm.value*=3;
		//ambianceDrum.beat.play();
		if (data["player"]=="White"){
			//ambianceDub.bassLine = createBassLine("A3", 1);
		}
		else {
			//ambianceDub.bassLine = createBassLine("A3", 0);	
		}
	}
	if (phase==2){
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
	if (phase==4){
		if (data["player"]=="White"){
			ambianceDub.bassLine = createBassLine("A3", 2);
		}
		else {
			ambianceDub.beat.play();
			ambianceDub.bassLine = createBassLine("A3", 3);	
		}
	}

	//ambianceDub.bassLine.start();
	
	//window.setTimeout(updateBassLine, Tone.Time("4m").toMilliseconds());
}


*/

var lastData;
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
			start = 1;
			//phase = 1;
			startTime = Tone.context.currentTime.toFixed(4);

			
			//ICI CODE D INITIALISATION JOUEUR 1 
			//en fonction de la position des pierres, choix tonalite, instruments
			//(en vrai ça concerne pas que le 1er tour ...)

			var actualAmbiance = ambianceDrum;
			var tonalite = "A3"

			lastData = data;
		}

		//ICI NOTIFICATION DES CHGTS DE DATA
		if (data["blackCaptures"]>lastData["blackCaptures"]){
			createVictoryMelody(actualAmbiance.player1Instrument, tonalite).start();
		}
		if (data["whiteCaptures"]>lastData["whiteCaptures"]){
			createVictoryMelody(actualAmbiance.player2Instrument, tonalite).start();
		}


		if (actualAmbiance == ambianceDrum){
			if (data["player"]=="Black"){ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[0];}
			else{ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[1];}
			ambianceDrum.beat.playHihat();
		}
		
		//lastData = data;

		
    })
})

	/*
			melody.startBase(startTime);
			updateMelody();

			//updateHarmony();	//lance l'harmonie
			//Tone.Transport.bpm.value*=3;		//drum'n'bass ambiance
			//technoBeat.play();
			//ambianceDub.beat.play();
			//dubMelody.start();
			//updateBassLine(phase);
			//bassLineLow.start();

		
		/*

		if (data["stoneOnBoard"]>4){
			phase=2;
			ambianceDub.beat.play();
		}
		if (data["stoneOnBoard"]>8){
			phase=3;
			ambianceDub.fx.selectFX('reverb', {reverb : 0.55});
			ambianceDub.beat.snare.catchFXs(fx);
		}
		if (data["stoneOnBoard"]>12){
			phase=4;
			ambianceDub.melody.start();
		}
		if (data["stoneOnBoard"]>16){
			ambianceDub.melody.melodyInterval = '1n';
		}*/

		//updateBassLine(phase);	

