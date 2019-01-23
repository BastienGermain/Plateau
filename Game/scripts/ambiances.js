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
	melodyP1: new Melody
	(
		Melody.ModesNames[modeIndex] || 'modeName', 
		'leadInstrument', 
		'bassInstrument'
	),
	melodyP2: new Melody
	(
		Melody.ModesNames[modeIndex] || 'modeName', 
		'leadInstrument', 
		'bassInstrument'
	),
}
ambianceX.punctualMelodyP1: new PunctualMelody(ambianceX.melodyP1, 'instrument', octave),
ambianceX.punctualMelodyP2: new PunctualMelody(ambianceX.melodyP2, 'instrument', octave),

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
	melodyP1: new Melody
	(
		'minor',
		4,
		'violin', 
		'cello'
	),
	melodyP2: new Melody
	(
		'major', 
		3,
		'flute', 
		'contrabass'
	),
	
}
ambiance1.punctualMelodyP1 = new PunctualMelody(ambiance1.melodyP1, 'xylophone', 3);
ambiance1.punctualMelodyP2 = new PunctualMelody(ambiance1.melodyP2, 'violin', 4);



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

const ambianceDub = 
{
	beat : new Beat("dub"),
	bassLine : createBassLine("A3", 0),
	melody : new Melody('major', 3, 'violin', 'trumpet'),
	fx : new FXRack()
}

ambianceDub.fx.selectFX('reverb', {reverb : 0.55});
ambianceDub.beat.snare.catchFXs(fx);
ambianceDub.melody.init();

