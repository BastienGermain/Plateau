function createVictoryMelody(instrument, tonalite)
{
	let gamme = gammeMajor(notes[tonalite]);
	var victoryMelody = new Tone.Event
		(
			function(time)
			{	
				instrument.play(gamme[0], "16n", time);
				instrument.play(gamme[0], "16n", time + Tone.Time("16n").toSeconds());
				instrument.play(gamme[3], "2n", time + Tone.Time("8n").toSeconds());

			}
		);
	return victoryMelody;
}

