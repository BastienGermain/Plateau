class Beat {

	constructor(ambiance = "")
	{
		this.kick = new InstrumentSampler('kick');
		this.snare = new InstrumentSampler('snare');
		this.hihat = new InstrumentSampler('hihat');

		this.kick.sampler.volume.value = 3;
		this.snare.sampler.volume.value = 1;
		this.hihat.sampler.volume.value = 6;

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

		this.playingKick = false;
		this.playingSnare = false;
		this.playingHihat = false;
	}

/// PATTERN BUILDER ////////////////////////////////////////////////////////////

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
    		this.kickPattern = Beat.KickPatterns[(Math.floor(Math.random() *Beat.KickPatterns.length))];
    		this.snarePattern = Beat.SnarePatterns[(Math.floor(Math.random() *Beat.SnarePatterns.length))];
  		  	this.hihatPattern = Beat.HihatPatterns[(Math.floor(Math.random() *Beat.HihatPatterns.length))];
		}
	}

/// LOOP CREATORS ///////////////////////////////////////////////////////////////

	createKick()
	{
		let _this = this;

		let kickLoop =  new Tone.Event(
			function(time)
			{
				if (_this.kickPattern.charAt(_this.kickIndex) === "x")
				{
					_this.kick.play(_this.kickNote, 0.25, time);
				}
				_this.kickIndex = (_this.kickIndex + 1) % _this.kickSubdivisions;
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
				if (_this.snarePattern.charAt(_this.snareIndex) === "x")
					_this.snare.play(_this.snareNote, 0.25, time);

				_this.snareIndex = (_this.snareIndex + 1) % _this.kickSubdivisions;
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
				if (_this.hihatPattern.charAt(_this.hihatIndex) === "x")
					_this.hihat.play(_this.hihatNote, 0.25, time, 0.6);
				_this.hihatIndex = (_this.hihatIndex + 1) % _this.kickSubdivisions;
			});

		hihatLoop.loop = Infinity;
		hihatLoop.loopEnd = "8n";
		hihatLoop.playbackRate = 1;
		return hihatLoop;
	}

/// PLAY FUNCTIONS //////////////////////////////////////////////////////////////

	playKick(startTime = 0)
	{
		//await waitForRightTime();

		if (!this.playingKick)
		{
			this.playingKick = true;
			this.kickLoop = this.createKick().start(startTime);
		}
	}

	playSnare(startTime = 0)
	{
		//waitForRightTime();

		if (!this.playingSnare)
		{
			this.playingSnare = true;
			this.snareLoop = this.createSnare().start(startTime);
		}
	}

	playHihat(startTime = 0)
	{
		//await waitForRightTime();

		if (!this.playingHihat){
			this.playingHihat = true;
			this.hihatLoop = this.createHihat().start(startTime);
		}
	}

/// STOP FUNCTIONS //////////////////////////////////////////////////////////////

	stopKick(){
		this.kickLoop.stop();
		this.playingKick = false;
	}

	stopSnare(){
		this.snareLoop.stop();
		this.playingSnare = false;
	}

	stopHihat(){
		this.hihatLoop.stop();
		this.playingHihath = false;
	}
/////////////////////////////////////////////////////////////////////////////////

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
// Minimalist
"x---------------x---------------",
"x-------x-------x-------x-------",
"x---------x-----x---------x-----",
"x---------x-------x-------x-----",
"x---------x-------x----x--x-----",
"x-----x-x-------x-------x-------",
"x---x---x---x---x---x---x---x---",
// Complex
"x--x---x--x----xx--x---x--x----x",
"x-----x---------x-----x---x--x--",
"x------x--x-----x-x---x---x-----",
"x------x--x-----x------x--x-----",
"x---x-----x----x------x---x-----",
"x-----x---x-------x-----x-------",
"x-----x---------x-----x---x--x--",
"x--x---x-xx----xx-x----xxxx-----",
"x------x-x-x---xx----------x----"
];

Beat.SnarePatterns =
[
// Minimalist
"--x----------x------x-x---------",
"----x-------x-------x-------x---",
"-------x-------x-------x-------x",
"----x-------x-------x-------x---",
"---x--------x-------x-------x---",
"----x---------x-----x-------x---",
"--------x-----x-----x-------x---",
// Complex
"----x----x----x-------x--x--x---",
"--x-x---x--xx-xx----x-x---x-x---"
];

Beat.HihatPatterns =
[
// Minimalist
"--xx-xx-x---xxx-x----x-x-x------",
"-----x-x-xxx-xx------x-x-x------",
"-x---x---x---x---x---x---x---x--",
"x-xx-xx---------x-xx-xx---------",
"x-xxx-x---------x-xxx-x---------",
"x-xxx-x---------xx-xx-x-xx------",
"--------x-xx-xxx---------x-xx-x-",
// Complex
"x-xxx-x-x-xxx-x-x-xxx-x-x-xxx-x-",
"x-x-x-xxxxx-x-x-x-x-x-xxxxx-x-x-",
"x-x-x-x-xxx-x-x-x-x-x-xxx-x---x-",
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
