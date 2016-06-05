//ctrl-monty-hall.js

function MontyHall() 
{	
	let default_totalDoors = 3,
	default_jokeDoors = 2,
	default_playerDoor = Math.floor(Math.random() * totalDoors) + 1;
	
	let pstData = {
		"doorsOpened":0,
		"jokeDoorsOpened":0,
		"totalGames":0,
		"totalWins":0,
		"doorSwitches":0
	};
	
	let dial = {
		"gameWon":"You beat Monty!",
		"gameLost":"Monty wins!",
		"switchDoor":"Would you like to switch doors?",
		"switchedDoor":"You switched doors.",
		"unswitchedDoor":"You didn\'t switch doors."
	};
	
	let gameRunning = 0;
	
	function Start(totalDoors, jokeDoors, playerDoor)
	{
		// null override for quick testing/play
		if(totalDoors === null)
		{
			totalDoors = default_totalDoors;
		}
		else if(jokeDoors === null) 
		{
			totalDoors = default_jokeDoors;
		}
		else if(playerDoor === null)
		{
			playerDoor = default_playerDoor;
		}
		

		try
		{
			if(jokeDoors <= 0) throw "Total joke doors must be greater than 0 or the game is un-losable.";
			if(totalDoors <= jokeDoors) throw "Total doors must be greater than joke doors or the game is un-winnable.";
			if(isNaN(totalDoors)) throw "Total doors available doesn\'t seem to be a number.";
			if(isNaN(jokeDoors)) throw "Number of joke doors doesn\'t seem to be a number.";
			if(isNaN(playerDoor)) throw "Your chosen door doesn\'t seem to be a number.";
			if(playerDoor < jokeDoors || playerDoor > totalDoors) throw "Your chosen door needs to be between the number of joke doors and total available doors.";
		}
		catch(err)
		{
			totalDoors = default_totalDoors;
			jokeDoors = default_jokeDoors;
			chosenDoor = default_playerDoor;
			
			return "ERROR: " + err + "Setting up default game.";
		}
		finally
		{
			pstData.totalDoors = totalDoors;
			pstData.jokeDoors = jokeDoors;
			gameRunning = 1;
		}
	}

	function ChooseDoor(input)
	{
		pstData.playerDoor = input;
	}

	function OpenDoor() 
	{
		totalDoors --;
		pstData.doorsOpened ++;
	}

	function ConfirmOpenDoor(input)
	{
		if(confirm(dial.switchDoor)
		{
			pstData.doorSwitches ++;
			OpenDoor();
			GetOdds();
			return dial.switchedDoor;
		}
		else
		{
			OpenDoor();
			return dial.unswitchedDoor;
		}
	}
	
	function GetOdds() 
	{
		return jokeDoors + "/" + totalDoors;
	}
	
	// should only be used when switching between doors
	function ChangeDoor()
	{
		return jokeDoors + "/" + closedDoors;
	}

	function RemoveJoke()
	{
		jokeDoors --;
	}
	
	function CheckStatus() 
	{
		if(jokeDoors <= 0)
		{
			return dial.gameWon;
		}
	}
	
	function Reset() 
	{
		jokeDoors = pstData.jokeDoors;
		totalDoors = pstData.totalDoors;
	}
}

MontyHall.Start(3,1,2);