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

    setTimeout(decrescendo, 1000);
}


$(document).ready(function() {
    Tone.Buffer.on('load', function() {
        //Evenement Pose de pierre :
        document.querySelector('#addMove').addEventListener('mouseup', function(e) {
            //console.log(data);
            //console.log(lastData);

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




            updateTempo();


        })
    });
})
