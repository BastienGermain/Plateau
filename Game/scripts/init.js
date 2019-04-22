function init(theme)
{
	initTonic(theme);
	initInstruments();
	initMode();
}

function initTonic(theme) 
{
	let horizontalPos = data["stonePosition"][0];

	theme.octave = 3; 
	if (data["stoneOnBoard"]==2)
	{
		if (horizontalPos >= 16)
			theme.tonic = "G"
		else if (horizontalPos >= 13)
			theme.tonic = "F"
		else if (horizontalPos >= 10)
			theme.tonic = "E"
		else if (horizontalPos >= 8)
			theme.tonic = "D"
		else if (horizontalPos >= 6)
			theme.tonic = "C"
		else if (horizontalPos >= 3)
			theme.tonic = "B"
		else if (horizontalPos >= 0)
			theme.tonic = "A"

		console.log("selected tonalite = " + theme.tonic + theme.octave)

	}	
}

function initInstruments()
{
	
}

function initMode()
{

}