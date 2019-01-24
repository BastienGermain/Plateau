function victoryMelody(instrument, tonalite)
{
	let gamme = gammeMajor(notes[tonalite]);
	let victoryMelody = new Tone.Event
		(
			function(time)
			{	
				instrument.play(gamme[0], "16n", time);
				instrument.play(gamme[0], "16n", time + Tone.Time("16n").toSeconds());
				instrument.play(gamme[3], "2n", time + Tone.Time("8n").toSeconds());

			}
		);
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

