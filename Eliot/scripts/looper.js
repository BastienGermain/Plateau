var tempo = 120
var T = 60/tempo

Tone.Transport.start()

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();





var A3M = gammeMajor(note["A3"])
var Fdies3m = gammeMajor(note["F#3"]/2)

var event1 = new Tone.Event(
	function(time){
		polySynth.triggerAttack(
			[A3M[0], A3M[4], A3M[7]],
			//4*T, 
			time
		);
	}
);
//event1.loop = Infinity

var event2 = new Tone.Event(
	function(time){
		polySynth.triggerAttack(
			[Fdies3m[0], Fdies3m[4], Fdies3m[7]],
			//4*T, 
			time
		);
	}
);


event2.start()