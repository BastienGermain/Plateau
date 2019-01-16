/*
* Main file to link tone.js and game data
* See data structure in dataProcess.js
*/

// ***  Exemple using tone  *** /
var tempo = 120;
var T = 60/tempo;
var nbMesure = 4;

Tone.Transport.start();

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var A3M = gammeMajor(note["A3"]);
var Fdies3m = gammeMajor(note["F#3"]/2);

var event1 = new Tone.Event(
	function(time){
		polySynth.triggerAttackRelease(
			[A3M[0], A3M[4], A3M[7]],
			T,
			time
		);
		polySynth.triggerAttackRelease(
			[A3M[0], A3M[4], A3M[7]],
			T/2,
			time+1
		);
		polySynth.triggerAttackRelease(
			[A3M[0], A3M[4], A3M[7]],
			T/2,
			time+1.5
		);
	}
);
event1.loop = Infinity

var event2 = new Tone.Event(
	function(time){
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[4], Fdies3m[7]],
			T,
			time
		);
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[4], Fdies3m[7]],
			T/2,
			time+1
		);
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[4], Fdies3m[7]],
			T/2,
			time+1.5
		);
	}
);
event2.loop = Infinity

function waitForRightTime() {
  return new Promise(resolve => {
    function check() {
      if (Tone.context.currentTime.toFixed(2) % nbMesure == 0.00) {
        console.log('right time to update sound !');
        resolve();
      } else {
        window.setTimeout(check, 10);
      }
    }
    check();
  });
}

async function updateSound() {
    await waitForRightTime();

    if (data["lastPlayer"] == "Black") {
        event2.stop();
        event1.start();
    } else {
        event1.stop();
        event2.start();
    }
}

$(document).ready(function() {
    document.querySelector('#addMove').addEventListener('mouseup', function(e) {
        /* For Chrome : If an AudioContext is created prior to the document receiving a user gesture,
        * it will be created in the "suspended" state,
        * and you will need to call resume() after a user gesture is received.
        */
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        //updateSound();

    })
})
