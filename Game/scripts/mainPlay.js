let start = 0;

var startTime;

Tone.Transport.bpm.value = 120;
Tone.Master.volume.value = -12;

Tone.Transport.start();

var harmony = new Harmony();

const drum = new InstrumentSampler('drum');
var beat = new Beat(drum);

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


  $("#board").on('click', function(coord) {



      if (Tone.context.state !== 'running') {
          Tone.context.resume();
      }

      if (start == 0) {
          //updateHarmony();
          //updateBassLine();
          start = 1;
          startTime = Tone.context.currentTime.toFixed(4);
      }


  });
