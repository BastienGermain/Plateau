//composition automatique
var disto = new Tone.Distortion(0.4)
var synth = new Tone.Synth().chain(disto, Tone.Master)
synth.volume.value = 0.5;

var A4 = 440
var currentNote = A4
//improInstrument.play('A4', T/2, 0*T)
//improInstrument.play(note, T/2, 1*T)

Tone.Transport.bpm.value = 120;
Tone.Transport.start();


var improInstrument = new InstrumentSampler("violin");
improInstrument.sampler.value -= 9;

var stopImpro=0;

function gaussianRandom() {
    var r1, r2, w, X1, X2;
    do {
        r1 = 2 * Math.random() - 1;
        r2 = 2 * Math.random() - 1;
        w = r1 * r1 + r2 * r2;
    } while ( w >= 1 );
    w = Math.sqrt( ( -2 * Math.log( w ) ) / w );
    X1 = r1 * w;
    X2 = r2 * w;
    return X1;
}	//gaussian distrib betweeen -4 to 4

function normalize( array ) {
    var min = Math.min.apply( null, array ),
    max = Math.max.apply( null, array );
	var boundary = Math.max(-min, max);
	min = -boundary;
	max = boundary;
	var new_array = [];
	for ( let i = 0; i < array.length; i++ ) {
		new_array.push( ( array[i] - min ) / ( max - min ) );
	}
	return new_array;
}//transform an array --> contain values between 0 to 1

var gammeImproA4Major = gammeMajor("A4");
var gammeImproA3Major = gammeMajor("A3");
var gammeImpro;// = gammeImproA3Major.concat(gammeImproA4Major);
//var gammeImpro = gammeImproMinor("A3")



var epsilon = 0.05;


function impro(){
	
	let gaussianIndex;
	if (Math.floor(Math.random()*2)==0){
		gaussianIndex = (Math.floor(gaussianRandom())+8)%8; //random between -4 to 4 (center to 0); 
	}
	else{
		gaussianIndex = Math.floor(gaussianRandom())+4; //random center to 4;
	}
	if (Math.floor(Math.random()*2)==0){
		gaussianIndex+=8;
	}
	let rand=Math.floor(Math.random()*3);
	if (rand==0){	//1 chance sur 3 on joue une blanche
		//console.log(gaussianIndex);
		let blanche = new Tone.Event(
			function(time){
				improInstrument.play(Tone.Frequency(gammeImpro[gaussianIndex]).toNote(), "2n", time);
			}
		);
		blanche.start();
		if (!stopImpro) window.setTimeout(impro, Tone.Time("2n").toMilliseconds());
	}
	else{

		if (rand==1){	//1 chance sur 3 on joue une noire
			//console.log("noire");
			let noire = new Tone.Event(
				function(time){
					improInstrument.play(Tone.Frequency(gammeImpro[gaussianIndex]).toNote(), "4n", time);
				}
			);
			noire.start();
		}
		else if (rand==2){	
			//console.log("2 croches");
			let croches = new Tone.Event(
				function(time){
					improInstrument.play(Tone.Frequency(gammeImpro[gaussianIndex]).toNote(), "8n", time);
					if (Math.floor(Math.random()*2)==0){
						gaussianIndex = (Math.floor(gaussianRandom())+8)%8; //random between -4 to 4 (center to 0); 
					}
					else{
						gaussianIndex = Math.floor(gaussianRandom())+4; //random center to 4;
					}
					improInstrument.play(Tone.Frequency(gammeImpro[gaussianIndex]).toNote(), "8n", time+Tone.Time("8n").toSeconds());
				}
			);
			croches.start();
		}

		//else if (rand ==3){}
		if (!stopImpro) window.setTimeout(impro, Tone.Time("4n").toMilliseconds());
	}
}


async function startImpro(tonalite, mode = "major", silences = false){
	await waitForRightTime(); 

	//improInstrument = ambiance.player1Instrument1;
	stopImpro = false;
	if (mode == "minor"){
		let gam1 = gammeMinorHarmonique(Tone.Frequency(tonalite).toNote());
		let gam2 = gammeMinorHarmonique(Tone.Frequency(Tone.Frequency(tonalite).toFrequency()*2).toNote());
		if (silences) gam2 = gammeMajor("");
		gammeImpro = gam1.concat(gam2);
	}
	else if (mode == "indian"){
		console.log("indian mode")
		let gam1 =indianRast(Tone.Frequency(tonalite).toNote());
		let gam2 = indianRast(Tone.Frequency(Tone.Frequency(tonalite).toFrequency()*2).toNote());
		if (silences) gam2 = gammeMajor("");
		gammeImpro = gam1.concat(gam2);
	}
	else{
		let gam1 = gammeMajor(Tone.Frequency(tonalite).toNote());
		let gam2 = gammeMajor(Tone.Frequency(Tone.Frequency(tonalite).toFrequency()*2).toNote());
		if (silences) gam2 = gammeMajor("");
		gammeImpro = gam1.concat(gam2);
	}
	
	
	console.log(gammeImpro);
	impro();
}

async function endImpro(){
	await waitForRightTime();
	stopImpro = true;
}

