var start = 0;
var startTime = null;

const tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

//////////////////////////////////////
var lastData;
var phase;

var ambiance;
var tonalite;

const beat = new Beat();

//////////////////////////////////////

var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;

function updateMode()
{
	console.log(data["cornerMove"]);

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

	if (data["moveTime"] < 2 && Tone.Transport.bpm.value < tempo + 60)
		Tone.Transport.bpm.value += 10;

	if (data["moveTime"] > 60 && Tone.Transport.bpm.value > tempo - 60)
		Tone.Transport.bpm.value -= 10;
}

function updateTheme()
{
	console.log(data["player"]);

	if (data["player"] == "White")
	{
		if (basePlaying)
		{
			ambiance.themeP1.stopBase();
			updateBase(ambiance.themeP2);
			ambiance.themeP2.startBase();
		}

		if (melodyPlaying)
		{
			ambiance.themeP1.stopMelody();
			ambiance.themeP2.startMelody();
		}

		currentTheme = ambiance.themeP2;
	}

	else
	{
		if (basePlaying)
		{
			ambiance.themeP2.stopBase();
			ambiance.themeP2.stopMelody();
			updateBase(ambiance.themeP1);
		}

		if(melodyPlaying)
		{
			ambiance.themeP1.startBase();
			ambiance.themeP1.startMelody();
		}

		currentTheme = ambiance.themeP1;
	}
}

function update()
{
	currentTheme.updateBaseChord();

	window.setTimeout(update, Tone.Time("1m").toMilliseconds());
}

function updateBassLine()
{
	bassLine = createBassLine(tonalite);
	bassLine.start();
}



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


		//joueur1 choisit l'ambiance
		let horizontalPos = data["stonePosition"][0];
		if (horizontalPos >= 12){
			ambiance = ambianceDub;
		}
		else if (horizontalPos >= 6){
			ambiance = ambiance1;
		}
		else if (horizontalPos >= 0){
			ambiance = ambianceHarmony;
		}
		ambiance = ambiance1;
		console.log("selected ambiance = " + ambiance.nom);

		//1ers sons...
		if (ambiance == ambiance1)
		{
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
		}
		//actualAmbiance.beat.playKick();


		start = 1;
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
		console.log("selected tonalite = " + tonalite);
		//une fois qu'on a la tonalité on initialise, harmony , et d'autres...
		harmony = new Harmony(tonalite);


		//harmony.play();
	}
	////FIN INITIALISATION


	if (data["stoneOnBoard"]>2)		//2 si l'initialisation se fait en 2 coups
	{

	//ICI NOTIFICATION DES CHGTS DE DATA

		//valable pour toutes les ambiances

		updateTempo();
		updateTheme();

		if (data["blackCaptures"]>lastData["blackCaptures"]){
			victoryMelody(actualAmbiance.player1Instrument, tonalite).start();
		}
		if (data["whiteCaptures"]>lastData["whiteCaptures"]){
			victoryMelody(actualAmbiance.player2Instrument, tonalite).start();
		}



		//valable pour une ambiance précise :

		//REGLES AMBIANCE1
		if (actualAmbiance == ambianc1){

		}


		//REGLES AMBIANCE HARMONY
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

		//REGLES AMBIANCEDUB
		if (actualAmbiance == ambianceDub){

		}


		//REGLES AMBIANCEDRUM
		if (actualAmbiance == ambianceDrum){
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
