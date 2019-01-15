var synth = new Tone.Synth().toMaster();

//set the transport to repeat
Tone.Transport.loopEnd = '1m'; // 1 measure is the loop's length
Tone.Transport.loop = true;

//start/stop the transport
Tone.Transport.start();
//Tone.Transport.stop()

var notes = ['C4', 'D4', 'F4', 'G4', 'A4'];
//this function is called right before the scheduled time
function triggerSynthBlack(time) {
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C2', '8n', time);
}

function triggerSynthWhite(time) {
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease(notes[0], '8n', time);
}

document.querySelector('#addMove').addEventListener('click', function(e) {
    /* For Chrome : If an AudioContext is created prior to the document receiving a user gesture,
    * it will be created in the "suspended" state,
    * and you will need to call resume() after a user gesture is received.
    */
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    if (Object.keys(sgf[0][0][moveNumber])[0] == "B") {
        console.log("Black plays");
        Tone.Transport.schedule(triggerSynthBlack, moveNumber/2 % 4);
    } else {
        console.log("White plays");
        Tone.Transport.schedule(triggerSynthWhite, moveNumber/2 % 4);
    }

    moveNumber++;
})
