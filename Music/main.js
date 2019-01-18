const instrument = new InstrumentSampler();
const fx = new FXRack(true);
const arpeggiator = new Arpeggiator();

console.log(scribble.progression);

var keyboardUI = new Nexus.Piano('#keyboard', {
    'size': [window.innerWidth*0.75, window.innerHeight*0.5],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 36,
    'highNote': 72
})

/////////////////////////////////////////////////////////////////////

document.documentElement.addEventListener("mousedown", function()
{    
    if (Tone.context.state !== 'running') 
        Tone.context.resume();
});

window.onload = function() 
{
    StartAudioContext(Tone.context);

    if (Tone.context.state !== 'running')
        Tone.context.resume();

  //  NProgress.start();

    Ton//e.Transport.start();
    Tone.context.latencyHint = "fastest";
    Tone.context.lookAhead = 0.01;
};

window.addEventListener("resize", function(event) 
{
  keyboardUI.resize(window.innerWidth*0.75, window.innerHeight*0.5);
});

// show keyboard on load //
Tone.Buffer.on('load', function() 
{   
    document.querySelector(".container").style.display = 'block';
    document.querySelector("#loading").style.display = 'none';
    NProgress.done();

    instrument.sampler.release = .5;
    instrument.sampler.toMaster();

    instrument.instrumentSelector.on('change', function(selected) 
    {   
        //arpeggiator.stop();
        console.log("Instrument changed to " + selected.value);
        instrument.switch(selected.value);
        instrument.catchFXs(fx, true);
        //arpeggiator.start(instrument);
    });

    fx.FXSelector.on('change', function(selected) 
    {   
        console.log("FX changed to " + selected.value);
        //arpeggiator.stop();
        fx.selectFX(selected);
        instrument.catchFXs(fx);        
        //arpeggiator.start(instrument);
    });

    arpeggiator.modeSelector.on('change', function(selected)
    {
        //arpeggiator.stop();
        arpeggiator.mode = selected.value;
        console.log(arpeggiator.mode);
        //arpeggiator.start(instrument);
    });

    arpeggiator.tonicSelector.on('change', function(selected)
    {
        //arpeggiator.stop();
        arpeggiator.tonic = selected.value;
        console.log(arpeggiator.tonic);
        //arpeggiator.start(instrument);
    });

    arpeggiator.octaveSelector.on('change', function(selected)
    {
        //arpeggiator.stop();
        arpeggiator.octave = selected.value;
        console.log(arpeggiator.octave);
        //arpeggiator.start(instrument);
    });

    arpeggiator.chordSelectors.forEach(function(element, index)
    {   
        element.on('change', function(selected)
        {
            //arpeggiator.stop();
            arpeggiator.chords[index] = selected.value;
            console.log(arpeggiator.chords[index]);
            //arpeggiator.start(instrument);
        });
    });

    //arpeggiator.start(instrument);
})

// show error message on loading error //
Tone.Buffer.on('error', function() 
{
    document.querySelector("#loading").innerHTML = "I'm sorry, there has been an error loading the instruments. This demo works best on on the most up-to-date version of Chrome.";
})

keyboardUI.on('change', function(note) {
    instrument.playKey(note);
})
