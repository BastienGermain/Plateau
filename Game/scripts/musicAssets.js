const freqIncrement = 1.05946;

const tempo = Tone.Transport.bpm;
const T = 60/tempo;

const nbMesure = 4;

const notes = new Object();
const notesNames = ["A3", "A#3", "B3", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A4"];

notes["A3"] = 220;

for(let i = 1; i < notesNames.length; ++i)
	notes[notesNames[i]] = notes[notesNames[i-1]] * freqIncrement;

function pythagoricienne(tonale){
	let gamme = [tonale]
	for (let i = 0; i<12; i++){
		gamme[i+1]=gamme[i]*freqIncrement;
	}
	return gamme
}

function gammeMajor(tonale){
	let pytha = pythagoricienne(tonale);
	let gamme = [pytha[0]];
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
	let pytha = pythagoricienne(tonale);
	let gamme = [pytha[0]];
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
