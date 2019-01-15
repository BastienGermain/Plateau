var tempo = 120
var T = 60/tempo

Tone.Transport.start()

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();





var A3M = gammeMajor(note["A3"])
var Fdies3m = minorRelative(A3M)

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

event2.start()