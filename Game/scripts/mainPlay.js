let start = 0;

var startTime;

const tempo = 120;
Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var harmony = new Harmony();

// MELODY ////////////////////////////////////////////

const melodyP1 = ambiance1.melodyP1;
const melodyP2 = ambiance1.melodyP2;

var melody;

// BEAT //////////////////////////////////////////////////////

var beat = new Beat();

function updateMelody()
{
	console.log(Tone.Transport.bpm.value);
	melody.stopBase();

//////////////////////////////////////////////

	// Set of instrument used according to the player currently playing

	if (data["player"] == "White")
		melody = melodyP2;
	else 
		melody = melodyP1;

/////////////////////////////////////////////

	// Number of notes played for a chord 
	// according to stones around last played stone

	if (data["stonesAround"] == 0)
		melody.updateBase(1);
	else
	{
		if (data["stonesAround"] <= 2)
			melody.updateBase(2);
		else
		{
			if (data["stonesAround"] == 3)
				melody.updateBase(3);
			else
				melody.updateBase(4);	
		}
	}

/////////////////////////////////////////////

	if (data["moveTime"] < 10 && Tone.Transport.bpm.value < tempo + 60)
		Tone.Transport.bpm.value += 5;

	if (data["moveTime"] > 60 && Tone.Transport.bpm.value > tempo - 60)
		Tone.Transport.bpm.value -= 5;

	melody.startBase();

	window.setTimeout(updateMelody, Tone.Time("1m").toMilliseconds());
}

function updateBassLine(){
	bassLine = createBassLine(tonalite);
	bassLine.start();
}

function updateHarmony()
{
	harmony.randInt = getRandomInt(5);

	switch (harmony.randInt)
	{
		case 0 :
		harmony.sequence0();
		break;

		case 1 :
		harmony.sequence1();
		break;

		case 2 :
		harmony.sequence2();
		break;

		case 3 :
		harmony.sequence3();
		break;

		case 4 :
		harmony.sequence4();
		break;

		default:
		break;
	}

	window.setTimeout(updateHarmony, Tone.Time("4m").toMilliseconds());
}


$("#board").on('click', function(coord)
{
	if (Tone.context.state !== 'running')
		Tone.context.resume();

	if (start == 0) 
	{
          //updateHarmony();
          //updateBassLine();

          console.log(data["cornerMove"]);

          switch(data["cornerMove"])
          {
          	case "San-san":
          	melodyP1.mode = Melody.ModesNames[8];
          	melodyP2.mode = Melody.ModesNames[8];
          	break;

          	case "Hoshi":
          	melodyP1.mode = Melody.ModesNames[3];
          	melodyP2.mode = Melody.ModesNames[3];
          	break;

          	case "Komoku":
          	melodyP1.mode = Melody.ModesNames[7];
          	melodyP2.mode = Melody.ModesNames[7];
          	break;

          	case "Takamoku":
          	melodyP1.mode = Melody.ModesNames[5];
          	melodyP2.mode = Melody.ModesNames[5];
          	break;

          	case "Mokuhazushi":
          	melodyP1.mode = Melody.ModesNames[6];
          	melodyP2.mode = Melody.ModesNames[6];
          	break;

          	default:
          	melodyP1.mode = Melody.ModesNames[0];
          	melodyP2.mode = Melody.ModesNames[0];
          	break;
          }

          melodyP1.init();
		  melodyP2.init();

          melody = melodyP1;

          console.log(melody.mode);

          beat.play(startTime);
          melody.startBase(startTime);
          updateMelody();

          start = 1;
          startTime = Tone.context.currentTime.toFixed(4);
    }


});
