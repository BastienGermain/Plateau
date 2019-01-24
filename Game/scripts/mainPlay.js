var start = 0;
var startTime = null;

const tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

//////////////////////////////////////

const ambiance = ambiance1;
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

function updateHarmony() 
{
	harmony.randInt = getRandomInt(5);

	switch (harmony.randInt) {
		case 0:
		harmony.sequence0();
		break;

		case 1:
		harmony.sequence1();
		break;

		case 2:
		harmony.sequence2();
		break;

		case 3:
		harmony.sequence3();
		break;

		case 4:
		harmony.sequence4();
		break;

		default:
		break;
	}

	window.setTimeout(updateHarmony, Tone.Time("4m").toMilliseconds());
}



$("#board").on('click', function(coord) 
{
	if (Tone.context.state !== 'running')
		Tone.context.resume();

	if (start == 0) 
	{
		startTime = Tone.context.currentTime.toFixed(4);

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

		start = 1; 
	}

	updateTempo();
	updateTheme();
});
