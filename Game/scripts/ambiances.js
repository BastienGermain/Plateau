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
		'bass-electric'
	),
	melodyP2: new Melody
	(
		'major', 
		3,
		'flute', 
		'contrabass'
	),
	punctualMelodyP1: new PunctualMelody('xylophone', 3),
	punctualMelodyP2: new PunctualMelody('violin', 4),
}

const ambiance2 =
{

}