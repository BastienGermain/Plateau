class Melody 
{
	constructor() 
	{	
		this.piano = new InstrumentSampler('piano');
		this.violin = new InstrumentSampler('bass-electric');
		this.violin.sampler.volume.value = -6;

		this.mode = Melody.ModesNames[3];
		this.chords = Melody.Modes[this.mode];
		this.tonic = Melody.Notes[3];
		this.octave = 3;

		this.progression = [];
		this.arpeggio = [];

		this.base = null;
		this.melody = null;

		this.baseIndex = 0;
		this.arpeggioIndex = 0;
	}

	shuffleChords(chords) 
	{
    	for (let i = chords.length - 1; i > 0; i--) 
    	{
	        let j = Math.floor(Math.random() * (i + 1));
	        let temp = chords[i];
	        chords[i] = chords[j];
	        chords[j] = temp;
    	}
	}

	createArpeggioPattern(noteCount)
	{
		let numbers = [];
		let pattern = '';
  		let picked = null;

		for (let i = 0; i < (noteCount || 8); ++i) 
    		numbers.push(i.toString());

  		while (numbers.length != 0)
  		{
  			picked = Math.round(Math.random() * (numbers.length-1));
    		pattern += numbers[picked];
    		numbers = numbers.filter(number => number != numbers[picked]);
    	}

    	return pattern;
	}

	createProgression()
	{
		let progression = scribble.progression.getChords(
			this.tonic + " " + this.mode, 
			this.chords.join(' ')
		).split(' ');

		this.shuffleChords(progression);
		return progression;
	}

	createArpeggio(note, noteCount = 8)
	{
		return scribble.arp({chords: note, count: noteCount, order: this.createArpeggioPattern(noteCount)});
	}

	createBase() 
	{
		let _this = this;

		let base = new Tone.Event
		(
			function(time)
			{	
				let chord = scribble.chord(_this.progression[_this.baseIndex % _this.progression.length]);

				for (let i = 0; i < chord.length; i++) 
					_this.violin.play(chord[i], "1m", time);
	
				_this.baseIndex++;
				_this.updateArpeggio();
			}
		);

		base.loop = Infinity;
		base.loopEnd = "1m";

		return base;
	}

	createMelody() 
	{
		let _this = this;
		let melody = new Tone.Pattern
		(
			function(time, note)
			{
				_this.piano.play(note, 4*Tone.Time("1m").toMilliseconds()/_this.arpeggio.length, time);
				_this.baseIndex++;
			},
			_this.arpeggio, 
			"upDown"
		);

		melody.loop = Infinity;
		melody.loopEnd = "1m";

		return melody;
	}

	start(startTime) 
	{				
		this.progression = this.createProgression(this.tonic + "" + this.octave);
		this.arpeggio = this.createArpeggio(this.progression[this.baseIndex % this.progression.length]);

		this.base = this.createBase().start(startTime);
		this.melody = this.createMelody().start(startTime);
	}

	updateArpeggio()
	{
		this.melody.values = this.createArpeggio(this.progression[this.baseIndex % this.progression.length], 4);
	}

	stop()
	{
		
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
