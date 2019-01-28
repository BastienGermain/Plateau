var start = 0;
var startTime = null;

const tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var recorder, soundFile;

//////////////////////////////////////
var lastData;
var phase;

var ambiance;
var tonalite;

var whitePlayerFeature = new PlayerFeature();
var blackPlayerFeature = new PlayerFeature();

const instrument1List = [new InstrumentSampler('piano'),  new InstrumentSampler('bassoon'), new InstrumentSampler('cello'), 
new InstrumentSampler('clarinet'), new InstrumentSampler('flute'), new InstrumentSampler('french-horn'), 
new InstrumentSampler('guitar-acoustic'), new InstrumentSampler('guitar-electric'), new InstrumentSampler('guitar-nylon'), 
new InstrumentSampler('harmonium'), new InstrumentSampler('harp'), new InstrumentSampler('organ'), new InstrumentSampler('saxophone'), 
new InstrumentSampler('trombone'), new InstrumentSampler('trumpet'), new InstrumentSampler('tuba'), 
new InstrumentSampler('violin'), new InstrumentSampler('xylophone')]

const instrument2List = [new InstrumentSampler('bass-electric'), new InstrumentSampler('bassoon'), new InstrumentSampler('cello'), 
new InstrumentSampler('french-horn'), new InstrumentSampler('constrabass'), new InstrumentSampler('tuba')]

const beat = new Beat();

//////////////////////////////////////

var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;

function saveMusic()
{
	if (recorder)
	{
		//recorder.stop(); // stop recorder, and send the result to soundFile
		saveSound(soundFile, 'mySound.wav'); // save file
		console.log("Recorded ! ");
	}
}

function updateMode()
{
	switch (data["cornerMove"])
	{
		case "San-san":
		ambiance.themeP1.updateMode("dorian");
		ambiance.themeP2.updateMode("dorian");
		break;

		case "Hoshi":
		ambiance.themeP1.updateMode("lydian");
		ambiance.themeP2.updateMode("lydian");
		break;

		case "Komoku":
		ambiance.themeP1.updateMode("melodic minor");
		ambiance.themeP2.updateMode("melodic minor");
		break;

		case "Takamoku":
		ambiance.themeP1.updateMode("locrian");
		ambiance.themeP2.updateMode("locrian");
		break;

		case "Mokuhazushi":
		ambiance.themeP1.updateMode("mixolydian");
		ambiance.themeP2.updateMode("mixolydian");
		break;

		default:
		ambiance.themeP1.updateMode("major");
		ambiance.themeP2.updateMode("major");
		break;
	}

	console.log(ambiance.themeP2.mode);
}

function updateBase(theme)
{
	theme.stopBase();

	if (data["stonesAround"] == 0)
		theme.updateBaseNoteCount(1);
	else
	{
		if (data["stonesAround"] <= 2)
			theme.updateBaseNoteCount(2);
		else
		{
			if (data["stonesAround"] == 3)
				theme.updateBaseNoteCount(3);
			else
				theme.updateBaseNoteCount(4);
		}
	}

	theme.startBase();
}

function updateTempo()
{
	console.log(Tone.Transport.bpm.value);

	if (data["moveTime"] < 0 && Tone.Transport.bpm.value < tempo + 60)
		Tone.Transport.bpm.value += 10;

	if (data["moveTime"] > 60 && Tone.Transport.bpm.value > tempo - 60)
		Tone.Transport.bpm.value -= 10;
}

function updateTheme()
{
	console.log(data["player"]);

	currentTheme.stopBase();
	currentTheme.stopMelody();

	if (data["player"] == "White") 
		currentTheme = ambiance.themeP2;

	else
		currentTheme = ambiance.themeP1;

	if (basePlaying)
	{
		updateBase(currentTheme);
		currentTheme.startBase();
	}

	if(melodyPlaying)
	{
		currentTheme.updateMelody(3);
		currentTheme.startMelody();
	}

}

function update()
{
	currentTheme.updateBaseChord();
	updateTheme();

	window.setTimeout(update, Tone.Time("1m").toMilliseconds());
}

function updateBassLine()
{
	bassLine = createBassLine(tonalite);
	bassLine.start();
}



//Evenement Pose de pierre :
$("#board").on('click', function(coord) 
{
	console.log(data);
	console.log(lastData);

	if (Tone.context.state !== 'running')
		Tone.context.resume();

	////CODE INITIALISATION
	if (start == 0)
	{
		startTime = Tone.context.currentTime.toFixed(4);

  		recorder = new p5.SoundRecorder();
  		recorder.setInput();
  		soundFile = new p5.SoundFile();
  		recorder.record(soundFile);

		//joueur1 choisit l'ambiance
		let horizontalPos = data["stonePosition"][0];

		if (horizontalPos >= 12)
			ambiance = ambianceDub;

		else if (horizontalPos >= 6)
			ambiance = ambiance1;

		else if (horizontalPos >= 0)
			ambiance = ambianceHarmony;

		ambiance = ambiance1;

		console.log("selected ambiance = " + ambiance.nom);

		//1ers sons...
		if (ambiance == ambiance1)
		{
			updateMode();
			ambiance.themeP1.init({probability: 0.9});
			ambiance.themeP2.init({probability: 0.9});

			beat.playKick(startTime);
			beat.playSnare(startTime);
			beat.playHihat(startTime);
		}

		//ambiance.beat.playKick();
		start = 1; 
	}

	//joueur2 choisit la tonalite
	let horizontalPos = data["stonePosition"][0];

	if (data["stoneOnBoard"]==2)
	{
		if (horizontalPos >= 16)
			tonalite = "G4";
		else if (horizontalPos >= 13)
			tonalite = "F4";
		else if (horizontalPos >= 10)
			tonalite = "E4";
		else if (horizontalPos >= 8)
			tonalite = "D4";
		else if (horizontalPos >= 6)
			tonalite = "C4";
		else if (horizontalPos >= 3)
			tonalite = "B4";
		else if (horizontalPos >= 0)
			tonalite = "A4";

		console.log("selected tonalite = " + tonalite);

		//une fois qu'on a la tonalité on initialise, harmony , et d'autres...
		if (ambiance == ambiance1)
		{
			ambiance.themeP1.updateTonic(tonalite.charAt(0), tonalite.charAt(1));
			ambiance.themeP2.updateTonic(tonalite.charAt(0), tonalite.charAt(1));
			
			ambiance.themeP1.startBase(Tone.TransportTime(Tone.now() + "1m").quantize("1m"));
			basePlaying = true;
			currentTheme = ambiance.themeP1;
			update();
		}

		else if (ambiance == ambianceHarmony)
			harmony = new Harmony(tonalite);

		//harmony.play();
	}


	if (data["stoneOnBoard"]==3)
	{
		ambiance.player1Instrument1 = instrument1List[data["stonePosition"][0]];
		ambiance.player1Instrument2 = instrument2List[data["stonePosition"][1]%6];
	}	
	if (data["stoneOnBoard"]==4)
	{
		ambiance.player2Instrument1 = instrument1List[data["stonePosition"][0]];
		ambiance.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];

	}
	

	if (data["stoneOnBoard"]>4 && data["stoneOnBoard"]<=8)
	{
		let nextAmbianceInit;
		if (ambiance != ambiance1)
		{
			nextAmbiance = ambiance1;
		}
		else {
			nextAmbiance = ambianceHarmony;
		}

		if (data["stoneOnBoard"]==5)
		{
			nextAmbiance.player1Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbiance.player1Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
		if (data["stoneOnBoard"]==6)
		{
			nextAmbiance.player2Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbiance.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
	}

	if (data["stoneOnBoard"]>6 && data["stoneOnBoard"]<=8)
	{
		let nextAmbianceInit;
		if (ambiance == ambianceDub)
		{
			nextAmbiance = ambianceHarmony;
		}
		else {
			nextAmbiance = ambianceDub;
		}

		if (data["stoneOnBoard"]==7)
		{
			nextAmbiance.player1Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbiance.player1Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
		if (data["stoneOnBoard"]==8)
		{
			nextAmbiance.player2Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbiance.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}
	}

	if (data["stoneOnBoard"]>8 && data["stoneOnBoard"]<=10)
	{
		if (data["stoneOnBoard"]==9)
		{
			ambianceDrum.player1Instrument1 = instrument1List[data["stonePosition"][0]];
			ambianceDrum.player1Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
		if (data["stoneOnBoard"]==10)
		{
			ambianceDrum.player2Instrument1 = instrument1List[data["stonePosition"][0]];
			ambianceDrum.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}
	}

	////FIN INITIALISATION


	//reconnaissance des knownMove et cornerMove & update de PlayerFeature;
	updateFeatures();
	/*
	console.log("blackPlayerFeature :");
	console.log("offensive :"+blackPlayerFeature.offensive);
	console.log("defensive :"+blackPlayerFeature.defensive);
	console.log("expensive :"+blackPlayerFeature.expensive);
	console.log("offensive :"+blackPlayerFeature.risky);
	console.log("whitePlayerFeature :");
	console.log("offensive :"+whitePlayerFeature.offensive);
	console.log("defensive :"+whitePlayerFeature.defensive);
	console.log("expensive :"+whitePlayerFeature.expensive);
	console.log("offensive :"+whitePlayerFeature.risky);
	*/

	if (data["stoneOnBoard"]>4)		//2 si l'initialisation se fait en 2 coups
	{

		//if (ambiance == ambiance1)
		//{
			updateMode();
			ambiance.themeP1.init();
			ambiance.themeP2.init();

			beat.playKick(startTime);
			beat.playSnare(startTime);
			beat.playHihat(startTime);

			ambiance.themeP1.startBase(startTime);
			basePlaying = true;
			currentTheme = ambiance.themeP1;
			update();
		//}

	//ICI NOTIFICATION DES CHGTS DE DATA

		//valable pour toutes les ambiances

		updateTempo();

		if (data["blackCaptures"]>lastData["blackCaptures"])
			victoryMelody(ambiance.player1Instrument, tonalite);

		if (data["whiteCaptures"]>lastData["whiteCaptures"])
			victoryMelody(ambiance.player2Instrument, tonalite);

		//valable pour une ambiance précise :

		//REGLES AMBIANCE1
		if (ambiance == ambiance1)
		{
			if (data["stoneOnBoard"] >= 10)
			{
				if (data["player"] == "Black")
					ambiance.themeP1.startMelody(Tone.TransportTime(Tone.now() + "1m").quantize("1m"));

				if (data["player"] == "White")
					ambiance.themeP2.startMelody(Tone.TransportTime(Tone.now() + "1m").quantize("1m"));
			
				melodyPlaying = true;
			}

		}

		//REGLES AMBIANCE HARMONY
		if (ambiance == ambianceHarmony){

			if (data["player"]=="Black")
			{
				//harmony.stop = 0;
				//updateHarmony();

			}
			else{
				//harmony.stop = 1;	//ça marche mais décalage 4mesure
			}
		}

		//REGLES AMBIANCEDUB
		if (ambiance == ambianceDub){

		}


		//REGLES AMBIANCEDRUM
		if (ambiance == ambianceDrum){
			if (data["player"]=="Black")
			{
				//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[0];
			}
			else{
				//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[1];
			}

		}
	}
});
