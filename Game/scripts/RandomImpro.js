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

var gammeA4Major = gammeMajor(A4);
var gammeA3Major = gammeMajor(A4/2);
var gamme = gammeA3Major.concat(gammeA4Major);
//console.log(gamme.length)

var randIntArray = []
var nbNotes = 12;

for (let i=0; i<nbNotes; i++){
	if (Math.floor(Math.random()*2)==0){
		randIntArray.push((Math.floor(gaussianRandom())+8)%8); //random between -4 to 4 (center to 0); 
	}
	else{
		randIntArray.push(Math.floor(gaussianRandom())+4); //random center to 4;
	}
	//console.log(randIntArray[i]);
}


var epsilon = 0.05
var index;

