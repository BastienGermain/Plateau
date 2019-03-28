class Theme 
{
	constructor(octave, lead, bass = null) 
	{			
		this.lead = new InstrumentSampler(lead);
		this.lead.sampler.release = 1;

		if (bass)
		{
			this.bass = new InstrumentSampler(bass);
		}

		this.mode = Scale.ModesNames[Math.floor(Math.random() * Scale.ModesNames.length)]
		this.tonic = Theme.Notes[0];
		this.octave = octave || 3;

		this.melodyInterval = "16n";
		this.probability = 0.1;
		this.chordNoteCount = 1;
		this.arpeggioNoteCount = 8;
		this.arpeggioPattern = "down";

		this.scale = [];
		this.arpeggio = [];

		this.base = null;
		this.melody = null;

		this.baseIndex = 0;
	}

	createBase(instrument) 
	{
		let base = new Tone.Event
		(
			function(time, note)
			{	
				note.forEach(element => instrument.play(element, "1m", time));
			},
		 	["C0"]
		);

		base.loop = Infinity;
		base.loopEnd = "1m";
		base.playbackRate = 1;

		return base;
	}

	createMelody(instrument) 
	{
		let _this = this;

		const layer2 = new Tone.Pattern
		(
			function()
			{
				console.log(note)
				console.log(duration)			
				
				
			},
		);

		layer2.loop = Infinity;
		layer2.interval = '8n';
		layer2.loopEnd = "1m";

		return [layer2];
	}

///////////////////////////

	init(params) 
	{	
		if (params && params.interval) this.melodyInterval = params.interval;
		if (params && params.chordNoteCount) this.chordNoteCount = params.chordNoteCount;
		if (params && params.arpeggioNoteCount) this.arpeggioNoteCount = params.arpeggioNoteCount;
		if (params && params.probabilty) this.probability = params.probabilty;

		this.scale = Scale.create(this.tonic + "" + this.octave, this.mode)
		console.log(this.scale);
		console.log(this.mode);
		

		let chord = scribble.chord(this.scale[this.baseIndex]);

		if (this.bass) 
		{
			this.base = this.createBase(this.bass);
			this.base.value = this.adjustNotesOctave(
				chord.splice(0, Math.min(chord.length, this.chordNoteCount)), 
				this.octave);
		}
		
		this.melody = this.createMelody(this.lead);
	}

/// STARTERS //////////////////////////////////////////////////////////////////////////////

	startBase(startTime = 0)
	{
		if(this.base) this.base.start(startTime);
	}

////////////////////////

	startMelody(startTime = 0)
	{
		Tone.Transport.scheduleOnce((time) => {

			const note = Improvise.random(Improvise.probabilize(this.scale.map(note => ({value: note}))))
			const duration = Improvise.random(Improvise.probabilize(Improvise.Durations))

			this.lead.play(note, duration, time)
			this.startMelody(startTime)

		}, ('+' + Improvise.random(Improvise.probabilize(Improvise.Durations))))
	}

/// UPDATERS //////////////////////////////////////////////////////////////////////////////

	// Updates the lead instrument
	// Resets base chord scale and melody arpeggio

	updateLead(lead)
	{
		this.lead = lead;
		this.lead.sampler.volume.value = -16;
		this.init();
	}

/////////////////////////////

	// Updates the bass instrument
	// Resets base chord scale and melody arpeggio

	updateBass(bass)
	{
		this.bass = bass;
		this.bass.sampler.volume.value = -16;
		this.init();
	}

////////////////////////////

	// Updates the tonic note of the Theme
	// Resets base chord scale and melody arpeggio

	updateTonic(tonic, octave)
	{
		this.tonic = tonic;
		this.octave = octave;
		this.init();
	}

///////////////////////////

	// Updates the velocity of the notes played in the Theme

	updateMode(mode)
	{
		this.mode = mode;
		this.init();
	}

///////////////////////////

	// The base is updated and plays 'chordNoteCount' of the current chord
	// Example : if the chord is CM-0 = ["C0", "E0", "G0"] and 'chordNoteCount' value is 2,
	//			 only "C0" and "E0" will be played 

	updateBaseNoteCount(chordNoteCount = 1)
	{
		if (chordNoteCount)
			this.chordNoteCount = chordNoteCount;
	}

//////////////////////////

	// The base is updated and plays the next chord

	updateBaseChord()
	{
		this.baseIndex = (this.baseIndex + 1) % this.scale.length;

		let chord = scribble.chord(this.scale[this.baseIndex]);

		this.base.value = this.adjustNotesOctave(
			chord.splice(0, Math.min(chord.length, this.chordNoteCount)), 
			this.octave);
	}

//////////////////////////

	// Updates the arpeggio for playing following the pattern of 'patternType'
	// 'patternType' value can be one of the following :  ["up", "down", "upDown", "downUp", "random"]

	updateMelodyPattern(patternType = "random")
	{
		if (Theme.ArpeggioPaterns.includes(patternType))
			this.arpeggioPattern = patternType;
		else
		{
			console.log("ERROR : INVALID PATTERN");
			this.arpeggioPattern = "random";
		}

		this.melody.pattern = this.arpeggioPattern;
	}

////////////////////////

	// Updates the arpeggio to an arpeggio based on base chord's 'arpeggioNoteCount' notes

	updateMelody(arpeggioNoteCount)
	{
		let chord = scribble.chord(this.scale[this.baseIndex]);

		if (arpeggioNoteCount && arpeggioNoteCount > 0) this.arpeggioNoteCount = arpeggioNoteCount;
		
		this.melody.values = this.createArpeggio(chord, this.arpeggioNoteCount);
	}

/////////////////////////

	// Set the probabilty of calling the callback function in the arpeggio Tone.Pattern 
	// ie. set the probability of playing a note

	updateMelodyNoteProbability(probability)
	{
		console.log(probability);
		if(probability)
			this.probability = probability;

		this.melody.probability = Math.min(1, Math.abs(this.probability));
		console.log(this.melody.probability);
		console.log(this.probability);
	}

/////////////////////////

	// Updates the interval between two consecutive notes of the arpeggio

	updateMelodyNoteInterval(interval)
	{
		try
		{
			this.melody.interval = interval;
			this.melodyInterval = interval;
		}
		catch(error)
		{
			console.log(error);
			this.melody.interval = this.melodyInterval;
		}
	}

/// STOPPERS //////////////////////////////////////////////////////////////////////////////

	stopBase()
	{	
		if(this.base) this.base.stop();
	}

	stopMelody()
	{
		this.melody.stop();
	}
}
//////////////////////////////////////////////////////////////////////////////////////////


Theme.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Theme.Octaves = [0, 1, 2, 3, 4, 5, 6];

Theme.ArpeggioPaterns = ["up", "down", "upDown", "downUp", "random"];
