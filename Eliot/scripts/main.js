/* Main script */
/*
//set the transport to repeat
Tone.Transport.loopEnd = '1m' // 1 measure is the loop's length
Tone.Transport.loop = true

//start/stop the transport	
Tone.Transport.start();		
//Tone.Transport.stop()
*/

var tempo = 120
var T = 60/tempo

//samples
//1 mesure (1m) correspond à 2 temps (une demi-ronde --> 2n)
//1 noire --> 1/4 de ronde --> 4n
Tone.Transport.start()	//necessaire pour lire les samples

var kick = new Tone.MembraneSynth({
			"pitchDecay" : 0.1,
			"octaves" : 6,
			"oscillator" : {
				"type" : "square4"
			},
			"envelope" : {
				"attack" : 0.001,
				"decay" : 0.2,
				"sustain" : 0.2
			}
		}).toMaster()
var bass = new Tone.MembraneSynth().toMaster()
/*
var loop1 = new Tone.Loop(
	function(time){
		kick.triggerAttackRelease("C1", "8n", time);	//4e argument would be velocity
		kick.triggerAttackRelease("C1", "8n", time+1*T);
		kick.triggerAttackRelease("C1", "8n", time+2*T);
		kick.triggerAttackRelease("C1", "8n", time+3*T);
	}
	, 4*T)
//loop.start(0).stop('4m')     //defined length loop
loop1.start(0).end(Infinity);
*/

/*
var event1 = new Tone.Event(
	function(time){
		//kick.triggerAttackRelease("C1", "8n", time);	//4e argument would be velocity
		kick.triggerAttackRelease("C1", "8n", time+1*T);
		//kick.triggerAttackRelease("C1", "8n", time+2*T);
		//kick.triggerAttackRelease("C1", "8n", time+3*T);
	}
);
event1.loop = Infinity;
event1.start();


var event2 = new Tone.Event(
	function(time){
		bass.triggerAttackRelease("C1", "8n", time);	//4e argument would be velocity
		bass.triggerAttackRelease("C1", "8n", time+2*T);
		bass.triggerAttackRelease("C1", "8n", time+3*T);
	}
);
event2.loop = Infinity;
event2.start();*/

/*
var loop2 = new Tone.Loop(function(time){
	bass.triggerAttackRelease("C1", "8n", time)
	bass.triggerAttackRelease("C1", "8n", time+0.5)
}, "2n")
//loop.start(0).stop('4m')     //defined length loop
loop2.start()
*/






//composition automatique
var disto = new Tone.Distortion(0.4)
var synth = new Tone.Synth().chain(disto, Tone.Master)
synth.volume.value = 0.5

var A4 = 440
var currentNote = A4
//synth.triggerAttackRelease('A4', T/2, 0*T)
//synth.triggerAttackRelease(note, T/2, 1*T)

var freqIncrement = 1.05946;

function gammeMajor(tonale){
	var gamme = [tonale];
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; 
	gamme.push(tonale);
	return gamme;
}

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
	for ( var i = 0; i < array.length; i++ ) {
		new_array.push( ( array[i] - min ) / ( max - min ) );
	}
	return new_array;
}//transform an array --> contain values between 0 to 1

var gammeA4Major = gammeMajor(A4);
var gammeA3Major = gammeMajor(A4/2);
var gamme = gammeA3Major.concat(gammeA4Major);
console.log(gamme.length)

var randIntArray = []
for (var i=0; i<64; i++){
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
var time=0;
for (var i=0; i<randIntArray.length; i++){
	if (Math.floor(Math.random()*2)==0){
		index = randIntArray[i];
	}
	else{
		index = randIntArray[i]+8;
	}
	var rand=Math.floor(Math.random()*3);
	if (rand==0){	//1 chance sur 2 on joue une noire
		synth.triggerAttackRelease(gamme[index], 2*T-epsilon, time);
		time+=2*T;
	}
	else{if (rand==1){	//1 chance sur 2 on joue une noire
		synth.triggerAttackRelease(gamme[index], T-epsilon, time);
		time+=T;
	}
	else{	//1 fois sur 2 on joue 2 croches
		synth.triggerAttackRelease(gamme[index], T/2-epsilon, time);
		time+=T/2;
		if (Math.floor(Math.random()*3)==0){
			index = randIntArray[i];
		}
		else{
			index = randIntArray[i]+8;
		}
		synth.triggerAttackRelease(gamme[index], T/2-epsilon, time);
		time+=T/2;
	}
	}

}
