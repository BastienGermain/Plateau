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
	{
		theme.updateBaseNoteCount(1);
		updateMelody(8);
	}
	else
	{
		if (data["stonesAround"] <= 2)
		{
			theme.updateBaseNoteCount(2);
			updateMelody(5);
		}
		else
		{
			if (data["stonesAround"] == 3)
			{
				theme.updateBaseNoteCount(3);
				updateMelody(3);
			}
			else
			{
				theme.updateBaseNoteCount(4);
				updateMelody(3);
			}

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