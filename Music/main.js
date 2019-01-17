import * as Arpeggiator from './modules/Arpeggiator.js';

document.documentElement.addEventListener("mousedown", function()
{    
    if (Tone.context.state !== 'running') 
        Tone.context.resume();
})

var instrumentsList = 
[
    'piano', 
    'bass-electric', 
    'bassoon', 
    'cello', 
    'clarinet', 
    'contrabass', 
    'flute', 
    'french-horn', 
    'guitar-acoustic', 
    'guitar-electric',
    'guitar-nylon', 
    'harmonium', 
    'harp', 
    'organ', 
    'saxophone', 
    'trombone', 
    'trumpet', 
    'tuba', 
    'violin', 
    'xylophone'
];
//var app = new Arpeggiator.ArpPlayer(instrument.sampler);

var instrument = new SampleInstrument(instrumentsList[0]);

window.onload = function() 
{
    StartAudioContext(Tone.context);

    if (Tone.context.state !== 'running')
        Tone.context.resume();

    NProgress.start();

    Tone.Transport.start();
    Tone.context.latencyHint = "fastest";
    Tone.context.lookAhead = 0.01;

    //var effects = new EffectRack();
};

window.addEventListener("resize", function(event) {
  keyboardUI.resize(window.innerWidth*0.75, window.innerHeight*0.5);
  console.log("resize");
});

// show keyboard on load //
Tone.Buffer.on('load', function() 
{   
    document.querySelector(".container").style.display = 'block';
    document.querySelector("#loading").style.display = 'none';
    NProgress.done();

    console.log(instrument);
    instrument.sampler.release = .5;
    instrument.sampler.toMaster();

    select.on('change', function(seleted) 
    {
        instrument.switch(seleted.value);
    });
})


// show error message on loading error //
Tone.Buffer.on('error', function() 
{
    document.querySelector("#loading").innerHTML = "I'm sorry, there has been an error loading the instruments. This demo works best on on the most up-to-date version of Chrome.";
})

var select = new Nexus.Select('#Selector', {
    'size': [300, 30],
    'options': instrumentsList
});

var keyboardUI = new Nexus.Piano('#Keyboard', {
    'size': [window.innerWidth*0.75, window.innerHeight*0.5],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 36,
    'highNote': 72
})


keyboardUI.on('change', function(note) {
    console.log(Tone.Frequency(note.note, "midi").toNote());
    instrument.play(note);
})
