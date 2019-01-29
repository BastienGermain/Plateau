var soundFile = new p5.SoundFile();
var lastSoundFile = new p5.SoundFile();

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

NProgress.start();

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
		recorder.stop(); // stop recorder, and send the result to soundFile

		if (!lastSoundFile.buffer)
			lastSoundFile.buffer = soundFile.buffer;
		else
		{
			for (let i = 0; i < soundFile.buffer.numberOfChannels; ++i)
				lastSoundFile.buffer.copyToChannel(concat(lastSoundFile.buffer.getChannelData(i), soundFile.buffer.getChannelData(i)), i, 0);
		}

		p5.prototype.saveSound(lastSoundFile, 'goMusic.wav'); // save file
		recorder.record(soundFile);
	}
}


window.onload = function()
{
	Tone.Buffer.on('load', function()
	{
		NProgress.done();
		let content = document.getElementById("content");
 		content.classList.remove("loading");

		//Evenement Pose de pierre :
		$("#board canvas").on('click', function(coord)
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
				updateMode();

				console.log("kickpattern", ambiance.beat.kickPattern);
				ambiance.beat.playKick(startTime);
				start = 1;
			}


		init();	//initie la tonalité et les instruments en fonction des coups des joueurs


		if (data["stoneOnBoard"] == 2) {
			ambiance.beat.playHihat(startTime);
				console.log("hihat pattern",ambiance.beat.hihatPattern);
		}


		if (data["stoneOnBoard"] == 3) {
			ambiance.beat.playSnare(startTime);
				console.log("snarepattern", ambiance.beat.snarePattern);
		}



		//Coup 4 kick change
		//coup 5 hihat change
		//coup 6 hihat change

		//Coup 7 kick change
		//coup 8 hihat change
		//coup 9 hihat change

		if (data["stoneOnBoard"] == 4)
		{

			currentTheme = ambiance.themeP1;
			ambiance.themeP1.startBase(startTime);
			basePlaying = true;
			update();
		}




		////FIN INITIALISATION

		//reconnaissance des knownMove et cornerMove & update de PlayerFeature;
		updateFeatures();
/*
		console.log("blackPlayerFeature :");
		console.log("offensive :"+blackPlayerFeature.offensive);
		console.log("defensive :"+blackPlayerFeature.defensive);
		console.log("expensive :"+blackPlayerFeature.expensive);
		console.log("risky :"+blackPlayerFeature.risky);
		console.log("whitePlayerFeature :");
		console.log("offensive :"+whitePlayerFeature.offensive);
		console.log("defensive :"+whitePlayerFeature.defensive);
		console.log("expensive :"+whitePlayerFeature.expensive);
		console.log("risky :"+whitePlayerFeature.risky);
*/

		if (data["stoneOnBoard"]>4)		//2 si l'initialisation se fait en 2 coups
		{
		}

/*
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
*/

		//ICI NOTIFICATION DES CHGTS DE DATA
			//valable pour toutes les ambiancesg


			//console.log(currentTheme.arpeggioNoteCount);
			updateTempo();


			if (data["blackCaptures"]>lastData["blackCaptures"])
			{
				//console.log("blackCaptures")
				victoryMelody(ambiance.player1Instrument1, tonalite);
			}
			if (data["whiteCaptures"]>lastData["whiteCaptures"])
			{
				//console.log("whiteCaptures")
				victoryMelody(ambiance.player2Instrument1, tonalite);
			}

			//valable pour une ambiance précise :

			//REGLES AMBIANCE1
			if (ambiance == ambiance1)
			{
				if (data["stoneOnBoard"] >= 10)
				{

					{if (data["stoneOnBoard"] >= 10)
						currentTheme.startMelody(startTime);

						melodyPlaying = true;
					}

					if (data["player"] == "White")
						ambiance.themeP2.startMelody(startTime);

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
		})
	});
}
