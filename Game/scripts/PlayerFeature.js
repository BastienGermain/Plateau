class PlayerFeature{
	constructor()
	{
		this.defensiveTab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];		//stock the 10 last move effects
		this.offensiveTab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.expensiveTab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.riskyTab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.defensive = 0;		//attribute defensive mean defensive playStyle
		this.offensive = 0;		//attribute offensive mean offensive playStyle
		this.expensive = 0;		//attribute expensive mean territory expension playStyle
		this.risky = 0;			//attribute risky mean risky playStyle
	}

	update()
	{
		this.defensive = 0;		
		this.offensive = 0;		
		this.expensive = 0;		
		this.risky = 0;	
		for (let i =0; i<20; i++){
			this.defensive += this.defensiveTab[i];		
			this.offensive += this.offensiveTab[i];				
			this.expensive += this.expensiveTab[i];			
			this.risky += this.riskyTab[i];		
		}
		
	}

	notifyFeature(tab, int, corner="")
	{
		let decalage = 0;
		if (corner=="corner"){
			decalage = 1;
		}
		let nbStones = data["stoneOnBoard"];
		if (nbStones<=20){
			tab[2*nbStones-2 + decalage]=int;
		}
		else{
			tab = [int]+tab.slice(1);
		}
	}
}