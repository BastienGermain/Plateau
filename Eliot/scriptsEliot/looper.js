var tempo = 120
var T = 60/tempo


Tone.Transport.start()//start looping

//FX
var dist = new Tone.Distortion(0.8).toMaster();
var reverb = new Tone.JCReverb(0.1).toMaster();
var delay = new Tone.FeedbackDelay(0.1).toMaster();
var autoWah = new Tone.AutoWah(50, 6, 0).toMaster();
var vibrato = new Tone.Vibrato(5, 0.1).toMaster();
var cheby = new Tone.Chebyshev(40).toMaster();
var tremolo = new Tone.Tremolo(9, 0.75).toMaster().start();
var pingPong = new Tone.PingPongDelay(0.05, 0.8).toMaster();
var freeverb = new Tone.Freeverb().toMaster();
var feedbackDelay = new Tone.FeedbackDelay(T/4, 0.5).toMaster();
var phaser = new Tone.Phaser({
	"frequency" : 5,
	"octaves" : 5,
	"baseFrequency" : 1000
}).toMaster();

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
//polySynth = polySynth.connect(phaser);


document.querySelector('#addMove').addEventListener('click', function() {
	if (Tone.context.state !== 'running'){
		Tone.context.resume();
	}
	event1.start()	//quinte en A3M pour base
	event3.start()		//tierce M
	//evet4.start()		//tierce m
})



var A3M = gammeMajor(notes["A3"])
var A3m = gammeMinor(notes["A3"])
var Fdies3m = gammeMinor(notes["F#3"]/2)

var event1 = new Tone.Event(
	function(time){
		polySynth.triggerAttackRelease(
			[A3M[0]/2,  A3M[4]/2],
			2*T, 
			time
		);
	}
);
event1.loop = Infinity

/*
var event2 = new Tone.Event(
	function(time){
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[2],  Fdies3m[4], Fdies3m[7]],
			T, 
			time
		);
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[2], Fdies3m[4], Fdies3m[7]],
			T/2, 
			time+2*T
		);
		polySynth.triggerAttackRelease(
			[Fdies3m[0], Fdies3m[2], Fdies3m[4], Fdies3m[7]],
			T/2, 
			time+3*T
		);
	}
);
event2.loop = Infinity
*/

var event3 = new Tone.Event(
	function(time){
		/*polySynth.triggerAttackRelease(
			[A3M[0], A3M[2], A3M[5]/2],
			T, 
			time
		);*/
		polySynth.triggerAttackRelease(
			[A3M[2], A3M[4]],
			T/2, 
			time+2*T
		);
		polySynth.triggerAttackRelease(
			[A3M[2], A3M[4]],
			T/2, 
			time+3*T
		);
	}
);
event3.loop = Infinity

var event4 = new Tone.Event(
	function(time){
		/*polySynth.triggerAttackRelease(
			[A3m[0], A3m[2], A3m[5]/2],
			T, 
			time
		);*/
		polySynth.triggerAttackRelease(
			[A3m[2], A3M[5]],
			T/2, 
			time+2*T
		);
		polySynth.triggerAttackRelease(
			[A3m[2], A3M[5]],
			T/2, 
			time+3*T
		);
	}
);
event4.loop = Infinity





