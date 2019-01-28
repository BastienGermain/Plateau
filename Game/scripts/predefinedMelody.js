function victoryMelody(instrument, tonalite)
{
	let gamme = gammeMajor(tonalite);
	let victoryMelody = new Tone.Event
		(
			function(time)
			{	
				instrument.play(Tone.Frequency(gamme[0]).toNote(), "16n", time);
				instrument.play(Tone.Frequency(gamme[0]).toNote(), "16n", time + Tone.Time("16n").toSeconds());
				instrument.play(Tone.Frequency(gamme[3]).toNote(), "2n", time + Tone.Time("8n").toSeconds());

			}
		);
	console.log("victoryMelody !")
	victoryMelody.start();
}

function sound(instrument, tonalite)
{
	let sound = new Tone.Event(
		function(time)
		{
			instrument.play(notes[tonalite], "4n", time);
		}
	);
	sound.start();
}

