// MODELE /////////////////////////////////////////////////

/* AMBIANCE DESCRIPTION */
/*
*
*
*
*
*
*
*////////////////////////

/*

const ambianceX = 
{
	beat: new Beat(),
	themeP1: new Theme
	(
		Theme.ModesNames[modeIndex] || 'modeName', 
		'leadInstrument', 
		'bassInstrument'
	),
	themeP2: new Theme
	(
		Theme.ModesNames[modeIndex] || 'modeName', 
		'leadInstrument', 
		'bassInstrument'
	),
}

*/

///////////////////////////////////////////////////////////////////

/* AMBIANCE DESCRIPTION */
/*
*
*
*
*
*
*
*////////////////////////

const ambiance1 = 
{
	beat: new Beat(),
	themeP1: new Theme
	(
		'minor',
		4,
		'violin', 
		'cello'
	),
	themeP2: new Theme
	(
		'major', 
		3,
		'flute', 
		'contrabass'
	),
	
}

///////////////////////////////////////////////////////////////////

/* AMBIANCE DESCRIPTION */
/*
*
*
*
*
*
*
*////////////////////////
const ambianceDrum =
{
	beat : new Beat("techno")
}

const ambianceDub = 
{
	player1Instrument : new InstrumentSampler('violin'),
	player2Instrument : new InstrumentSampler('trumpet'),
	beat : new Beat("dub"),
	bassLine : createBassLine("A3", 0),
	theme : new Theme('major', 3, 'violin', 'trumpet'),
	fx : new FXRack()
}

ambianceDub.fx.selectFX('reverb', {reverb : 0.55});
ambianceDub.beat.snare.catchFXs(fx);
ambianceDub.theme.init();

