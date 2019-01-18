class InstrumentSampler
{
    constructor(instrument = 'piano')
    {   
        this.instrument = instrument;
        console.log(this.instrument);

        this.minify = false; // If true : loads less samples.
        this.ext = '.[mp3|ogg]';
        this.baseUrl = './assets/samples/';
        this.onload = function() {console.log("samples loaded");};

        this.sampler = this.load();
        this.samplerFX = null;
    }

    load() 
    {   
        let sampler = new Tone.Sampler(dataSample[this.instrument], {baseUrl: this.baseUrl + this.instrument + "/", onload: this.onload});
        console.log("sampler : ");
        console.log(sampler);
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
        sampler.toMaster();
    }
    
    // Expect note at format {note : 50, state : false}
    playKey(note, time, duration) 
    {      
        let sampler = (this.samplerFX) ? this.samplerFX : this.sampler;

        if (note.state === true) 
            sampler.triggerAttack(Tone.Frequency(note.note, "midi").toNote(), time, duration);
        else if (note.state === false) 
            sampler.triggerRelease(Tone.Frequency(note.note, "midi").toNote(), time, duration);
        sampler.toMaster();
    }

     // Expect note at format "C4"
    play(note, duration, time) 
    {   
        console.log(note);
        let sampler = (this.samplerFX) ? this.samplerFX : this.sampler;
        sampler.triggerAttackRelease(note, duration, time);
        sampler.toMaster();
    }


    catchFXs(fxRack, switched = false)
    {
        if (!this.samplerFX)
        {
            if (this.sampler)
            {   
                this.samplerFX = fxRack.applyFXs(this.sampler);
            }
            else 
                console.log("ERROR WHILE APPLYING EFFECTS TO InstrumentSampler in InstrumentSampler.js : Sampler not created");
        }
        else
        {
            if (switched)
                this.samplerFX = fxRack.applyFXs(this.sampler);
            else
                this.samplerFX = fxRack.applyFXs(this.samplerFX);   
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
'contrabass', 'drum', 'flute', 'french-horn', 'guitar-acoustic', 
'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 
'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone'
];


