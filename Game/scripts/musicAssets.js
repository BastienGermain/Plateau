var freqIncrement = 1.05946;

var note = new Object();
note["A3"]=220;
note["A#3"]=note["A3"]*freqIncrement;
note["B3"]=note["A#3"]*freqIncrement;
note["C3"]=note["B3"]*freqIncrement;
note["C#3"]=note["C3"]*freqIncrement;
note["D3"]=note["C#3"]*freqIncrement;
note["D#3"]=note["D3"]*freqIncrement;
note["E3"]=note["D#3"]*freqIncrement;
note["F3"]=note["E3"]*freqIncrement;
note["F#3"]=note["F3"]*freqIncrement;
note["G3"]=note["F#3"]*freqIncrement;
note["G#3"]=note["G3"]*freqIncrement;
note["A4"]=note["G#3"]*freqIncrement;

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

function gammeMinor(tonale){
	var gamme = [tonale];
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; 
	gamme.push(tonale);
	tonale*=freqIncrement; tonale*=freqIncrement;  tonale*=freqIncrement;
	gamme.push(tonale);
	tonale*=freqIncrement; 
	gamme.push(tonale);
	return gamme;
}