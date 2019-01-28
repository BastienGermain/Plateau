function init()
{
	initTonic();
	initInstruments();
}

function initTonic() 
{
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
}

function initInstruments()
{
	let nextAmbianceInit;

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
		if (ambiance != ambiance1)
			nextAmbianceInit = ambiance1;
		else 
			nextAmbianceInit = ambianceHarmony;


		if (data["stoneOnBoard"]==5)
		{
			nextAmbianceInit.player1Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbianceInit.player1Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
		if (data["stoneOnBoard"]==6)
		{
			nextAmbianceInit.player2Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbianceInit.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}
	}

	if (data["stoneOnBoard"]>6 && data["stoneOnBoard"]<=8)
	{
		if (ambiance == ambianceDub)
			nextAmbianceInit = ambianceHarmony;
		else
			nextAmbianceInit = ambianceDub;
		
		if (data["stoneOnBoard"]==7)
		{
			nextAmbianceInit.player1Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbianceInit.player1Instrument2 = instrument1List[data["stonePosition"][1]%6];
		}	
		if (data["stoneOnBoard"]==8)
		{
			nextAmbianceInit.player2Instrument1 = instrument1List[data["stonePosition"][0]];
			nextAmbianceInit.player2Instrument2 = instrument1List[data["stonePosition"][1]%6];
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

	if(nextAmbianceInit)
	{	
		nextAmbianceInit.themeP1.updateLead(nextAmbianceInit.player1Instrument1);
		nextAmbianceInit.themeP1.updateBase(nextAmbianceInit.player1Instrument2);
		nextAmbianceInit.themeP2.updateLead(nextAmbianceInit.player2Instrument1);
		nextAmbianceInit.themeP2.updateBase(nextAmbianceInit.player2Instrument2);
	}
}