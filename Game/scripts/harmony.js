//Choix harmonyInstrument
//var harmonyInstrument = new Tone.PolySynth(4, Tone.Synth).toMaster();
//harmonyInstrument = harmonyInstrument.connect(vibrato);




var harmonyInstrument = new InstrumentSampler("violin");
var player1Instrument = new InstrumentSampler("violin");
var player2Instrument = new InstrumentSampler("flute");
var fx = new FXRack();


// add fx to the FXRack
fx.selectFX('reverb');
harmonyInstrument.catchFXs(fx);
player1Instrument.catchFXs(fx);
player2Instrument.catchFXs(fx);

var relativ=1;
//config harmonie
var tonalite = "A3"
var gamme = gammeMajor(notes[tonalite])
if (relativ==1){
	gamme = minorRelative(gamme);
}



class Harmony {
	constructor()
	{
		this.mesureCount = 0;
		this.randInt = 0;
		this.leftHand = this.createLeftHand(tonalite, 1);
		this.rightHand = this.createRightHand(tonalite, 1);
		
	}

	

	createLeftHand(tonalite, degré, finCadence=0)
	{
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
		var leftHand =  new Tone.Event(
			function(time){
				harmonyInstrument.play(
					Tone.Frequency(gamme[0]*modifDegré/2).toNote(),
					Tone.Time("2n").toSeconds()*(1+2*finCadence),
					time
				);
				harmonyInstrument.play(
					Tone.Frequency(gamme[4]*modifDegré/2).toNote(),
					Tone.Time("2n").toSeconds()*(1+2*finCadence),
					time
				);
			}
		);
		leftHand.loop = Infinity;
		leftHand.loopEnd = Tone.Time("1m").toMilliseconds()*(1+finCadence);
		return leftHand;
	}

	createRightHand(tonalite, degré, finCadence=0)
	{
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
		if (finCadence){
			var rightHand = new Tone.Event(
				function(time){
					harmonyInstrument.play(
						Tone.Frequency(gamme[2]*modifDegré).toNote(),
						Tone.Time("2n").toSeconds()*3,
						time 
					);
					harmonyInstrument.play(
						Tone.Frequency(gamme[4]*modifDegré).toNote(),
						Tone.Time("2n").toSeconds()*3,
						time 
					);
				}
			);
		}
		else{
			var rightHand = new Tone.Event(
				function(time){
					harmonyInstrument.play(
						Tone.Frequency(gamme[2]*modifDegré).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*1/4
					);
					harmonyInstrument.play(
						Tone.Frequency(gamme[4]*modifDegré).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*1/4
					);
					harmonyInstrument.play(
						Tone.Frequency(gamme[2]*modifDegré).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*3/4
					);
					harmonyInstrument.play(
						Tone.Frequency(gamme[4]*modifDegré).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*3/4
					);
				}
			);
		}

		rightHand.loop = Infinity;
		rightHand.loopEnd = Tone.Time("1m").toMilliseconds()*(1+finCadence);
		return rightHand;
	}


	modifLeftHand(degré, finCadence =0)
	{
		this.leftHand.stop();
		this.leftHand = this.createLeftHand(tonalite, degré, finCadence);
		this.leftHand.start();
	}

	modifRightHand(degré, finCadence =0)
	{
		this.rightHand.stop();
		this.rightHand = this.createRightHand(tonalite, degré, finCadence);
		this.rightHand.start()
	}

	incrementMesure(n)
	{
		if ((this.mesureCount+n) > 3){
			this.mesureCount += (n-4);
		}
		else{
			this.mesureCount += n;
		}
	}

	sequence0()
	{
		console.log("sequence0");
		console.log(this.mesureCount);

		if (this.mesureCount ==0){
			this.modifLeftHand(1);
			this.modifRightHand(1);
			//console.log("degré1");
		}
		else if (this.mesureCount==1){
			this.modifLeftHand(5);
			this.modifRightHand(5);
			//console.log("degré5");
		}
		else if (this.mesureCount==2){
			this.modifLeftHand(1, 1);
			this.modifRightHand(1, 1);
			//console.log("degré1");
		}

		this.incrementMesure(1);
		if (this.mesureCount !=0){
			window.setTimeout(this.sequence0.bind(this), Tone.Time("1m").toMilliseconds());
		}
	}

	sequence1()
	{
		console.log("sequence1");
		console.log(this.mesureCount);
		if (this.mesureCount ==0){
			this.modifLeftHand(5);
			this.modifRightHand(5);
			//console.log("degré1");
		}
		else if (this.mesureCount==1){
			this.modifLeftHand(1);
			this.modifRightHand(1);
			//console.log("degré5");
		}
		else if (this.mesureCount==2){
			this.modifLeftHand(5, 1);
			this.modifRightHand(5, 1);
			//console.log("degré1");
		}
		this.incrementMesure(1);
		if (this.mesureCount !=0){
			window.setTimeout(this.sequence1.bind(this), Tone.Time("1m").toMilliseconds());
		}
	}

	sequence2()
	{
		console.log("sequence2");
		console.log(this.mesureCount)
		if (this.mesureCount ==0){
			this.modifLeftHand(2);
			this.modifRightHand(2);
			//console.log("degré1");
		}
		else if (this.mesureCount==1){
			this.modifLeftHand(5);
			this.modifRightHand(5);
			//console.log("degré5");
		}
		else if (this.mesureCount==2){
			this.modifLeftHand(1, 1);
			this.modifRightHand(1, 1);
			//console.log("degré1");
		}
		this.incrementMesure(1);
		if (this.mesureCount !=0){
			window.setTimeout(this.sequence2.bind(this), Tone.Time("1m").toMilliseconds());
		}
	}

	sequence3()
	{
		console.log("sequence3");
		if (this.mesureCount ==0){
			this.modifLeftHand(1);
			this.modifRightHand(1);
			//console.log("degré1");
		}
		else if (this.mesureCount ==1){
			this.modifLeftHand(4);
			this.modifRightHand(4);
			//console.log("degré4");
		}
		else if (this.mesureCount ==2){
			this.modifLeftHand(2);
			this.modifRightHand(2);
			//console.log("degré2");
		}
		else if (this.mesureCount ==3){
			this.modifLeftHand(5);
			this.modifRightHand(5);
			//console.log("degré5");
		}
		this.incrementMesure(1);
		if (this.mesureCount !=0){
			window.setTimeout(this.sequence3.bind(this), Tone.Time("1m").toMilliseconds());
		}
	}

	sequence4()
	{
		console.log("sequence4");
		if (this.mesureCount ==0){
			this.modifLeftHand(2);
			this.modifRightHand(2);
			//console.log("degré1");
		}
		else if (this.mesureCount ==1){
			this.modifLeftHand(5);
			this.modifRightHand(5);
			//console.log("degré4");
		}
		else if (this.mesureCount ==2){
			this.modifLeftHand(1);
			this.modifRightHand(1);
			//console.log("degré2");
		}
		else if (this.mesureCount ==3){
			this.modifLeftHand(6);
			this.modifRightHand(6);
			//console.log("degré5");
		}
		this.incrementMesure(1);
		if (this.mesureCount !=0){
			window.setTimeout(this.sequence4.bind(this), Tone.Time("1m").toMilliseconds());
		}
	}



}






