var bass = new InstrumentSampler("bass-electric");

var relativ=0;
//config harmonie
var tonalite = "A3"
var gamme = gammeMajor(notes[tonalite])
if (relativ==1){
	gamme = minorRelative(gamme);
}

function createBassLine(tonalite){
	var noteDuration = 7/8;
	var bassLine =  new Tone.Event(
		function(time){
			bass.play(
				Tone.Frequency(gamme[0]/2).toNote(),
				noteDuration*T,
				time
			);
			bass.play(
				Tone.Frequency(gamme[0]/2).toNote(),
				noteDuration*T,
				time +1/2
			);
			bass.play(
				Tone.Frequency(gamme[0]/2).toNote(),
				noteDuration*T,
				time + 1
			);
			bass.play(
				Tone.Frequency(gamme[0]/2).toNote(),
				noteDuration*T,
				time +3/2
			);
			bass.play(
				Tone.Frequency(gamme[0]/2).toNote(),
				noteDuration*T,
				time +2
			);
			bass.play(
				Tone.Frequency(gamme[1]/2*freqIncrement).toNote(),
				noteDuration*T,
				time +5/2
			);
			bass.play(
				Tone.Frequency(gamme[1]/2).toNote(),
				noteDuration*T,
				time +3
			);
			bass.play(
				Tone.Frequency(gamme[6]/2/2).toNote(),
				noteDuration*T,
				time +7/2
			);
		}
	);
	bassLine.loop = Infinity;
	bassLine.loopEnd = 8*T;
	return bassLine;
}