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

var whitePlayerFeature = new PlayerFeature();
var blackPlayerFeature = new PlayerFeature();


//////////////////////////////////////

var currentTheme = null;

var melodyPlaying = false;
var basePlaying = false;

NProgress.start();

function saveMusic() {
    if (recorder) {
        recorder.stop(); // stop recorder, and send the result to soundFile
        p5.prototype.saveSound(lastSoundFile, 'goMusic.wav'); // save file
    }
}


window.onload = function() {
        Tone.Buffer.on('load', function() {
                NProgress.done();
                let content = document.getElementById("content");
                content.classList.remove("loading");

                //Evenement Pose de pierre :
                $("#board canvas").on('click', function(coord) {
                        //console.log(data);
                        //console.log(lastData);

                        if (Tone.context.state !== 'running')
                            Tone.context.resume();

                        ////CODE INITIALISATION
                        if (start == 0) {
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

                            //ambiance = ambianceDub;
                            //ambiance = ambianceHarmony;
                            //1ers sons...
                            updateMode(); //choix du mode, != si cornerMove

                            //Random Simple Kick
                            start = 1;
                        }
    					

                            init(); //initie la tonalité et les instruments en fonction des premiers coups des joueurs
                            ////FIN INITIALISATION

							if (data["player"] != "Black") {
                                
                                improInstrument = ambiance.player1Instrument1;
                                  

                                } else {
                                	
                                	improInstrument = ambiance.player2Instrument1;
                                   
                                }


                            if (data["stoneOnBoard"] >= 4) {
                            	if (ambiance == ambianceHarmony)
                            	{
                            		let pos = data["stonePosition"];
                            		if (pos[0]>9){
                            			if (pos[1]>9){
                            				startImpro(tonalite);
                            			}
                            			else{
                            				startImpro(tonalite, "minor")
                            			}
                            		}
                            		else{
                            			if (pos[1]>9){
                            				startImpro(tonalite, "indian");
                            			}
                            			else{
                            				startImpro(tonalite, "locrian");
                            			}
                            		}
                            	}
                            }

                            switch (data["stoneOnBoard"]) {
                                case 1:
                                    ambiance.beat.kickPattern = Beat.KickPatterns[Math.floor(Math.random() * 4)];
                                    ambiance.beat.playKick(startTime);
                                    break;

                             	case 4:
                                    switch (ambiance) {
                                        case ambiance1:
                                            currentTheme = ambiance.themeP1;
                                            ambiance.themeP1.startBase(startTime);
                                            basePlaying = true;
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
                                    ambiance.beat.playHihat(startTime);
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
                                    ambiance.beat.playSnare(startTime);

                                    switch (ambiance) {
                                        case ambiance1:
                                            currentTheme.startMelody(startTime);
                                    		melodyPlaying = true;
                                            break;
                                    }
                                    break;

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


                            //console.log(currentTheme.arpeggioNoteCount);


                            //Tone.Transport.bpm.rampTo(360, 10);


                            //REGLES AMBIANCE1
                            if (ambiance == ambiance1) {
                                if (data["stoneOnBoard"] >= 10) {
                                    
                                }
                            }


                                //ICI NOTIFICATION DES CHGTS DE DATA
                                //valable pour toutes les ambiancesg

                                
                                if (data["player"] != "Black") {
                                	//startImpro(tonalite, "major");
                                	
                                    improInstrument = ambiance.player1Instrument1;
                                    rightHarmonyInstrument = ambianceHarmony.player1Instrument1;
                                    leftHarmonyInstrument = ambianceHarmony.player1Instrument1;
                                    bass = ambianceDub.player1Instrument2;
                                    

                                } else {
                                	//startImpro(tonalite, "indian");

                                	
                                	improInstrument = ambiance.player2Instrument1;
                                    rightHarmonyInstrument = ambiance.player2Instrument1;
                                    leftHarmonyInstrument = ambiance.player2Instrument1;
                                    bass = ambiance.player2Instrument2;
									
                                }



                            if (data["atariNumber"] > 1) {
                                Tone.Transport.bpm.rampTo(Floor(Tone.Transport.bpm * 120 / 100), 10);
                            }
                            else{

                            }


                            if (data["blackCaptures"] > lastData["blackCaptures"]) {
                                //console.log("blackCaptures")
                                victoryMelody(ambiance.player1Instrument1, tonalite);
                            }
                            if (data["whiteCaptures"] > lastData["whiteCaptures"]) {
                                //console.log("whiteCaptures")
                                victoryMelody(ambiance.player2Instrument1, tonalite);
                            }

                            //REGLES AMBIANCE HARMONY


                            //REGLES AMBIANCEDUB
                            if (ambiance == ambianceDub) {

                            }


                            //REGLES AMBIANCEDRUM
                            if (ambiance == ambianceDrum) {
                                if (data["player"] == "Black") {
                                    //ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[0];
                                } else {
                                    //ambianceDrum.beat.hihatPattern=Beat.HihatTechnoPatterns[1];
                                }

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
        }
