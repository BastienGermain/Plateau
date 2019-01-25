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

  addPingPongDelay(delayTime = 0.25, feedBack = 0.2) 
  {
    this.appliedFXs.push({type : "pingPongDelay", fx : new Tone.PingPongDelay(delayTime, feedBack).toMaster()});
  }

  addFeedbackDelay(delayTime = 0.25, feedBack = 0.5)
  {
    this.appliedFXs.push({type : "feedbackDelay", fx : new Tone.FeedbackDelay(delayTime, feedBack).toMaster()});
  }

  addVibrato(frequency = 5, depth = 0.1)
  {
    this.appliedFXs.push({type : "vibrato", fx : new Tone.Vibrato(frequency, depth).toMaster()});
  }

  addDistorsion(distorsion = 0.4)
  {
    this.appliedFXs.push({type : "distorsion", fx : new Tone.Distorsion(distorsion).toMaster()});
  }

  addHighPassFilter(frequency = 1000 , rolloff = -12)
  {
    this.appliedFXs.push({type : "highPassFilter", fx : new Tone.Filter(frequency, "highpass", rolloff).toMaster()});
  }

  addLowPassFilter(frequency = 350 , rolloff = -12)
  {
    this.appliedFXs.push({type : "lowPassFilter", fx : new Tone.Filter(frequency, "lowpass", rolloff).toMaster()});
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
      try
      {
        switch(name) 
        {
          case 'chorus':
          this.addChorus(params.frequency, params.delayTime, params.depth);
          break;

          case 'reverb':
          this.addReverb(params.reverb);
          break;

          case 'tremolo':
          this.addTremolo(params.frequency, params.depth);
          break;

          case 'pitchShift':
          this.addPitchShift(params.pitch);
          break;

          case 'autoWah':
          this.addAutoWah(params.baseFrequency, params.octaves, params.sensitivity, params.Q, params.gain);
          break;

          case 'pingPongDelay':
          this.addPingPongDelay(params.delayTime, params.feedBack);
          break;

          case 'feedbackDelay':
          this.addFeedbackDelay(params.delayTime, params.feedBack);
          break;

          case 'vibrato':
          this.addVibrato(params.frequency, params.depth);
          break;

          case 'distorsion':
          this.addVibrato(params.distorsion);
          break;

          case 'highPassFilter':
          this.addHighPassFilter(params.frequency, params.rolloff);
          break;

          case 'lowPassFilter':
          this.addLowPassFilter(params.frequency, params.rolloff);
          break;

          default:
          break;
        }
      }
      catch(error)
      {
        console.log(error);
        console.log("EFFECT ADDED WITH DEFAULT PARAMETERS");

         switch(name) 
        {
          case 'chorus':
          this.addChorus();
          break;

          case 'reverb':
          this.addReverb();
          break;

          case 'tremolo':
          this.addTremolo();
          break;

          case 'pitchShift':
          this.addPitchShift();
          break;

          case 'autoWah':
          this.addAutoWah();
          break;

          case 'pingPongDelay':
          this.addPingPongDelay();
          break;

          case 'feedbackDelay':
          this.addFeedbackDelay();
          break;

          case 'vibrato':
          this.addVibrato();
          break;

          case 'distorsion':
          this.addVibrato();
          break;

          case 'highPassFilter':
          this.addHighPassFilter();
          break;

          case 'lowPassFilter':
          this.addLowPassFilter();
          break;
          
          default:
          break;
        }
      }
    }

    console.log(this.appliedFXs);
  }

}

FXRack.instances = 0;
FXRack.FXs = ["PICK AN EFFECT", "chorus", "reverb", "tremolo", "pitchShift", "autoWah"];