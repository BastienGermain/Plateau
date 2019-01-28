const freqIncrement = 1.05946;


const notes = new Object();
const notesNames = ["A2", "A#2", "B2", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A3", "A#3", "B3", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A4"];

notes["A2"] = 110;

for(let i = 1; i < notesNames.length; ++i)
	notes[notesNames[i]] = notes[notesNames[i-1]] * freqIncrement;

function pythagoricienne(tonale){
	let gamme = [notes[tonale]]
	for (let i = 0; i<12; i++){
		gamme[i+1]=gamme[i]*freqIncrement;
	}
	return gamme;
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

function minorRelative(tonale){
	//console.log(Tone.Frequency(notes[tonale]/freqIncrement/freqIncrement/freqIncrement).toNote());
	return gammeMinor(Tone.Frequency(notes[tonale]/freqIncrement/freqIncrement/freqIncrement).toNote());
}

function majorRelative(tonale){
	return gammeMajor(Tone.Frequency(notes[tonale]*freqIncrement*freqIncrement*freqIncrement).toNote());
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));  //getRadomInt(3) return 0 1 or 2
}

// getRandomInt(1, 5) returns a random number between 1 et 5
function getRandomIntBetween(start, end) 
{
	let numbers = [];

	for (var i = start; i <= end; i++)
		numbers.push(i);

	return numbers[getRandomInt(numbers.length)];
}


function waitForRightTime() 
{
  return new Promise(resolve => 
  {
    function check() 
    {

      if (Math.round(Tone.context.currentTime.toFixed(2)*60*100) % Math.round(Tone.Transport.bpm.value*100)  == 0.00) 
      {
        console.log('right time to update sound !');
        console.log(Tone.context.currentTime.toFixed(2)*60);
        resolve();
      } 
      else 
        window.setTimeout(check, 10);
    }
    check();
  });
}
