var bass = new InstrumentSampler("bass-electric");

var relativ=0;
//config harmonie
/*
var tonalite = "A3"
var gamme = gammeMajor(notes[tonalite])
if (relativ==1){
	gamme = minorRelative(gamme);
}*/

function createBassLine(tonalite, num){
	var gamme = gammeMajor(notes[tonalite])

	var bassLine;

	switch (num){
		case 0 :
			bassLine = new Tone.Event(
				function(time){
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"2n",
						time
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"2n",
						time + Tone.Time("1m").toSeconds()*2/4
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"2n",
						time + Tone.Time("1m").toSeconds()
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*7/4
					);

				}
			);
			bassLine.loop = Infinity;
			bassLine.loopEnd = "2m";
			break;

		case 1 :
			bassLine = new Tone.Event(
				function(time){
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time 
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*(1/4)
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*(2/4)
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*(3/4)
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"2n",
						time + Tone.Time("1m").toSeconds()
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*7/4
					);
				}
			);
			bassLine.loop = Infinity;
			bassLine.loopEnd = "2m";
			break;


		case 2:
			bassLine = new Tone.Event(
				function(time){
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*1/4
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*2/4
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*3/4
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()
					);
					bass.play(
						Tone.Frequency(gamme[1]/2*freqIncrement).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*5/4
					);
					bass.play(
						Tone.Frequency(gamme[1]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*6/4
					);
					bass.play(
						Tone.Frequency(gamme[6]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*7/4
					);
				}
			);
			bassLine.loop = Infinity;
			bassLine.loopEnd = "2m";
			break;

		case 3:
			bassLine = new Tone.Event(
				function(time){
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*1/4
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*2/4
					);
					bass.play(
						Tone.Frequency(gamme[0]/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*3/4
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*5/4
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*6/4
					);
					bass.play(
						Tone.Frequency(gamme[3]/2/2).toNote(),
						"4n",
						time + Tone.Time("1m").toSeconds()*7/4
					);
				}
			);
			bassLine.loop = Infinity;
			bassLine.loopEnd = "2m";
			break;
	
	}
	
	return bassLine;
}