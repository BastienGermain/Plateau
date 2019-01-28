class Theme 
{
	constructor(mode, octave, lead, bass = null) 
	{	
		this.lead = new InstrumentSampler(lead);
		this.lead.sampler.volume.value = -12;
		this.lead.sampler.release = 1;

		if (bass)
		{
			this.bass = new InstrumentSampler(bass);
			this.bass.sampler.volume.value = -3;
		}

		this.mode = mode || Theme.ModesNames[0];
		this.tonic = Theme.Notes[0];
		this.octave = octave || 3;

		this.melodyInterval = "8n";
		this.probability = 1;
		this.chordNoteCount = 1;
		this.arpeggioNoteCount = 8;
		this.arpeggioPattern = "up";

		this.progression = [];
		this.arpeggio = [];

		this.base = null;
		this.melody = null;

		this.baseIndex = 0;
	}

	shuffleChords(chords) 
	{
		let result = [];

    	for (let i = chords.length - 1; i > 0; i--) 
    	{
	        let j = Math.floor(Math.random() * (i + 1));
	        let temp = chords[i];
	        chords[i] = chords[j];
	        chords[j] = temp;
    	}

    	result = chords;
    	return result;
	}

	// Input : array of notes
	adjustNotesOctave(notes, octave)
	{
		let result = [];

		for (var i = 0; i < notes.length; i++) 
			result.push(notes[i].substring(0, notes[i].length - 1) + octave.toString());

		return result;
	}

	// Input : a single note
	adjustNoteOctave(note, octave)
	{
		return (note.substring(0, note.length - 1) + octave.toString());
	}

	createArpeggio(notes, noteCount = 8)
	{
		let arpeggio = [];

		for (let i = 0; i < noteCount; i++)
		{
			if (i > notes.length)
			{
				arpeggio.push(this.adjustNoteOctave(notes[i % notes.length], (parseInt(this.octave, 10) + parseInt(Math.floor(i / notes.length), 10))));
			}
			else
			{
				arpeggio.push(notes[i % notes.length]);
			}

		}
		return arpeggio;
	}

	createProgression(tonic, mode)
	{
		let progression = scribble.progression.getChords(
			tonic + " " + mode, 
			Theme.Modes[mode].join(' ')
		).split(' ');

		this.shuffleChords(progression);
		return progression;
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
		base.playbackRate = 2;

		return base;
	}

	createMelody(instrument, arpeggio, pattern, interval, probability = 1) 
	{
		let _this = this;
		let melody = new Tone.Pattern
		(
			function(time, note)
			{
					instrument.play(
						note, 
						1.25 * Tone.Time(interval).toSeconds(), 
						time);
			},
			arpeggio, 
			pattern
		);
		melody.loop = Infinity;
		melody.interval = interval;
		melody.probability = probability;
		melody.loopEnd = "1m";

		return melody;
	}

///////////////////////////

	init(params) 
	{	
		if (params && params.interval) this.melodyInterval = params.interval;
		if (params && params.chordNoteCount) this.chordNoteCount = params.chordNoteCount;
		if (params && params.arpeggioNoteCount) this.arpeggioNoteCount = params.arpeggioNoteCount;
		if (params && params.probabilty) this.probability = params.probabilty;

		this.progression = this.createProgression(this.tonic + "" + this.octave, this.mode);

		let chord = scribble.chord(this.progression[this.baseIndex]);
		this.arpeggio = this.createArpeggio(chord, this.arpeggioNoteCount);

		if (this.bass) 
		{
			this.base = this.createBase(this.bass);
			this.base.value = this.adjustNotesOctave(
				chord.splice(0, Math.min(chord.length, this.chordNoteCount)), 
				this.octave);
		}
		
		this.melody = this.createMelody(
			this.lead, 
			this.arpeggio,
			this.arpeggioPattern, 
			this.melodyInterval, 
			this.probability);
	}

/// STARTERS //////////////////////////////////////////////////////////////////////////////

	startBase(startTime = 0)
	{
		if(this.base) this.base.start(startTime);
	}

////////////////////////

	startMelody(startTime = 0)
	{
		this.melody.start(startTime);
	}

/// UPDATERS //////////////////////////////////////////////////////////////////////////////

	// Updates the lead instrument
	// Resets base chord progression and melody arpeggio

	updateLead(lead)
	{
		this.lead = lead;
		this.init();
	}

/////////////////////////////

	// Updates the base instrument
	// Resets base chord progression and melody arpeggio

	updateBase(base)
	{
		this.base = base;
		this.init();
	}

////////////////////////////

	// Updates the tonic note of the Theme
	// Resets base chord progression and melody arpeggio

	updateTonic(tonic, octave)
	{
		this.tonic = tonic;
		this.octave = octave;
		this.init();
	}

///////////////////////////	

	// Updates the mode of the Theme
	// Resets base chord progression and melody arpeggio

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
		this.baseIndex = (this.baseIndex + 1) % this.progression.length;

		let chord = scribble.chord(this.progression[this.baseIndex]);

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
			this.arpeggioPattern = "random";

		this.melody.pattern = this.arpeggioPattern;
	}

////////////////////////

	// Updates the arpeggio to an arpeggio based on base chord's 'arpeggioNoteCount' notes

	updateMelody(arpeggioNoteCount)
	{
		let chord = scribble.chord(this.progression[this.baseIndex]);

		if (arpeggioNoteCount && arpeggioNoteCount > 0) this.arpeggioNoteCount = arpeggioNoteCount;
		
		this.melody.values = this.createArpeggio(chord, this.arpeggioNoteCount);
	}

/////////////////////////

	// Set the probabilty of calling the callback function in the arpeggio Tone.Pattern 
	// ie. set the probability of playing a note

	updateMelodyNoteProbability(probability)
	{
		if(probabilty)
			this.probabilty = probabilty;

		this.melody.probability = Math.min(1, Math.abs(this.probability));
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

Theme.Modes = {
	ionian: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
	major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
	dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
	phrygian: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'],
	lydian: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
	mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
	aeolian: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
	minor: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
	locrian: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
	'melodic minor': ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
	'harmonic minor': ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°']
};

Theme.ModesNames = [
'major','minor','melodic minor','harmonic minor',
'ionian','dorian','phrygian','lydian','mixolydian','aeolian','locrian'
];

Theme.Degrees = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

Theme.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Theme.Octaves = [0, 1, 2, 3, 4, 5, 6];

Theme.ArpeggioPaterns = ["up", "down", "upDown", "downUp", "random"];
