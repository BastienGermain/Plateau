class Beat {

	// selected pattern [kickPatternIndex, snarePatternIndex, hihatPatternIndex]
	constructor(drum, ambiance = "")
	{	
		this.drum = new InstrumentSampler('drum');
		this.drum.sampler.volume.value = -9;

		this.kickSubdivisions = 32;
		this.hihatSubdivisions = 32;
		this.snareSubdivisions = 32;

		this.kickPattern = [];
		this.hihatPattern = [];
		this.snarePattern = [];

		this.instancePatterns(ambiance);

		this.kickIndex = 0;
		this.snareIndex = 0;
		this.hihatIndex = 0;

		this.kickNote = "C0";
		this.snareNote = "C#0";
		this.hihatNote = "D0";

		this.kick = null;
		this.hihat = null;
		this.snare = null;

		this.playing = false;
	}

	instancePatterns(ambiance) 
	{
		if(ambiance=="techno")
		{			
			this.kickPattern = Beat.KickTechnoPatterns[3];
    		this.snarePattern = Beat.SnareTechnoPatterns[2];
  		  	this.hihatPattern = Beat.HihatTechnoPatterns[1];
		}
		else if(ambiance=="dub")
		{
			this.kickPattern = Beat.KickDubPatterns[1];
    		this.snarePattern = Beat.SnareDubPatterns[0];
  		  	this.hihatPattern = Beat.HihatDubPatterns[0];
		}
		else
		{
    		this.kickPattern = Beat.KickPatterns[(Math.round(Math.random() * 10)) % Beat.KickPatterns.length];
    		this.snarePattern = Beat.SnarePatterns[(Math.round(Math.random() * 10)) % Beat.SnarePatterns.length];
  		  	this.hihatPattern = Beat.HihatPatterns[(Math.round(Math.random() * 10)) % Beat.HihatPatterns.length];
		}
	}

	createKick() 
	{	
		let _this = this;

		let kick =  new Tone.Event(
			function(time)
			{	
				if (_this.kickPattern.charAt(_this.kickIndex % _this.kickSubdivisions) === "x")
				{
					_this.drum.play(_this.kickNote, 0.25, time);
				}
				_this.kickIndex++;
			});

		kick.loop = Infinity;
		kick.loopEnd = "8n";
		kick.playbackRate = 1;

		return kick;
	}

	createSnare() 
	{	
		let _this = this;

		let snare =  new Tone.Event(
			function(time)
			{	
				if (_this.snarePattern.charAt(_this.snareIndex % _this.snareSubdivisions) === "x")
					_this.drum.play(_this.snareNote, 0.25, time);
				_this.snareIndex++;
			});

		snare.loop = Infinity;
		snare.loopEnd = "8n";
		snare.playbackRate = 1;
		return snare;
	}

	createHihat() 
	{	
		let _this = this;

		let hihat =  new Tone.Event(
			function(time)
			{	
				if (_this.hihatPattern.charAt(_this.hihatIndex % _this.hihatSubdivisions) === "x")
					_this.drum.play(_this.hihatNote, 0.25, time, 0.1);
				_this.hihatIndex++;
			});

		hihat.loop = Infinity;
		hihat.loopEnd = "8n";
		hihat.playbackRate = 1;
		return hihat;
	}
 
	async play(startTime)
	{
		await waitForRightTime();

		if (!this.playing){
			this.playing = true;
			this.kick = this.createKick().start(startTime);
			this.snare = this.createSnare().start(startTime);
			this.hihat = this.createHihat().start(startTime);
		}
	}

	stop(){
		this.kick.stop();
		this.snare.stop();
		this.hihat.stop();

		this.playing = false;
	}

	//pas fonctionnel
	rate(){
		this.kick = this.createKick().playbackRate(2)
		this.snare = this.createSnare().playbackRate(2)
		this.hihat = this.createHihat().playbackRate(2)

		this.kick.start(startTime);
		this.snare.start(startTime);
		this.hihat.start(startTime);
	}
}

/*
["-", "-", "-", "|", "-", "-", "-", "|", "-", "-", "-", "|", "-", "-", "-", "|"],
*/

Beat.KickPatterns = 
[
"---x---x---x---x---x---x---x---x",

"x-----x---------x-----x---x--x--",
"x---------x-----x---------x-----",
"x-------x-------x--------x------",
"x------x--x-----x-x---x---x-----",
"x------x--x-----x------x--x-----",
"x---------x-------x-------x-----",
"x---------x-------x----x--x-----",
"x---x-----x----x------x---x-----",
"x-----x---x-------x-----x-------",
"x-----x---------x-----x---x--x--",
"x--x---x-xx----xx-x----xxxx-----",
"x------x-x-x---xx----------x----",
];

Beat.SnarePatterns = 
[
"-------x-------x-------x-------x",
"----x-------x-------x-------x---",
"---x--------x-------x-------x---",
"----x----x----x-------x--x--x---",
"----x---------x-----x-------x---",
"--------x-----x-----x-------x---",
"--x-x---x--xx-xx----x-x---x-x---"
];

Beat.HihatPatterns = 
[
"xxxxxxxxxxxxxxxx",
"x-x-x-xxxxx-x-x-x-x-x-xxxxx-x-x-",
"x-x-x-x-xxx-x-x-x-x-x-xxx-x---x-",
"--x---x---x---x---x---x---x---x-",
"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-",
"x-x-x-xxx-x-x-x-x-x-x-x-x-x-x-x-",
"x-x-x-xxxxx-x-x-x-x-x-xxxxx-x-x-",
"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-xx"
];


//TECHNO PATTERNS
Beat.KickTechnoPatterns = 
[
"x---------x-----x---------x-----",
"x---------x-----x---------x---x-",
"x-------x-x-----x-------x-x-----",
"x---x---x---x---x---x---x---x---"
];

Beat.SnareTechnoPatterns = 
[
"----x-------x-------x-------x---",
"--x---x---x---x---x---x---x---x-",
"--x---x---x-x-x---x---x---x-x---",


];

Beat.HihatTechnoPatterns = 
[
"x-x-x-xxx-x-x-x-x-x-x-x-x-x-x-x-",
"x-x-x-xxx-x-x-x-x-x-x-xxx-x-x-x-"
];



//DUB PATTERNS
Beat.KickDubPatterns = 
[
"x---x---x---x---x---x---x---x---",
"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-"
];

Beat.SnareDubPatterns = 
[
"----x-------x-------x-------x---",
"----x-------x-------x-------x---"

];

Beat.HihatDubPatterns = 
[
"",
];

