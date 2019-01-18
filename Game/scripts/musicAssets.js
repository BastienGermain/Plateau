var freqIncrement = 1.05946;

var tempo = 120;
var T = 60/tempo;
var nbMesure = 4;

var notes = new Object();
notes["A3"]=220;
notes["A#3"]=notes["A3"]*freqIncrement;
notes["B3"]=notes["A#3"]*freqIncrement;
notes["C3"]=notes["B3"]*freqIncrement;
notes["C#3"]=notes["C3"]*freqIncrement;
notes["D3"]=notes["C#3"]*freqIncrement;
notes["D#3"]=notes["D3"]*freqIncrement;
notes["E3"]=notes["D#3"]*freqIncrement;
notes["F3"]=notes["E3"]*freqIncrement;
notes["F#3"]=notes["F3"]*freqIncrement;
notes["G3"]=notes["F#3"]*freqIncrement;
notes["G#3"]=notes["G3"]*freqIncrement;
notes["A4"]=notes["G#3"]*freqIncrement;

function pythagoricienne(tonale){
	var gamme = [tonale]
	for (var i=0; i<12; i++){
		gamme[i+1]=gamme[i]*freqIncrement;
	}
	return gamme
}

function gammeMajor(tonale){
	var pytha = pythagoricienne(tonale);
	var gamme = [pytha[0]];
	gamme.push(pytha[2]);
	gamme.push(pytha[4]);
	gamme.push(pytha[5]);
	gamme.push(pytha[7]);
	gamme.push(pytha[9]);
	gamme.push(pytha[11]);
	gamme.push(pytha[12]);
	return gamme;
}

function gammeMinor(tonale){
	var pytha = pythagoricienne(tonale);
	var gamme = [pytha[0]];
	gamme.push(pytha[2]);
	gamme.push(pytha[3]);
	gamme.push(pytha[5]);
	gamme.push(pytha[7]);
	gamme.push(pytha[8]);
	gamme.push(pytha[10]);
	gamme.push(pytha[12]);
	return gamme;
}

function minorRelative(gamme){
	return gammeMinor(gamme[0]/freqIncrement/freqIncrement/freqIncrement);
}

function majorRelative(gamme){
	return gammeMajor(gamme[0]*freqIncrement*freqIncrement*freqIncrement);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));  //getRadomInt(3) return 0 1 or 2
}
