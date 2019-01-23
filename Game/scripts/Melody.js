class Melody 
{
	constructor(mode, octave, lead, bass = null) 
	{	
		this.fx = new FXRack();
		this.fx.selectFX('reverb', {'reverb': 0.1});

		this.lead = new InstrumentSampler(lead);
		this.lead.sampler.volume.value = -10;
		this.lead.sampler.release = 1;
		this.lead.catchFXs(this.fx);
		this.lead.samplerFX.volume.value = -10;

		if (bass)
		{
			this.bass = new InstrumentSampler(bass);
			this.bass.sampler.volume.value = -6;
		}

		this.mode = mode || Melody.ModesNames[0];
		this.tonic = Melody.Notes[0];
		this.octave = octave || 3;
		this.melodyInterval = "4n";

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

	pickFour(chords)
	{
		let result = [];
		result.push(chords[getRandomInt(chords.length)])
	}

	// Input : array of notes
	adjustNotesOctave(notes, octave)
	{
		for (var i = 0; i < notes.length; i++) 
		{
			notes[i] = notes[i].substring(0, notes[i].length - 1) + octave.toString(); 
		}
	}

	// Given a chord at format 'CM-4' transforms it to 'CM'
	removeChordOctave(chord)
	{
		return chord.substring(0, 1) + chord.charAt(chord.length -1);
	}

	createArpeggioPattern(noteCount)
	{
		let numbers = [];
		let pattern = [];
  		let picked = null;

		for (let i = 0; i < (noteCount || 8); ++i) 
    		numbers.push(i.toString());

  		while (numbers.length != 0)
  		{
  			picked = Math.round(Math.random() * (numbers.length-1));
    		pattern.push(numbers[picked]);
    		numbers = numbers.filter(number => number != numbers[picked]);
    	}

    	return pattern;
	}

	createProgression(tonic, mode)
	{
		let progression = scribble.progression.getChords(
			tonic + " " + mode, 
			Melody.Modes[mode].join(' ')
		).split(' ');

		console.log(progression);
		this.shuffleChords(progression);
		return progression;
	}

	createArpeggio(notes, noteCount = 8)
	{
		let arpeggio = [];
		let pattern = this.createArpeggioPattern(noteCount);

		for (let i = 0; i < noteCount; i++) {
			arpeggio.push(notes[pattern[i] % notes.length]);
		}

		return arpeggio;
	}

	createBase(instrument) 
	{
		let _this = this;

		let base = new Tone.Event
		(
			function(time)
			{	
				let chord = scribble.chord(_this.progression[_this.baseIndex % _this.progression.length]);
				console.log(_this.progression[_this.baseIndex % _this.progression.length]);
				_this.adjustNotesOctave(chord, _this.octave);

				for (let i = 0; i < chord.length; i++) 
					instrument.play(chord[i], "1m", time);
			}
		);

		base.loop = Infinity;
		base.loopEnd = "1m";

		return base;
	}

	createMelody(instrument, arpeggio) 
	{
		let _this = this;
		let melody = new Tone.Pattern
		(
			function(time, note)
			{
				if(Math.round(2 * Math.random()))
					instrument.play(
						note, 
						Tone.Time(_this.melodyInterval).toSeconds(), 
						time);
			},
			arpeggio, 
			"up"
		);

		melody.loop = Infinity;
		melody.interval = this.melodyInterval;
		melody.loopEnd = "1m";

		return melody;
	}

	init() 
	{				
		this.progression = this.createProgression(this.tonic + "" + this.octave, this.mode);

		this.arpeggio = this.createArpeggio(
			this.shuffleChords(
				scribble.chord(
					this.progression[this.baseIndex % this.progression.length])), 3);

		if (this.bass) this.base = this.createBase(this.bass);

		this.melody = this.createMelody(this.lead, this.arpeggio);
	}

	start(startTime = 0)
	{
		if(this.base) this.base.start(startTime);

		this.melody.start(startTime);
	}

	update()
	{
		this.baseIndex++;

		this.melody.pattern = Melody.ArpeggioPaterns[getRandomInt(Melody.ArpeggioPaterns.length)];

		this.melody.values = this.createArpeggio(
			this.shuffleChords(
				scribble.chord(
					this.progression[this.baseIndex % this.progression.length])), 3);
	}

	stop()
	{	
		if(this.base) this.base.stop();

		this.melody.stop();
	}
}

Melody.Modes = {
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

Melody.ModesNames = [
'major','minor','melodic minor','harmonic minor',
'ionian','dorian','phrygian','lydian','mixolydian','aeolian','locrian'
];

Melody.Degrees = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

Melody.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Melody.Octaves = [0, 1, 2, 3, 4, 5, 6];

Melody.ArpeggioPaterns = ["up", "down", "upDown", "downUp", "random"];
