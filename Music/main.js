NProgress.start();

var samples = SampleLibrary.load({
    instruments: "flute",
    baseUrl: "samples/"
})

var current
// show keyboard on load //

Tone.Buffer.on('load', function() {
    document.querySelector(".container").style.display = 'block';
    document.querySelector("#loading").style.display = 'none';
    NProgress.done();

    // loop through instruments and set release, connect to master output
    for (var property in samples) {
        if (samples.hasOwnProperty(property)) {
            console.log(samples[property])
            samples[property].release = .5;
            samples[property].toMaster();
        }
    }

    current = samples[chooseFour[0]];

    select.on('change', function(v) {
        current = samples[v.value];
    })


})
// show error message on loading error //
Tone.Buffer.on('error', function() {
    document.querySelector("#loading").innerHTML = "I'm sorry, there has been an error loading the samples. This demo works best on on the most up-to-date version of Chrome.";
})


// create Nexus UI //
Nexus.colors.accent = "#f00"

var select = new Nexus.Select('#Selector', {
    'size': [300, 30],
    'options': Object.keys(samples)
});

var keyboardUI = new Nexus.Piano('#Keyboard', {
    'size': [1000, 125],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 36,
    'highNote': 72
})


keyboardUI.on('change', function(note) {
    console.log(Tone.Frequency(note.note, "midi").toNote());
    if (note.state === true) {
        current.triggerAttack(Tone.Frequency(note.note, "midi").toNote());
    } else if (note.state === false) {
        current.triggerRelease(Tone.Frequency(note.note, "midi").toNote());
    }
})