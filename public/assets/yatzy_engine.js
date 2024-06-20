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