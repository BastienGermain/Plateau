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
	punctualMelodyP1: new PunctualMelody('instrument', octave),
	punctualMelodyP2: new PunctualMelody('instrument', octave),
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
	melodyP1: new Melody
	(
		'major',
		3,
		'trumpet', 
		'piano'
	),
	melodyP2: new Melody
	(
		'major', 
		3,
		'flute', 
		'contrabass'
	)
}
ambiance1.punctualMelodyP1 = new PunctualMelody(ambiance1.melodyP1, 'xylophone', 3);
ambiance1.punctualMelodyP2 = new PunctualMelody(ambiance1.melodyP2, 'violin', 4);

const ambiance2 =
{

}