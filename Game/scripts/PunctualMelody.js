class PunctualMelody
{
	constructor(lead, octave = 3) 
	{	
		this.fx = new FXRack();
		this.fx.selectFX('reverb', {'reverb': 0.1});

		this.lead = new InstrumentSampler(lead);
		this.lead.sampler.volume.value = -12;
		this.lead.sampler.release = 1;
		this.lead.catchFXs(this.fx);
		this.lead.samplerFX.volume.value = -12;

		this.melodyInterval = "2n";
		this.octave = octave;

		this.arpeggio = [];
		this.arpeggioPattern = null;

		this.melody = null;
	}

	// input : array of notes
	adjustNotesOctave(notes, octave)
	{
		for (var i = 0; i < notes.length; i++) 
		{
			notes[i] = notes[i].substring(0, notes[i].length - 1) + octave.toString(); 
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

	createArpeggio(note, noteCount = 8)
	{
		let arpeggio = scribble.arp({chords: note, count: noteCount, order: this.createArpeggioPattern(noteCount)});
		console.log(arpeggio);
		this.adjustNotesOctave(arpeggio, Math.min(this.octave, 6));
		console.log(arpeggio);

		return arpeggio;
	}

	createMelody(instrument, arpeggio) 
	{
		let _this = this;
		let melody = new Tone.Pattern
		(
			function(time, note)
			{
				instrument.play(
					note, 
					2* Tone.Time("1m").toSeconds() / Tone.Time(this.melodyInterval).toSeconds(), 
					time);
			},
			arpeggio, 
		);

		melody.loop = Infinity;
		melody.interval = this.melodyInterval;
		melody.loopEnd = "1m";

		return melody;
	}

	init(chord) 
	{				
		this.arpeggio = this.createArpeggio(chord, getRandomIntBetween(2, 4));
		this.arpeggioPattern = Melody.ArpeggioPaterns[getRandomInt(Melody.ArpeggioPaterns.length - 1)];

		this.melody = this.createMelody(this.lead, this.arpeggio);
	}

	start(startTime = 0)
	{
		this.melody.start(startTime);
	}

	update(chord)
	{		
		this.melody.pattern = Melody.ArpeggioPaterns[getRandomInt(Melody.ArpeggioPaterns.length - 1)];
		this.melody.values = this.createArpeggio(chord, getRandomIntBetween(2, 4));
	}

	stop()
	{	
		this.melody.stop();
	}
}