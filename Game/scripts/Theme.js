class Theme
{
	constructor(octave, lead, bass = null)
	{
		this.lead = new InstrumentSampler(lead)
		this.lead.sampler.release = 1
		this.lead.sampler.volume.value = 6

		if (bass) {
			this.bass = new InstrumentSampler(bass)
			this.bass.sampler.volume.value = -12
		}

		this.mode = Scale.StrangeModesNames[Math.floor(Math.random() * Scale.StrangeModesNames.length)]
		this.tonic = Theme.Notes[0]
		this.octave = octave || 3

		this.scale = []

		this.leadDurations = []
		this.leadIntervals = []
		this.bassDurations = []
		this.bassIntervals = []

		this.bassStoped = false
		this.leadStoped = false

	}

///////////////////////////

	init()
	{
		this.scale = Scale.create(this.tonic + "" + this.octave, this.mode)
		this.bassDurations = Improvise.probabilize(Improvise.BassDurations)
		this.leadDurations = Improvise.probabilize(Improvise.LeadDurations)
		this.bassIntervals = Improvise.probabilize(Improvise.Intervals)
		this.leadIntervals = Improvise.probabilize(Improvise.Intervals)
		this.bassNotes = Improvise.probabilize(this.scale.map(note => ({value: note})))
		this.leadNotes = Improvise.probabilize(this.scale.map(note => ({value: note})))
	}

	pickClassicMode() {
		this.mode = Scale.ClassicModesNames[Math.floor(Math.random() * Scale.ClassicModesNames.length)]
	}

	pickStrangeMode() {
		this.mode = Scale.StrangeModesNames[Math.floor(Math.random() * Scale.StrangeModesNames.length)]
	}

/// STARTERS //////////////////////////////////////////////////////////////////////////////
	startBase()
	{
		Tone.Transport.scheduleOnce((time) => {

			if (!this.bassStoped) {
				const note = (data.stoneOnBoard <= 4) ? (this.tonic + this.octave) : Improvise.random(this.bassNotes)
				const duration = Improvise.random(this.bassDurations)

				if (data['stonesAround'] < 2) {
					this.bass.play(note, duration, time)
				} else if (data['stonesAround'] >= 2 ) {
					/**
					 * 7 (= 8 notes) : tonique, tierce, quinte
					 * 5 (= 6 notes) : tonique, 2 au dessus, 2 dessus
					 * 6 (= 7 notes) : 
					 * 8 (= 9 notes) : 
					 */
					this.bass.play(note, duration, time)
					this.bass.play(Tone.Frequency(note).transpose(5).toNote(), duration, time)
				} else if (data[stonesAround] >= 4) {
					this.bass.play(note, duration, time)
					this.bass.play(Tone.Frequency(note).transpose(5).toNote(), duration, time)
					this.bass.play(Tone.Frequency(note).transpose(12).toNote(), duration, time)
				}
				this.startBase()
			}

		}, ('+' + Improvise.random(this.bassIntervals)))
	}

////////////////////////

	startMelody()
	{
		Tone.Transport.scheduleOnce((time) => {

			if (!this.leadStoped) {
				const note = Improvise.random(this.leadNotes)
				const duration = Improvise.random(this.leadDurations)

				this.lead.play(note, duration, time)
				this.startMelody()
			}

		}, ('+' + Improvise.random(this.leadIntervals)))
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
		if(probability)
			this.probability = probability;

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
}
//////////////////////////////////////////////////////////////////////////////////////////


Theme.Notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Theme.Octaves = [0, 1, 2, 3, 4, 5, 6];

Theme.ArpeggioPaterns = ["up", "down", "upDown", "downUp", "random"];
