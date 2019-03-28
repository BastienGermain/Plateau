var soundFile = new p5.SoundFile();
var recorder = new p5.SoundRecorder();
recorder.setInput(Tone.Master);

var start = 0;
var startTime = null;

const tempo = 120;

Tone.Transport.bpm.value = tempo;
Tone.Master.volume.value = 0;

Tone.Transport.start();

//////////////////////////////////////
var lastData;

var tonalite;
var melodyInstrument;
var bassInstrument;
var beat1 = new Beat(1);
var beat2 = new Beat(2);

//////////////////////////////////////

/*
var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;
*/

function saveMusic() {
    if (recorder) {
        recorder.stop(); // stop recorder, and send the result to soundFile
        p5.prototype.saveSound(soundFile, 'goMusic.wav'); // save file
    }
}


function decrescendo() {
    const time = data["decrescendoTime"];
/*
    if (time == 10 && data["stoneOnBoard"] >= 10) {
        console.log("stopSnare");
        ambiance.beat.stopSnare();

        if (melodyPlaying) {
            currentTheme.stopMelody();
            currentTheme.updateMelody(Math.min(0, currentTheme.arpeggioNoteCount - 3));
            currentTheme.startMelody(startTime);
        }

    } else if (time == 20 && data["stoneOnBoard"] >= 4) {
        console.log("stopHihat");
        ambiance.beat.stopHihat();

        if (melodyPlaying) {
            currentTheme.stopMelody();
            melodyPlaying = false;
        }

    } else if (time == 25) {
        if (basePlaying) {
            currentTheme.stopBase();
            basePlaying = false;
        }

    } else if (time == 30) {
        console.log("stopKick");
        ambiance.beat.stopKick();
    }
    */

    setTimeout(decrescendo, 1000);
}


$(document).ready(function() {
    Tone.Buffer.on('load', function() {
        //Evenement Pose de pierre :
        document.querySelector('#addMove').addEventListener('mouseup', function(e) {


            if (Tone.context.state !== 'running')
                Tone.context.resume();

            ////CODE INITIALISATION
            if (start == 0) {
                startTime = Tone.context.currentTime.toFixed(4);

                recorder.record(soundFile);

                tonalite = "A3";
                melodyInstrument = new InstrumentSampler("piano");
                //decrescendo();

                //Random Simple Kick
                start = 1;


                startImpro();
            }

            init(); //initie la tonalité et les instruments en fonction des premiers coups des joueurs
            ////FIN INITIALISATION


           
		    //PERCU
            switch(Math.trunc(10*Math.abs(data.globalInterpretation[0]))){
            	case 0:
            		beat1.changePattern(1, 0);
            		beat2.changePattern(2, 0);
            		break;

            	case 1:
            		beat1.changePattern(1, 1);
            		beat2.changePattern(2, 1);
            		break;

            	case 2:
            		beat1.changePattern(1, 2);
            		beat2.changePattern(2, 2);
            		break;

            	case 3:
            		beat1.changePattern(1, 3);
            		beat2.changePattern(2, 3);
            		break;

            	case 4:
            		beat1.changePattern(1, 4);
            		beat2.changePattern(2, 4);
            		break;

            	case 5:
            		beat1.changePattern(1, 5);
            		beat2.changePattern(2, 5);
            		break;

            	case 6:
            		beat1.changePattern(1, 6);
            		beat2.changePattern(2, 6);
            		break;

            	case 7: case 8: case 9:
            		beat1.changePattern(1, 7);
            		beat2.changePattern(2, 7);
            		break;
            }


            if (data.player == "Black"){
            	if (beat2.kickLoop){
	            	beat2.stopKick();
		        	beat2.stopSnare();
		        	beat2.stopHihat();
		        }	

	            beat1.playKick();
	            beat1.playSnare();
	            beat1.playHihat();
	        }
	        else{
	        	beat1.stopKick();
	        	beat1.stopSnare();
	        	beat1.stopHihat();

	        	beat2.playKick();
	            beat2.playSnare();
	            beat2.playHihat();
	        }

	            	
	        updateTempo();


        })
    });
})
