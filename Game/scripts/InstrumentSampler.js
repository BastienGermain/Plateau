class InstrumentSampler
{
    constructor(instrument = 'piano')
    {   
        this.instrument = instrument;

        this.minify = false; // If true : loads less samples.
        this.ext = '.[mp3|ogg]';
        this.baseUrl = './assets/samples/';

        this.onload = function() {};

        this.sampler = this.load();
        this.samplerFX = null;
    }

    // Input : a single note
    adjustNoteOctave(note, octave)
    {
        return (note.substring(0, note.length - 1) + octave.toString());
    }

    load() 
    {   
        let sampler = new Tone.Sampler(dataSample[this.instrument], {baseUrl: this.baseUrl + this.instrument + "/", onload: this.onload(this.instrument)});
        return sampler;
    }

    switch(instrument) 
    {
        this.instrument = instrument;
        this.sampler = this.load();
    }

    // Expect note at format {note : 50, state : false}
    playKey(note) 
    {           
        let sampler = (this.samplerFX) ? this.samplerFX : this.sampler;

        if (note.state === true) 
            this.sampler.triggerAttack(Tone.Frequency(note.note, "midi").toNote());
        else if (note.state === false) 
            this.sampler.triggerRelease(Tone.Frequency(note.note, "midi").toNote());
    }
    
    // Expect note at format {note : 50, state : false}
    playKey(note, time, velocity = 1) 
    {      
        let sampler = (this.samplerFX) ? this.samplerFX : this.sampler;

        if (note.state === true) 
            sampler.triggerAttack(Tone.Frequency(note.note, "midi").toNote(), time, velocity);
        else if (note.state === false) 
            sampler.triggerRelease(Tone.Frequency(note.note, "midi").toNote(), time, velocity);

        sampler.toMaster();
    }

     // Expect note at format "C4"
    play(note, duration, time, velocity = 1) 
    {   
        let sampler = (this.samplerFX) ? this.samplerFX : this.sampler;
        let playableNote = note;

        if (this.instrument != 'kick' && this.instrument != 'snare' && this.instrument != 'hihat')
        {
            if (this.instrument == 'clarinet')
                playableNote = Tone.Frequency(playableNote).transpose(-2).toNote();

            if (this.instrument == 'bassoon' || this.instrument == 'contrabass' || this.instrument == 'tuba')
                playableNote = Tone.Frequency(playableNote).transpose(-12).toNote();

            console.log(playableNote);

            let octave = parseInt(playableNote.charAt(note.length - 1));

            if (parseInt(octave) > octaves[this.instrument].max)
                playableNote = this.adjustNoteOctave(playableNote, octaves[this.instrument].max);
            
            if (parseInt(octave) < octaves[this.instrument].min)
                playableNote = this.adjustNoteOctave(playableNote, octaves[this.instrument].min);
        }


        sampler.release = 1;
        sampler.attack = 1;
        sampler.triggerAttackRelease(playableNote, duration, time, velocity);
        sampler.toMaster();
    }


    catchFXs(fxRack, switched = false)
    {
        if (!this.samplerFX)
        {
            if (this.sampler)
            {   
                this.samplerFX = fxRack.applyFXs(this.sampler);
                this.samplerFX.volume.value = this.sampler.volume.value;
            }
            else 
                console.log("ERROR WHILE APPLYING EFFECTS TO InstrumentSampler in InstrumentSampler.js : Sampler not created");
        }
        else
        {
            if (switched)
            {   
                this.samplerFX = fxRack.applyFXs(this.sampler);
                this.samplerFX.volume.value = this.sampler.volume.value;
            }
            else
            {   
                this.samplerFX = fxRack.applyFXs(this.samplerFX);   
                this.samplerFX.volume.value = this.sampler.volume.value;
            }
        }
    }

    releaseFXs()
    {
        this.samplerFX = null;
    }

}

InstrumentSampler.Instruments =
[
'piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 
'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 
'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 
'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone', 
'kick', 'snare', 'hihat'
];


