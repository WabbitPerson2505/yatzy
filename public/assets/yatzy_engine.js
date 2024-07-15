//Function to calculate the overall
//score of the game
//input is an array with the scores of the scoreboxes
function scoreGame(game) {
	var totalScore = 0;

	//we know there are 15 scoreboxes
	for (let i = 0; i < 15; i++) {
		totalScore += game[i];

		//if category 1 to 6 is at least 63
		//then add a 25 points bonus
		if (i == 5 && totalScore >= 63) {
			totalScore += 25;
		}

	}

	return totalScore;
}

//Function to calculate a score and
//update the chosen scorebox
//input is the name of the scorebox
function calculateScore(scoreBox) {

	if (roll != 0 && scoreBox != "Chance") {

		//Update the score and disable the category that was pressed
		//so it can't be scored twice
		var scoreFromBox = scoreTurn(dices, scoreBox);
		document.getElementById('cell' + scoreBox).innerHTML = scoreFromBox;
		document.getElementById('button' + scoreBox).disabled = true;
		document.getElementById('cellScore').innerHTML = scoreGame(scores);

		reset();

		//If end of game then disable the roll button
		if (checkEndOfGame(states)) {
			document.getElementById('buttonRoller').disabled = true;
		}
		
	} else if (roll != 0 && scoreBox == "Chance") {

		//Show the hidden buttons to switch to the chance
		//interface for choosing a combination for it
		//and disable the chance button
		document.getElementById('buttonOnes').hidden = true;
		document.getElementById('buttonTwos').hidden = true;
		document.getElementById('buttonThrees').hidden = true;
		document.getElementById('buttonFours').hidden = true;
		document.getElementById('buttonFives').hidden = true;
		document.getElementById('buttonSixes').hidden = true;
		document.getElementById('buttonOnePair').hidden = true;
		document.getElementById('buttonTwoPair').hidden = true;
		document.getElementById('buttonThreeOfAKind').hidden = true;
		document.getElementById('buttonFourOfAKind').hidden = true;
		document.getElementById('buttonSmallStraight').hidden = true;
		document.getElementById('buttonBigStraight').hidden = true;
		document.getElementById('buttonFullHouse').hidden = true;
		document.getElementById('buttonChance').hidden = true;
		document.getElementById('buttonYatzy').hidden = true;
		document.getElementById('buttonChance').disabled = true;

		//Hide previous buttons
		document.getElementById('msgChance').hidden = false;
		document.getElementById('hiddenOnes').hidden = false;
		document.getElementById('hiddenTwos').hidden = false;
		document.getElementById('hiddenThrees').hidden = false;
		document.getElementById('hiddenFours').hidden = false;
		document.getElementById('hiddenFives').hidden = false;
		document.getElementById('hiddenSixes').hidden = false;
		document.getElementById('hiddenOnePair').hidden = false;
		document.getElementById('hiddenTwoPair').hidden = false;
		document.getElementById('hiddenThreeOfAKind').hidden = false;
		document.getElementById('hiddenFourOfAKind').hidden = false;
		document.getElementById('hiddenSmallStraight').hidden = false;
		document.getElementById('hiddenBigStraight').hidden = false;
		document.getElementById('hiddenFullHouse').hidden = false;
		document.getElementById('hiddenYatzy').hidden = false;

	}

}

//Function to determine what the score
//for a given scorebox should be
//input is an array of what dices were
//rolled and the name of the score box chosen
function scoreTurn(game, scoreBox) {

	var score = 0;

	//Generate an array of size 6 where the value
	//of each index is the count of that number
	//found from the dices rolled
	//e.g [1,2,2,0,0,0] means 1 one, 2 two, 2 three
	//and 0 for the rest
	var dicesNumber = calculateEachDice(game);

	//Update the score and the states
	//of each category
	if (scoreBox == "Ones") {
		score = dicesNumber[0] * 1;
		scores[0] = score;
		states[0] = 1;
	} else if (scoreBox == "Twos") {
		score = dicesNumber[1] * 2;
		scores[1] = score;
		states[1] = 1;
	} else if (scoreBox == "Threes") {
		score = dicesNumber[2] * 3;
		scores[2] = score;
		states[2] = 1;
	} else if (scoreBox == "Fours") {
		score = dicesNumber[3] * 4;
		scores[3] = score;
		states[3] = 1;
	} else if (scoreBox == "Fives") {
		score = dicesNumber[4] * 5;
		scores[4] = score;
		states[4] = 1;
	} else if (scoreBox == "Sixes") {
		score = dicesNumber[5] * 6;
		scores[5] = score;
		states[5] = 1;
	} else if (scoreBox == "OnePair") {

		if (checkOnePair(dicesNumber)) {
			
			for (let i = 0; i < 6; i++) {

				if (dicesNumber[i] >= 2) {
					score = ((i+1) * 2);
				}

			}
		}

		scores[6] = score;
		states[6] = 1;
	} else if (scoreBox == "TwoPair") {

		if (checkTwoPair(dicesNumber)) {
			
			for (let i = 0; i < 6; i++) {

				if (dicesNumber[i] >= 2) {
					score += ((i+1) * 2);
				}

			}
		}

		scores[7] = score;
		states[7] = 1;

	} else if (scoreBox == "ThreeOfAKind") {

		if (checkThreeOfAKind(dicesNumber)) {
			var found = false;

			for (let i = 0; i < 6 && !found; i++) {

				if (dicesNumber[i] >= 3) {
					score += ((i+1) * 3);
					found = true;
				}

			}
		}

		scores[8] = score;
		states[8] = 1;

	} else if (scoreBox == "FourOfAKind") {

		if (checkFourOfAKind(dicesNumber)) {
			var found = false;

			for (let i = 0; i < 6 && !found; i++) {

				if (dicesNumber[i] >= 4) {
					score += ((i+1) * 4);
					found = true;
				}

			}
		}

		scores[9] = score;
		states[9] = 1;

	} else if (scoreBox == "SmallStraight") {
		if (checkStraight(dicesNumber,0)) {
			score = 15;
		}
		
		scores[10] = score;
		states[10] = 1;
	} else if (scoreBox == "BigStraight") {

		if (checkStraight(dicesNumber,1)) {
			score = 20;
		}
		
		scores[11] = score;
		states[11] = 1;
	} else if (scoreBox == "FullHouse") {
		
		if (checkFullHouse(dicesNumber)) {
			for (let i = 0; i < 6; i++) {

				if (dicesNumber[i] == 2) {
					score += ((i+1) * 2);
				}

				if (dicesNumber[i] == 3) {
					score += ((i+1) * 3);
				}

			}
		}

		scores[12] = score;
		states[12] = 1;

	} else if (scoreBox == "Yatzy") {
		if (checkYatzy(game)) {
			score = 50;
		}

		scores[14] = score;
		states[14] = 1;
	}

	return score;
}

//Function to calculate the chance score
//input is the name of scorebox
function calculateScoreHidden(scoreBox) {

	//update score and states
	var scoreFromHidden = scoreTurn(dices, scoreBox);
	document.getElementById('cellChance').innerHTML = scoreFromHidden;
	scores[13] = scoreFromHidden;
	states[13] = 1;
	document.getElementById('cellScore').innerHTML = scoreGame(scores);
	reset();

	//update the buttons so as to revert from visible to hidden
	//to ressemble the initial page before hiding them
	document.getElementById('hiddenOnes').hidden = true;
	document.getElementById('hiddenTwos').hidden = true;
	document.getElementById('hiddenThrees').hidden = true;
	document.getElementById('hiddenFours').hidden = true;
	document.getElementById('hiddenFives').hidden = true;
	document.getElementById('hiddenSixes').hidden = true;
	document.getElementById('hiddenOnePair').hidden = true;
	document.getElementById('hiddenTwoPair').hidden = true;
	document.getElementById('hiddenThreeOfAKind').hidden = true;
	document.getElementById('hiddenFourOfAKind').hidden = true;
	document.getElementById('hiddenSmallStraight').hidden = true;
	document.getElementById('hiddenBigStraight').hidden = true;
	document.getElementById('hiddenFullHouse').hidden = true;
	document.getElementById('hiddenYatzy').hidden = true;
	document.getElementById('msgChance').hidden = true;

	document.getElementById('buttonOnes').hidden = false;
	document.getElementById('buttonTwos').hidden = false;
	document.getElementById('buttonThrees').hidden = false;
	document.getElementById('buttonFours').hidden = false;
	document.getElementById('buttonFives').hidden = false;
	document.getElementById('buttonSixes').hidden = false;
	document.getElementById('buttonOnePair').hidden = false;
	document.getElementById('buttonTwoPair').hidden = false;
	document.getElementById('buttonThreeOfAKind').hidden = false;
	document.getElementById('buttonFourOfAKind').hidden = false;
	document.getElementById('buttonSmallStraight').hidden = false;
	document.getElementById('buttonBigStraight').hidden = false;
	document.getElementById('buttonFullHouse').hidden = false;
	document.getElementById('buttonChance').hidden = false;
	document.getElementById('buttonYatzy').hidden = false;

	//if end of game disable the roll button
	if (checkEndOfGame(states)) {
			document.getElementById('buttonRoller').disabled = true;
	}
}

//Function to check if there is a yatzy
//input is the dices that were rolled
function checkYatzy(currentRoll) {

	var same = true;
	var current = currentRoll[0];

	//We know we will be getting the dices rolled
	//so the size will be 5
	for (let i = 0; i < 5 && same; i++) {

		if (currentRoll[i] != current) {
			same = false;
		}

	}

	return same;
}

//Function to generate an array of size 6 that
//indicates how many of each dice we rolled
//input is an array of how many of each dices
function calculateEachDice(currentRoll) {

	var currentDices = [0,0,0,0,0,0];

	//size of dices rolled is 5
	for (let i = 0; i < 5; i++) {
		currentDices[currentRoll[i] - 1]++;
	}

	return currentDices;
}

//Function to check if there is a pair
//input is an array of how many of each dices
function checkOnePair(lstDices) {

	var pair = false;

	for (let i = 0; i < 6 && !pair; i++) {

		if (lstDices[i] >= 2) {
			pair = true;
		}

	}

	return pair;
}

//Function to check if there are two pairs of
//dices of different numbers
//input is an array of how many of each dices
function checkTwoPair(lstDices) {

	var twoPair = false;
	var counter = 0;

	for (let i = 0; i < 6 && !twoPair; i++) {

		if (lstDices[i] >= 2) {
			counter++;
		}

		if (counter == 2) {
			twoPair = true;
		}
	}

	return twoPair;
}

//Function to check if there are 3 dices of one number
//input is an array of how many of each dices
function checkThreeOfAKind(lstDices) {

	var threeKind = false;

	for (let i = 0; i < 6 && !threeKind; i++) {

		if (lstDices[i] >= 3) {
			threeKind = true;
		}

	}

	return threeKind;
}

//Function to check if there are 4 dices of one number
//input is an array of how many of each dices
function checkFourOfAKind(lstDices) {

	var fourKind = false;

	for (let i = 0; i < 6 && !fourKind; i++) {

		if (lstDices[i] >= 4) {
			fourKind = true;
		}

	}

	return fourKind;
}

//Function to check if there is a straight
//depending on the start given
//input is an array of how many of each dices
//and a start to choose if it starts
//1-2-3-4-5 or 2-3-4-5-6
function checkStraight(lstDices, start) {

	var base = start;
	var isStraight = true;

	//for a straight there needs to be exactly one of each number
	for (let i = start; i < (5+start) && isStraight; i++) {

		if (lstDices[i] != 1) {

			isStraight = false;;
		}

	}

	return isStraight;
}

//Function to check if there is a full house
//input is an array of how many of each dices
function checkFullHouse(lstDices) {

	var fullHouse = false;
	var twoKind = false;
	var threeKind = false;

	//we know it's an array of size 6
	for (let i = 0; i < 6; i++) {

		//we know from the array that for a
		//full we need 3 of a number and 2
		//of a different number
		if (lstDices[i] == 3) {
			threeKind = true;
		}

		if (lstDices[i] == 2) {
			twoKind = true;
		}

	}

	if (twoKind && threeKind) {
		fullHouse = true;
	}

	return fullHouse;
}

//Function to determine if there aren't
//any scoreboxes unused
function checkEndOfGame(scoreBoxState) {

	var gameEnd = true;

	for (let i = 0; i < 15 && gameEnd; i++) {

		if (scoreBoxState[i] == 0) {
			gameEnd = false;
		}

	}

	return gameEnd;
}

window.addEventListener("load",start, false);

function start() {

	callApi("load");
		
	document.getElementById("roller").addEventListener("click", 
					function() { callApi("roller"); });
	document.getElementById("replay").addEventListener("click", 
					function() { callApi("replay"); });
	document.getElementById("reset").addEventListener("click", 
					function() { callApi("reset"); });
	document.getElementById("ones").addEventListener("click", 
					function() { callApi("ones"); });
	document.getElementById("twos").addEventListener("click", 
					function() { callApi("twos"); });
	document.getElementById("threes").addEventListener("click", 
					function() { callApi("threes"); });
	document.getElementById("fours").addEventListener("click", 
					function() { callApi("fours"); });
	document.getElementById("fives").addEventListener("click", 
					function() { callApi("fives"); });
	document.getElementById("sixes").addEventListener("click", 
					function() { callApi("sixes"); });
	document.getElementById("onePair").addEventListener("click", 
					function() { callApi("onePair"); });
	document.getElementById("twoPair").addEventListener("click", 
					function() { callApi("twoPair"); });
	document.getElementById("threeOfAKind").addEventListener("click", 
					function() { callApi("threeOfAKind"); });
	document.getElementById("fourOfAKind").addEventListener("click", 
					function() { callApi("fourOfAKind"); });
	document.getElementById("smallStraight").addEventListener("click", 
					function() { callApi("smallStraight"); });
	document.getElementById("bigStraight").addEventListener("click", 
					function() { callApi("bigStraight"); });
	document.getElementById("fullHouse").addEventListener("click", 
					function() { callApi("fullHouse"); });
	document.getElementById("chance").addEventListener("click", 
					function() { callApi("chance"); });
	document.getElementById("yatzy").addEventListener("click", 
					function() { callApi("yatzy"); });
}

function callApi(elementId) {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);

			let responseJson = JSON.parse(this.responseText);
			
			for (let i = 1; i < 6; i++) {
				document.getElementById("dice" + (i)).src = 
				"assets/dice" + responseJson["rolls"]["dice"+i] + ".png";
				
			}

			document.getElementById("rollNumber").innerHTML = responseJson["turn"];
			document.getElementById("roller").disabled = responseJson["disabled"];

		}
	};

	var request = "choice=";

	switch (elementId) {
		case "load":
			request += "load";
			break;
		case "roller":
			let rolls = {
				dice1: 0,
				dice2: 0,
				dice3: 0,
				dice4: 0,
				dice5: 0
			};
			request += "roll&diceToRoll=" + JSON.stringify(rolls);
			break;
		case "ones":
		case "twos":
		case "threes":
		case "fours":
		case "fives":
		case "sixes":
		case "onePair":
		case "twoPair":
		case "threeOfAKind":
		case "fourOfAKind":
		case "smallStraight":
		case "bigStraight":
		case "fullHouse":
		case "chance":
		case "yatzy":
		case "replay":
		case "reset":
			request += elementId;	
			break;
	}

	/*
		var roll1 = document.getElementById("cbDice1").checked ? 1 : 0;
		var roll2 = document.getElementById("cbDice2").checked ? 1 : 0;
		var roll3 = document.getElementById("cbDice3").checked ? 1 : 0;
		var roll4 = document.getElementById("cbDice4").checked ? 1 : 0;
		var roll5 = document.getElementById("cbDice5").checked ? 1 : 0;
		*/
		
		//console.log(JSON.stringify(rolls));

		//var httpRequest = "dice1=" + 0 + "&dice2=" + 0 + "&dice3=" + 0 + 
		//					"&dice4=" + 0 + "&dice5=" + 0;

	

	xhttp.open("POST","yatzy_api.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(request);
	
}