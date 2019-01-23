class PunctualMelody
{
	constructor(melody, lead, octave = 3) 
	{	
		this.melody = melody;
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

		this.punctualMelody = null;
	}

	init() 
	{						
		this.arpeggio = this.melody.createArpeggio(
			this.melody.shuffleChords(
				scribble.chord(
					this.melody.progression[this.melody.baseIndex % this.melody.progression.length])), 3);

		this.arpeggioPattern = Melody.ArpeggioPaterns[getRandomInt(Melody.ArpeggioPaterns.length)];

		this.punctualMelody = this.melody.createMelody(this.lead, this.arpeggio, this.melodyInterval, 0.4);
	}

	start(startTime = 0)
	{
		this.punctualMelody.start(startTime);
	}

	update()
	{		
		this.punctualMelody.pattern = Melody.ArpeggioPaterns[getRandomInt(Melody.ArpeggioPaterns.length - 1)];

		this.punctualMelody.values = this.melody.createArpeggio(
			this.melody.shuffleChords(
				scribble.chord(
					this.melody.progression[this.melody.baseIndex % this.melody.progression.length])), 3);
	}

	stop()
	{	
		this.punctualMelody.stop();
	}
}