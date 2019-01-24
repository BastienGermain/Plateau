class Beat {

	// selected pattern [kickPatternIndex, snarePatternIndex, hihatPatternIndex]
	constructor(ambiance = "")
	{	
		this.kick = new InstrumentSampler('kick');
		this.snare = new InstrumentSampler('snare');
		this.hihat = new InstrumentSampler('hihat');
		
		this.kick.sampler.volume.value = -9;
		this.snare.sampler.volume.value = -9;
		this.hihat.sampler.volume.value = -9;

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
		this.snareNote = "C0";
		this.hihatNote = "C0";

		this.kickLoop = null;
		this.hihatLoop = null;
		this.snareLoop = null;

		this.playing = false;
	}

	instancePatterns(ambiance) 
	{
		if(ambiance=="techno")
		{			
			this.kickPattern = Beat.KickTechnoPatterns[0];
    		this.snarePattern = Beat.SnareTechnoPatterns[0];
  		  	this.hihatPattern = Beat.HihatTechnoPatterns[0];
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

		let kickLoop =  new Tone.Event(
			function(time)
			{	
				if (_this.kickPattern.charAt(_this.kickIndex % _this.kickSubdivisions) === "x")
				{
					_this.kick.play(_this.kickNote, 0.25, time);
				}
				_this.kickIndex++;
			});

		kickLoop.loop = Infinity;
		kickLoop.loopEnd = "8n";
		kickLoop.playbackRate = 1;

		return kickLoop;
	}

	createSnare() 
	{	
		let _this = this;

		let snareLoop =  new Tone.Event(
			function(time)
			{	
				if (_this.snarePattern.charAt(_this.snareIndex % _this.snareSubdivisions) === "x")
					_this.snare.play(_this.snareNote, 0.25, time);
				_this.snareIndex++;
			});

		snareLoop.loop = Infinity;
		snareLoop.loopEnd = "8n";
		snareLoop.playbackRate = 1;
		return snareLoop;
	}

	createHihat() 
	{	
		let _this = this;

		let hihatLoop =  new Tone.Event(
			function(time)
			{	
				if (_this.hihatPattern.charAt(_this.hihatIndex % _this.hihatSubdivisions) === "x")
					_this.hihat.play(_this.hihatNote, 0.25, time, 0.1);
				_this.hihatIndex++;
			});

		hihatLoop.loop = Infinity;
		hihatLoop.loopEnd = "8n";
		hihatLoop.playbackRate = 1;
		return hihatLoop;
	}
 
	async play(startTime)
	{
		await waitForRightTime();

		if (!this.playing){
			this.playing = true;
			this.kickLoop = this.createKick().start(startTime);
			this.snareLoop = this.createSnare().start(startTime);
			this.hihatLoop = this.createHihat().start(startTime);
		}
	}

	stop(){
		this.kickLoop.stop();
		this.snareLoop.stop();
		this.hihatLoop.stop();

		this.playing = false;
	}

	//pas fonctionnel
	rate(){
		this.kickLoop = this.createKick().playbackRate(2)
		this.snareLoop = this.createSnare().playbackRate(2)
		this.hihatLoop = this.createHihat().playbackRate(2)

		this.kickLoop.start(startTime);
		this.snareLoop.start(startTime);
		this.hihatLoop.start(startTime);
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

