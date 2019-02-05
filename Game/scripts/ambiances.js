const instrument1List = 
[
new InstrumentSampler('piano'),  
new InstrumentSampler('bassoon'), 
new InstrumentSampler('cello'), 
//new InstrumentSampler('clarinet'), 
new InstrumentSampler('harp'), 
new InstrumentSampler('french-horn'), 
new InstrumentSampler('guitar-acoustic'), 
new InstrumentSampler('xylophone'),
new InstrumentSampler('guitar-nylon'), 
new InstrumentSampler('harmonium'), 
new InstrumentSampler('flute'), 
new InstrumentSampler('organ'), 
new InstrumentSampler('saxophone'), 
new InstrumentSampler('trombone'), 
new InstrumentSampler('trumpet'), 
new InstrumentSampler('tuba'), 
new InstrumentSampler('violin'), 
new InstrumentSampler('guitar-electric')
];

const instrument2List = 
[
new InstrumentSampler('bass-electric'), 
new InstrumentSampler('bassoon'), 
new InstrumentSampler('cello'), 
new InstrumentSampler('french-horn'), 
new InstrumentSampler('contrabass'), 
new InstrumentSampler('tuba')
];


// Avec clarinette 
/*
instrument1List[0].sampler.volume.value = -9;
instrument1List[1].sampler.volume.value = -12;
instrument1List[2].sampler.volume.value = -12;
instrument1List[3].sampler.volume.value = -15;
instrument1List[4].sampler.volume.value = 3;
instrument1List[5].sampler.volume.value = 3;
instrument1List[6].sampler.volume.value = -6;
instrument1List[7].sampler.volume.value = -6;
instrument1List[8].sampler.volume.value = 6;
instrument1List[9].sampler.volume.value = -14;
instrument1List[10].sampler.volume.value = -6;
instrument1List[11].sampler.volume.value = -12;
instrument1List[12].sampler.volume.value = 5;
instrument1List[13].sampler.volume.value = -9;
instrument1List[14].sampler.volume.value = -6;
instrument1List[15].sampler.volume.value = 15;
instrument1List[16].sampler.volume.value = 15;
instrument1List[17].sampler.volume.value = 15;
*/

// Sans clarinette

instrument1List[0].sampler.volume.value = -9;
instrument1List[1].sampler.volume.value = -12;
instrument1List[2].sampler.volume.value = -12;
instrument1List[3].sampler.volume.value = -5;
instrument1List[4].sampler.volume.value = -9;
instrument1List[5].sampler.volume.value = -6;
instrument1List[6].sampler.volume.value = -2;
instrument1List[7].sampler.volume.value = -3;
instrument1List[8].sampler.volume.value = -17;
instrument1List[9].sampler.volume.value = -12;
instrument1List[10].sampler.volume.value = -14;
instrument1List[11].sampler.volume.value = -14;
instrument1List[12].sampler.volume.value = -12;
instrument1List[13].sampler.volume.value = -14;
instrument1List[14].sampler.volume.value = -6;
instrument1List[15].sampler.volume.value = -12;
instrument1List[16].sampler.volume.value = -5;

instrument2List[0].sampler.volume.value = -6;
instrument2List[1].sampler.volume.value = -12;
instrument2List[2].sampler.volume.value = -12;
instrument2List[3].sampler.volume.value = -14;
instrument2List[4].sampler.volume.value = -18;
instrument2List[5].sampler.volume.value = -12;


var reverb = new FXRack();
//reverb.selectFX('vibrato', {frequency: 5, depth: 0.1});
//reverb.selectFX('reverb', {reverb: 0.01});
//reverb.selectFX('pingPongDelay', {delayTime: "8n"});

instrument1List[0].catchFXs(reverb);
instrument1List[1].catchFXs(reverb);
instrument1List[2].catchFXs(reverb);
instrument1List[3].catchFXs(reverb);
instrument1List[4].catchFXs(reverb);
instrument1List[5].catchFXs(reverb);
instrument1List[6].catchFXs(reverb);
instrument1List[7].catchFXs(reverb);
instrument1List[8].catchFXs(reverb);
instrument1List[9].catchFXs(reverb);
instrument1List[10].catchFXs(reverb);
instrument1List[11].catchFXs(reverb);
instrument1List[12].catchFXs(reverb);
instrument1List[13].catchFXs(reverb);
instrument1List[14].catchFXs(reverb);
instrument1List[15].catchFXs(reverb);
instrument1List[16].catchFXs(reverb);


//instrument2List[0].catchFXs(reverb);
instrument2List[1].catchFXs(reverb);
instrument2List[2].catchFXs(reverb);
instrument2List[3].catchFXs(reverb);
instrument2List[4].catchFXs(reverb);
instrument2List[5].catchFXs(reverb);

const instrumentList = instrument1List.concat([instrument2List[0], instrument2List[4]]);

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

var ambiance1 = 
{
	nom : "ambiance1",

	beat: new Beat(),

	player1Instrument1 : new InstrumentSampler('french-horn'),
	player1Instrument2 : new InstrumentSampler('french-horn'),
	player2Instrument1 : new InstrumentSampler('french-horn'),
	player2Instrument2 : new InstrumentSampler('french-horn'),
	
	themeP1: new Theme('minor', 3, 'guitar-acoustic', 'guitar-electric'),
	themeP2: new Theme('major', 3, 'flute', 'contrabass'),

	fx: new FXRack()
}

var ambianceHarmony =
{
	nom : "ambianceHarmony",

	beat : new Beat(),

	player1Instrument1 : new InstrumentSampler('violin'),
	player1Instrument2 : new InstrumentSampler('violin'),
	player2Instrument1 : new InstrumentSampler('flute'),
	player2Instrument2 : new InstrumentSampler('flute'),

	themeP1: new Theme('minor', 3, 'guitar-acoustic', 'guitar-electric'),
	themeP2: new Theme('major', 3, 'flute', 'contrabass'),

	fx: new FXRack()
}

ambianceHarmony.fx.selectFX('vibrato', {frequency: 2, depth: 0.5});
ambianceHarmony.fx.selectFX('reverb', {reverb: 0.1});
ambianceHarmony.fx.selectFX('pingPongDelay', {delayTime: "8n"});



var ambianceDrum =
{
	nom : "ambianceDrum",

	beat : new Beat("techno"),

	player1Instrument1 : new InstrumentSampler('french-horn'),
	player1Instrument2 : new InstrumentSampler('french-horn'),
	player2Instrument1 : new InstrumentSampler('flute'),
	player2Instrument2 : new InstrumentSampler('french-horn'),

	themeP1: new Theme('minor', 3, 'guitar-acoustic', 'guitar-electric'),
	themeP2: new Theme('major', 3, 'flute', 'contrabass'),

	fx: new FXRack()
}

ambianceDrum.fx.selectFX('vibrato', {frequency: 2, depth: 0.5});
ambianceDrum.fx.selectFX('reverb', {reverb: 0.1});
ambianceDrum.fx.selectFX('pingPongDelay', {delayTime: "8n"});



var ambianceDub = 
{
	nom : "ambianceDub",

	beat : new Beat("dub"),

	player1Instrument1 : new InstrumentSampler('violin'),
	player1Instrument2 : new InstrumentSampler('violin'),
	player2Instrument1 : new InstrumentSampler('trumpet'),
	player2Instrument2 : new InstrumentSampler('trumpet'),

	themeP1 : new Theme('major', 3, 'violin', 'trumpet'),
	themeP2 : new Theme('major', 3, 'violin', 'trumpet'),

	bassLine : createBassLine("A3", 0),

	fx : new FXRack()
}

ambianceDub.fx.selectFX('vibrato', {frequency: 2, depth: 0.5});
ambianceDub.fx.selectFX('reverb', {reverb: 0.1});
ambianceDub.fx.selectFX('pingPongDelay', {delayTime: "8n"});