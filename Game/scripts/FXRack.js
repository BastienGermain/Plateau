class FXRack 
{ 
	constructor() 
	{
    this.id = FXRack.instances++;
    this.appliedFXs = [];
  }

  // FX adders ///////////////////////////////////////////////////////////////////
  
  addChorus(frequency = 1.5, delayTime = 3.5, depth = 0.7)
  {
    this.appliedFXs.push({type : "chorus", fx : new Tone.Chorus(frequency, delayTime, depth).toMaster()});
  }

  addReverb(roomSize = 0.5)
  {
    this.appliedFXs.push({type : "reverb", fx : new Tone.JCReverb(roomSize).toMaster()});
  }

  addTremolo(frequency = 10, depth = 0.5)
  {
    this.appliedFXs.push({type : "tremolo", fx : new Tone.Tremolo(frequency, depth).toMaster().start()});
  }

  addPitchShift(pitch = 0) 
  {
    this.appliedFXs.push({type : "pitchShift", fx : new Tone.PitchShift(pitch).toMaster()});
  }

  addAutoWah(baseFrequency = 100, octaves = 6, sensitivity = 0, Q = 2, gain = 2) 
  {
    this.appliedFXs.push({type : "autoWah", fx : new Tone.AutoWah(baseFrequency, octaves, sensitivity).toMaster()});
    this.appliedFXs[this.appliedFXs.length].Q = Q;
    this.appliedFXs[this.appliedFXs.length].gain = gain;
  }

  //////////////////////////////////////////////////////////////////////////////
  
  static applyFX(instrument, fx) 
  {
    if (instrument && fx.fx) 
      return instrument.connect(fx.fx);
    else 
    { 
      console.log("### ERROR WHILE LOADING EFFECT IN EffectRack.js ###");
      console.log("$/");
      console.log("Details : ");
      console.log(" Instrument : " + instrument);
      console.log(" Effect : " + fx.type);
      console.log("$/");
    }
  }

  applyFXs(instrument)
  {	
  	let FXInstrument = instrument;

    this.appliedFXs.forEach(function(element) 
    {
      FXInstrument = FXRack.applyFX(FXInstrument, element);
    })

    return FXInstrument;
  }

  selectFX(name, params)
  {
    if (!this.appliedFXs.find(fx => fx.type == name))
    {
      switch(name) 
      {
        case 'chorus':
        this.addChorus(4, 2.5, 0.5);
        break;

        case 'reverb':
        this.addReverb(params.reverb);
        break;

        case 'tremolo':
        this.addTremolo(9, 0.75);
        break;

        case 'pitchShift':
        this.addPitchShift(params.pitch);
        break;

        case 'autoWah':
        this.addAutoWah(100, 2, -40, 5);
        break;

        default:
        break;
      }
    }
  }

}

FXRack.instances = 0;
FXRack.FXs = ["PICK AN EFFECT", "chorus", "reverb", "tremolo", "pitchShift", "autoWah"];