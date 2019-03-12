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

function updateFeatures(){
	switch (data["knownMove"]){
		case "Nobi" :
			if (data["player"]!="White"){	// /!\ "player" mean player playing, "knownMove" concern the player who just played
				//!=White mean that Black player did the "Nobi"
				blackPlayerFeature.notifyFeature(blackPlayerFeature.defensiveTab, 1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.defensiveTab, 1);
			}
			break;

		case "Tsuke" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab,2);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab,2);
			}
			break;

		case "Kata":
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab,1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab,1);
			}
			break;

		case "Nozuki":
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab,1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab,1);
			}
			break;

		case "Coupe":
			if (data["player"]!="White"){
				blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab,1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab,1);
			}
			break;

		case "Hane" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab,3);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab,3);
			}
			break;

		case "Connect":
			if (data["player"]!="White"){
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1);
			}
			break;

		case "Kosumi":
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1);
			}
			break;

		case "Tobi" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1);
				blackPlayerFeature.notifyFeature(blackPlayerFeature.defensiveTab, 1);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1);
				whitePlayerFeature.notifyFeature(whitePlayerFeature.defensiveTab, 1);
			}
			break;

		case "Kogeima" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,2);
				blackPlayerFeature.notifyFeature(blackPlayerFeature.riskyTab,2);
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,2);
				whitePlayerFeature.notifyFeature(whitePlayerFeature.riskyTab,2);
			}
			break;

		default:
			blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab, 0);
			blackPlayerFeature.notifyFeature(blackPlayerFeature.defensiveTab, 0);
			blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab, 0);
			blackPlayerFeature.notifyFeature(blackPlayerFeature.riskyTab, 0);
			whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab, 0);
			whitePlayerFeature.notifyFeature(whitePlayerFeature.defensiveTab, 0);
			whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab, 0);
			whitePlayerFeature.notifyFeature(whitePlayerFeature.riskyTab, 0);
			break;
	}


	switch(data["cornerMove"]){
		case "Komoku" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1, "corner");
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1, "corner");
			}
			break;

		case"Takamoku":
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1, "corner");
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1, "corner");
			}
			break;

		case "Hoshi" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,1, "corner");
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,1, "corner");
			}
			break;


		case "San-san" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,2, "corner");
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab,2, "corner");
			}
			break;

		case "Mokuhazuki" :
			if (data["player"]!="White"){	
				blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab,3, "corner");
				blackPlayerFeature.notifyFeature(blackPlayerFeature.riskyTab,1, "corner");
			}
			else{
				whitePlayerFeature.notifyFeature(whitePlayerFeature.riskyTab,1,"corner");
			}
			break;

		default:
			blackPlayerFeature.notifyFeature(blackPlayerFeature.offensiveTab, 0, "corner");
			blackPlayerFeature.notifyFeature(blackPlayerFeature.defensiveTab, 0, "corner");
			blackPlayerFeature.notifyFeature(blackPlayerFeature.expensiveTab, 0, "corner");
			blackPlayerFeature.notifyFeature(blackPlayerFeature.riskyTab, 0, "corner");
			whitePlayerFeature.notifyFeature(whitePlayerFeature.offensiveTab, 0, "corner");
			whitePlayerFeature.notifyFeature(whitePlayerFeature.defensiveTab, 0, "corner");
			whitePlayerFeature.notifyFeature(whitePlayerFeature.expensiveTab, 0, "corner");
			whitePlayerFeature.notifyFeature(whitePlayerFeature.riskyTab, 0, "corner");
			break;
	}
	blackPlayerFeature.update();
	whitePlayerFeature.update();
}