function init()
{
	initTonic();
	initInstruments();
	initMode();
}

function initTonic() 
{
	let horizontalPos = data["stonePosition"][0];

	let octave = 3; 
	if (data["stoneOnBoard"]==2)
	{
		if (horizontalPos >= 16)
			tonalite = "G" + octave;
		else if (horizontalPos >= 13)
			tonalite = "F" + octave;
		else if (horizontalPos >= 10)
			tonalite = "E" + octave;
		else if (horizontalPos >= 8)
			tonalite = "D" + octave;
		else if (horizontalPos >= 6)
			tonalite = "C" + octave;
		else if (horizontalPos >= 3)
			tonalite = "B" + octave;
		else if (horizontalPos >= 0)
			tonalite = "A" + octave;

		console.log("selected tonalite = " + tonalite);

	}	
}

function initInstruments()
{
	
}

function initMode()
{

}