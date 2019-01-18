var tempo = 160
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


//Choix instrument
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
polySynth = polySynth.connect(vibrato);



var relativ = 1;
//config harmonie
var tonalite = "A3"
var gamme = gammeMajor(notes[tonalite])
if (relativ==1){
	gamme = minorRelative(gamme);	
}


var base = createBase(tonalite, 1)
var harmony = createHarmony(tonalite, 1)
 

var randInt = 0;
function check(){
	var currentBeat = 0;
	var timeTmp = Tone.context.currentTime.toFixed(4);
	console.log(timeTmp);
	while (timeTmp > T-0.1){
		timeTmp-=T;
		currentBeat++;
	}
	console.log(currentBeat);

	if (currentBeat % 16 == 0){
		randInt = getRandomInt(5);
	}

	switch (randInt){
		case 0 :
			sequence0(currentBeat);
			break;

		case 1 :
			sequence1(currentBeat);
			break;

		case 2 :
			sequence2(currentBeat);
			break;

		case 3 :
			sequence3(currentBeat);
			break;

		case 4 :
			sequence4(currentBeat);
			break;

		default:
			break;
	}
	window.setTimeout(check, 1000*T);
}

//déclanchement event
document.querySelector('#addMove').addEventListener('click', function() {
	if (Tone.context.state !== 'running'){
		Tone.context.resume();
	}
	//base.start()	//quinte en A3M pour base
	check();
	//event3.start()		//tierce M
	//evet4.start()		//tierce m
})


function createBase(tonalite, degré, finCadence=false){
	var allongeNote =0
	if (finCadence){
		allongeNote=4;
	}
	var modifDegré = 1;
	switch(degré){
		case 5:
			modifDegré =  Math.pow(freqIncrement, 7);
			break;

		case 2:
			modifDegré =  Math.pow(freqIncrement, 2);
			break;

		case 4:
			modifDegré =  Math.pow(freqIncrement, 5);
			break;

		case 6:
			modifDegré =  Math.pow(freqIncrement, -3)*2;
			break;

		default:
			break;
	}
	var base =  new Tone.Event(
		function(time){
			polySynth.triggerAttackRelease(
				[gamme[0]*modifDegré/2,  gamme[4]*modifDegré/2],
				(3+allongeNote-2)*T, 
				time
			);
		}
	);
	base.loop = Infinity;
	base.loopEnd = (4+allongeNote)*T;
	return base;
}

function createHarmony(tonalite, degré){
	gamme = gammeMajor(notes[tonalite]);
	if (relativ==1){
		gamme = minorRelative(gamme);	
	}
	var modifDegré = 1;
	switch(degré){
		case 5:
			modifDegré =  Math.pow(freqIncrement, 7);
			break;

		case 2:
			modifDegré =  Math.pow(freqIncrement, 2);
			gamme = gammeMinor(notes[tonalite]);
			if (relativ==1){gamme = minorRelative(gamme);}
			break;

		case 4:
			modifDegré =  Math.pow(freqIncrement, 5);
			break;

		case 6:
			modifDegré =  Math.pow(freqIncrement, -3);
			gamme = gammeMinor(notes[tonalite]);
			if (relativ==1){gamme = minorRelative(gamme);}
			break;

		default:
			break;
	}
	var event = new Tone.Event(
		function(time){
			polySynth.triggerAttackRelease(
				[gamme[2]*modifDegré, gamme[4]*modifDegré],
				T/2, 
				time+T
			);
			polySynth.triggerAttackRelease(
				[gamme[2]*modifDegré, gamme[4]*modifDegré],
				T/2, 
				time+3*T
			);
		}
	);

	event.loop = Infinity;
	base.loopEnd = 4*T;
	return event;
}


function modifBase(degré, finCadence){
	base.stop();
	base = createBase(tonalite, degré, finCadence);
	base.start();
}

function modifHarmony(degré){
	harmony.stop();
	harmony = createHarmony(tonalite, degré);
	harmony.start()
}


function sequence0(currentBeat){
	if (currentBeat % 16==0){
		modifBase(1);
		modifHarmony(1);
		console.log("degré1");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1, true);
		harmony.stop();
		console.log("degré1");
	}
	else{
	}
}

function sequence1(currentBeat){
	if (currentBeat % 16==0){
		modifBase(5);
		modifHarmony(5);
		console.log("degré5");
	}
	else if (currentBeat % 16==4){
		modifBase(1);
		modifHarmony(1);
		console.log("degré1");
	}
	else if (currentBeat % 16==8){
		modifBase(5, true);
		harmony.stop();
		console.log("degré5");
	}
	else{
	}
}

function sequence2(currentBeat){
	if (currentBeat % 16==0){
		modifBase(2);
		modifHarmony(2);
		console.log("degré2");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1, true);
		harmony.stop();
		console.log("degré1");
	}
	else{
	}
}

function sequence3(currentBeat){
	if (currentBeat % 16==0){
		modifBase(1);
		modifHarmony(1);
		console.log("degré1");
	}
	else if (currentBeat % 16==4){
		modifBase(4);
		modifHarmony(4);
		console.log("degré4");
	}
	else if (currentBeat % 16==8){
		modifBase(2);
		modifHarmony(2);
		console.log("degré2");
	}
	else if (currentBeat % 16==12){
		modifBase(5);
		modifHarmony(5);
		console.log("degré5");
	}
	else{
	}
}

function sequence4(currentBeat){
	if (currentBeat % 16==0){
		modifBase(2);
		modifHarmony(2);
		console.log("degré2");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1);
		modifHarmony(1);
		console.log("degré1");
	}
	else if (currentBeat % 16==12){
		modifBase(6);
		modifHarmony(6);
		console.log("degré6");
	}
	else{
	}
}

