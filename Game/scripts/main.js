/*
* Main file to link tone.js and game data
* Use getData() to retrieve data object
* See data structure in dataProcess.js
*/

data = getData();

function printData() {
    console.log(data);
}

// ***  Exemple using tone  *** /

var synth = new Tone.Synth().toMaster();

//set the transport to repeat
Tone.Transport.loopEnd = '1m'; // 1 measure is the loop's length
Tone.Transport.loop = true;

//start/stop the transport
Tone.Transport.start();
//Tone.Transport.stop()

function playSound() {
    if (data["lastPlayer"] == "Black") {
        synth.triggerAttackRelease('C3', '4n');
    } else {
        synth.triggerAttackRelease('C4', '4n');
    }
}
