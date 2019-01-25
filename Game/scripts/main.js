/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

var startTime;

tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();
var harmony = new Harmony("A3");

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
	await waitForRightTime();

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
const Instrument1List = ['piano', 'bassoon', 'cello', 'clarinet', 
 'flute', 'french-horn', 'guitar-acoustic', 
'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 
'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone'];

const Instrument2List = ['bass-electric', 'bassoon', 'cello', 'french-horn', 'contrabass', 'tuba'];


var phase = 0;
var start = 0;
var actualAmbiance;
var tonalite;
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

        ////CODE INITIALISATION
        //1er coup
		if (start == 0)
		{
			start = 1;
			//phase = 1;
			startTime = Tone.context.currentTime.toFixed(4);

			//joueur1 choisit l'ambiance
			let horizontalPos = data["stonePosition"][0];
			if (horizontalPos >= 12){
				actualAmbiance = ambiance1;
			}
			else if (horizontalPos >= 6){
				actualAmbiance = ambianceDub;
			}
			else if (horizontalPos >= 0){
				actualAmbiance = ambianceHarmony;
			}
			actualAmbiance = ambianceHarmony;
			console.log("selected ambiance = " + actualAmbiance.nom);


			updateHarmony();

			//actualAmbiance.beat.playKick();
		}

		//joueur2 choisit la tonalite
		let horizontalPos = data["stonePosition"][0];
		if (data["stoneOnBoard"]==2){

			if (horizontalPos >= 16){
				tonalite = "G3";
			}
			else if (horizontalPos >= 13){
				tonalite = "F3";
			}
			else if (horizontalPos >= 10){
				tonalite = "E3";
			}
			else if (horizontalPos >= 8){
				tonalite = "D3";
			}
			else if (horizontalPos >= 6){
				tonalite = "C3";
			}
			else if (horizontalPos >= 3){
				tonalite = "B3";
			}
			else if (horizontalPos >= 0){
				tonalite = "A3";
			}

			tonalite = "C3";
			console.log("selected tonalite = " + tonalite);
			//harmony = new Harmony(tonalite);

			//harmony.play();
		}



		////FIN INITIALISATION



		//ICI NOTIFICATION DES CHGTS DE DATA

		//valable pour toutes les ambiances
		if (data["blackCaptures"]>lastData["blackCaptures"]){
			victoryMelody(actualAmbiance.player1Instrument, tonalite).start();
		}
		if (data["whiteCaptures"]>lastData["whiteCaptures"]){
			victoryMelody(actualAmbiance.player2Instrument, tonalite).start();
		}



		//valable pour une ambiance précise :

		if (actualAmbiance == ambianceHarmony){

			if (data["player"]=="Black")
			{
				//harmony.stop = 0;
				//updateHarmony();

			}
			else{
				//harmony.stop = 1;	//ça marche mais décalage 4mesure
			}
		}


		if (actualAmbiance == ambianceDrum){
			if (data["player"]=="Black")
			{
				//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[0];
			}
			else{
				//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[1];
			}

		}





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
