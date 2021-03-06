var soundFile = new p5.SoundFile();
var recorder = new p5.SoundRecorder();
recorder.setInput(Tone.Master);

var start = 0;
var startTime = null;


Tone.Transport.bpm.value = 80;
Tone.Master.volume.value = 0;

Tone.Transport.start()

//////////////////////////////////////
var lastData;

var beat1 = new Beat(1);
var beat2 = new Beat(2);

const theme = new Theme(3, 'guitar-acoustic', 'piano')

let melodyPlaying = false
let basePlaying = false

var tenLastMoveTimes = new Array();

function saveMusic() {
    if (recorder) {
        recorder.stop(); // stop recorder, and send the result to soundFile
        p5.prototype.saveSound(soundFile, 'goMusic.wav'); // save file
    }
}

var minTimeAverage = 4
var maxTimeAverage = 3

function updateTempo() {
    console.log(tenLastMoveTimes)
    var average = 0.0
    tenLastMoveTimes.forEach(x => average += parseFloat(x))
    average /= 10
    if (average < minTimeAverage) {
        minTimeAverage = average
    }
    else if (average > maxTimeAverage) {
        maxTimeAverage = average
    }
    console.log(minTimeAverage + "   " + maxTimeAverage)
    console.log(average)

    //tempo entre 80 et 160
    let tempo = Math.round(120 + 120 * (average - minTimeAverage ) / maxTimeAverage / (1 - minTimeAverage / maxTimeAverage))

    Tone.Transport.bpm.rampTo(tempo, 5)
    console.log("tempo : " + tempo)
}


$(document).ready(function() {
    Tone.Buffer.on('load', function() {
        //Evenement Pose de pierre :
        document.querySelector('#addMove').addEventListener('mouseup', function(e) {

            if (Tone.context.state !== 'running')
                Tone.context.resume()

            ////CODE INITIALISATION

            if (start == 0) {
                startTime = Tone.context.currentTime.toFixed(4)
                recorder.record(soundFile)
                init(theme) //initie la tonalité et les instruments en fonction des premiers coups des joueurs
                theme.init()
                theme.startBase(startTime)
                basePlaying = true
                start = 1
            }

            if (data.stoneOnBoard == 4){
                if (data.totalKnownMoves >= 1){
                    theme.pickClassicMode();
                } else {
                    theme.pickStrangeMode();
                }
                console.log(theme.mode)
            }

            ////FIN INITIALISATION

            if (data.stoneOnBoard <= 10) {
                tenLastMoveTimes.push(data.moveTime)
            }
            else if (tenLastMoveTimes.length == 10) {
                tenLastMoveTimes.shift()
                tenLastMoveTimes.push(data.moveTime)
                updateTempo();
            }

            if (!melodyPlaying && data['stonesConnectionNumber'] > 0) {
                theme.startMelody()
                melodyPlaying = true
            }

    		    //PERCU
            switch(Math.trunc(3*Math.abs(data.globalInterpretation[0]))) {
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
                if (data.player == "Black") {
                    if (beat2.kickLoop !== null) {
                        beat2.stopKick()
                    }
                    beat1.playKick()
                } else {
                    beat1.stopKick()
                    beat2.playKick()
                }
            }

            if (data['stoneOnBoard'] >= 30) {
                if (data.player == "Black") {
                    if (beat2.snareLoop !== null) {
                        beat2.stopSnare()
                    }
                    beat1.playSnare()
                } else{
                    if (beat1.snareLoop !== null){
                        beat1.stopSnare()
                    }
                    beat2.playSnare()
                }
            }

            if (data['stoneOnBoard'] >= 45) {
                if (data.player == "Black") {
                    if (beat2.hihatLoop !== null) {
                        beat2.stopHihat()
                    }
                    beat1.playHihat()
                } else{
                    beat1.stopHihat()
                    beat2.playHihat()
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
            
            if (data.player === 'Black') {
                theme.bass.setpPan(0.70)
                theme.lead.setpPan(0.80)
            } else {
                theme.bass.setpPan(-0.70)
                theme.lead.setpPan(-0.80)
            }

            console.log('pan : ', theme.bass.pan.pan.value)
            console.log('pierres connectées (reset à 15)  :', data['stonesConnectionNumber'] % 15)

            if (data['atariNumber'] !== lastAtariNumber && melodyPlaying) {
                lastAtariNumber++
                theme.updateLeadIntervals()
            }

            if ((data['stonesConnectionNumber'] % 15) === 0 && melodyPlaying) {
                theme.updateLeadDurations()
            }

        })
    })
})