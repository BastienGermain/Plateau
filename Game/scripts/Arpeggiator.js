class Arpeggiator 
{
	constructor() 
	{	
		this.mode = Arpeggiator.ModesNames[0];
		this.chords = Arpeggiator.Modes[this.mode];
		this.tonic = Arpeggiator.Notes[0];
		this.octave = 4;
		this.progression = [];
		this.arpeggio = null;
	}

	stringify(chords)
	{
		let string = '';

		for(let i = 0; i < chords.length - 1; i++)
			string += (chords[i] + ' ');

		string += chords[chords.length-1];
		return string;
	}

	createProgression(note)
	{
		let progression = scribble.arp(
		{
			chords: scribble.progression.getChords(
				note + " " + this.mode, 
				this.stringify(this.chords)),
			count: 3, 
			order: '102' 
		});
		
		return progression;
	}

	start(instrument) 
	{		
		let _this = this;
		this.progression = this.createProgression(this.tonic + "" + this.octave);

		_this.progression.forEach(function(element, index)
		{	
			let progression = _this.createProgression(element);
			console.log(progression);
			let sequence = new Tone.Sequence(
				function(note) {instrument.play(note, "4n");},
				progression, "4n").start(index*progression.length*1);

			sleep(1000);
			instrument.play(element, 0.25);
		});
	}

	stop()
	{
		
	}
}

Arpeggiator.Modes = {
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

Arpeggiator.ModesNames = [
'major','minor','melodic minor','harmonic minor',
'ionian','dorian','phrygian','lydian','mixolydian','aeolian','locrian'
];

Arpeggiator.Degrees = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

Arpeggiator.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Arpeggiator.Octaves = [0, 1, 2, 3, 4, 5, 6];
