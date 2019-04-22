class Theme 
{
	constructor(octave, lead, bass = null) 
	{			
		this.lead = new InstrumentSampler(lead)
		this.lead.sampler.release = 1
		this.lead.sampler.volume.value = -6

		if (bass)
		{
			this.bass = new InstrumentSampler(bass)
		}

		this.mode = Scale.SimpleModesNames[Math.floor(Math.random() * Scale.SimpleModesNames.length)]
		this.tonic = Theme.Notes[0]
		this.octave = octave || 3

		this.scale = []

		this.leadDurations = []
		this.leadIntervals = []		
		this.basssDurations = []
		this.bassIntervals = []
	
	}

///////////////////////////

	init(params) 
	{	
		if (params && params.interval) this.melodyInterval = params.interval
		if (params && params.chordNoteCount) this.chordNoteCount = params.chordNoteCount
		if (params && params.arpeggioNoteCount) this.arpeggioNoteCount = params.arpeggioNoteCount
		if (params && params.probabilty) this.probability = params.probabilty

		console.log(this.mode)
		this.scale = Scale.create(this.tonic + "" + this.octave, this.mode)
		
		this.bassDurations = Improvise.probabilize(Improvise.BassDurations)
		this.leadDurations = Improvise.probabilize(Improvise.BassDurations)
		
		this.bassIntervals = Improvise.probabilize(Improvise.Intervals)
		this.leadIntervals = Improvise.probabilize(Improvise.Intervals)
		
		this.notes = Improvise.probabilize(this.scale.map(note => ({value: note})))
	}

/// STARTERS //////////////////////////////////////////////////////////////////////////////

	startBase(startTime = 0)
	{
		Tone.Transport.scheduleOnce((time) => {

			const note = Improvise.random(this.notes)
			const duration = Improvise.random(this.bassDurations)

			console.log('bass note', note)
			console.log('bass duration', duration)

			console.log('bass durations', this.bassDurations)
			console.log('bass intervals', this.bassIntervals)

			this.bass.play(note, duration, time)
			this.startBase(startTime)

		}, ('+' + Improvise.random(this.bassIntervals)))
	}

////////////////////////

	startMelody(startTime = 0)
	{
		Tone.Transport.scheduleOnce((time) => {

			const note = Improvise.random(this.notes)
			const duration = Improvise.random(this.leadDurations)

			console.log('lead note', note)
			console.log('lead duration', duration)

			console.log('lead durations', this.leadDurations)
			console.log('lead intervals', this.leadIntervals)

			this.lead.play(note, duration, time)
			this.startMelody(startTime)

		}, ('+' + Improvise.random(this.leadIntervals)))
	}

/// UPDATERS //////////////////////////////////////////////////////////////////////////////

	// Updates the lead instrument
	// Resets base chord scale and melody arpeggio

	updateLead(lead)
	{
		this.lead = lead
		this.lead.sampler.volume.value = -16
		this.init()
	}

/////////////////////////////

	// Updates the bass instrument
	// Resets base chord scale and melody arpeggio

	updateBass(bass)
	{
		this.bass = bass
		this.bass.sampler.volume.value = -16
		this.init()
	}

////////////////////////////

	// Updates the tonic note of the Theme
	// Resets base chord scale and melody arpeggio

	updateTonic(tonic, octave)
	{
		this.tonic = tonic
		this.octave = octave
		this.init()
	}

///////////////////////////

	// Updates the velocity of the notes played in the Theme

	updateMode(mode)
	{
		this.mode = mode
		this.init()
	}

//////////////////////////

	updateBassIntervals() {
		this.bassIntervals = Improvise.probabilize(Improvise.Intervals)
		console.log(this.bassIntervals)
}

//////////////////////////

	updateBassDurations() {
		this.bassDurations = Improvise.probabilize(Improvise.Durations)
		console.log(this.bassDurations)
}	

//////////////////////////

	updateLeadIntervals() {
		this.leadIntervals = Improvise.probabilize(Improvise.Intervals)
		console.log(this.leadIntervals)
	}

//////////////////////////

	updateLeadDurations() {
		this.leadDurations = Improvise.probabilize(Improvise.Durations)
		console.log(this.leadDurations)
}	

//////////////////////////

	updateNotes() {
		this.notes = Improvise.probabilize(this.scale.map(note => ({value: note})))
}

/// STOPPERS //////////////////////////////////////////////////////////////////////////////

	stopBase()
	{	
		if(this.base) this.base.stop()
	}

	stopMelody()
	{
		this.melody.stop()
	}
}
//////////////////////////////////////////////////////////////////////////////////////////


Theme.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
Theme.Octaves = [0, 1, 2, 3, 4, 5, 6]

Theme.ArpeggioPaterns = ["up", "down", "upDown", "downUp", "random"]
