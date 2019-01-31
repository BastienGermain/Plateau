var soundFile = new p5.SoundFile();
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
var harmony = null;


var whitePlayerFeature = new PlayerFeature();
var blackPlayerFeature = new PlayerFeature();


//////////////////////////////////////

var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;

function saveMusic() {
    if (recorder) {
        recorder.stop(); // stop recorder, and send the result to soundFile
        p5.prototype.saveSound(soundFile, 'goMusic.wav'); // save file
    }
}

let isKickStopped;

function decrescendo() {
    const time = data["decrescendoTime"];

    if (time == 10 && ambiance.beat.playingSnare) {
        console.log("stopSnare");
        ambiance.beat.stopSnare();

        if (melodyPlaying) {
            currentTheme.stopMelody();
            currentTheme.updateMelody(Math.min(0, currentTheme.arpeggioNoteCount - 3));
            currentTheme.startMelody(startTime);
        }

    } else if (time == 20 && ambiance.beat.playingHihat) {
        console.log("stopHihat");
        ambiance.beat.stopHihat();

        if (melodyPlaying) {
            currentTheme.stopMelody();
            currentTheme.updateMelody(Math.min(0, currentTheme.arpeggioNoteCount - 3));
            currentTheme.startMelody(startTime);
            9
        }

    } else if (time == 30 && ambiance.beat.playingKick) {
        console.log("stopKick");
        ambiance.beat.stopKick();

        if (melodyPlaying) {
            currentTheme.stopMelody();
            melodyPlaying = false;
        }

    } else if (time == 40) {
        if (basePlaying) {
            currentTheme.stopBase();
            basePlaying = false;
        }
    }
    setTimeout(decrescendo, 1000);
}

$(document).ready(function() {
    Tone.Buffer.on('load', function() {
        //Evenement Pose de pierre :
        document.querySelector('#addMove').addEventListener('mouseup', function(e) {
            console.log(data);
            //console.log(lastData);

            if (Tone.context.state !== 'running')
                Tone.context.resume();

            ////CODE INITIALISATION
            if (start == 0) {
                startTime = Tone.context.currentTime.toFixed(4);

                recorder.record(soundFile);

                //joueur1 choisit l'ambiance
                let horizontalPos = data["stonePosition"][0];

                if (horizontalPos <= 3)
                    ambiance = ambianceHarmony;

                else if (horizontalPos <= 9)
                    ambiance = ambiance1;

                else if (horizontalPos <= 15)
                    ambiance = ambianceHarmony;

                else if (horizontalPos <= 18)
                    ambiance = ambiance1;

                console.log("Selected ambiance", ambiance.nom);

                //ambiance = ambiance1;

                //ambiance = ambianceDub;
                //ambiance = ambianceHarmony;
                //1ers sons...
                updateMode(); //choix du mode, != si cornerMove

                decrescendo();

                init(); //initie la tonalité et les instruments en fonction des premiers coups des joueurs

                start = 1;
            }

            ////FIN INITIALISATION

            if (data["player"] != "Black") {
                improInstrument = ambiance.player1Instrument1;
            } else {

                improInstrument = ambiance.player2Instrument1;
            }



            if (ambiance == ambianceHarmony) {
                if (data["stoneOnBoard"] >= 2) { //20
                    //harmony.relativ = 1;

                    if (data["stoneOnBoard"] < 52) playSequence(2);
                    else if (data["stoneOnBoard"] < 72) playSequence(3);
                    else playSequence(4);

                    if (data["stoneOnBoard"] >= 62) {
                        if (data["stonesAround"] >= 1) harmony.addRightHand();
                        else harmony.endRightHand();
                    }
                }

                if (data["stoneOnBoard"] >= 2) {
                    let pos = data["stonePosition"];
                    if (pos[0] >= 9) {
                        if (pos[1] >= 9) {
                            startImpro(tonalite);
                        } else {
                            startImpro(tonalite, "minor")
                        }
                    } else {
                        if (pos[1] > 9) {
                            startImpro(tonalite, "indian");
                        } else {
                            startImpro(tonalite, "locrian");
                        }
                    }
                }
            }

            switch (data["stoneOnBoard"]) {
                case 1:
                    ambiance.beat.kickPattern = Beat.KickPatterns[Math.floor(Math.random() * 4)];
                    break;

                case 4:
                    switch (ambiance) {
                        case ambiance1:
                            currentTheme = ambiance.themeP1;
                            update();
                            break;

                        case ambianceHarmony:
                            //harmony.play();
                            break;

                        case ambianceDub:
                            bassLine = createBassLine(tonalite, 0);
                            startBass();
                            break;

                        default:
                            break;
                    }

                    ambiance.beat.hihatPattern = Beat.HihatPatterns[Math.floor(Math.random() * 4)];
                    break;

                case 5:
                    //startImpro(tonalite, "indian");
                    break;
                case 7:
                    ambiance.beat.kickPattern = Beat.KickPatterns[Math.floor(Math.random() * 7) + 4];
                    break;

                case 8:
                    switch (ambiance) {
                        case ambianceHarmony:
                            harmony.addRightHand();
                            break;

                        case ambianceDub:
                            console.log("bass 1");
                            bassLine.stop();
                            bassLine = createBassLine(tonalite, 1);
                            startBass();
                            break;
                    }
                    break;

                case 10:
                    ambiance.beat.snarePattern = Beat.SnarePatterns[Math.floor(Math.random() * 4)];

                case 12:
                    switch (ambiance) {
                        case ambianceHarmony:
                            harmony.addRightHand();
                            break;

                        case ambianceDub:
                            console.log("bass 2");
                            bassLine.stop();
                            bassLine = createBassLine(tonalite, 2);
                            startBass();
                            break;
                    }
                    break;

                case 14:
                    ambiance.beat.hihatPattern = Beat.HihatPatterns[Math.floor(Math.random() * 7) + 4];
                    break;

                case 16:
                    switch (ambiance) {
                        case ambianceHarmony:
                            harmony.addRightHand();
                            break;

                        case ambianceDub:
                            console.log("bass 3");
                            bassLine.stop();
                            bassLine = createBassLine(tonalite, 3);
                            startBass();
                            break;
                    }
                    break;

                case 17:
                    ambiance.beat.snarePattern = Beat.SnarePatterns[Math.floor(Math.random() * 7) + 4];
                    break;
            }

            // Start again beat pattern
            ambiance.beat.playKick(startTime);

            if (data["stoneOnBoard"] >= 4) {
                console.log("restart hihat");
                ambiance.beat.playHihat(startTime);

                switch (ambiance) {
                    case ambiance1:
                        if (!basePlaying) {
                            basePlaying = true;
                        }
                        break;

                    case ambianceHarmony:
                        break;

                    case ambianceDub:
                        break;

                    default:
                        break;
                }
            }
            if (data["stoneOnBoard"] >= 10) {
                console.log("restart snare");
                ambiance.beat.playSnare(startTime);

                switch (ambiance) {
                    case ambiance1:
                        if (!melodyPlaying) {
                            melodyPlaying = true;
                        }
                        break;

                    case ambianceHarmony:
                        break;

                    case ambianceDub:
                        break;

                    default:
                        break;
                }
            }

            //console.log(currentTheme.arpeggioNoteCount);


            //Tone.Transport.bpm.rampTo(360, 10);





            if (data["atariNumber"] > lastData["atariNumber"]) {
                if (harmony.relativ == 0) harmony.relativ = 1;
                else harmony.relativ = 0;
            }




            if (data["atariNumber"] > 1 && Tone.Transport.bpm <= (tempo * 120 / 100)) {
                Tone.Transport.bpm.rampTo(Math.floor(tempo * 120 / 100), 10);
            }



            if (data["blackCaptures"] > lastData["blackCaptures"]) {
                //console.log("blackCaptures")
                victoryMelody(ambiance.player1Instrument1, tonalite);
            }
            if (data["whiteCaptures"] > lastData["whiteCaptures"]) {
                //console.log("whiteCaptures")
                victoryMelody(ambiance.player2Instrument1, tonalite);
            }

            updateTempo();

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

        })
    });
})