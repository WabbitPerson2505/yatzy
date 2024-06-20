function scoreGame(game) {
	var totalScore = 0;

	for (let i = 0; i < 15; i++) {
		totalScore += game[i];

		if (i == 5 && totalScore >= 63) {
			totalScore += 25;
		}

	}

	return totalScore;
}

function calculateScore(scoreBox) {

	if (roll != 0 && scoreBox != "Chance") {
		var scoreFromBox = scoreTurn(dices, scoreBox);
		document.getElementById('cell' + scoreBox).innerHTML = scoreFromBox;
		document.getElementById('button' + scoreBox).disabled = true;
		document.getElementById('cellScore').innerHTML = scoreGame(scores);

		reset();

		if (checkEndOfGame(states)) {
			document.getElementById('buttonRoller').disabled = true;
		}
		
	} else if (roll != 0 && scoreBox == "Chance") {

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

function scoreTurn(game, scoreBox) {

	var score = 0;

	var dicesNumber = calculateEachDice(game);

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

function calculateScoreHidden(scoreBox) {
	var scoreFromHidden = scoreTurn(dices, scoreBox);
	document.getElementById('cellChance').innerHTML = scoreFromHidden;
	scores[13] = scoreFromHidden;
	states[13] = 1;
	document.getElementById('cellScore').innerHTML = scoreGame(scores);
	reset();

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

	if (checkEndOfGame(states)) {
			document.getElementById('buttonRoller').disabled = true;
	}
}

//There are always be 5 dices in yatzy so the
//array size will always be 5.
function checkYatzy(currentRoll) {

	var same = true;
	var current = currentRoll[0];

	for (let i = 0; i < 5 && same; i++) {

		if (currentRoll[i] != current) {
			same = false;
		}

	}

	return same;
}

function calculateEachDice(currentRoll) {

	var currentDices = [0,0,0,0,0,0];

	for (let i = 0; i < 5; i++) {
		currentDices[currentRoll[i] - 1]++;
	}

	return currentDices;
}

function checkOnePair(lstDices) {

	var pair = false;

	for (let i = 0; i < 6 && !pair; i++) {

		if (lstDices[i] >= 2) {
			pair = true;
		}

	}

	return pair;
}

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

function checkThreeOfAKind(lstDices) {

	var threeKind = false;

	for (let i = 0; i < 6 && !threeKind; i++) {

		if (lstDices[i] >= 3) {
			threeKind = true;
		}

	}

	return threeKind;
}

function checkFourOfAKind(lstDices) {

	var fourKind = false;

	for (let i = 0; i < 6 && !fourKind; i++) {

		if (lstDices[i] >= 4) {
			fourKind = true;
		}

	}

	return fourKind;
}

function checkStraight(lstDices, start) {

	var base = start;
	var isStraight = true;

	for (let i = start; i < (5+start) && isStraight; i++) {

		if (lstDices[i] != 1) {

			isStraight = false;;
		}

	}

	return isStraight;
}

function checkFullHouse(lstDices) {

	var fullHouse = false;
	var twoKind = false;
	var threeKind = false;

	for (let i = 0; i < 6; i++) {

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

function checkEndOfGame(scoreBoxState) {

	var gameEnd = true;

	for (let i = 0; i < 15 && gameEnd; i++) {

		if (scoreBoxState[i] == 0) {
			gameEnd = false;
		}

	}

	return gameEnd;
}

function changeKeepOrRoll(index) {

	if (roll != 0) {

		if (keepOrReroll[index-1] == 0) {
			keepOrReroll[index-1] = 1;
			document.getElementById('keepOrReroll' + index).innerHTML = "Keep";
		} else {
			keepOrReroll[index-1] = 0;
			document.getElementById('keepOrReroll' + index).innerHTML = "Roll";
		}
	}

}

function reset() {
	dices = [0,0,0,0,0];
	keepOrReroll = [0,0,0,0,0];
	roll = 0;
	document.getElementById('rollNumber').innerHTML = roll;
	document.getElementById('buttonRoller').disabled = false;

	for (let i = 1; i < 6; i++) {
		document.getElementById('keepOrReroll' + i).innerHTML = "Roll";
		document.getElementById('dice' + i).src = "assets/dice1.png";
	}

}