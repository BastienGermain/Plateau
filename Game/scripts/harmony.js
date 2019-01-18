//Choix instrument
//var instrument = new Tone.PolySynth(4, Tone.Synth).toMaster();
//instrument = instrument.connect(vibrato);

var instrument = new InstrumentSampler("trumpet");
var fx = new FXRack();

// add fx to the FXRack
fx.selectFX('reverb');
instrument.catchFXs(fx);

var relativ=1;
//config harmonie
var tonalite = "A3"
var gamme = gammeMajor(notes[tonalite])
if (relativ==1){
	gamme = minorRelative(gamme);
}


var base = createBase(tonalite, 1)
var harmony = createHarmony(tonalite, 1)


function createBase(tonalite, degré, finCadence=false){
	var allongeNote = 0;
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
			instrument.play(
				Tone.Frequency(gamme[0]*modifDegré/2).toNote(),
				(3+allongeNote-2)*T,
				time
			);
			instrument.play(
				Tone.Frequency(gamme[4]*modifDegré/2).toNote(),
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
			instrument.play(
				Tone.Frequency(gamme[2]*modifDegré).toNote(),
				T/2,
				time+T
			);
			instrument.play(
				Tone.Frequency(gamme[4]*modifDegré).toNote(),
				T/2,
				time+T
			);
			instrument.play(
				Tone.Frequency(gamme[2]*modifDegré).toNote(),
				T/2,
				time+3*T
			);
			instrument.play(
				Tone.Frequency(gamme[4]*modifDegré).toNote(),
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
		//console.log("degré1");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		//console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1, true);
		harmony.stop();
		//console.log("degré1");
	}

}

function sequence1(currentBeat){
	if (currentBeat % 16==0){
		modifBase(5);
		modifHarmony(5);
		//console.log("degré5");
	}
	else if (currentBeat % 16==4){
		modifBase(1);
		modifHarmony(1);
		//console.log("degré1");
	}
	else if (currentBeat % 16==8){
		modifBase(5, true);
		harmony.stop();
		//console.log("degré5");
	}

}

function sequence2(currentBeat){
	if (currentBeat % 16==0){
		modifBase(2);
		modifHarmony(2);
		//console.log("degré2");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		//console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1, true);
		harmony.stop();
		//console.log("degré1");
	}

}

function sequence3(currentBeat){
	if (currentBeat % 16==0){
		modifBase(1);
		modifHarmony(1);
		//console.log("degré1");
	}
	else if (currentBeat % 16==4){
		modifBase(4);
		modifHarmony(4);
		//console.log("degré4");
	}
	else if (currentBeat % 16==8){
		modifBase(2);
		modifHarmony(2);
		//console.log("degré2");
	}
	else if (currentBeat % 16==12){
		modifBase(5);
		modifHarmony(5);
		//console.log("degré5");
	}

}

function sequence4(currentBeat){
	if (currentBeat % 16==0){
		modifBase(2);
		modifHarmony(2);
		//console.log("degré2");
	}
	else if (currentBeat % 16==4){
		modifBase(5);
		modifHarmony(5);
		//console.log("degré5");
	}
	else if (currentBeat % 16==8){
		modifBase(1);
		modifHarmony(1);
		//console.log("degré1");
	}
	else if (currentBeat % 16==12){
		modifBase(6);
		modifHarmony(6);
		//console.log("degré6");
	}

}
