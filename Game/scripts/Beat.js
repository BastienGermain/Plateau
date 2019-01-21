class Beat {


	constructor(drum, bpm = 80)
	{	
		this.bpm = bpm;

		this.drum = drum;

		this.kickSubdivisions = 16;
		this.hihatSubdivisions = 16;
		this.snareSubdivisions = 16;

		this.kickPattern = [];
		this.hihatPattern = [];
		this.snarePattern = [];

		this.instancePatterns();

		this.kickIndex = 0;
		this.snareIndex = 0;
		this.hihatIndex = 0;

		this.kick = "C0";
		this.hihat = "D0";
		this.snare = "C#0";
	}

	instancePatterns() 
	{
    	this.kickPattern = Beat.KickPatterns[(Math.round(Math.random() * 10)) % Beat.KickPatterns.length];
    	this.snarePattern = Beat.SnarePatterns[(Math.round(Math.random() * 10)) % Beat.SnarePatterns.length];
    	this.hihatPattern = Beat.HihatPatterns[(Math.round(Math.random() * 10)) % Beat.HihatPatterns.length];
	}

	createKick() 
	{	
		let _this = this;

		let kick =  new Tone.Event(
			function(time)
			{	
				if (_this.kickPattern[_this.kickIndex % _this.kickSubdivisions] === "x")
				{
					_this.drum.play(_this.kick, 0.25, time);
					console.log("kick");
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
				if (_this.snarePattern[_this.snareIndex % _this.snareSubdivisions] === "x")
				{
					_this.drum.play(_this.snare, 0.25, time);
					console.log("snare");
				}
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
				if (_this.hihatPattern[_this.hihatIndex % _this.hihatSubdivisions] === "x")
				{
					_this.drum.play(_this.hihat, 0.25, time, 0.1);
					console.log("hihat");
				}
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

		let kick = this.createKick().start(startTime);
		let snare = this.createSnare().start(startTime);
		let hihat = this.createHihat().start(startTime);
	}
}

/*
["-", "-", "-", "|", "-", "-", "-", "|", "-", "-", "-", "|", "-", "-", "-", "|"],
*/

Beat.KickPatterns = 
[
["-", "-", "-", "x", "-", "-", "-", "x", "-", "-", "-", "x", "-", "-", "-", "x"],
["x", "-", "-", "-", "-", "-", "x", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

Beat.SnarePatterns = 
[
["-", "-", "-", "-", "-", "-", "-", "x", "-", "-", "-", "-", "-", "-", "-", "x"],
["-", "-", "-", "-", "x", "-", "-", "-", "-", "-", "-", "-", "x", "-", "-", "-"],
];
Beat.HihatPatterns = 
[
["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
["x", "-", "x", "-", "x", "-", "x", "x", "x", "x", "x", "-", "x", "-", "x", "-"],
];