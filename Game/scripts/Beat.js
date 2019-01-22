class Beat {

	// selected pattern [kickPatternIndex, snarePatternIndex, hihatPatternIndex]
	constructor(drum, selectedPaterns = null)
	{	
		this.drum = drum;
		this.drum.sampler.volume.value = -9;

		this.kickSubdivisions = 16;
		this.hihatSubdivisions = 16;
		this.snareSubdivisions = 16;

		this.kickPattern = [];
		this.hihatPattern = [];
		this.snarePattern = [];

		this.selectedPaterns = selectedPaterns;

		this.instancePatterns();

		this.kickIndex = 0;
		this.snareIndex = 0;
		this.hihatIndex = 0;

		this.kickNote = "C0";
		this.snareNote = "C#0";
		this.hihatNote = "D0";

		this.kick = null;
		this.hihat = null;
		this.snare = null;
	}

	instancePatterns() 
	{
		if(this.selectedPaterns && this.selectedPaterns.length === 3)
		{
			this.kickPattern = Beat.KickPatterns[this.selectedPaterns[0]];
    		this.snarePattern = Beat.SnarePatterns[this.selectedPaterns[1]];
  		  	this.hihatPattern = Beat.HihatPatterns[this.selectedPaterns[2]];
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

	play(startTime)
	{
		console.log("play");

		this.kick = this.createKick().start(startTime);
		this.snare = this.createSnare().start(startTime);
		this.hihat = this.createHihat().start(startTime);
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

// TECHNO PATTERNS

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

// TECHNO PATTERNS

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

// TECHNO PATTERNS
];