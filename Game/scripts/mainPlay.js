var soundFile = new p5.SoundFile();
var lastSoundFile = new p5.SoundFile();
console.log(lastSoundFile);

var recorder = new p5.SoundRecorder();

recorder.setInput(Tone.Master);

var start = 0;
var startTime = null;

const tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = -12;

Tone.Transport.start();

//////////////////////////////////////
var lastData;
var phase;

var ambiance;
var tonalite;

var whitePlayerFeature = new PlayerFeature();
var blackPlayerFeature = new PlayerFeature();

//////////////////////////////////////

var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;

function concat(first, second) 
{
	let result = new Float32Array(first.length + second.length);

	for (let i = 0; i < first.length; ++i)
		result[i] = first[i];
	
	for (let i = first.length; i < first.length + second.length; ++i)
		result[i] = second[i];

	return result;
}

function saveMusic()
{
	if (recorder)
	{
		console.log(lastSoundFile);
		recorder.stop(); // stop recorder, and send the result to soundFile

		if (!lastSoundFile.buffer)
			lastSoundFile.buffer = soundFile.buffer;
		else
		{
			for (let i = 0; i < soundFile.buffer.numberOfChannels; ++i)
				lastSoundFile.buffer.copyToChannel(concat(lastSoundFile.buffer.getChannelData(i), soundFile.buffer.getChannelData(i)), i, 0);
		}

		console.log(soundFile);
		console.log(lastSoundFile);
		p5.prototype.saveSound(lastSoundFile, 'goMusic.wav'); // save file
		console.log("Recorded ! ");
		recorder.record(soundFile);
	}
}

Tone.Buffer.on('load', function() 
{  

	//Evenement Pose de pierre :
	$("#board canvas").on('click', function(coord) 
	{
		if (isOkMove)
		{
			console.log(data);
			console.log(lastData);

			if (Tone.context.state !== 'running')
				Tone.context.resume();

			////CODE INITIALISATION
			if (start == 0)
			{
				startTime = Tone.context.currentTime.toFixed(4);
		  		
		  		recorder.record(soundFile);

				//joueur1 choisit l'ambiance
				let horizontalPos = data["stonePosition"][0];

				if (horizontalPos >= 12)
					ambiance = ambianceDub;

				else if (horizontalPos >= 6)
					ambiance = ambiance1;

				else if (horizontalPos >= 0)
					ambiance = ambianceHarmony;

				ambiance = ambiance1;

				console.log("selected ambiance = " + ambiance.nom);

				//1ers sons...
				if (ambiance == ambiance1)
				{
					updateMode();
					ambiance.themeP1.init({probability: 0.9});
					ambiance.themeP2.init({probability: 0.9});

					ambiance.beat.playKick(startTime);
					ambiance.beat.playSnare(startTime);
					ambiance.beat.playHihat(startTime);
				}

				//ambiance.beat.playKick();
				start = 1; 
			}
		}		

		

		//joueur2 choisit la tonalite
			
		init();

		////FIN INITIALISATION


		//reconnaissance des knownMove et cornerMove & update de PlayerFeature;
		updateFeatures();
		/*
		console.log("blackPlayerFeature :");
		console.log("offensive :"+blackPlayerFeature.offensive);
		console.log("defensive :"+blackPlayerFeature.defensive);
		console.log("expensive :"+blackPlayerFeature.expensive);
		console.log("offensive :"+blackPlayerFeature.risky);
		console.log("whitePlayerFeature :");
		console.log("offensive :"+whitePlayerFeature.offensive);
		console.log("defensive :"+whitePlayerFeature.defensive);
		console.log("expensive :"+whitePlayerFeature.expensive);
		console.log("offensive :"+whitePlayerFeature.risky);
		*/

		if (data["stoneOnBoard"]>4)		//2 si l'initialisation se fait en 2 coups
		{
				updateMode();
				ambiance.themeP1.init();
				ambiance.themeP2.init();

				ambiance.beat.playKick(startTime);
				ambiance.beat.playSnare(startTime);
				ambiance.beat.playHihat(startTime);

				ambiance.themeP1.startBase(startTime);
				basePlaying = true;
				currentTheme = ambiance.themeP1;
				update();

		//ICI NOTIFICATION DES CHGTS DE DATA

			//valable pour toutes les ambiances

			updateTempo();

			if (data["blackCaptures"]>lastData["blackCaptures"])
				victoryMelody(ambiance.player1Instrument, tonalite);

			if (data["whiteCaptures"]>lastData["whiteCaptures"])
				victoryMelody(ambiance.player2Instrument, tonalite);

			//valable pour une ambiance précise :

			//REGLES AMBIANCE1
			if (ambiance == ambiance1)
			{
				if (data["stoneOnBoard"] >= 10)
				{
					if (data["player"] == "Black")
						ambiance.themeP1.startMelody(Tone.TransportTime(Tone.now() + "1m").quantize("1m"));

					if (data["player"] == "White")
						ambiance.themeP2.startMelody(Tone.TransportTime(Tone.now() + "1m").quantize("1m"));
				
					melodyPlaying = true;
				}

			}

			//REGLES AMBIANCE HARMONY
			if (ambiance == ambianceHarmony){

				if (data["player"]=="Black")
				{
					//harmony.stop = 0;
					//updateHarmony();

				}
				else{
					//harmony.stop = 1;	//ça marche mais décalage 4mesure
				}
			}

			//REGLES AMBIANCEDUB
			if (ambiance == ambianceDub){

			}


			//REGLES AMBIANCEDRUM
			if (ambiance == ambianceDrum){
				if (data["player"]=="Black")
				{
					//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[0];
				}
				else{
					//ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[1];
				}

			}
		}
	});
})