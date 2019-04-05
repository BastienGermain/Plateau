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
var beat1 = new Beat(1);
var beat2 = new Beat(2);

const theme = new Theme(3, 'guitar-acoustic', 'bass-electric')

let melodyPlaying = false
let basePlaying = false

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
                //decrescendo();

                theme.init()
                theme.startBase()
                //Random Simple Kick
                start = 1;


                startImpro();
            }

            init(); //initie la tonalité et les instruments en fonction des premiers coups des joueurs
            ////FIN INITIALISATION

            if (!melodyPlaying && data['stonesConnectionNumber'] > 0) {
                theme.startMelody()
                melodyPlaying = true
            }
           
		    //PERCU
            switch(Math.trunc(3*Math.abs(data.globalInterpretation[0]))){
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

            if (data['stoneOnBoard'] >= 15) {

                if (data.player == "Black"){
                    if (beat2.kickLoop !== null){
                        beat2.stopKick();
                    }	
                    
                    beat1.playKick();
                }
                else{
                    beat1.stopKick();          
                    beat2.playKick();
                }
            }

            if (data['stoneOnBoard'] >= 30) {

                if (data.player == "Black"){
                    if (beat2.snareLoop !== null){
                        beat2.stopSnare();
                    }	
                    
                    beat1.playSnare();
                }
                else{
                    if (beat1.snareLoop !== null){
                        beat1.stopSnare();
                    }
                    beat2.playSnare();
                }
            }

            if (data['stoneOnBoard'] >= 45) {

                if (data.player == "Black"){
                    if (beat2.hihatLoop !== null){
                        beat2.stopHihat();
                    }	
                    beat1.playHihat();
                }
                else{
                    beat1.stopHihat();
                    beat2.playHihat();
                }
            }

            if (data['stoneOnBoard'] > 20) {

                if (data.globalInterpretation[0] > 0) {
                    if (data.player === 'Black') {
                        theme.bass.sampler.volume.value = Math.min(data.globalInterpretation[0] * -20, 3)
                    } else {
                        theme.bass.sampler.volume.value = Math.min(data.globalInterpretation[0] * 20, 3)
                    }
                }
                
                if (data.globalInterpretation[0] < 0) {
                    if (data.player === 'Black') {
                        theme.bass.sampler.volume.value = Math.min(data.globalInterpretation[0] * -20, 3)
                    } else {
                        theme.bass.sampler.volume.value = Math.min(data.globalInterpretation[0] * 20, 3)
                    }
                }
                
            }
            console.log(theme.bass.sampler.volume.value);
            

	            	
	        updateTempo();


        })
    });
})
