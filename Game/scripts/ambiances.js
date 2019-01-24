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
	harmony : new Harmony(),
	updateHarmony()
	{
		if (relativ==1){
			this.harmony.gamme = minorRelative(this.harmony.gamme);
		}

		this.harmony.randInt = getRandomInt(5);

		switch (this.harmony.randInt)
		{
			case 0 :
				this.harmony.sequence0();
				break;

			case 1 :
				this.harmony.sequence1();
				break;

			case 2 :
				this.harmony.sequence2();
				break;

			case 3 :
				thisharmony.sequence3();
				break;

			case 4 :
				this.harmony.sequence4();
				break;

			default:
				break;
		}

		window.setTimeout(this.updateHarmony, Tone.Time("4m").toMilliseconds());
	}

}





const ambianceDrum =
{
	nom : "ambianceDrum",
	beat : new Beat("techno"),
	player1Instrument : new InstrumentSampler('french-horn'),
	player2Instrument : new InstrumentSampler('french-horn')
}

const ambianceDub = 
{
	nom : "ambianceDub",
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

