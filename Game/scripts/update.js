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

function updateMelody(theme)
{
	theme.stopMelody();

	if (data["stonesAround"] == 0)
		theme.updateMelody(8);
	else
	{
		if (data["stonesAround"] <= 2)
			theme.updateMelody(5);
		else
		{
			if (data["stonesAround"] == 3)
				theme.updateMelody(3);
			else
				theme.updateMelody(3);
		}
	}
	theme.startMelody();
}

function updateTempo()
{
	//console.log(Tone.Transport.bpm.value);

	if (data["moveTime"] < 0 && Tone.Transport.bpm.value < tempo + 60)
		Tone.Transport.bpm.value += 10;

	if (data["moveTime"] > 60 && Tone.Transport.bpm.value > tempo - 60)
		Tone.Transport.bpm.value -= 10;
}

function updateMelodyProbability()
{
	switch(data["stoneOnBoard"])
	{
		case 10:
		ambiance.themeP1.updateMelodyNoteProbability(0.1);
		ambiance.themeP2.updateMelodyNoteProbability(0.1);
		break;

		case 20:
		ambiance.themeP1.updateMelodyNoteProbability(0.2);
		ambiance.themeP2.updateMelodyNoteProbability(0.2);
		break;

		case 30:
		ambiance.themeP1.updateMelodyNoteProbability(0.3);
		ambiance.themeP2.updateMelodyNoteProbability(0.3);
		break;

		case 40:
		ambiance.themeP1.updateMelodyNoteProbability(0.4);
		ambiance.themeP2.updateMelodyNoteProbability(0.4);
		break;

		case 50:
		ambiance.themeP1.updateMelodyNoteProbability(0.5);
		ambiance.themeP2.updateMelodyNoteProbability(0.5);
		break;

		case 60:
		ambiance.themeP1.updateMelodyNoteProbability(0.6);
		ambiance.themeP2.updateMelodyNoteProbability(0.6);
		break;

		case 70:
		ambiance.themeP1.updateMelodyNoteProbability(0.75);
		ambiance.themeP2.updateMelodyNoteProbability(0.75);
		break;

		case 80:
		ambiance.themeP1.updateMelodyNoteProbability(0.80);
		ambiance.themeP2.updateMelodyNoteProbability(0.80);
		break;

		case 90:
		ambiance.themeP1.updateMelodyNoteProbability(0.85);
		ambiance.themeP2.updateMelodyNoteProbability(0.85);
		break;

		case 100:
		ambiance.themeP1.updateMelodyNoteProbability(0.90);
		ambiance.themeP2.updateMelodyNoteProbability(0.90);
		break;

		case 110:
		ambiance.themeP1.updateMelodyNoteProbability(0.95);
		ambiance.themeP2.updateMelodyNoteProbability(0.95);
		break;

		default:
		break;
	}
}

function updateMelodyPattern()
{
	if (data["player"] == "White")
	{
		let gameStyleIndicator = whitePlayerFeature.defensive - whitePlayerFeature.offensive;
		
		if (gameStyleIndicator == 0)
			ambiance.themeP2.updateMelodyPattern("random");
		else 
		{
			if (gameStyleIndicator > 0)
			{
				if (gameStyleIndicator <= 2)
					ambiance.themeP2.updateMelodyPattern("downUp");
				else 
					ambiance.themeP2.updateMelodyPattern("down");
			}
			else
			{
				if (gameStyleIndicator >= -2)
					ambiance.themeP2.updateMelodyPattern("upDown");
				else 
					ambiance.themeP2.updateMelodyPattern("up");
			}
		}
	}

	else 
	{
		let gameStyleIndicator = blackPlayerFeature.defensive - blackPlayerFeature.offensive;
		
		if (gameStyleIndicator == 0)
			ambiance.themeP1.updateMelodyPattern("random");
		else 
		{
			if (gameStyleIndicator > 0)
			{
				if (gameStyleIndicator <= 2)
					ambiance.themeP1.updateMelodyPattern("downUp");
				else 
					ambiance.themeP1.updateMelodyPattern("down");
			}
			else
			{
				if (gameStyleIndicator >= -2)
					ambiance.themeP1.updateMelodyPattern("upDown");
				else 
					ambiance.themeP1.updateMelodyPattern("up");
			}
		}
	}
}

function updateTheme()
{
	//console.log(data["player"]);

	currentTheme.stopBase();
	currentTheme.stopMelody();


	if (data["player"] == "White") 
		currentTheme = ambiance.themeP2;

	else
		currentTheme = ambiance.themeP1;

	currentTheme.updateBaseChord();

	if (basePlaying)
		updateBase(currentTheme);

	if(melodyPlaying)
		updateMelody(currentTheme);
}

function update()
{

	//console.log("UPDATE");
	currentTheme.updateBaseChord();

	updateMelodyProbability();
	updateMelodyPattern();
	updateTheme();
	console.log(currentTheme.melody.pattern);

	window.setTimeout(update, Tone.Time("1m").toMilliseconds());
}

function updateBassLine()
{
	bassLine = createBassLine(tonalite);
	bassLine.start();
}