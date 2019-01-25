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
	nom : "ambiance1",
	beat: new Beat(),
	player1Instrument1 : new InstrumentSampler('french-horn'),
	player1Instrument2 : new InstrumentSampler('french-horn'),
	player2Instrument1 : new InstrumentSampler('french-horn'),
	player2Instrument2 : new InstrumentSampler('french-horn'),
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

const ambianceHarmony =
{
	nom : "ambianceHarmony",
	player1Instrument1 : new InstrumentSampler('violin'),
	player1Instrument2 : new InstrumentSampler('violin'),
	player2Instrument1 : new InstrumentSampler('flute'),
	player2Instrument2 : new InstrumentSampler('flute')
}




const ambianceDrum =
{
	nom : "ambianceDrum",
	beat : new Beat("techno"),
	player1Instrument1 : new InstrumentSampler('french-horn'),
	player1Instrument2 : new InstrumentSampler('french-horn'),
	player2Instrument1 : new InstrumentSampler('flute'),
	player2Instrument2 : new InstrumentSampler('french-horn')
}

const ambianceDub = 
{
	nom : "ambianceDub",
	player1Instrument1 : new InstrumentSampler('violin'),
	player1Instrument2 : new InstrumentSampler('violin'),
	player2Instrument1 : new InstrumentSampler('trumpet'),
	player2Instrument2 : new InstrumentSampler('trumpet'),
	beat : new Beat("dub"),
	bassLine : createBassLine("A3", 0),
	theme : new Theme('major', 3, 'violin', 'trumpet'),
	fx : new FXRack()
}

//ambianceDub.fx.selectFX('reverb', {reverb : 0.55});
//ambianceDub.beat.snare.catchFXs(fx);
ambianceDub.theme.init();

