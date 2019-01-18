class Beat {


	constructor(drum, bpm = 80)
	{	
		this.bpm = bpm;

		this.drum = drum;

		this.kickSubdivisions = 4;
		this.hihatSubdivisions = 8;
		this.snareSubdivisions = 2;

		this.kickPattern = this.pattern(this.kickSubdivisions);
		console.log(this.kickPattern);
		this.hihatPattern = this.pattern(this.hihatSubdivisions);
		this.snarePattern = this.pattern(this.snareSubdivisions);

		this.kick = "C0";
		this.hihat = "D0";
		this.snare = "C#0";
	}

	pattern(count) 
	{
  		let pattern = [];

  		for (let i = 0; i < (count || 8); ++i) 
  		{
    		pattern.push(Math.round(Math.random()) ? '-' : 'x');
  		}
  		return pattern;
	}

	create() 
	{	
		let timeInterval = 60/tempo;
		let _this = this;

		let beat =  new Tone.Event(
			function(time)
			{	
				console.log(_this.kickPattern);
				console.log(_this.kickPattern[(T - timeInterval) % _this.kickSubdivisions]);

				if (_this.kickPattern[Math.round(time) % _this.kickSubdivisions] === "x")
					_this.drum.play(_this.kick, 0.25, time);

				if (_this.snarePattern[Math.round(time) % _this.snareSubdivisions] === "x")
					_this.drum.play(_this.snare, 0.25, time);

				if (_this.hihatPattern[Math.round(time) % _this.hihatSubdivisions] === "x")
					_this.drum.play(_this.hihat, 0.25, time);
			});
		beat.loop = Infinity;
		beat.loopEnd = 4*T;
		return beat;
	}

	play()
	{
		let beat = this.create().start();
	}
}
